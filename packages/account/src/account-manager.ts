import { Account, AccountData, AccountOwnershipProof, StorageProvider } from '@iqprotocol/abstract-storage';
import { AccountID } from '@iqprotocol/abstract-blockchain';
import { AccountOwnershipVerifier } from './account-ownership-verifier';

export interface AccountManagerConfig {
  store: StorageProvider;
}

export interface AccountRegistrationParams {
  proof: AccountOwnershipProof;
}

export class AccountManager {
  private readonly store: StorageProvider;

  constructor({ store }: AccountManagerConfig) {
    this.store = store;
  }

  async register(accountId: AccountID, { proof }: AccountRegistrationParams): Promise<Account> {
    const ownershipClaim = AccountOwnershipVerifier.generateAccountOwnershipClaim(accountId, proof.v);
    if (!AccountOwnershipVerifier.verifyAccountOwnershipClaimSignature(accountId, ownershipClaim, proof.sig)) {
      throw new Error('Account ownership verification failed');
    }

    return this.createAccount(accountId, { proof });
  }

  async getAccount(accountId: AccountID): Promise<Account | null> {
    return this.store.getAccount(accountId.toString());
  }

  async deleteAccount(accountId: AccountID): Promise<boolean> {
    return this.store.deleteAccount(accountId.toString());
  }

  async createAccount(accountId: AccountID, data: AccountData): Promise<Account> {
    const existingAccount = await this.getAccount(accountId);
    if (existingAccount) {
      throw new Error('Account already exists');
    }

    return this.store.saveAccount({
      id: accountId.toString(),
      data,
    });
  }
}
