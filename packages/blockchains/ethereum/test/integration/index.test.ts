import hre from 'hardhat';
import '@nomiclabs/hardhat-ethers';
import { EthereumBlockchainProvider } from '../../src';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address';
import { getEnterprise } from './utils';
import {
  Enterprise,
  EnterpriseFactory,
  ERC20Mock,
} from '../../types/contracts';
import { EnterpriseData } from '@iqprotocol/abstract-blockchain';

/**
 * @group integration
 */
describe('@iqprotocol/ethereum', () => {
  describe('EthereumBlockchainProvider', () => {
    let ethereumProvider: EthereumBlockchainProvider;
    let deployerSigner: SignerWithAddress;
    let erc20Token: ERC20Mock;
    let enterpriseFactory: EnterpriseFactory;
    let testEnterpriseData: EnterpriseData;

    beforeEach(async () => {
      await hre.deployments.fixture();
      deployerSigner = await hre.ethers.getNamedSigner('deployer');
      enterpriseFactory = (await hre.ethers.getContract(
        'EnterpriseFactory',
      )) as EnterpriseFactory;
      erc20Token = (await hre.ethers.getContract('ERC20Mock')) as ERC20Mock;
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
    });
  });
});
