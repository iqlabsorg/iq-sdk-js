import { deployments, ethers } from 'hardhat';
import 'hardhat-deploy-ethers';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import { EIP155BlockchainProvider } from '../../src';
import { baseRate, estimateAndBorrow, getEnterprise, getPowerToken, wait, waitBlockchainTime } from './utils';
import { DefaultConverter, Enterprise, EnterpriseFactory, ERC20Mock } from '../../src/contracts';
import {
  AccountState,
  Address,
  BigNumber,
  EnterpriseInfo,
  EnterpriseParams,
  ERC20Metadata,
  LiquidityInfo,
  LoanInfo,
  ServiceInfo,
  ServiceParams,
} from '@iqprotocol/abstract-blockchain';

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

/**
 * @group integration
 */
describe('EIP155BlockchainProvider', () => {
  const ONE_HOUR = 3600;
  const ONE_DAY = 24 * ONE_HOUR;
  const ONE_PERCENT = 100;
  const ONE_SHARE = BigNumber.from(10n ** 18n);
  const ONE_TOKEN = BigNumber.from(10n ** 18n);
  const BASE_RATE = BigNumber.from(baseRate(100n, 86400n, 3n));
  const GAP_HALVING_PERIOD = 86400;

  let blockchainProvider: EIP155BlockchainProvider;
  let deployerSigner: Awaited<ReturnType<typeof ethers.getNamedSigner>>;
  let liquidityToken: ERC20Mock;
  let enterpriseFactory: EnterpriseFactory;
  let converter: DefaultConverter;

  let baseEnterpriseParams: EnterpriseParams;
  let baseServiceParams: ServiceParams;

  beforeEach(async () => {
    await deployments.fixture();
    deployerSigner = await ethers.getNamedSigner('deployer');
    enterpriseFactory = await ethers.getContract('EnterpriseFactory');
    liquidityToken = await ethers.getContract('ERC20Mock');
    converter = await ethers.getContract('DefaultConverter');
    blockchainProvider = new EIP155BlockchainProvider({
      signer: deployerSigner,
    });

    baseEnterpriseParams = {
      name: 'Test Enterprise',
      baseUri: 'https://iq.space',
      gcFeePercent: 2 * ONE_PERCENT,
      liquidityTokenAddress: liquidityToken.address,
      converterAddress: converter.address,
    };

    baseServiceParams = {
      name: 'Test Service',
      symbol: 'IQPT',
      gapHalvingPeriod: GAP_HALVING_PERIOD,
      baseRate: BASE_RATE,
      baseToken: liquidityToken.address,
      serviceFeePercent: 3 * ONE_PERCENT,
      minLoanDuration: 12 * ONE_HOUR,
      maxLoanDuration: 60 * ONE_DAY,
      minGCFee: ONE_TOKEN,
      allowsPerpetualTokensForever: true,
    };
  });

  it('deploys enterprise', async () => {
    const receipt = await wait(blockchainProvider.deployEnterprise(enterpriseFactory.address, baseEnterpriseParams));
    expect(receipt.status).toBe(1);
  });

  it('returns correct CAIP-2 chain ID', async () => {
    const chainId = await blockchainProvider.getChainId();
    expect(chainId.toString()).toEqual(`eip155:${await deployerSigner.getChainId()}`);
  });

  it('retrieves an arbitrary token balance', async () => {
    // fallback to signer address
    let balance = await blockchainProvider.getTokenBalance(liquidityToken.address);
    expect(balance).toEqual(parseUnits('1000000000'));

    // use arbitrary address
    balance = await blockchainProvider.getTokenBalance(
      liquidityToken.address,
      '0x17CdaD42F88fcecF77F53467B3c15613e8063adD',
    );
    expect(balance).toEqual(BigNumber.from(0));
  });

  describe('When enterprise deployed', () => {
    let enterprise: Enterprise;
    let expectedEnterpriseData: EnterpriseInfo;

    beforeEach(async () => {
      const receipt = await wait(blockchainProvider.deployEnterprise(enterpriseFactory.address, baseEnterpriseParams));
      enterprise = await getEnterprise(enterpriseFactory, receipt.blockNumber);

      expectedEnterpriseData = {
        address: enterprise.address,
        name: baseEnterpriseParams.name,
        baseUri: baseEnterpriseParams.baseUri,
        totalShares: BigNumber.from(0),
        interestGapHalvingPeriod: 7 * ONE_DAY,
        borrowerLoanReturnGracePeriod: 12 * ONE_HOUR,
        enterpriseLoanCollectGracePeriod: ONE_DAY,
        gcFeePercent: 2 * ONE_PERCENT,
        fixedReserve: BigNumber.from(0),
        usedReserve: BigNumber.from(0),
        streamingReserve: BigNumber.from(0),
        streamingReserveTarget: BigNumber.from(0),
        streamingReserveUpdated: 0,
      };
    });

    it('retrieves enterprise data', async () => {
      const data = await blockchainProvider.getEnterpriseInfo(enterprise.address);
      expect(data).toMatchObject(expectedEnterpriseData);
    });

    it('retrieves enterprise liquidity token metadata', async () => {
      const metadata = await blockchainProvider.getLiquidityTokenMetadata(enterprise.address);
      expect(metadata).toEqual(<ERC20Metadata>{
        address: liquidityToken.address,
        name: 'Testing',
        symbol: 'TST',
        decimals: 18,
      });
    });

    it('registers new services', async () => {
      const receipt = await wait(blockchainProvider.registerService(enterprise.address, baseServiceParams));
      expect(receipt.status).toBe(1);
    });

    it('allows to set a collector address', async () => {
      const collector = '0x17CdaD42F88fcecF77F53467B3c15613e8063adD';
      await wait(blockchainProvider.setEnterpriseCollectorAddress(enterprise.address, collector));
      await expect(blockchainProvider.getEnterpriseCollectorAddress(enterprise.address)).resolves.toEqual(collector);
    });

    it('allows to set an enterprise vault address', async () => {
      const vault = '0x1E60bE47921E15FBc9e9246daC71F771d4b78a6c';
      await wait(blockchainProvider.setEnterpriseVaultAddress(enterprise.address, vault));
      await expect(blockchainProvider.getEnterpriseVaultAddress(enterprise.address)).resolves.toEqual(vault);
    });

    it('allows to set a converter address', async () => {
      const converter = '0x312D566FABE323BA574fFf724d29c08F46b746b0';
      await wait(blockchainProvider.setConverterAddress(enterprise.address, converter));
      await expect(blockchainProvider.getConverterAddress(enterprise.address)).resolves.toEqual(converter);
    });

    it('allows to set a bonding curve', async () => {
      await wait(blockchainProvider.setBondingCurve(enterprise.address, 10, 5));
      await expect(blockchainProvider.getBondingCurve(enterprise.address)).resolves.toEqual({
        pole: BigNumber.from(10),
        slope: BigNumber.from(5),
      });
    });

    it('allows to set a borrower return grace period', async () => {
      const period = 3 * ONE_HOUR;
      await wait(blockchainProvider.setBorrowerLoanReturnGracePeriod(enterprise.address, period));
      await expect(blockchainProvider.getBorrowerLoanReturnGracePeriod(enterprise.address)).resolves.toEqual(period);
    });

    it('allows to set a collector grace period', async () => {
      const period = 14 * ONE_HOUR;
      await wait(blockchainProvider.setEnterpriseLoanCollectGracePeriod(enterprise.address, period));
      await expect(blockchainProvider.getEnterpriseLoanCollectGracePeriod(enterprise.address)).resolves.toEqual(period);
    });

    it('allows to set enterprise base URI', async () => {
      const uri = 'https://iq.space';
      await wait(blockchainProvider.setBaseUri(enterprise.address, uri));
      await expect(blockchainProvider.getBaseUri(enterprise.address)).resolves.toEqual(uri);
    });

    it('allows to set interest gap halving period', async () => {
      const period = 6 * ONE_HOUR;
      await wait(blockchainProvider.setInterestGapHalvingPeriod(enterprise.address, period));
      await expect(blockchainProvider.getInterestGapHalvingPeriod(enterprise.address)).resolves.toEqual(period);
    });

    it('allows to set GC fee percent', async () => {
      const percent = 200; // 2%
      await wait(blockchainProvider.setGcFeePercent(enterprise.address, percent));
      await expect(blockchainProvider.getGCFeePercent(enterprise.address)).resolves.toEqual(percent);
    });

    describe('When enterprise has registered services', () => {
      let service1Address: Address;
      let service2Address: Address;
      let expectedServiceData1: ServiceInfo;

      beforeEach(async () => {
        const liquidityTokenSymbol = await liquidityToken.symbol();
        const baseExpectedServiceData: Omit<ServiceInfo, 'address' | 'name' | 'symbol' | 'index'> = {
          gapHalvingPeriod: GAP_HALVING_PERIOD,
          baseRate: BASE_RATE,
          baseToken: liquidityToken.address,
          serviceFeePercent: 3 * ONE_PERCENT,
          minLoanDuration: 12 * ONE_HOUR,
          maxLoanDuration: 60 * ONE_DAY,
          minGCFee: ONE_TOKEN,
          allowsPerpetual: true,
        };

        // register first service
        const serviceParams1 = {
          ...baseServiceParams,
          name: 'Test Service 1',
          symbol: 'IQPT1',
        };
        const r1 = await wait(blockchainProvider.registerService(enterprise.address, serviceParams1));
        service1Address = (await getPowerToken(enterprise, r1.blockNumber)).address;
        expectedServiceData1 = {
          ...baseExpectedServiceData,
          address: service1Address,
          name: serviceParams1.name,
          symbol: `${liquidityTokenSymbol} ${serviceParams1.symbol}`,
          index: 0,
        };

        // register second service
        const serviceParams2 = {
          ...baseServiceParams,
          name: 'Test Service 2',
          symbol: 'IQPT2',
        };
        const r2 = await wait(blockchainProvider.registerService(enterprise.address, serviceParams2));
        service2Address = (await getPowerToken(enterprise, r2.blockNumber)).address;
      });

      it('lists enterprise services', async () => {
        const services = await blockchainProvider.getServices(enterprise.address);
        expect(services).toHaveLength(2);

        expect(services[0]).toEqual(service1Address);
        expect(services[1]).toEqual(service2Address);
      });

      it('retrieves the service data', async () => {
        const service = await blockchainProvider.getServiceInfo(service1Address);
        expect(service).toMatchObject(expectedServiceData1);
      });

      it('retrieves account state for specific service', async () => {
        const accountAddress = '0x6F5E1207671091337abA2F2cda040EB16E757092';
        const serviceAddress = service1Address;

        const expectedState = <AccountState>{
          serviceAddress,
          accountAddress,
          balance: BigNumber.from(0),
          energy: BigNumber.from(0),
          timestamp: 0,
        };

        let accountState = await blockchainProvider.getAccountState(serviceAddress, accountAddress);
        expect(accountState).toMatchObject(expectedState);

        // check fallback to signer address
        accountState = await blockchainProvider.getAccountState(serviceAddress);
        expect(accountState).toMatchObject({ ...expectedState, accountAddress: deployerSigner.address });
      });

      it('retrieves the service gap halving period', async () => {
        await expect(blockchainProvider.getGapHalvingPeriod(service1Address)).resolves.toEqual(
          expectedServiceData1.gapHalvingPeriod,
        );
      });

      it('retrieves the service index', async () => {
        await expect(blockchainProvider.getServiceIndex(service1Address)).resolves.toEqual(expectedServiceData1.index);
      });

      it('retrieves the service fee percent', async () => {
        await expect(blockchainProvider.getServiceFeePercent(service1Address)).resolves.toEqual(
          expectedServiceData1.serviceFeePercent,
        );
      });

      it('retrieves the service perpetual token flag', async () => {
        await expect(blockchainProvider.getAllowsPerpetual(service1Address)).resolves.toEqual(
          expectedServiceData1.allowsPerpetual,
        );
      });

      it('allows to set service base rate', async () => {
        const baseRate = BigNumber.from(10);
        const baseToken = '0xBC7024d93ae7db4a60E0720c09127A49477aea80';
        const minGCFee = BigNumber.from(2);
        await wait(blockchainProvider.setBaseRate(service1Address, baseRate, baseToken, minGCFee));
        await expect(blockchainProvider.getBaseRate(service1Address)).resolves.toEqual(baseRate);
        await expect(blockchainProvider.getBaseTokenAddress(service1Address)).resolves.toEqual(baseToken);
        await expect(blockchainProvider.getMinGCFee(service1Address)).resolves.toEqual(minGCFee);
      });

      it('allows to set service fee percent', async () => {
        const feePercent = ONE_PERCENT * 12;
        await wait(blockchainProvider.setServiceFeePercent(service1Address, feePercent));
        await expect(blockchainProvider.getServiceFeePercent(service1Address)).resolves.toEqual(feePercent);
      });

      it('allows to set service loan duration limits', async () => {
        const minLoanDuration = 8 * ONE_HOUR;
        const maxLoanDuration = 10 * ONE_DAY;
        await wait(blockchainProvider.setLoanDurationLimits(service1Address, minLoanDuration, maxLoanDuration));
        await expect(blockchainProvider.getMinLoanDuration(service1Address)).resolves.toEqual(minLoanDuration);
        await expect(blockchainProvider.getMaxLoanDuration(service1Address)).resolves.toEqual(maxLoanDuration);
      });

      it('allows to approve liquidity tokens to a service', async () => {
        await wait(blockchainProvider.approveLiquidityTokensToService(service1Address, ONE_TOKEN));
        const allowance = await liquidityToken.allowance(deployerSigner.address, service1Address);
        expect(allowance).toEqual(ONE_TOKEN);
      });

      it('retrieves liquidity token allowance to service', async () => {
        await wait(blockchainProvider.approveLiquidityTokensToService(service1Address, ONE_TOKEN));
        const allowance = await blockchainProvider.getLiquidityTokenServiceAllowance(service1Address);
        expect(allowance).toEqual(ONE_TOKEN);
      });

      it('allows to wrap liquidity tokens to get power tokens', async () => {
        const amount = ONE_TOKEN.mul(15);
        const liquidityTokenBalanceBefore = await liquidityToken.balanceOf(deployerSigner.address);
        const powerTokenBalanceBefore = await blockchainProvider.getTokenBalance(
          service1Address,
          deployerSigner.address,
        );
        await wait(blockchainProvider.approveLiquidityTokensToService(service1Address, amount));
        await wait(blockchainProvider.wrap(service1Address, amount));
        const liquidityTokenBalanceAfter = await liquidityToken.balanceOf(deployerSigner.address);
        const powerTokenBalanceAfter = await blockchainProvider.getTokenBalance(
          service1Address,
          deployerSigner.address,
        );
        expect(powerTokenBalanceBefore).toEqual(BigNumber.from(0));
        expect(powerTokenBalanceAfter).toEqual(amount);
        expect(liquidityTokenBalanceAfter).toEqual(liquidityTokenBalanceBefore.sub(amount));
      });

      it('allows to wrap liquidity tokens to get power tokens (specific account)', async () => {
        const amount = ONE_TOKEN.mul(12);
        const destAccountAddress = '0x6b75B02c3B5174832C1aa3404F5c7A60CB436e03';
        const liquidityTokenBalanceBefore = await liquidityToken.balanceOf(deployerSigner.address);
        const powerTokenBalanceBefore = await blockchainProvider.getTokenBalance(service1Address, destAccountAddress);
        await wait(blockchainProvider.approveLiquidityTokensToService(service1Address, amount));
        await wait(blockchainProvider.wrapTo(service1Address, destAccountAddress, amount));
        const liquidityTokenBalanceAfter = await liquidityToken.balanceOf(deployerSigner.address);
        const powerTokenBalanceAfter = await blockchainProvider.getTokenBalance(service1Address, destAccountAddress);
        expect(powerTokenBalanceBefore).toEqual(BigNumber.from(0));
        expect(powerTokenBalanceAfter).toEqual(amount);
        expect(liquidityTokenBalanceAfter).toEqual(liquidityTokenBalanceBefore.sub(amount));
      });

      describe('When there are wrapped tokens', () => {
        let wrappedAmount: BigNumber;
        beforeEach(async () => {
          wrappedAmount = ONE_TOKEN.mul(25);
          await wait(blockchainProvider.approveLiquidityTokensToService(service1Address, wrappedAmount));
          await wait(blockchainProvider.wrap(service1Address, wrappedAmount));
        });

        it('retrieves power token balance for account', async () => {
          await expect(blockchainProvider.getPowerTokenBalance(service1Address)).resolves.toEqual(wrappedAmount);
          await expect(blockchainProvider.getPowerTokenAvailableBalance(service1Address)).resolves.toEqual(
            wrappedAmount,
          );
        });

        it('allows to unwrap power tokens to get liquidity tokens', async () => {
          const liquidityTokenBalanceBefore = await liquidityToken.balanceOf(deployerSigner.address);
          const powerTokenBalanceBefore = await blockchainProvider.getTokenBalance(
            service1Address,
            deployerSigner.address,
          );
          await wait(blockchainProvider.unwrap(service1Address, wrappedAmount));
          const liquidityTokenBalanceAfter = await liquidityToken.balanceOf(deployerSigner.address);
          const powerTokenBalanceAfter = await blockchainProvider.getTokenBalance(
            service1Address,
            deployerSigner.address,
          );

          expect(powerTokenBalanceAfter).toEqual(powerTokenBalanceBefore.sub(wrappedAmount));
          expect(liquidityTokenBalanceAfter).toEqual(liquidityTokenBalanceBefore.add(wrappedAmount));
        });
      });

      describe('When there is a liquidity provider', () => {
        let liquidityProvider: Awaited<ReturnType<typeof ethers.getNamedSigner>>;
        let lpBlockchainProvider: EIP155BlockchainProvider;

        beforeEach(async () => {
          liquidityProvider = await ethers.getNamedSigner('liquidityProvider');
          // allocate tokens to liquidity provider
          await liquidityToken.transfer(liquidityProvider.address, ONE_TOKEN.mul(10000));
          lpBlockchainProvider = new EIP155BlockchainProvider({ signer: liquidityProvider });
        });

        it('allows to approve liquidity tokens to enterprise', async () => {
          await wait(lpBlockchainProvider.approveLiquidityTokensToEnterprise(enterprise.address, ONE_TOKEN));
          const allowance = await liquidityToken.allowance(liquidityProvider.address, enterprise.address);
          expect(allowance).toEqual(ONE_TOKEN);
        });

        it('retrieves liquidity token allowance to enterprise', async () => {
          await wait(lpBlockchainProvider.approveLiquidityTokensToEnterprise(enterprise.address, ONE_TOKEN));
          const allowance = await lpBlockchainProvider.getLiquidityTokenEnterpriseAllowance(enterprise.address);
          expect(allowance).toEqual(ONE_TOKEN);
        });

        it('allows to add liquidity', async () => {
          await wait(lpBlockchainProvider.approveLiquidityTokensToEnterprise(enterprise.address, ONE_TOKEN.mul(100)));
          const receipt = await wait(lpBlockchainProvider.addLiquidity(enterprise.address, ONE_TOKEN.mul(100)));
          expect(receipt.status).toBe(1);
        });

        describe('When liquidity is added', () => {
          beforeEach(async () => {
            await wait(
              lpBlockchainProvider.approveLiquidityTokensToEnterprise(enterprise.address, ONE_TOKEN.mul(2000)),
            );
            await wait(lpBlockchainProvider.addLiquidity(enterprise.address, ONE_TOKEN.mul(1000)));
            await wait(lpBlockchainProvider.addLiquidity(enterprise.address, ONE_TOKEN.mul(800)));
          });

          it('retrieves a list of interest tokens', async () => {
            const interestTokenIds = await lpBlockchainProvider.getInterestTokenIds(enterprise.address);
            expect(interestTokenIds).toHaveLength(2);
          });

          it('retrieves liquidity info by interest token ID', async () => {
            const [tokenId] = await lpBlockchainProvider.getInterestTokenIds(enterprise.address);
            const liquidityInfo = await lpBlockchainProvider.getLiquidityInfo(enterprise.address, tokenId);
            expect(Object.keys(liquidityInfo)).toEqual(
              expect.arrayContaining(<Array<keyof LiquidityInfo>>['tokenId', 'amount', 'shares', 'block']),
            );
            expect(liquidityInfo).toMatchObject(<LiquidityInfo>{
              tokenId,
              amount: ONE_TOKEN.mul(1000),
              shares: ONE_SHARE.mul(1000),
            });
          });

          it('allows to increase liquidity', async () => {
            const [tokenId] = await lpBlockchainProvider.getInterestTokenIds(enterprise.address);
            await wait(lpBlockchainProvider.increaseLiquidity(enterprise.address, tokenId, ONE_TOKEN.mul(200)));
            const liquidityInfo = await lpBlockchainProvider.getLiquidityInfo(enterprise.address, tokenId);
            expect(liquidityInfo).toMatchObject(<LiquidityInfo>{
              tokenId,
              amount: ONE_TOKEN.mul(1200),
              shares: ONE_SHARE.mul(1200),
            });
          });

          it('allows to decrease liquidity', async () => {
            const [tokenId] = await lpBlockchainProvider.getInterestTokenIds(enterprise.address);
            await wait(lpBlockchainProvider.decreaseLiquidity(enterprise.address, tokenId, ONE_TOKEN.mul(500)));
            const liquidityInfo = await lpBlockchainProvider.getLiquidityInfo(enterprise.address, tokenId);
            expect(liquidityInfo).toMatchObject(<LiquidityInfo>{
              tokenId,
              amount: ONE_TOKEN.mul(500),
              shares: ONE_SHARE.mul(500),
            });
          });

          it('allows to remove liquidity', async () => {
            const [tokenId] = await lpBlockchainProvider.getInterestTokenIds(enterprise.address);
            await wait(lpBlockchainProvider.removeLiquidity(enterprise.address, tokenId));
            const interestTokenIds = await lpBlockchainProvider.getInterestTokenIds(enterprise.address);
            expect(interestTokenIds).toHaveLength(1);
            await expect(lpBlockchainProvider.getLiquidityInfo(enterprise.address, tokenId)).rejects.toThrow();
          });

          describe('When there is a borrower', () => {
            let borrower: Awaited<ReturnType<typeof ethers.getNamedSigner>>;
            let borrowerBlockchainProvider: EIP155BlockchainProvider;

            beforeEach(async () => {
              borrower = await ethers.getNamedSigner('borrower');
              // allocate tokens to borrower, so that he is able to loan fee
              await liquidityToken.transfer(borrower.address, ONE_TOKEN.mul(500));
              // Create borrower blockchain provider
              borrowerBlockchainProvider = new EIP155BlockchainProvider({ signer: borrower });
            });

            it('allows to estimates a loan via enterprise', async () => {
              const estimate = await borrowerBlockchainProvider.estimateLoan(
                enterprise.address,
                service1Address,
                liquidityToken.address,
                ONE_TOKEN.mul(1000),
                10 * ONE_DAY,
              );

              expect(estimate).toEqual(BigNumber.from('435295774647884690054')); // ~435 tokens
            });

            it('allows to get loan estimation breakdown via service', async () => {
              const { interest, gcFee, serviceFee } = await borrowerBlockchainProvider.estimateLoanDetailed(
                service1Address,
                liquidityToken.address,
                ONE_TOKEN.mul(1000),
                10 * ONE_DAY,
              );

              expect(interest).toEqual(BigNumber.from('413957746478870734661'));
              expect(gcFee).toEqual(BigNumber.from('8535211267605582157'));
              expect(serviceFee).toEqual(BigNumber.from('12802816901408373236'));
            });

            it('allows to borrow power tokens', async () => {
              const powerTokenBalanceBefore = await borrowerBlockchainProvider.getTokenBalance(service1Address);
              const loanAmount = ONE_TOKEN.mul(1000);
              await estimateAndBorrow(
                borrowerBlockchainProvider,
                enterprise.address,
                service1Address,
                liquidityToken.address,
                ONE_TOKEN.mul(1000),
                10 * ONE_DAY,
              );

              const powerTokenBalanceAfter = await borrowerBlockchainProvider.getTokenBalance(service1Address);
              expect(powerTokenBalanceAfter).toEqual(powerTokenBalanceBefore.add(loanAmount));
            });

            describe('When loans are taken', () => {
              beforeEach(async () => {
                await estimateAndBorrow(
                  borrowerBlockchainProvider,
                  enterprise.address,
                  service1Address,
                  liquidityToken.address,
                  ONE_TOKEN.mul(100),
                  10 * ONE_DAY,
                );

                await estimateAndBorrow(
                  borrowerBlockchainProvider,
                  enterprise.address,
                  service1Address,
                  liquidityToken.address,
                  ONE_TOKEN.mul(200),
                  5 * ONE_DAY,
                );
              });

              it('retrieves power token balance for account', async () => {
                await expect(borrowerBlockchainProvider.getPowerTokenBalance(service1Address)).resolves.toEqual(
                  ONE_TOKEN.mul(300),
                );
                await expect(
                  borrowerBlockchainProvider.getPowerTokenAvailableBalance(service1Address),
                ).resolves.toEqual(BigNumber.from(0)); // must be zero since all amount came from borrowing
              });

              it('retrieves energy cap value at the specific time', async () => {
                const energyCap = await borrowerBlockchainProvider.getEnergyAt(
                  service1Address,
                  Math.floor(Date.now() / 1000) + ONE_HOUR,
                );
                expect(energyCap.toBigInt()).toBeGreaterThan(0n);
              });

              it('retrieves a list of borrow tokens', async () => {
                const borrowTokenIds = await borrowerBlockchainProvider.getBorrowTokenIds(enterprise.address);
                expect(borrowTokenIds).toHaveLength(2);
              });

              it('retrieves loan info by borrow token ID', async () => {
                const [tokenId] = await borrowerBlockchainProvider.getBorrowTokenIds(enterprise.address);
                const loanInfo = await borrowerBlockchainProvider.getLoanInfo(enterprise.address, tokenId);

                expect(loanInfo.tokenId).toEqual(tokenId);
                expect(Object.keys(loanInfo)).toEqual(
                  expect.arrayContaining(<Array<keyof LoanInfo>>[
                    'tokenId',
                    'amount',
                    'powerTokenIndex',
                    'borrowingTime',
                    'maturityTime',
                    'borrowerReturnGraceTime',
                    'enterpriseCollectGraceTime',
                    'gcFee',
                    'gcFeeTokenIndex',
                  ]),
                );
              });

              it('retrieves liquidity provider accrued interest', async () => {
                const [tokenId] = await lpBlockchainProvider.getInterestTokenIds(enterprise.address);
                const interest = await blockchainProvider.getAccruedInterest(enterprise.address, tokenId);
                expect(interest.gt(0)).toBeTruthy();
              });

              it('allows liquidity provider to withdraw accrued interest', async () => {
                const [tokenId] = await lpBlockchainProvider.getInterestTokenIds(enterprise.address);
                const liquidityTokenBalanceBefore = await lpBlockchainProvider.getTokenBalance(liquidityToken.address);

                await waitBlockchainTime(ONE_DAY);
                const interest = await lpBlockchainProvider.getAccruedInterest(enterprise.address, tokenId);
                await wait(lpBlockchainProvider.withdrawInterest(enterprise.address, tokenId));
                const liquidityTokenBalanceAfter = await lpBlockchainProvider.getTokenBalance(liquidityToken.address);

                expect(
                  Number(formatUnits(liquidityTokenBalanceAfter.sub(liquidityTokenBalanceBefore.add(interest)))),
                ).toBeCloseTo(0, 3);
              });

              it('allows to return a loan', async () => {
                const services = await borrowerBlockchainProvider.getServices(enterprise.address);
                const [tokenId] = await borrowerBlockchainProvider.getBorrowTokenIds(enterprise.address);
                const loanInfo = await borrowerBlockchainProvider.getLoanInfo(enterprise.address, tokenId);
                const liquidityTokenBalanceBefore = await borrowerBlockchainProvider.getTokenBalance(
                  liquidityToken.address,
                );
                const powerTokenBalanceBefore = await borrowerBlockchainProvider.getTokenBalance(
                  services[loanInfo.powerTokenIndex],
                );

                await wait(borrowerBlockchainProvider.returnLoan(enterprise.address, tokenId));
                const liquidityTokenBalanceAfter = await borrowerBlockchainProvider.getTokenBalance(
                  liquidityToken.address,
                );
                const powerTokenBalanceAfter = await borrowerBlockchainProvider.getTokenBalance(
                  services[loanInfo.powerTokenIndex],
                );

                expect(powerTokenBalanceAfter).toEqual(powerTokenBalanceBefore.sub(loanInfo.amount));
                expect(liquidityTokenBalanceAfter).toEqual(liquidityTokenBalanceBefore.add(loanInfo.gcFee));
              });
            });
          });
        });
      });
    });
  });
});
