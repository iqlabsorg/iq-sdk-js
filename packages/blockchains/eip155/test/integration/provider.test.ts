import { deployments, ethers } from 'hardhat';
import 'hardhat-deploy-ethers';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import { EIP155BlockchainProvider } from '../../src';
import { baseRate, estimateAndRent, getEnterprise, getPowerToken, wait, waitBlockchainTime } from './utils';
import { DefaultConverter, Enterprise, EnterpriseFactory, ERC20Mock } from '../../src/contracts';
import {
  AccountState,
  Address,
  BigNumber,
  EnterpriseInfo,
  EnterpriseParams,
  ERC20Metadata,
  RentalAgreement,
  ServiceInfo,
  ServiceParams,
  Stake,
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
  let enterpriseToken: ERC20Mock;
  let enterpriseFactory: EnterpriseFactory;
  let converter: DefaultConverter;

  let baseEnterpriseParams: EnterpriseParams;
  let baseServiceParams: ServiceParams;

  beforeEach(async () => {
    await deployments.fixture();
    deployerSigner = await ethers.getNamedSigner('deployer');
    enterpriseFactory = await ethers.getContract('EnterpriseFactory');
    enterpriseToken = await ethers.getContract('ERC20Mock');
    converter = await ethers.getContract('DefaultConverter');
    blockchainProvider = new EIP155BlockchainProvider({
      signer: deployerSigner,
    });

    baseEnterpriseParams = {
      name: 'Test Enterprise',
      baseUri: 'https://iq.space',
      gcFeePercent: 2 * ONE_PERCENT,
      enterpriseTokenAddress: enterpriseToken.address,
      converterAddress: converter.address,
    };

    baseServiceParams = {
      serviceName: 'Test Service',
      serviceSymbol: 'IQPT',
      energyGapHalvingPeriod: GAP_HALVING_PERIOD,
      baseRate: BASE_RATE,
      baseToken: enterpriseToken.address,
      serviceFeePercent: 3 * ONE_PERCENT,
      minRentalPeriod: 12 * ONE_HOUR,
      maxRentalPeriod: 60 * ONE_DAY,
      minGCFee: ONE_TOKEN,
      swappingEnabledForever: true,
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
    let balance = await blockchainProvider.getTokenBalance(enterpriseToken.address);
    expect(balance).toEqual(parseUnits('1000000000'));

    // use arbitrary address
    balance = await blockchainProvider.getTokenBalance(
      enterpriseToken.address,
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
        streamingReserveHalvingPeriod: 7 * ONE_DAY,
        renterOnlyReturnPeriod: 12 * ONE_HOUR,
        enterpriseOnlyCollectionPeriod: ONE_DAY,
        gcFeePercent: 2 * ONE_PERCENT,
        fixedReserve: BigNumber.from(0),
        usedReserve: BigNumber.from(0),
        streamingReserve: BigNumber.from(0),
        streamingReserveTarget: BigNumber.from(0),
        streamingReserveUpdated: 0,
      };
    });

    it('retrieves enterprise data', async () => {
      const data = await blockchainProvider.enterprise(enterprise.address).getInfo();
      expect(data).toStrictEqual(expectedEnterpriseData);
    });

    it('retrieves enterprise enterprise token metadata', async () => {
      const metadata = await blockchainProvider.getEnterpriseTokenMetadata(enterprise.address);
      expect(metadata).toEqual(<ERC20Metadata>{
        address: enterpriseToken.address,
        name: 'Testing',
        symbol: 'TST',
        decimals: 18,
      });
    });

    it('registers new services', async () => {
      const receipt = await wait(blockchainProvider.enterprise(enterprise.address).registerService(baseServiceParams));
      expect(receipt.status).toBe(1);
    });

    it('allows to set a collector address', async () => {
      const collector = '0x17CdaD42F88fcecF77F53467B3c15613e8063adD';
      await wait(blockchainProvider.enterprise(enterprise.address).setEnterpriseCollectorAddress(collector));
      await expect(blockchainProvider.enterprise(enterprise.address).getEnterpriseCollectorAddress()).resolves.toEqual(
        collector,
      );
    });

    it('allows to set an enterprise wallet address', async () => {
      const wallet = '0x1E60bE47921E15FBc9e9246daC71F771d4b78a6c';
      await wait(blockchainProvider.enterprise(enterprise.address).setEnterpriseWalletAddress(wallet));
      await expect(blockchainProvider.enterprise(enterprise.address).getEnterpriseWalletAddress()).resolves.toEqual(
        wallet,
      );
    });

    it('allows to set a converter address', async () => {
      const converter = '0x312D566FABE323BA574fFf724d29c08F46b746b0';
      await wait(blockchainProvider.enterprise(enterprise.address).setConverterAddress(converter));
      await expect(blockchainProvider.enterprise(enterprise.address).getConverterAddress()).resolves.toEqual(converter);
    });

    it('allows to set a bonding curve', async () => {
      await wait(blockchainProvider.enterprise(enterprise.address).setBondingCurve(10, 5));
      await expect(blockchainProvider.enterprise(enterprise.address).getBondingCurve()).resolves.toEqual({
        pole: BigNumber.from(10),
        slope: BigNumber.from(5),
      });
    });

    it('allows to set a renter only return period', async () => {
      const period = 3 * ONE_HOUR;
      await wait(blockchainProvider.enterprise(enterprise.address).setRenterOnlyReturnPeriod(period));
      await expect(blockchainProvider.enterprise(enterprise.address).getRenterOnlyReturnPeriod()).resolves.toEqual(
        period,
      );
    });

    it('allows to set a collector only period', async () => {
      const period = 14 * ONE_HOUR;
      await wait(blockchainProvider.enterprise(enterprise.address).setEnterpriseOnlyCollectionPeriod(period));
      await expect(
        blockchainProvider.enterprise(enterprise.address).getEnterpriseOnlyCollectionPeriod(),
      ).resolves.toEqual(period);
    });

    it('allows to set enterprise base URI', async () => {
      const uri = 'https://iq.space';
      await wait(blockchainProvider.enterprise(enterprise.address).setBaseUri(uri));
      await expect(blockchainProvider.enterprise(enterprise.address).getBaseUri()).resolves.toEqual(uri);
    });

    it('allows to set streaming reserve halving period', async () => {
      const period = 6 * ONE_HOUR;
      await wait(blockchainProvider.enterprise(enterprise.address).setStreamingReserveHalvingPeriod(period));
      await expect(
        blockchainProvider.enterprise(enterprise.address).getStreamingReserveHalvingPeriod(),
      ).resolves.toEqual(period);
    });

    it('allows to set GC fee percent', async () => {
      const percent = 200; // 2%
      await wait(blockchainProvider.enterprise(enterprise.address).setGcFeePercent(percent));
      await expect(blockchainProvider.enterprise(enterprise.address).getGCFeePercent()).resolves.toEqual(percent);
    });

    describe('When enterprise has registered services', () => {
      let service1Address: Address;
      let service2Address: Address;
      let expectedServiceData1: ServiceInfo;

      beforeEach(async () => {
        const enterpriseTokenSymbol = await enterpriseToken.symbol();
        const baseExpectedServiceData: Omit<ServiceInfo, 'address' | 'name' | 'symbol' | 'index'> = {
          energyGapHalvingPeriod: GAP_HALVING_PERIOD,
          baseRate: BASE_RATE,
          baseToken: enterpriseToken.address,
          serviceFeePercent: 3 * ONE_PERCENT,
          minRentalPeriod: 12 * ONE_HOUR,
          maxRentalPeriod: 60 * ONE_DAY,
          minGCFee: ONE_TOKEN,
          swappingEnabled: true,
          transferEnabled: false,
        };

        // register first service
        const serviceParams1 = <ServiceParams>{
          ...baseServiceParams,
          serviceName: 'Test Service 1',
          serviceSymbol: 'IQPT1',
        };
        const r1 = await wait(blockchainProvider.enterprise(enterprise.address).registerService(serviceParams1));
        service1Address = (await getPowerToken(enterprise, r1.blockNumber)).address;
        expectedServiceData1 = <ServiceInfo>{
          ...baseExpectedServiceData,
          address: service1Address,
          name: serviceParams1.serviceName,
          symbol: `${enterpriseTokenSymbol} ${serviceParams1.serviceSymbol}`,
          index: 0,
        };

        // register second service
        const serviceParams2 = <ServiceParams>{
          ...baseServiceParams,
          serviceName: 'Test Service 2',
          serviceSymbol: 'IQPT2',
        };
        const r2 = await wait(blockchainProvider.enterprise(enterprise.address).registerService(serviceParams2));
        service2Address = (await getPowerToken(enterprise, r2.blockNumber)).address;
      });

      it('lists enterprise services', async () => {
        const services = await blockchainProvider.enterprise(enterprise.address).getServiceAddresses();
        expect(services).toHaveLength(2);

        expect(services[0]).toEqual(service1Address);
        expect(services[1]).toEqual(service2Address);
      });

      it('retrieves the service information', async () => {
        const service = await blockchainProvider.service(service1Address).getInfo();
        expect(service).toStrictEqual(expectedServiceData1);
      });

      it('retrieves account state for specific service', async () => {
        const accountAddress = '0x6F5E1207671091337abA2F2cda040EB16E757092';
        const serviceAddress = service1Address;

        const expectedState: AccountState = {
          serviceAddress,
          accountAddress,
          balance: BigNumber.from(0),
          lockedBalance: BigNumber.from(0),
          energy: BigNumber.from(0),
          timestamp: 0,
        };

        let accountState = await blockchainProvider.service(serviceAddress).getAccountState(accountAddress);
        expect(accountState).toStrictEqual(expectedState);

        // check fallback to signer address
        accountState = await blockchainProvider.service(serviceAddress).getAccountState();
        expect(accountState).toStrictEqual({ ...expectedState, accountAddress: deployerSigner.address });
      });

      it('retrieves the service energy gap halving period', async () => {
        await expect(blockchainProvider.service(service1Address).getEnergyGapHalvingPeriod()).resolves.toEqual(
          expectedServiceData1.energyGapHalvingPeriod,
        );
      });

      it('retrieves the service index', async () => {
        await expect(blockchainProvider.service(service1Address).getIndex()).resolves.toEqual(
          expectedServiceData1.index,
        );
      });

      it('retrieves the service fee percent', async () => {
        await expect(blockchainProvider.service(service1Address).getServiceFeePercent()).resolves.toEqual(
          expectedServiceData1.serviceFeePercent,
        );
      });

      it('retrieves the swapping flag', async () => {
        await expect(blockchainProvider.service(service1Address).isSwappingEnabled()).resolves.toEqual(
          expectedServiceData1.swappingEnabled,
        );
      });

      it('allows to set service base rate', async () => {
        const baseRate = BigNumber.from(10);
        const baseToken = '0xBC7024d93ae7db4a60E0720c09127A49477aea80';
        const minGCFee = BigNumber.from(2);
        await wait(blockchainProvider.service(service1Address).setBaseRate(baseRate, baseToken, minGCFee));
        await expect(blockchainProvider.service(service1Address).getBaseRate()).resolves.toEqual(baseRate);
        await expect(blockchainProvider.service(service1Address).getBaseTokenAddress()).resolves.toEqual(baseToken);
        await expect(blockchainProvider.service(service1Address).getMinGCFee()).resolves.toEqual(minGCFee);
      });

      it('allows to set service fee percent', async () => {
        const feePercent = ONE_PERCENT * 12;
        await wait(blockchainProvider.service(service1Address).setServiceFeePercent(feePercent));
        await expect(blockchainProvider.service(service1Address).getServiceFeePercent()).resolves.toEqual(feePercent);
      });

      it('allows to set rental period limits', async () => {
        const minRentalPeriod = 8 * ONE_HOUR;
        const maxRentalPeriod = 10 * ONE_DAY;
        await wait(blockchainProvider.service(service1Address).setRentalPeriodLimits(minRentalPeriod, maxRentalPeriod));
        await expect(blockchainProvider.service(service1Address).getMinRentalPeriod()).resolves.toEqual(
          minRentalPeriod,
        );
        await expect(blockchainProvider.service(service1Address).getMaxRentalPeriod()).resolves.toEqual(
          maxRentalPeriod,
        );
      });

      it('allows to approve enterprise tokens to a service', async () => {
        await wait(blockchainProvider.service(service1Address).setEnterpriseTokenAllowance(ONE_TOKEN));
        const allowance = await enterpriseToken.allowance(deployerSigner.address, service1Address);
        expect(allowance).toEqual(ONE_TOKEN);
      });

      it('retrieves enterprise token allowance to service', async () => {
        await wait(blockchainProvider.service(service1Address).setEnterpriseTokenAllowance(ONE_TOKEN));
        const allowance = await blockchainProvider.service(service1Address).getEnterpriseTokenAllowance();
        expect(allowance).toEqual(ONE_TOKEN);
      });

      it('allows to swap enterprise tokens to get power tokens', async () => {
        const amount = ONE_TOKEN.mul(15);
        const enterpriseTokenBalanceBefore = await enterpriseToken.balanceOf(deployerSigner.address);
        const powerTokenBalanceBefore = await blockchainProvider.getTokenBalance(
          service1Address,
          deployerSigner.address,
        );
        await wait(blockchainProvider.service(service1Address).setEnterpriseTokenAllowance(amount));
        await wait(blockchainProvider.service(service1Address).swapIn(amount));
        const enterpriseTokenBalanceAfter = await enterpriseToken.balanceOf(deployerSigner.address);
        const powerTokenBalanceAfter = await blockchainProvider.getTokenBalance(
          service1Address,
          deployerSigner.address,
        );
        expect(powerTokenBalanceBefore).toEqual(BigNumber.from(0));
        expect(powerTokenBalanceAfter).toEqual(amount);
        expect(enterpriseTokenBalanceAfter).toEqual(enterpriseTokenBalanceBefore.sub(amount));
      });

      describe('When there are swapped tokens', () => {
        let swappedAmount: BigNumber;
        beforeEach(async () => {
          swappedAmount = ONE_TOKEN.mul(25);
          await wait(blockchainProvider.service(service1Address).setEnterpriseTokenAllowance(swappedAmount));
          await wait(blockchainProvider.service(service1Address).swapIn(swappedAmount));
        });

        it('retrieves power token balance for account', async () => {
          await expect(blockchainProvider.service(service1Address).getBalance()).resolves.toEqual(swappedAmount);
          await expect(blockchainProvider.service(service1Address).getAvailableBalance()).resolves.toEqual(
            swappedAmount,
          );
        });

        it('allows to swap power tokens back to get enterprise tokens', async () => {
          const enterpriseTokenBalanceBefore = await enterpriseToken.balanceOf(deployerSigner.address);
          const powerTokenBalanceBefore = await blockchainProvider.getTokenBalance(
            service1Address,
            deployerSigner.address,
          );
          await wait(blockchainProvider.service(service1Address).swapOut(swappedAmount));
          const enterpriseTokenBalanceAfter = await enterpriseToken.balanceOf(deployerSigner.address);
          const powerTokenBalanceAfter = await blockchainProvider.getTokenBalance(
            service1Address,
            deployerSigner.address,
          );

          expect(powerTokenBalanceAfter).toEqual(powerTokenBalanceBefore.sub(swappedAmount));
          expect(enterpriseTokenBalanceAfter).toEqual(enterpriseTokenBalanceBefore.add(swappedAmount));
        });
      });

      describe('When there is a staker', () => {
        let staker: Awaited<ReturnType<typeof ethers.getNamedSigner>>;
        let stakerBlockchainProvider: EIP155BlockchainProvider;

        beforeEach(async () => {
          staker = await ethers.getNamedSigner('staker');
          // allocate tokens to staker
          await enterpriseToken.transfer(staker.address, ONE_TOKEN.mul(10000));
          stakerBlockchainProvider = new EIP155BlockchainProvider({ signer: staker });
        });

        it('allows to approve enterprise tokens to enterprise', async () => {
          await wait(stakerBlockchainProvider.enterprise(enterprise.address).setEnterpriseTokenAllowance(ONE_TOKEN));
          const allowance = await enterpriseToken.allowance(staker.address, enterprise.address);
          expect(allowance).toEqual(ONE_TOKEN);
        });

        it('retrieves enterprise token allowance to enterprise', async () => {
          await wait(stakerBlockchainProvider.enterprise(enterprise.address).setEnterpriseTokenAllowance(ONE_TOKEN));
          const allowance = await stakerBlockchainProvider.enterprise(enterprise.address).getEnterpriseTokenAllowance();
          expect(allowance).toEqual(ONE_TOKEN);
        });

        it('allows to stake', async () => {
          await wait(
            stakerBlockchainProvider.enterprise(enterprise.address).setEnterpriseTokenAllowance(ONE_TOKEN.mul(100)),
          );
          const receipt = await wait(stakerBlockchainProvider.enterprise(enterprise.address).stake(ONE_TOKEN.mul(100)));
          expect(receipt.status).toBe(1);
        });

        describe('When staked', () => {
          beforeEach(async () => {
            await wait(
              stakerBlockchainProvider.enterprise(enterprise.address).setEnterpriseTokenAllowance(ONE_TOKEN.mul(2000)),
            );
            await wait(stakerBlockchainProvider.enterprise(enterprise.address).stake(ONE_TOKEN.mul(1000)));
            await wait(stakerBlockchainProvider.enterprise(enterprise.address).stake(ONE_TOKEN.mul(800)));
          });

          it('retrieves a list of stake tokens', async () => {
            const stakeTokenIds = await stakerBlockchainProvider.enterprise(enterprise.address).getStakeTokenIds();
            expect(stakeTokenIds).toHaveLength(2);
          });

          it('retrieves stake info by stake token ID', async () => {
            const [tokenId] = await stakerBlockchainProvider.enterprise(enterprise.address).getStakeTokenIds();
            const stake = await stakerBlockchainProvider.enterprise(enterprise.address).getStake(tokenId);
            expect(Object.keys(stake)).toEqual(
              expect.arrayContaining(<Array<keyof Stake>>['tokenId', 'amount', 'shares', 'block']),
            );
            expect(stake).toMatchObject(<Stake>{
              tokenId,
              amount: ONE_TOKEN.mul(1000),
              shares: ONE_SHARE.mul(1000),
            });
          });

          it('allows to increase stake', async () => {
            const [tokenId] = await stakerBlockchainProvider.enterprise(enterprise.address).getStakeTokenIds();
            await wait(
              stakerBlockchainProvider.enterprise(enterprise.address).increaseStake(tokenId, ONE_TOKEN.mul(200)),
            );
            const stake = await stakerBlockchainProvider.enterprise(enterprise.address).getStake(tokenId);
            expect(stake).toMatchObject(<Stake>{
              tokenId,
              amount: ONE_TOKEN.mul(1200),
              shares: ONE_SHARE.mul(1200),
            });
          });

          it('allows to decrease stake', async () => {
            const [tokenId] = await stakerBlockchainProvider.enterprise(enterprise.address).getStakeTokenIds();
            await wait(
              stakerBlockchainProvider.enterprise(enterprise.address).decreaseStake(tokenId, ONE_TOKEN.mul(500)),
            );
            const stake = await stakerBlockchainProvider.enterprise(enterprise.address).getStake(tokenId);
            expect(stake).toMatchObject(<Stake>{
              tokenId,
              amount: ONE_TOKEN.mul(500),
              shares: ONE_SHARE.mul(500),
            });
          });

          it('allows to unstake', async () => {
            const [tokenId] = await stakerBlockchainProvider.enterprise(enterprise.address).getStakeTokenIds();
            await wait(stakerBlockchainProvider.enterprise(enterprise.address).unstake(tokenId));
            const stakeTokenIds = await stakerBlockchainProvider.enterprise(enterprise.address).getStakeTokenIds();
            expect(stakeTokenIds).toHaveLength(1);
            await expect(stakerBlockchainProvider.enterprise(enterprise.address).getStake(tokenId)).rejects.toThrow();
          });

          describe('When there is renter', () => {
            let renter: Awaited<ReturnType<typeof ethers.getNamedSigner>>;
            let renterBlockchainProvider: EIP155BlockchainProvider;

            beforeEach(async () => {
              renter = await ethers.getNamedSigner('renter');
              // allocate tokens to renter, so that he is able to pay rental fee
              await enterpriseToken.transfer(renter.address, ONE_TOKEN.mul(500));
              // Create renter blockchain provider
              renterBlockchainProvider = new EIP155BlockchainProvider({ signer: renter });
            });

            it('allows to estimates rental fee via enterprise', async () => {
              const estimate = await renterBlockchainProvider
                .enterprise(enterprise.address)
                .estimateRentalFee(service1Address, enterpriseToken.address, ONE_TOKEN.mul(1000), 10 * ONE_DAY);

              expect(estimate).toEqual(BigNumber.from('435295774647884690054')); // ~435 tokens
            });

            it('allows to get rental fee estimation breakdown via service', async () => {
              const { poolFee, gcFee, serviceFee } = await renterBlockchainProvider
                .service(service1Address)
                .estimateRentalFee(enterpriseToken.address, ONE_TOKEN.mul(1000), 10 * ONE_DAY);

              expect(poolFee).toEqual(BigNumber.from('413957746478870734661'));
              expect(gcFee).toEqual(BigNumber.from('8535211267605582157'));
              expect(serviceFee).toEqual(BigNumber.from('12802816901408373236'));
            });

            it('allows to rent power tokens', async () => {
              const powerTokenBalanceBefore = await renterBlockchainProvider.getTokenBalance(service1Address);
              const rentalAmount = ONE_TOKEN.mul(1000);
              await estimateAndRent(
                renterBlockchainProvider,
                enterprise.address,
                service1Address,
                enterpriseToken.address,
                ONE_TOKEN.mul(1000),
                10 * ONE_DAY,
              );

              const powerTokenBalanceAfter = await renterBlockchainProvider.getTokenBalance(service1Address);
              expect(powerTokenBalanceAfter).toEqual(powerTokenBalanceBefore.add(rentalAmount));
            });

            describe('When power tokens are rented', () => {
              beforeEach(async () => {
                await estimateAndRent(
                  renterBlockchainProvider,
                  enterprise.address,
                  service1Address,
                  enterpriseToken.address,
                  ONE_TOKEN.mul(100),
                  10 * ONE_DAY,
                );

                await estimateAndRent(
                  renterBlockchainProvider,
                  enterprise.address,
                  service1Address,
                  enterpriseToken.address,
                  ONE_TOKEN.mul(200),
                  5 * ONE_DAY,
                );
              });

              it('retrieves power token balance for account', async () => {
                await expect(renterBlockchainProvider.service(service1Address).getBalance()).resolves.toEqual(
                  ONE_TOKEN.mul(300),
                );
                await expect(renterBlockchainProvider.service(service1Address).getAvailableBalance()).resolves.toEqual(
                  BigNumber.from(0),
                ); // must be zero since all amount came from renting
              });

              it('retrieves energy cap value at the specific time', async () => {
                const energyCap = await renterBlockchainProvider
                  .service(service1Address)
                  .getEnergyAt(Math.floor(Date.now() / 1000) + ONE_HOUR);
                expect(energyCap.toBigInt()).toBeGreaterThan(0n);
              });

              it('retrieves a list of rented tokens', async () => {
                const rentalTokenIds = await renterBlockchainProvider
                  .enterprise(enterprise.address)
                  .getRentalTokenIds();
                expect(rentalTokenIds).toHaveLength(2);
              });

              it('retrieves the rental agreement by rental token ID', async () => {
                const [tokenId] = await renterBlockchainProvider.enterprise(enterprise.address).getRentalTokenIds();
                const rentalAgreement = await renterBlockchainProvider
                  .enterprise(enterprise.address)
                  .getRentalAgreement(tokenId);

                expect(rentalAgreement.rentalTokenId).toEqual(tokenId);
                expect(Object.keys(rentalAgreement)).toEqual(
                  expect.arrayContaining(<Array<keyof RentalAgreement>>[
                    'rentalTokenId',
                    'rentalAmount',
                    'powerTokenIndex',
                    'startTime',
                    'endTime',
                    'renterOnlyReturnTime',
                    'enterpriseOnlyCollectionTime',
                    'gcRewardAmount',
                    'gcRewardTokenIndex',
                  ]),
                );
              });

              it('retrieves staking reward amount', async () => {
                const [tokenId] = await stakerBlockchainProvider.enterprise(enterprise.address).getStakeTokenIds();
                const reward = await blockchainProvider.enterprise(enterprise.address).getStakingReward(tokenId);
                expect(reward.gt(0)).toBeTruthy();
              });

              it('allows staker to claim staking reward', async () => {
                const [tokenId] = await stakerBlockchainProvider.enterprise(enterprise.address).getStakeTokenIds();
                const enterpriseTokenBalanceBefore = await stakerBlockchainProvider.getTokenBalance(
                  enterpriseToken.address,
                );

                await waitBlockchainTime(ONE_DAY);
                const rewardAmount = await stakerBlockchainProvider
                  .enterprise(enterprise.address)
                  .getStakingReward(tokenId);
                await wait(stakerBlockchainProvider.enterprise(enterprise.address).claimStakingReward(tokenId));
                const enterpriseTokenBalanceAfter = await stakerBlockchainProvider.getTokenBalance(
                  enterpriseToken.address,
                );

                expect(
                  Number(formatUnits(enterpriseTokenBalanceAfter.sub(enterpriseTokenBalanceBefore.add(rewardAmount)))),
                ).toBeCloseTo(0, 3);
              });

              it('allows to return a rental', async () => {
                const services = await renterBlockchainProvider.enterprise(enterprise.address).getServiceAddresses();
                const [tokenId] = await renterBlockchainProvider.enterprise(enterprise.address).getRentalTokenIds();
                const rentalAgreement = await renterBlockchainProvider
                  .enterprise(enterprise.address)
                  .getRentalAgreement(tokenId);
                const enterpriseTokenBalanceBefore = await renterBlockchainProvider.getTokenBalance(
                  enterpriseToken.address,
                );
                const powerTokenBalanceBefore = await renterBlockchainProvider.getTokenBalance(
                  services[rentalAgreement.powerTokenIndex],
                );

                await wait(renterBlockchainProvider.enterprise(enterprise.address).returnRental(tokenId));
                const enterpriseTokenBalanceAfter = await renterBlockchainProvider.getTokenBalance(
                  enterpriseToken.address,
                );
                const powerTokenBalanceAfter = await renterBlockchainProvider.getTokenBalance(
                  services[rentalAgreement.powerTokenIndex],
                );

                expect(powerTokenBalanceAfter).toEqual(powerTokenBalanceBefore.sub(rentalAgreement.rentalAmount));
                expect(enterpriseTokenBalanceAfter).toEqual(
                  enterpriseTokenBalanceBefore.add(rentalAgreement.gcRewardAmount),
                );
              });
            });
          });
        });
      });
    });
  });
});
