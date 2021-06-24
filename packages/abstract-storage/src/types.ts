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
  power: bigint;
  lockedPower: bigint;
  energy: bigint;
  energyChangedAt: number;
}

export type AccountStateChangeResult = {
  successful: boolean;
  currentState: AccountState;
};

export interface StorageProvider {
  saveAccount(account: Account): Promise<Account>;

  getAccount(id: string): Promise<Account | null>;

  initAccountState(accountState: AccountState): Promise<AccountState>;

  changeAccountState(prevState: AccountState, newState: AccountState): Promise<AccountStateChangeResult>;

  getAccountState(serviceId: string, accountId: string): Promise<AccountState | null>;
}
