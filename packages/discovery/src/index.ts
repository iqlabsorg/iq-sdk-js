/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { ChainID } from 'caip';
import { ChainInfo, IQContractAddresses, IQContractName } from './types';
import { chains } from './chains';
import { deployments } from './deployments';

export { IQContractName };

export const getBlockchainInfo = (chainId: ChainID): ChainInfo | null => {
  return chains[chainId.toString()] ?? null;
};

export const getContractAddresses = (chainId: ChainID): IQContractAddresses | null => {
  return deployments[chainId.toString()] ?? null;
};

export const getContractAddress = (chainId: ChainID, contractName: IQContractName): string | null => {
  return getContractAddresses(chainId)?.[IQContractName[contractName]] ?? null;
};
