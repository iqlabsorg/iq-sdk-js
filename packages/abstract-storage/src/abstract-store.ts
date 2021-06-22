import { Account, AccountState, AccountStateChangeResult, StorageProvider } from './types';
import { AccountStateValidator, DefaultValidator } from './validator';

export type AbstractStoreConfig = {
  validator?: AccountStateValidator;
};

export abstract class AbstractStore implements StorageProvider {
  private readonly validator: AccountStateValidator;

  protected constructor(config: AbstractStoreConfig) {
    this.validator = config.validator ?? new DefaultValidator();
  }

  async saveAccount(account: Account): Promise<Account> {
    this.validator.validateAccount(account);
    return this._saveAccount(account);
  }

  async initAccountState(accountState: AccountState): Promise<AccountState> {
    this.validator.validateAccountState(accountState);
    return this._initAccountState(accountState);
  }

  async changeAccountState(prevState: AccountState, newState: AccountState): Promise<AccountStateChangeResult> {
    if (prevState.accountId !== newState.accountId) {
      throw new Error('Account ID mismatch');
    }
    if (prevState.serviceId !== newState.serviceId) {
      throw new Error('Service ID mismatch');
    }
    this.validator.validateAccountState(newState);
    return this._changeAccountState(prevState, newState);
  }

  abstract getAccount(id: string): Promise<Account | null>;

  abstract getAccountState(accountId: string, serviceId: string): Promise<AccountState | null>;

  protected abstract _saveAccount(account: Account): Promise<Account>;

  protected abstract _initAccountState(accountState: AccountState): Promise<AccountState>;

  protected abstract _changeAccountState(
    prevState: AccountState,
    newState: AccountState,
  ): Promise<AccountStateChangeResult>;
}
