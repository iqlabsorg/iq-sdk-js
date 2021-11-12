// IQ Protocol smart contract names.
export enum IQContractName {
  RentalToken = 'RentalToken',
  DefaultConverter = 'DefaultConverter',
  Enterprise = 'Enterprise',
  EnterpriseFactory = 'EnterpriseFactory',
  StakeToken = 'StakeToken',
  PowerToken = 'PowerToken',
}

export type ChainInfo = {
  name: string;
  chainId: number;
  shortName: string;
  chain: string;
  network: string;
  networkId: number;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpc: string[];
  explorers: ChainExplorer[];
  faucets: string[];
  infoURL: string;
};

export type ChainExplorer = {
  name: string;
  url: string;
  icon?: string;
  standard: string;
};

// CAIP-2 blockchain ID
// see: https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-2.md
type ChainId = string;

export type IQContractAddresses = Record<IQContractName, string>;
export type IQChains = Record<ChainId, ChainInfo>;
export type IQContractDeployments = Record<ChainId, IQContractAddresses>;
