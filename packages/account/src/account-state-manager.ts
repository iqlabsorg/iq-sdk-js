import { AccountState, AccountStateChangeResult, StorageProvider } from '@iqprotocol/abstract-storage';
import { AccountID, BlockchainProvider, AccountState as OnChainAccountState } from '@iqprotocol/abstract-blockchain';

export type OnChainAccountStateReader = Pick<BlockchainProvider, 'getAccountState'>;

export interface AccountStateManagerConfig {
  blockchain: OnChainAccountStateReader;
  store: StorageProvider;
}

export class AccountStateManager {
  private readonly blockchain: OnChainAccountStateReader;
  private readonly store: StorageProvider;

  constructor({ blockchain, store }: AccountStateManagerConfig) {
    this.blockchain = blockchain;
    this.store = store;
  }

  async initAccountState({
    serviceId,
    accountId,
    power,
    lockedPower,
    energyCap,
    energy,
    energyCalculatedAt,
  }: Omit<AccountState, 'serviceId' | 'accountId'> & {
    serviceId: AccountID;
    accountId: AccountID;
  }): Promise<AccountState> {
    this.validateSameChain(serviceId, accountId);
    return this.store.initAccountState({
      serviceId: serviceId.toString(),
      accountId: accountId.toString(),
      power,
      lockedPower,
      energyCap,
      energy,
      energyCalculatedAt,
    });
  }

  async initAccountStateFromBlockchain(serviceId: AccountID, accountId: AccountID): Promise<AccountState> {
    this.validateSameChain(serviceId, accountId);
    try {
      const { balance, energy, timestamp } = await this.getBlockchainAccountState(serviceId, accountId);
      return await this.initAccountState({
        serviceId,
        accountId,
        power: balance.toBigInt(),
        lockedPower: 0n,
        energyCap: energy.toBigInt(),
        energy: energy.toBigInt(),
        energyCalculatedAt: timestamp,
      });
    } catch (e) {
      throw new Error(`Failed to initialize account state. ${e}`);
    }
  }

  async getBlockchainAccountState(serviceId: AccountID, accountId: AccountID): Promise<OnChainAccountState> {
    return this.blockchain.getAccountState(serviceId.address, accountId.address);
  }

  async getAccountState(serviceId: AccountID, accountId: AccountID): Promise<AccountState | null> {
    return this.store.getAccountState(serviceId.toString(), accountId.toString());
  }

  async getInitializedAccountState(serviceId: AccountID, accountId: AccountID): Promise<AccountState> {
    this.validateSameChain(serviceId, accountId);
    const currentState = await this.getAccountState(serviceId, accountId);
    return currentState ? currentState : this.initAccountStateFromBlockchain(serviceId, accountId);
  }

  async increasePower(
    serviceId: AccountID,
    accountId: AccountID,
    power: bigint,
    timestamp: Date,
  ): Promise<AccountStateChangeResult> {
    return this.changePower(serviceId, accountId, power, timestamp);
  }

  async decreasePower(
    serviceId: AccountID,
    accountId: AccountID,
    power: bigint,
    timestamp: Date,
  ): Promise<AccountStateChangeResult> {
    return this.changePower(serviceId, accountId, -power, timestamp);
  }

  async lockPower(
    serviceId: AccountID,
    accountId: AccountID,
    power: bigint,
    timestamp: Date,
  ): Promise<AccountStateChangeResult> {
    return this.changeLockedPower(serviceId, accountId, power, timestamp);
  }

  async unlockPower(
    serviceId: AccountID,
    accountId: AccountID,
    power: bigint,
    timestamp: Date,
  ): Promise<AccountStateChangeResult> {
    return this.changeLockedPower(serviceId, accountId, -power, timestamp);
  }

  async spendEnergy(
    serviceId: AccountID,
    accountId: AccountID,
    energy: bigint,
    timestamp: Date,
  ): Promise<AccountStateChangeResult> {
    const currentState = await this.getInitializedAccountState(serviceId, accountId);
    const newState = <AccountState>{
      ...currentState,
      energy: currentState.energy - energy,
      energyCalculatedAt: Math.floor(timestamp.getTime() / 1000),
    };
    return this.store.changeAccountState(currentState, newState);
  }

  protected async changeLockedPower(
    serviceId: AccountID,
    accountId: AccountID,
    lockedPowerDelta: bigint,
    timestamp: Date,
  ): Promise<AccountStateChangeResult> {
    const currentState = await this.getInitializedAccountState(serviceId, accountId);
    const newState = <AccountState>{
      ...currentState,
      lockedPower: currentState.lockedPower + lockedPowerDelta,
      energyCalculatedAt: Math.floor(timestamp.getTime() / 1000),
    };
    return this.store.changeAccountState(currentState, newState);
  }

  protected async changePower(
    serviceId: AccountID,
    accountId: AccountID,
    powerDelta: bigint,
    timestamp: Date,
  ): Promise<AccountStateChangeResult> {
    const currentState = await this.getInitializedAccountState(serviceId, accountId);
    const newState = <AccountState>{
      ...currentState,
      power: currentState.power + powerDelta,
      energyCalculatedAt: Math.floor(timestamp.getTime() / 1000),
    };
    return this.store.changeAccountState(currentState, newState);
  }

  protected validateSameChain(id1: AccountID, id2: AccountID): void {
    if (id1.chainId.toString() !== id2.chainId.toString()) {
      throw new Error('Chain ID mismatch');
    }
  }
}
