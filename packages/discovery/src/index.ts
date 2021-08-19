/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { ChainId } from 'caip';
import { ChainInfo, IQContractAddresses, IQContractName } from './types';
import { chains } from './chains';
import { deployments } from './deployments';

export { IQContractName };

export const getBlockchainInfo = (chainId: ChainId): ChainInfo | null => {
  return chains[chainId.toString()] ?? null;
};

export const getContractAddresses = (chainId: ChainId): IQContractAddresses | null => {
  return deployments[chainId.toString()] ?? null;
};

export const getContractAddress = (chainId: ChainId, contractName: IQContractName): string | null => {
  return getContractAddresses(chainId)?.[IQContractName[contractName]] ?? null;
};
