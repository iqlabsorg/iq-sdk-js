import { IQContractDeployments, IQContractName } from './types';

// Add new deployments here to make the available via discovery utils.
export const deployments: IQContractDeployments = {
  // Binance Smart Chain Mainnet
  'eip155:56': {
    [IQContractName.BorrowToken]: '0xd64571A41f4D526Fc0cceb7683a8D376Dd76d7B1',
    [IQContractName.DefaultConverter]: '0x7c88605dDB1f5eD8e7689088eBC77D82dee87f11',
    [IQContractName.Enterprise]: '0xad7Ddf106AFCF28F5eB9aC40A1Ab82c5EdF3B678',
    [IQContractName.EnterpriseFactory]: '0xa0204D8885b1D491a1b30338Ce8dFFb17f1DBDDf',
    [IQContractName.InterestToken]: '0x52E166c6E682296E315C3677A8FC93Efc29aca24',
    [IQContractName.PowerToken]: '0x9d195044F1fd60dEcAe27666d301a6CbB1Ae30d5',
  },
  // Binance Smart Chain Testnet
  'eip155:97': {
    [IQContractName.BorrowToken]: '0xA6ab266C94eFC97E73931f9311E7D9dC7b51B98D',
    [IQContractName.DefaultConverter]: '0x59F089539CC0d7680f1b859c187b7161e4F9421d',
    [IQContractName.Enterprise]: '0x0801d793B628e162902f819D2ac331e63a255b7e',
    [IQContractName.EnterpriseFactory]: '0xAD7b40B0dbE94aB5CE344AD4334cdbCB1aA91Dcc',
    [IQContractName.InterestToken]: '0x1c2E6f4CFFCD6D048407d1e2200Ea56FDB8eFbDB',
    [IQContractName.PowerToken]: '0x5960828e2AB55beEC2BAb3C11CB1E87790c3d3bb',
  },
};
