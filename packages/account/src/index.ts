/**
 * This is high level package which provides tools for IQ Protocol off-chain account state management.
 * It is storage and blockchain agnostic and relies on injected providers.
 * For example, it uses storage provider (e.g. [[postgres-storage.PostgresStore | `Postgres Store`]]) to persist account information and manage off-chain state.
 * It also allows to automatically initialize account state using blockchain provider (e.g. [[eip155.EIP155BlockchainProvider | `EIP155BlockchainProvider`]].
 *
 * Use this package when you need an off-chain onboarding and account state management.
 *
 * ## Installation
 * ```bash
 * yarn add @iqprotocol/account
 * ```
 *
 *  ## Usage
 * ```ts
 * import { AccountManager, AccountStateManager } from '@iqprotocol/account';
 * import { PostgresStore } from '@iqprotocol/postgres-storage';
 * import { EIP155BlockchainProvider } from '@iqprotocol/eip155';
 *
 * const store = new PostgresStore(...);
 * const accountManager = new AccountManager({ store });
 *
 * const blockchain = new EIP155BlockchainProvider(...);
 * const accountStateManager = new AccountStateManager({ store, blockchain });
 * ```
 *
 * @module account
 */

export { AccountId, ChainId } from 'caip';
export * from './types';
export { AccountManager } from './account-manager';
export { AccountStateManager } from './account-state-manager';
export { AccountOwnershipVerifier } from './account-ownership-verifier';
