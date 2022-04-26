/**
 * This package provides higher level abstraction over IQ Protocol smart contracts, allowing application developers to work with IQ enterprises and services regardless of the underlying blockchain.
 *
 * Use this package to communicate with IQ Enterprises and Services deployed on-chain.
 *
 * ## Installation
 * ```bash
 * yarn add @iqprotocol/enterprise
 * ```
 *
 * ## Usage
 * ```ts
 * import { EnterpriseFactory } from '@iqprotocol/enterprise';
 * import { EIP155BlockchainProvider } from '@iqprotocol/eip155';
 *
 * const blockchain = new EIP155BlockchainProvider(...);
 * const chainId = await blockchain.getChainId();
 * const accountId = new AccountId({ address: '0x...', chainId });
 * const enterpriseFactory = new EnterpriseFactory(blockchain);
 * const enterprise = await enterpriseFactory.create(accountId);
 *
 * const enterpriseInfo = await enterprise.getInfo();
 * const services = await enterprise.getServices();
 * const serviceInfo = await services[0].getInfo();
 *```
 *
 * @module enterprise
 */

export { AccountId, AssetId, AssetType, ChainId } from 'caip';
export {
  EnterpriseInfo,
  ServiceInfo,
  RentalFeeEstimationRequest,
  RentRequest,
  AccountState,
  Stake,
  RentalAgreement,
  Service,
  ServiceConfigWriter,
  ServiceConfigReader,
  Enterprise,
  EnterpriseConfigReader,
  EnterpriseConfigWriter,
} from './types';
export { ServiceFactory } from './service-factory';
export { EnterpriseFactory } from './enterprise-factory';
export { EnterpriseConfigurator } from './enterprise-configurator';
export { ServiceConfigurator } from './service-configurator';
