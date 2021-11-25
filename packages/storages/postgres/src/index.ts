/**
 * The package includes [[abstract-storage.AccountStore | `Account Store Interface` ]] implementation for PostgreSQL.
 *
 * ## Installation
 * ```bash
 * yarn add @iqprotocol/postgres-storage
 * ```
 *
 * ## Usage
 *
 * ```ts
 * import { PostgresAccountStore, createPool, Account, AccountState } from '@iqprotocol/postgres-storage';
 *
 * const connectionUri = 'postgresql://user:secret@localhost/mydb';
 * const pool = createPool(connectionUri);
 * const store = new PostgresAccountStore({ pool });
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
 *
 * ```
 *
 * @module postgres-storage
 */
export { createPool } from 'slonik';
export { PostgresAccountStore } from './account-store';
export { AccountState, Account } from '@iqprotocol/abstract-storage';
