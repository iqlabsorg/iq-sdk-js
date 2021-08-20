import { IQContractDeployments, IQContractName } from './types';

// Add new deployments here to make the available via discovery utils.
export const deployments: IQContractDeployments = {
  // Binance Smart Chain Mainnet
  'eip155:56': {
    [IQContractName.BorrowToken]: '0xd64571A41f4D526Fc0cceb7683a8D376Dd76d7B1',
    [IQContractName.DefaultConverter]: '0x7c88605dDB1f5eD8e7689088eBC77D82dee87f11',
    [IQContractName.Enterprise]: '0xF623cCc28487Ed08cd24c2aFbaB2CC68cB39CcE2',
    [IQContractName.EnterpriseFactory]: '0x5Ab18B1e3fBC6f3726db600fbEA187Bcd284E0A9',
    [IQContractName.InterestToken]: '0x52E166c6E682296E315C3677A8FC93Efc29aca24',
    [IQContractName.PowerToken]: '0x9d195044F1fd60dEcAe27666d301a6CbB1Ae30d5',
  },
  // Binance Smart Chain Testnet
  'eip155:97': {
    [IQContractName.BorrowToken]: '0xA6ab266C94eFC97E73931f9311E7D9dC7b51B98D',
    [IQContractName.DefaultConverter]: '0x59F089539CC0d7680f1b859c187b7161e4F9421d',
    [IQContractName.Enterprise]: '0xeC7f68F53cC0bc70166225572AdFfcf9D7e3452e',
    [IQContractName.EnterpriseFactory]: '0x9Ec118bC7d6b257c398c1801c000C4cBf7EC1E7d',
    [IQContractName.InterestToken]: '0x1c2E6f4CFFCD6D048407d1e2200Ea56FDB8eFbDB',
    [IQContractName.PowerToken]: '0x5960828e2AB55beEC2BAb3C11CB1E87790c3d3bb',
  },
};
