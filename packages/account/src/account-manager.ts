import { Account, AccountData, StorageProvider } from '@iqprotocol/abstract-storage';
import { AccountID } from '@iqprotocol/abstract-blockchain';

export interface AccountManagerConfig {
  store: StorageProvider;
}

export class AccountManager {
  private readonly store: StorageProvider;

  constructor({ store }: AccountManagerConfig) {
    this.store = store;
  }

  async resister(accountId: AccountID, data: AccountData): Promise<Account> {
    const existingAccount = await this.getAccount(accountId);
    if (existingAccount) {
      throw new Error('Already registered');
    }

    return this.store.saveAccount({
      id: accountId.toString(),
      data,
    });
  }

  async getAccount(accountId: AccountID): Promise<Account | null> {
    return this.store.getAccount(accountId.toString());
  }
}
