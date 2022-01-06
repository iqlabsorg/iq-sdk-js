import { IQContractDeployments, IQContractName } from './types';

// Add new deployments here to make the available via discovery utils.
export const deployments: IQContractDeployments = {
  // Binance Smart Chain Mainnet
  'eip155:56': {
    [IQContractName.Enterprise]: '0xF5b264F028Ca5F075a7756A1C87dd5B36e14F4F6',
    [IQContractName.EnterpriseFactory]: '0x8095c742dBd0e0a375D02c54f84A3AD3771BA932',
    [IQContractName.PowerToken]: '0x9079bCbF55650b4760612a310DFA1458eC4CF0c5',
    [IQContractName.RentalToken]: '0xE0582Cc604005457dd0Bf8D2bE82845DDdE8efea',
    [IQContractName.StakeToken]: '0x7c6d55dc2787A8aA7cA7F929E0E99b465aAcA405',
    [IQContractName.DefaultConverter]: '0x7c88605dDB1f5eD8e7689088eBC77D82dee87f11',
  },
  // Binance Smart Chain Testnet
  'eip155:97': {
    [IQContractName.Enterprise]: '0x28186aDfe931cf3e529362bA10932C71dc5B0669',
    [IQContractName.EnterpriseFactory]: '0xC98D0Ebb8904a0Aa15036379017770882aA14AE1',
    [IQContractName.PowerToken]: '0xeA59D44f72A1Db24934b013424967e1e8750c7Bc',
    [IQContractName.RentalToken]: '0x261a4F072929CFF97f45A8ED1340e092eC50E9Cc',
    [IQContractName.StakeToken]: '0x4c38877C34E99B8847B950e474551dE2a9E72EF7',
    [IQContractName.DefaultConverter]: '0x59F089539CC0d7680f1b859c187b7161e4F9421d',
  },
  // Polygon Testnet Mumbai
  'eip155:80001': {
    [IQContractName.Enterprise]: '0x833DA99fa17b6d335DDEccC54626d6039a93277E',
    [IQContractName.EnterpriseFactory]: '0xAe90F3c94Ec3649CF616061b66f28dbFEE747d3D',
    [IQContractName.PowerToken]: '0xc7459C308c05eDeEf331B2eB3Dc44296129B775f',
    [IQContractName.RentalToken]: '0xE6FA2C67c45A1D8DF0A57b632351f2C18Ea76F09',
    [IQContractName.StakeToken]: '0x9aF78eddD01b3dc1D800A16AB04Db0E6FD6824a2',
    [IQContractName.DefaultConverter]: '0x93Dc01F4C24698EaAF7777F391Cc75F8FcbbF5C5',
  },
  // Polygon Mainnet
  'eip155:137': {
    [IQContractName.Enterprise]: '0x4ba78695845eb5e0a02cee3b51ffa214996032ce',
    [IQContractName.EnterpriseFactory]: '0x908AC335219D13276D31Fa68449f7f63B1731BA6',
    [IQContractName.PowerToken]: '0xcEeef2a276109DE31750519405fBaF66A5938A3E',
    [IQContractName.RentalToken]: '0x7eB8D59514747e1d8A42519Ec08EbaB91cB8E1F2',
    [IQContractName.StakeToken]: '0x27cdca6265B971D1aF8E46164F6E5494997dC449',
    [IQContractName.DefaultConverter]: '0xf3e20Dc3F8df51bd608187dA09a649d081ee5B35',
  },
};
