import { deployments, ethers } from 'hardhat';
import 'hardhat-deploy-ethers';
import { EthereumBlockchainProvider } from '../../src';
import { getEnterprise } from './utils';
import {
  Enterprise,
  EnterpriseFactory,
  ERC20Mock,
} from '../../types/contracts';
import { EnterpriseData } from '@iqprotocol/abstract-blockchain';

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

/**
 * @group integration
 */
describe('@iqprotocol/ethereum', () => {
  describe('EthereumBlockchainProvider', () => {
    let ethereumProvider: EthereumBlockchainProvider;
    let deployerSigner: Awaited<ReturnType<typeof ethers.getNamedSigner>>;
    let erc20Token: ERC20Mock;
    let enterpriseFactory: EnterpriseFactory;
    let testEnterpriseData: EnterpriseData;

    beforeEach(async () => {
      await deployments.fixture();
      deployerSigner = await ethers.getNamedSigner('deployer');
      enterpriseFactory = (await ethers.getContract(
        'EnterpriseFactory',
      )) as EnterpriseFactory;
      erc20Token = (await ethers.getContract('ERC20Mock')) as ERC20Mock;
      ethereumProvider = new EthereumBlockchainProvider(deployerSigner, {
        enterpriseFactory: enterpriseFactory.address,
      });

      testEnterpriseData = {
        name: 'Test Enterprise',
        tokenAddress: erc20Token.address,
        baseUri: 'https://example.com',
      };
    });

    it('deploys enterprise', async () => {
      const tx = await ethereumProvider.deployEnterprise(testEnterpriseData);

      const receipt = await tx.wait(1);
      expect(receipt.status).toBe(1);
    });

    it('works', async () => {
      const deployerAddress = await deployerSigner.getAddress();
      const balance = await ethereumProvider.getBalance(
        erc20Token.address,
        deployerAddress,
      );
      expect(balance).toEqual('1000000000000000000000000000');
    });

    describe('When enterprise deployed', () => {
      let enterprise: Enterprise;

      beforeEach(async () => {
        const tx = await ethereumProvider.deployEnterprise(testEnterpriseData);

        const receipt = await tx.wait(1);
        enterprise = (await getEnterprise(
          enterpriseFactory,
          receipt.blockNumber,
        )) as Enterprise;
      });

      it('retrieves enterprise data', async () => {
        const data = await ethereumProvider.getEnterpriseData(
          enterprise.address,
        );
        expect(data).toEqual(testEnterpriseData);
      });

      it('registers new services', async () => {
        const HALF_LIFE = 86400;
        const FACTOR = ethers.utils.parseUnits('1', 18);
        const INTEREST_RATE_HALVING_PERIOD = 20000;
        const ALLOWED_LOAN_DURATIONS = [86400, 2 * 86400, 7 * 86400];
        const ALLOWED_REFUND_CURVATURES = [1, 2, 4];

        const tx = await ethereumProvider.registerService(enterprise.address, {
          name: 'IQ Power Test',
          symbol: 'IQPT',
          halfLife: HALF_LIFE,
          factor: FACTOR,
          interestRateHalvingPeriod: INTEREST_RATE_HALVING_PERIOD,
          allowedLoanDurations: ALLOWED_LOAN_DURATIONS,
          allowedRefundCurvatures: ALLOWED_REFUND_CURVATURES,
        });

        const receipt = await tx.wait(1);
        expect(receipt.status).toBe(1);
      });
    });
  });
});
