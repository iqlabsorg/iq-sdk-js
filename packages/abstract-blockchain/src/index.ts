/**
 * The main purpose of this package is to provide `BlockchainProvider` interface.
 * The interface implementation will cover all the necessary functions to work with IQ Protocol smart contracts.
 * An example of such implementation can be [[eip155.EIP155BlockchainProvider | `EIP155BlockchainProvider` ]]
 * provided as a part of IQ Protocol JS SDK.
 *
 * Use this package when you want to implement a new blockchain provider.
 *
 * ```ts
 * import { BlockchainProvider } from '@iqprotocol/abstract-blockchain';
 *
 * class CustomBlockchainProvider implements BlockchainProvider {}
 * ```
 *
 * @module abstract-blockchain
 */

export { ChainId } from 'caip';
export {
  Address,
  EnterpriseParams,
  EnterpriseInfo,
  ServiceParams,
  ServiceInfo,
  AccountState,
  FungibleTokenMetadata,
  NonFungibleTokenMetadata,
  Stake,
  RentalAgreement,
  ChainAware,
  BlockchainEnterprise,
  BlockchainService,
  BlockchainProvider,
} from './types';
