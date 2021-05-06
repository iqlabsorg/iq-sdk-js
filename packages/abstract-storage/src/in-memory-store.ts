/* eslint-disable @typescript-eslint/require-await */
import { Account, AccountState } from './types';
import { AbstractStore } from './abstract-store';
import { AccountStateValidator } from './validator';

export class InMemoryStore extends AbstractStore {
  private readonly accounts: Map<string, Account>;
  private readonly states: Map<string, AccountState>;

  constructor(accounts?: Account[], states?: AccountState[], validator?: AccountStateValidator) {
    super(validator);
    this.accounts = new Map(accounts ? accounts.map(account => [account.id, account]) : []);
    this.states = new Map(
      states ? states.map(state => [InMemoryStore.stateKey(state.accountId, state.serviceId), state]) : [],
    );
  }

  private static stateKey(accountId: string, serviceId: string): string {
    return `${accountId}:${serviceId}`;
  }

  async getAccount(id: string): Promise<Account | null> {
    return this.accounts.get(id) ?? null;
  }

  async getAccountState(accountId: string, serviceId: string): Promise<AccountState | null> {
    return this.states.get(InMemoryStore.stateKey(accountId, serviceId)) ?? null;
  }

  protected async _saveAccount(account: Account): Promise<void> {
    this.accounts.set(account.id, account);
  }

  protected async _saveAccountState(accountState: AccountState): Promise<void> {
    const { accountId, serviceId } = accountState;
    if (!this.accounts.has(accountId)) {
      throw new Error('Unknown account');
    }
    this.states.set(InMemoryStore.stateKey(accountId, serviceId), accountState);
  }
}
