import hre from 'hardhat';
import '@nomiclabs/hardhat-ethers';
import { EthereumBlockchainProvider } from '../../src';

/**
 * @group integration
 */
describe('@iqprotocol/ethereum', () => {
  describe('Provider', () => {
    beforeEach(async () => {
      await hre.deployments.fixture();
    });

    it('works', async () => {
      const deployedERC20Token = await hre.ethers.getContract('ERC20Mock');
      const deployerSigner = await hre.ethers.getNamedSigner('deployer');
      const ethereumBlockchainProvider = new EthereumBlockchainProvider(
        deployerSigner,
      );

      const deployerAddress = await deployerSigner.getAddress();

      const balance = await ethereumBlockchainProvider.getBalance(
        deployedERC20Token.address,
        deployerAddress,
      );
      expect(balance).toEqual('1000000000000000000000000000');

      const deployedEnterpriseFactory = await hre.ethers.getContract(
        'EnterpriseFactory',
      );
      const tx = await ethereumBlockchainProvider.deployEnterprise(
        deployedEnterpriseFactory.address,
        deployedERC20Token.address,
      );
      console.log(tx);
    });
  });
});
