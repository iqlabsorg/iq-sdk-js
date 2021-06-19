import { deployments, ethers } from 'hardhat';
import 'hardhat-deploy-ethers';
import { parseEther } from 'ethers/lib/utils';
import { EIP155BlockchainProvider } from '../../src';
import { baseRate, getEnterprise, getPowerToken, wait } from './utils';
import { DefaultConverter, Enterprise, EnterpriseFactory, ERC20Mock } from '../../types/contracts';
import {
  AccountState,
  BigNumber,
  EnterpriseInfo,
  EnterpriseParams,
  ERC20Metadata,
  LiquidityInfo,
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
  const ONE_TOKEN = BigNumber.from(10n ** 18n);
  const BASE_RATE = BigNumber.from(baseRate(100n, 86400n, 3n));
  const GAP_HALVING_PERIOD = 86400;

  let provider: EIP155BlockchainProvider;
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
    provider = new EIP155BlockchainProvider({
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
    const receipt = await wait(provider.deployEnterprise(baseEnterpriseParams));
    expect(receipt.status).toBe(1);
  });

  it('returns correct CAIP-2 chain ID', async () => {
    const chainId = await provider.getChainId();
    expect(chainId.toString()).toEqual(`eip155:${await deployerSigner.getChainId()}`);
  });

  it('retrieves an arbitrary token balance', async () => {
    const balance = await provider.getTokenBalance(liquidityToken.address);
    expect(balance).toEqual(parseEther('1000000000'));
  });

  describe('When enterprise deployed', () => {
    let enterprise: Enterprise;
    let expectedEnterpriseData: EnterpriseInfo;

    beforeEach(async () => {
      const receipt = await wait(provider.deployEnterprise(baseEnterpriseParams));
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
      const data = await provider.getEnterpriseInfo(enterprise.address);
      expect(data).toMatchObject(expectedEnterpriseData);
    });

    it('registers new services', async () => {
      const receipt = await wait(provider.registerService(enterprise.address, baseServiceParams));
      expect(receipt.status).toBe(1);
    });

    it('retrieves enterprise liquidity token metadata', async () => {
      const metadata = await provider.getLiquidityTokenMetadata(enterprise.address);
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
        const r1 = await wait(provider.registerService(enterprise.address, serviceParams1));
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
        const r2 = await wait(provider.registerService(enterprise.address, serviceParams2));
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
        const services = await provider.getServices(enterprise.address);
        expect(services).toHaveLength(2);

        expect(services[0]).toEqual(expectedServiceData1.address);
        expect(services[1]).toEqual(expectedServiceData2.address);
      });

      it('retrieves the service data', async () => {
        const service = await provider.getServiceInfo(expectedServiceData2.address);
        expect(service).toMatchObject(expectedServiceData2);
      });

      it('retrieves account state for specific service', async () => {
        const accountAddress = await deployerSigner.getAddress();
        const serviceAddress = expectedServiceData1.address;

        const accountState = await provider.getAccountState(serviceAddress, accountAddress);
        expect(accountState).toMatchObject(<AccountState>{
          serviceAddress,
          accountAddress,
          balance: BigNumber.from(0),
          energy: BigNumber.from(0),
          timestamp: 0,
        });
      });
    });

    describe('When called by borrower', () => {
      let borrower: Awaited<ReturnType<typeof ethers.getNamedSigner>>;

      beforeEach(async () => {
        borrower = await ethers.getNamedSigner('borrower');
        // allocate tokens to borrower
        await liquidityToken.transfer(borrower.address, ONE_TOKEN.mul(500));

        // register service to have power token deployed
        await wait(provider.registerService(enterprise.address, baseServiceParams));
        // provide some liquidity to the enterprise
        await wait(provider.setLiquidityAllowance(enterprise.address, ONE_TOKEN.mul(10000)));
        await wait(provider.addLiquidity(enterprise.address, ONE_TOKEN.mul(10000)));

        // Use borrower account
        // eslint-disable-next-line require-atomic-updates
        provider = await provider.connect(borrower);
      });

      it('estimates a loan', async () => {
        const [serviceAddress] = await provider.getServices(enterprise.address);
        const estimate = await provider.estimateLoan(
          enterprise.address,
          serviceAddress,
          liquidityToken.address,
          ONE_TOKEN.mul(1000),
          10 * ONE_DAY,
        );
        expect(estimate.toString()).toEqual('330588235294115767777'); // ~330 tokens
      });

      it('allows to borrow power tokens', async () => {
        const [serviceAddress] = await provider.getServices(enterprise.address);
        const loanAmount = ONE_TOKEN.mul(1000);

        // Estimate the loan
        const estimate = await provider.estimateLoan(
          enterprise.address,
          serviceAddress,
          liquidityToken.address,
          loanAmount,
          10 * ONE_DAY,
        );

        // Approve payment tokens to enterprise (we pay with liquidity tokens for simplicity)
        await provider.setLiquidityAllowance(enterprise.address, estimate);
        const powerTokenBalanceBefore = await provider.getTokenBalance(serviceAddress, borrower.address);

        await wait(
          provider.borrow(
            enterprise.address,
            serviceAddress,
            liquidityToken.address,
            loanAmount,
            10 * ONE_DAY,
            estimate,
          ),
        );

        const powerTokenBalanceAfter = await provider.getTokenBalance(serviceAddress, borrower.address);
        expect(powerTokenBalanceAfter).toEqual(powerTokenBalanceBefore.add(loanAmount));
      });

      it.todo('allows to return a loan');
    });

    describe('When called by liquidity provider', () => {
      let liquidityProvider: Awaited<ReturnType<typeof ethers.getNamedSigner>>;

      beforeEach(async () => {
        liquidityProvider = await ethers.getNamedSigner('liquidityProvider');
        // allocate tokens to liquidity provider
        await liquidityToken.transfer(liquidityProvider.address, 100000);
        // eslint-disable-next-line require-atomic-updates
        provider = await provider.connect(liquidityProvider);
      });

      it('allows to approve liquidity tokens to enterprise', async () => {
        await wait(provider.setLiquidityAllowance(enterprise.address, 1000));
        const allowance = await liquidityToken.allowance(liquidityProvider.address, enterprise.address);
        expect(allowance.toNumber()).toEqual(1000);
      });

      it('retrieves liquidity token allowance', async () => {
        await wait(provider.setLiquidityAllowance(enterprise.address, 1000));
        const allowance = await provider.getLiquidityAllowance(enterprise.address);
        expect(allowance.toNumber()).toEqual(1000);
      });

      it('allows to add liquidity', async () => {
        await wait(provider.setLiquidityAllowance(enterprise.address, 1000));
        const receipt = await wait(provider.addLiquidity(enterprise.address, 1000));
        expect(receipt.status).toBe(1);
      });

      describe('When liquidity is added', () => {
        beforeEach(async () => {
          await wait(provider.setLiquidityAllowance(enterprise.address, 2000));
          await wait(provider.addLiquidity(enterprise.address, 1000));
          await wait(provider.addLiquidity(enterprise.address, 800));
        });

        it('retrieves a list of interest tokens', async () => {
          const interestTokenIds = await provider.getInterestTokenIds(enterprise.address);
          expect(interestTokenIds).toHaveLength(2);
        });

        it('retrieves liquidity info by interest token ID', async () => {
          const [tokenId] = await provider.getInterestTokenIds(enterprise.address);
          const liquidityInfo = await provider.getLiquidityInfo(enterprise.address, tokenId);
          expect(liquidityInfo).toMatchObject(<LiquidityInfo>{
            tokenId,
            amount: BigNumber.from(1000),
            shares: BigNumber.from(1000),
          });
        });

        it('allows to increase liquidity', async () => {
          const [tokenId] = await provider.getInterestTokenIds(enterprise.address);
          await wait(provider.increaseLiquidity(enterprise.address, tokenId, 200));
          const liquidityInfo = await provider.getLiquidityInfo(enterprise.address, tokenId);
          expect(liquidityInfo).toMatchObject(<LiquidityInfo>{
            tokenId,
            amount: BigNumber.from(1200),
            shares: BigNumber.from(1200),
          });
        });

        it('allows to decrease liquidity', async () => {
          const [tokenId] = await provider.getInterestTokenIds(enterprise.address);
          await wait(provider.decreaseLiquidity(enterprise.address, tokenId, 500));
          const liquidityInfo = await provider.getLiquidityInfo(enterprise.address, tokenId);
          expect(liquidityInfo).toMatchObject(<LiquidityInfo>{
            tokenId,
            amount: BigNumber.from(500),
            shares: BigNumber.from(500),
          });
        });

        it('allows to remove liquidity', async () => {
          const [tokenId] = await provider.getInterestTokenIds(enterprise.address);
          await wait(provider.removeLiquidity(enterprise.address, tokenId));
          const interestTokenIds = await provider.getInterestTokenIds(enterprise.address);
          expect(interestTokenIds).toHaveLength(1);
          await expect(provider.getLiquidityInfo(enterprise.address, tokenId)).rejects.toThrow();
        });
      });
    });
  });
});
