export interface Account {
  id: string;
  data: AccountData;
}

export type AccountData = Serializable & {
  proof?: string;
  authorizedKeys?: string[]; // todo: consider explicit JWK compatible type
};

type Serializable =
  | boolean
  | number
  | string
  | null
  | readonly Serializable[]
  | {
      [key: string]: Serializable | undefined;
    };

export interface AccountState {
  serviceId: string;
  accountId: string;
  balance: bigint;
  energy: bigint;
  energyChangedAt: number;
}

export interface StorageProvider {
  saveAccount(account: Account): Promise<void>;

  getAccount(id: string): Promise<Account | null>;

  saveAccountState(accountState: AccountState): Promise<void>;

  getAccountState(
    accountId: string,
    serviceId: string,
  ): Promise<AccountState | null>;
}
