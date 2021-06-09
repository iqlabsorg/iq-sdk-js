import { deployments, ethers } from 'hardhat';
import 'hardhat-deploy-ethers';
import { EthereumBlockchainProvider } from '../../src';
import { baseRate, getEnterprise, getPowerToken } from './utils';
import { DefaultConverter, Enterprise, EnterpriseFactory, ERC20Mock } from '../../types/contracts';
import { EnterpriseData, EnterpriseParams, ServiceData, ServiceParams } from '@iqprotocol/abstract-blockchain';
import { BigNumber } from 'ethers';

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

/**
 * @group integration
 */
describe('EthereumBlockchainProvider', () => {
  const ONE_HOUR = 3600;
  const ONE_DAY = 24 * ONE_HOUR;
  const ONE_PERCENT = 100;
  const ONE_TOKEN = BigNumber.from(10n ** 18n);
  const BASE_RATE = BigNumber.from(baseRate(100n, 86400n, 3n));
  const GAP_HALVING_PERIOD = 86400;

  let ethereumProvider: EthereumBlockchainProvider;
  let deployerSigner: Awaited<ReturnType<typeof ethers.getNamedSigner>>;
  let liquidityToken: ERC20Mock;
  let enterpriseFactory: EnterpriseFactory;
  let converter: DefaultConverter;

  let baseEnterpriseParams: EnterpriseParams;
  let baseServiceParams: ServiceParams;

  beforeAll(async () => {
    await deployments.fixture();
    deployerSigner = await ethers.getNamedSigner('deployer');
    enterpriseFactory = (await ethers.getContract('EnterpriseFactory')) as EnterpriseFactory;
    liquidityToken = (await ethers.getContract('ERC20Mock')) as ERC20Mock;
    converter = (await ethers.getContract('DefaultConverter')) as DefaultConverter;
    ethereumProvider = new EthereumBlockchainProvider({
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
    const tx = await ethereumProvider.deployEnterprise(baseEnterpriseParams);

    const receipt = await tx.wait();
    expect(receipt.status).toBe(1);
  });

  it('works', async () => {
    const deployerAddress = await deployerSigner.getAddress();
    const balance = await ethereumProvider.getTokenBalance(liquidityToken.address, deployerAddress);
    expect(balance).toEqual('1000000000000000000000000000');
  });

  describe('When enterprise deployed', () => {
    let enterprise: Enterprise;
    let expectedEnterpriseData: EnterpriseData;

    beforeEach(async () => {
      const tx = await ethereumProvider.deployEnterprise(baseEnterpriseParams);

      const receipt = await tx.wait();
      enterprise = await getEnterprise(enterpriseFactory, receipt.blockNumber);
      ethereumProvider.addWellKnownEnterprise(enterprise.address);

      expectedEnterpriseData = {
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

    it('lists well known enterprises', async () => {
      // deploy another enterprise and add it to well-known list
      const anotherEnterpriseParams = { ...baseEnterpriseParams, name: 'Test Enterprise 2' };
      const tx = await ethereumProvider.deployEnterprise(anotherEnterpriseParams);
      const receipt = await tx.wait();
      const anotherEnterprise = await getEnterprise(enterpriseFactory, receipt.blockNumber);
      ethereumProvider.addWellKnownEnterprise(anotherEnterprise.address);

      const enterprises = await ethereumProvider.listEnterprises();

      expect(enterprises).toHaveLength(2);
      expect(enterprises[0]).toMatchObject(expectedEnterpriseData);
      expect(enterprises[1]).toMatchObject({ ...expectedEnterpriseData, name: anotherEnterpriseParams.name });
    });

    it('retrieves enterprise data', async () => {
      const data = await ethereumProvider.getEnterprise(enterprise.address);
      expect(data).toMatchObject(expectedEnterpriseData);
    });

    it('registers new services', async () => {
      const tx = await ethereumProvider.registerService(enterprise.address, baseServiceParams);
      const receipt = await tx.wait();
      expect(receipt.status).toBe(1);
    });

    describe('When enterprise has registered services', () => {
      let expectedServiceData1: ServiceData;
      let expectedServiceData2: ServiceData;

      beforeEach(async () => {
        const liquidityTokenSymbol = await liquidityToken.symbol();
        const baseExpectedServiceData: Omit<ServiceData, 'address' | 'name' | 'symbol' | 'index'> = {
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
        const r1 = await (await ethereumProvider.registerService(enterprise.address, serviceParams1)).wait();
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
        const r2 = await (await ethereumProvider.registerService(enterprise.address, serviceParams2)).wait();
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
        const services = await ethereumProvider.listEnterpriseServices(enterprise.address);
        expect(services).toHaveLength(2);

        expect(services[0]).toMatchObject(expectedServiceData1);
        expect(services[1]).toMatchObject(expectedServiceData2);
      });

      it('retrieves the service data', async () => {
        const service = await ethereumProvider.getService(expectedServiceData2.address);
        expect(service).toMatchObject(expectedServiceData2);
      });
    });
  });
});
