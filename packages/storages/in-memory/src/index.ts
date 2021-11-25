/**
 * The package includes very basic [[abstract-storage.AccountStore | `Account Store Interface` ]] implementation for handling account states in memory.
 * Use this package when you want to test account state management functionality without setting up a persistent storage.
 *
 * :warning: **This provider is meant for testing and does not guarantee data persistence. Do not use for production deployments!**
 *
 *
 * ## Installation
 * ```bash
 * yarn add @iqprotocol/in-memory-storage
 * ```
 *
 * ## Usage
 * ```ts
 * import { InMemoryAccountStore, Account, AccountState } from '@iqprotocol/in-memory-storage';
 *
 * const store = new InMemoryAccountStore();
 *
 * const account: Account = {
 *  id: 'test-id',
 *  data: { ... },
 * };
 *
 * await store.saveAccount(account);
 *
 * const accountState: AccountState = {
 *  accountId: account.id,
 *  serviceId: 'test-service',
 *  energyGapHalvingPeriod: 86400,
 *  power: 10n,
 *  lockedPower: 2n,
 *  energyCap: 5n,
 *  energy: 5n,
 *  energyCalculatedAt: Math.floor(Date.now() / 1000),
 * };
 *
 * await store.initAccountState(accountState);
 * ```
 *
 * @module in-memory-storage
 */
export { InMemoryAccountStore } from './account-store';
export { AccountState, Account } from '@iqprotocol/abstract-storage';
