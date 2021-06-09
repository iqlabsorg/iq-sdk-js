import { HardhatUserConfig } from 'hardhat/types';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.4',
  },
  namedAccounts: {
    deployer: 0,
  },
  external: {
    contracts: [
      {
        artifacts: 'node_modules/@iqprotocol/solidity-contracts/artifacts',
        deploy: 'node_modules/@iqprotocol/solidity-contracts/deploy',
      },
    ],
  },
  networks: {
    hardhat: {
      live: false,
      saveDeployments: false,
    },
  },
};

export default config;
