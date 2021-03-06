export type Account = {
  id: string;
  data: AccountData;
};

export type AccountOwnershipProof = {
  v: string;
  sig: string;
};

export type AccountData = Serializable & {
  proof: AccountOwnershipProof;
  // authorizedKeys?: string[]; // todo: consider JWK compatible type
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

export type AccountState = {
  serviceId: string;
  accountId: string;
  energyGapHalvingPeriod: number;
  power: bigint;
  lockedPower: bigint;
  energyCap: bigint;
  energy: bigint;
  energyCalculatedAt: number;
};

export type AccountStateChangeResult = {
  successful: boolean;
  currentState: AccountState;
};

export interface AccountStateValidator {
  validateAccount(account: Account): void;
  validateAccountState(accountState: AccountState): void;
}

export interface StorageProvider {
  saveAccount(account: Account): Promise<Account>;

  deleteAccount(id: string): Promise<boolean>;

  getAccount(id: string): Promise<Account | null>;

  initAccountState(accountState: AccountState): Promise<AccountState>;

  changeAccountState(prevState: AccountState, newState: AccountState): Promise<AccountStateChangeResult>;

  getAccountState(serviceId: string, accountId: string): Promise<AccountState | null>;

  deleteAccountState(serviceId: string, accountId: string): Promise<boolean>;
}
