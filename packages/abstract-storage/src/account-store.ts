import { Account, AccountState, AccountStateChangeResult, AccountStateValidator, StorageProvider } from './types';
import { DefaultValidator } from './validator';

type AbstractStoreConfig = {
  validator?: AccountStateValidator;
};

export abstract class AccountStore implements StorageProvider {
  private readonly validator: AccountStateValidator;

  protected constructor({ validator }: AbstractStoreConfig) {
    this.validator = validator ?? new DefaultValidator();
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

  abstract deleteAccount(id: string): Promise<boolean>;

  abstract getAccountState(serviceId: string, accountId: string): Promise<AccountState | null>;

  abstract deleteAccountState(serviceId: string, accountId: string): Promise<boolean>;

  protected abstract _saveAccount(account: Account): Promise<Account>;

  protected abstract _initAccountState(accountState: AccountState): Promise<AccountState>;

  protected abstract _changeAccountState(
    prevState: AccountState,
    newState: AccountState,
  ): Promise<AccountStateChangeResult>;
}
