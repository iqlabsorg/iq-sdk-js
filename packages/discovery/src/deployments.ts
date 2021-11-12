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
    [IQContractName.Enterprise]: '0x03bdc1dDaF62095BD31A61A6F0d80ACe43D597Af',
    [IQContractName.EnterpriseFactory]: '0x69C490B4967D12dBadF0d9D2050c7BD87012a474',
    [IQContractName.PowerToken]: '0xDf7a764d604064D5609EfAf9a96cCC5828bCf0e9',
    [IQContractName.RentalToken]: '0x02f616606CDBF4eD3a2D7E5301c91097a10d92c4',
    [IQContractName.StakeToken]: '0x83110719bfB763D3c1d81cC97AbFbd18F6eA3Fe3',
    [IQContractName.DefaultConverter]: '0x59F089539CC0d7680f1b859c187b7161e4F9421d',
  },
};
