/**
 * The IQ Protocol off-chain state management is storage agnostic and relies on storage providers to implement required functionality.
 * This package provides [[`AccountStore`]] class which can be extended to implement store specific provider.
 *
 * Use this package when you want to implement a new storage provider.
 *
 * ## Installation
 * ```bash
 * yarn add @iqprotocol/abstract-storage
 * ```
 *
 * ## Usage
 * All [[`AccountStore`]] implementations use built-in account state validator by default. It is also possible to provide a custom validator.
 * ```ts
 * import { AccountStore, AccountStateValidator } from '@iqprotocol/abstract-storage';
 *
 * class CustomStore extends AccountStore {
 *   // ...
 * }
 *
 * class CustomAccountStateValidator implements AccountStateValidator {
 *  // ...
 * }
 *
 * const validator = new CustomAccountStateValidator();
 * const customStore = new CustomStore({ validator });
 * ```
 * @module abstract-storage
 */

export {
  Account,
  AccountOwnershipProof,
  AccountData,
  AccountState,
  AccountStateChangeResult,
  AccountStateValidator,
  StorageProvider,
} from './types';
export { AccountStateError } from './errors';
export { AccountStore } from './account-store';
export { DefaultValidator } from './validator';
