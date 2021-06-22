/* eslint-disable @typescript-eslint/require-await */
import {
  AbstractStore,
  Account,
  AccountState,
  AccountStateChangeResult,
  AccountStateValidator,
} from '@iqprotocol/abstract-storage';

export type InMemoryStoreConfig = Partial<{
  accounts: Account[];
  states: AccountState[];
  validator: AccountStateValidator;
}>;

export class InMemoryStore extends AbstractStore {
  private readonly accounts: Map<string, Account>;
  private readonly states: Map<string, AccountState>;

  constructor(config?: InMemoryStoreConfig) {
    super({ validator: config?.validator });
    this.accounts = new Map(config?.accounts?.map(account => [account.id, account]));
    this.states = new Map(
      config?.states?.map(state => [InMemoryStore.stateKey(state.accountId, state.serviceId), state]),
    );
  }

  private static serializeState(state: AccountState): string {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const replacer = (_key: unknown, value: unknown): unknown => {
      return typeof value === 'bigint' ? value.toString() : value;
    };

    return JSON.stringify(state, replacer);
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

  protected async _saveAccount(account: Account): Promise<Account> {
    this.accounts.set(account.id, account);
    return account;
  }

  protected async _initAccountState(accountState: AccountState): Promise<AccountState> {
    const { accountId, serviceId } = accountState;
    if (!this.accounts.has(accountId)) {
      throw new Error('Unknown account');
    }
    const stateKey = InMemoryStore.stateKey(accountId, serviceId);

    if (this.states.has(stateKey)) {
      throw new Error('Already initialized');
    }

    this.states.set(stateKey, accountState);

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

    const stateKey = InMemoryStore.stateKey(accountId, serviceId);
    const currentState = this.states.get(stateKey);
    if (!currentState) {
      throw new Error('State is not initialized');
    }

    if (InMemoryStore.serializeState(currentState) !== InMemoryStore.serializeState(prevState)) {
      return {
        successful: false,
        currentState,
      };
    }
    this.states.set(stateKey, newState);
    return {
      successful: true,
      currentState: newState,
    };
  }
}
