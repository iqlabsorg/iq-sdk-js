/**
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
