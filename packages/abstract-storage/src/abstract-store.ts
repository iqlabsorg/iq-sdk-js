import { Account, AccountState, StorageProvider } from './types';
import { AccountStateValidator, DefaultValidator } from './validator';

export abstract class AbstractStore implements StorageProvider {
  private readonly validator: AccountStateValidator;

  protected constructor(validator?: AccountStateValidator) {
    this.validator = validator ?? new DefaultValidator();
  }

  async saveAccount(account: Account): Promise<void> {
    return this._saveAccount(account);
  }

  async saveAccountState(accountState: AccountState): Promise<void> {
    this.validator.validateAccountState(accountState);
    return this._saveAccountState(accountState);
  }

  abstract getAccount(id: string): Promise<Account | null>;

  abstract getAccountState(
    accountId: string,
    serviceId: string,
  ): Promise<AccountState | null>;

  protected abstract _saveAccount(account: Account): Promise<void>;

  protected abstract _saveAccountState(
    accountState: AccountState,
  ): Promise<void>;
}
