import { deployments, ethers } from 'hardhat';
import 'hardhat-deploy-ethers';
import { formatUnits, parseEther } from 'ethers/lib/utils';
import { EIP155BlockchainProvider } from '../../src';
import { baseRate, estimateAndBorrow, getEnterprise, getPowerToken, wait, waitBlockchainTime } from './utils';
import { DefaultConverter, Enterprise, EnterpriseFactory, ERC20Mock } from '../../types/contracts';
import {
  AccountState,
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
    enterpriseFactory = (await ethers.getContract('EnterpriseFactory')) as EnterpriseFactory;
    liquidityToken = (await ethers.getContract('ERC20Mock')) as ERC20Mock;
    converter = (await ethers.getContract('DefaultConverter')) as DefaultConverter;
    blockchainProvider = new EIP155BlockchainProvider({
      signer: deployerSigner,
      contracts: {
        enterpriseFactory: enterpriseFactory.address,
      },
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
    const receipt = await wait(blockchainProvider.deployEnterprise(baseEnterpriseParams));
    expect(receipt.status).toBe(1);
  });

  it('returns correct CAIP-2 chain ID', async () => {
    const chainId = await blockchainProvider.getChainId();
    expect(chainId.toString()).toEqual(`eip155:${await deployerSigner.getChainId()}`);
  });

  it('retrieves an arbitrary token balance', async () => {
    const balance = await blockchainProvider.getTokenBalance(liquidityToken.address);
    expect(balance).toEqual(parseEther('1000000000'));
  });

  describe('When enterprise deployed', () => {
    let enterprise: Enterprise;
    let expectedEnterpriseData: EnterpriseInfo;

    beforeEach(async () => {
      const receipt = await wait(blockchainProvider.deployEnterprise(baseEnterpriseParams));
      enterprise = await getEnterprise(enterpriseFactory, receipt.blockNumber);

      expectedEnterpriseData = {
        address: enterprise.address,
        name: baseEnterpriseParams.name,
        baseUri: baseEnterpriseParams.baseUri,
        totalShares: BigNumber.from(0),
        interestGapHalvingPeriod: 4 * ONE_HOUR,
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

    it('registers new services', async () => {
      const receipt = await wait(blockchainProvider.registerService(enterprise.address, baseServiceParams));
      expect(receipt.status).toBe(1);
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

    describe('When enterprise has registered services', () => {
      let expectedServiceData1: ServiceInfo;
      let expectedServiceData2: ServiceInfo;

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
        const service1Address = (await getPowerToken(enterprise, r1.blockNumber)).address;
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
        const service2Address = (await getPowerToken(enterprise, r2.blockNumber)).address;
        expectedServiceData2 = {
          ...baseExpectedServiceData,
          address: service2Address,
          name: serviceParams2.name,
          symbol: `${liquidityTokenSymbol} ${serviceParams2.symbol}`,
          index: 1,
        };
      });

      it('lists enterprise services', async () => {
        const services = await blockchainProvider.getServices(enterprise.address);
        expect(services).toHaveLength(2);

        expect(services[0]).toEqual(expectedServiceData1.address);
        expect(services[1]).toEqual(expectedServiceData2.address);
      });

      it('retrieves the service data', async () => {
        const service = await blockchainProvider.getServiceInfo(expectedServiceData2.address);
        expect(service).toMatchObject(expectedServiceData2);
      });

      it('retrieves account state for specific service', async () => {
        const accountAddress = await deployerSigner.getAddress();
        const serviceAddress = expectedServiceData1.address;

        const accountState = await blockchainProvider.getAccountState(serviceAddress, accountAddress);
        expect(accountState).toMatchObject(<AccountState>{
          serviceAddress,
          accountAddress,
          balance: BigNumber.from(0),
          energy: BigNumber.from(0),
          timestamp: 0,
        });
      });

      describe('When there is a liquidity provider', () => {
        let liquidityProvider: Awaited<ReturnType<typeof ethers.getNamedSigner>>;
        let lpBlockchainProvider: EIP155BlockchainProvider;

        beforeEach(async () => {
          liquidityProvider = await ethers.getNamedSigner('liquidityProvider');
          // allocate tokens to liquidity provider
          await liquidityToken.transfer(liquidityProvider.address, ONE_TOKEN.mul(10000));
          // eslint-disable-next-line require-atomic-updates
          lpBlockchainProvider = await blockchainProvider.connect(liquidityProvider);
        });

        it('allows to approve liquidity tokens to enterprise', async () => {
          await wait(lpBlockchainProvider.setLiquidityAllowance(enterprise.address, ONE_TOKEN));
          const allowance = await liquidityToken.allowance(liquidityProvider.address, enterprise.address);
          expect(allowance).toEqual(ONE_TOKEN);
        });

        it('retrieves liquidity token allowance', async () => {
          await wait(lpBlockchainProvider.setLiquidityAllowance(enterprise.address, ONE_TOKEN));
          const allowance = await lpBlockchainProvider.getLiquidityAllowance(enterprise.address);
          expect(allowance).toEqual(ONE_TOKEN);
        });

        it('allows to add liquidity', async () => {
          await wait(lpBlockchainProvider.setLiquidityAllowance(enterprise.address, ONE_TOKEN.mul(100)));
          const receipt = await wait(lpBlockchainProvider.addLiquidity(enterprise.address, ONE_TOKEN.mul(100)));
          expect(receipt.status).toBe(1);
        });

        describe('When liquidity is added', () => {
          beforeEach(async () => {
            await wait(lpBlockchainProvider.setLiquidityAllowance(enterprise.address, ONE_TOKEN.mul(2000)));
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
              borrowerBlockchainProvider = await blockchainProvider.connect(borrower);
            });

            it('estimates a loan', async () => {
              const [serviceAddress] = await borrowerBlockchainProvider.getServices(enterprise.address);
              const estimate = await borrowerBlockchainProvider.estimateLoan(
                enterprise.address,
                serviceAddress,
                liquidityToken.address,
                ONE_TOKEN.mul(1000),
                10 * ONE_DAY,
              );
              expect(estimate).toEqual(BigNumber.from('446760563380279107897')); // ~446 tokens
            });

            it('allows to borrow power tokens', async () => {
              const [serviceAddress] = await borrowerBlockchainProvider.getServices(enterprise.address);
              const powerTokenBalanceBefore = await borrowerBlockchainProvider.getTokenBalance(serviceAddress);
              const loanAmount = ONE_TOKEN.mul(1000);
              await estimateAndBorrow(
                borrowerBlockchainProvider,
                enterprise.address,
                serviceAddress,
                liquidityToken.address,
                ONE_TOKEN.mul(1000),
                10 * ONE_DAY,
              );

              const powerTokenBalanceAfter = await borrowerBlockchainProvider.getTokenBalance(serviceAddress);
              expect(powerTokenBalanceAfter).toEqual(powerTokenBalanceBefore.add(loanAmount));
            });

            describe('When loans are taken', () => {
              beforeEach(async () => {
                const [serviceAddress] = await borrowerBlockchainProvider.getServices(enterprise.address);

                await estimateAndBorrow(
                  borrowerBlockchainProvider,
                  enterprise.address,
                  serviceAddress,
                  liquidityToken.address,
                  ONE_TOKEN.mul(100),
                  10 * ONE_DAY,
                );

                await estimateAndBorrow(
                  borrowerBlockchainProvider,
                  enterprise.address,
                  serviceAddress,
                  liquidityToken.address,
                  ONE_TOKEN.mul(200),
                  5 * ONE_DAY,
                );
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
