const baseConfig = require('../../jest.config');
const packageJson = require('./package');

module.exports = {
  ...baseConfig,
  name: packageJson.name,
  displayName: packageJson.name,
  coveragePathIgnorePatterns: [
    '<rootDir>/src/contracts'
  ],
  transformIgnorePatterns: [`/node_modules/(?!@iqprotocol/solidity-contracts-nft/deploy)`],
};
