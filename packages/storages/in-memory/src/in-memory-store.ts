/* eslint-disable @typescript-eslint/require-await */
import {
  AccountStore,
  Account,
  AccountState,
  AccountStateChangeResult,
  AccountStateValidator,
} from '@iqprotocol/abstract-storage';

type InMemoryStoreConfig = Partial<{
  accounts: Account[];
  states: AccountState[];
  validator: AccountStateValidator;
}>;

type AccountId = string;

export class InMemoryStore extends AccountStore {
  private readonly accounts = new Map<AccountId, Account>();
  private readonly states = new Map<AccountId, Map<string, AccountState>>();

  constructor(config?: InMemoryStoreConfig) {
    super({ validator: config?.validator });

    for (const account of config?.accounts ?? []) {
      this.accounts.set(account.id, account);
      const stateMap = new Map<AccountId, AccountState>();
      for (const state of config?.states ?? []) {
        if (state.accountId === account.id) {
          stateMap.set(state.serviceId, state);
        }
      }
      this.states.set(account.id, stateMap);
    }
  }

  private static serializeState(state: AccountState): string {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const replacer = (_key: unknown, value: unknown): unknown => {
      return typeof value === 'bigint' ? value.toString() : value;
    };

    return JSON.stringify(state, replacer);
  }

  async getAccount(id: string): Promise<Account | null> {
    return this.accounts.get(id) ?? null;
  }

  async deleteAccount(id: string): Promise<boolean> {
    this.states.delete(id);
    return this.accounts.delete(id);
  }

  async getAccountState(serviceId: string, accountId: string): Promise<AccountState | null> {
    return this.states.get(accountId)?.get(serviceId) ?? null;
  }

  async deleteAccountState(serviceId: string, accountId: string): Promise<boolean> {
    return this.states.get(accountId)?.delete(serviceId) ?? false;
  }

  protected async _saveAccount(account: Account): Promise<Account> {
    this.accounts.set(account.id, account);
    return account;
  }

  protected async _initAccountState(accountState: AccountState): Promise<AccountState> {
    const { accountId, serviceId } = accountState;
    if (!this.accounts.has(accountId)) {
      throw new Error('Unknown account');
    }

    if (this.states.get(accountId)?.has(serviceId)) {
      throw new Error('Already initialized');
    }
    this.states.set(accountId, new Map([[serviceId, accountState]]));

    return accountState;
  }

  protected async _changeAccountState(
    prevState: AccountState,
    newState: AccountState,
  ): Promise<AccountStateChangeResult> {
    const { accountId, serviceId } = prevState;
    if (!this.accounts.has(accountId)) {
      throw new Error('Unknown account');
    }

    const currentState = this.states.get(accountId)?.get(serviceId);
    if (!currentState) {
      throw new Error('State is not initialized');
    }

    if (InMemoryStore.serializeState(currentState) !== InMemoryStore.serializeState(prevState)) {
      return {
        successful: false,
        currentState,
      };
    }
    this.states.get(accountId)?.set(serviceId, newState);

    return {
      successful: true,
      currentState: newState,
    };
  }
}
