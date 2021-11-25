/**
 * The package helps to discover IQ Protocol smart contracts. It contains the lists of IQ Protocol smart contracts addresses deployed by the IQ Protocol team.
 *
 * Use this package when you need information about IQ Protocol deployments such as contract implementation addresses or blockchain details (decimals, RPC endpoints).
 *
 * ## Installation
 * ```bash
 * yarn add @iqprotocol/discovery
 * ```
 *
 * ## Usage
 *
 * ```ts
 * import { ChainId, IQContractName, getContractAddress } from '@iqprotocol/discovery'
 *
 * const chainId = new ChainId('eip155:56'); // Binance Smart Chain Mainnet
 * const enterpriseFactoryAddress = getContractAddress(chainId, IQContractName.EnterpriseFactory);
 * ```
 *
 * @module discovery
 */

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
