import { AccountState, AccountStateChangeResult, StorageProvider } from '@iqprotocol/abstract-storage';
import { AccountId, AccountState as OnChainAccountState, BlockchainProvider } from '@iqprotocol/abstract-blockchain';
import { calculateEffectiveEnergy } from '@iqprotocol/energy';

export interface AccountStateManagerConfig {
  blockchain: BlockchainProvider;
  store: StorageProvider;
}

export class AccountStateManager {
  private readonly blockchain: BlockchainProvider;
  private readonly store: StorageProvider;

  constructor({ blockchain, store }: AccountStateManagerConfig) {
    this.blockchain = blockchain;
    this.store = store;
  }

  async initAccountState({
    serviceId,
    accountId,
    energyGapHalvingPeriod,
    power,
    lockedPower,
    energyCap,
    energy,
    energyCalculatedAt,
  }: Omit<AccountState, 'serviceId' | 'accountId'> & {
    serviceId: AccountId;
    accountId: AccountId;
  }): Promise<AccountState> {
    this.validateSameChain(serviceId, accountId);
    return this.store.initAccountState({
      serviceId: serviceId.toString(),
      accountId: accountId.toString(),
      energyGapHalvingPeriod,
      power,
      lockedPower,
      energyCap,
      energy,
      energyCalculatedAt,
    });
  }

  async initAccountStateFromBlockchain(serviceId: AccountId, accountId: AccountId): Promise<AccountState> {
    this.validateSameChain(serviceId, accountId);
    try {
      const { balance, energy, timestamp } = await this.getBlockchainAccountState(serviceId, accountId);
      const { energyGapHalvingPeriod } = await this.blockchain.service(serviceId.address).getInfo();

      return await this.initAccountState({
        serviceId,
        accountId,
        energyGapHalvingPeriod,
        power: balance.toBigInt(),
        lockedPower: 0n,
        energyCap: energy.toBigInt(),
        energy: energy.toBigInt(),
        energyCalculatedAt: timestamp,
      });
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Failed to initialize account state. ${e}`);
    }
  }

  async getBlockchainAccountState(serviceId: AccountId, accountId: AccountId): Promise<OnChainAccountState> {
    return this.blockchain.service(serviceId.address).getAccountState(accountId.address);
  }

  async getAccountState(serviceId: AccountId, accountId: AccountId): Promise<AccountState | null> {
    return this.store.getAccountState(serviceId.toString(), accountId.toString());
  }

  async deleteAccountState(serviceId: AccountId, accountId: AccountId): Promise<boolean> {
    return this.store.deleteAccountState(serviceId.toString(), accountId.toString());
  }

  async getInitializedAccountState(serviceId: AccountId, accountId: AccountId): Promise<AccountState> {
    this.validateSameChain(serviceId, accountId);
    const currentState = await this.getAccountState(serviceId, accountId);
    return currentState ? currentState : this.initAccountStateFromBlockchain(serviceId, accountId);
  }

  async increasePower(
    serviceId: AccountId,
    accountId: AccountId,
    power: bigint,
    timestamp: Date,
  ): Promise<AccountStateChangeResult> {
    return this.changeState(serviceId, accountId, 'power', power, timestamp);
  }

  async decreasePower(
    serviceId: AccountId,
    accountId: AccountId,
    power: bigint,
    timestamp: Date,
  ): Promise<AccountStateChangeResult> {
    return this.changeState(serviceId, accountId, 'power', -power, timestamp);
  }

  async lockPower(
    serviceId: AccountId,
    accountId: AccountId,
    power: bigint,
    timestamp: Date,
  ): Promise<AccountStateChangeResult> {
    return this.changeState(serviceId, accountId, 'lockedPower', power, timestamp);
  }

  async unlockPower(
    serviceId: AccountId,
    accountId: AccountId,
    power: bigint,
    timestamp: Date,
  ): Promise<AccountStateChangeResult> {
    return this.changeState(serviceId, accountId, 'lockedPower', -power, timestamp);
  }

  async spendEnergy(
    serviceId: AccountId,
    accountId: AccountId,
    energy: bigint,
    timestamp: Date,
  ): Promise<AccountStateChangeResult> {
    return this.changeState(serviceId, accountId, 'energy', -energy, timestamp);
  }

  protected async changeState(
    serviceId: AccountId,
    accountId: AccountId,
    key: 'power' | 'lockedPower' | 'energy',
    delta: bigint,
    timestamp: Date,
  ): Promise<AccountStateChangeResult> {
    const state = await this.getInitializedAccountState(serviceId, accountId);
    let { power, lockedPower } = state;
    let effectivePower = power - lockedPower;

    if (key === 'power') {
      power += delta;
      effectivePower += delta;
    } else if (key === 'lockedPower') {
      lockedPower += delta;
      effectivePower -= delta;
    }

    // Re-calculate energy
    const stateChangeTime = Math.floor(timestamp.getTime() / 1000);
    const effective = calculateEffectiveEnergy({
      energy: state.energy,
      energyCap: state.energyCap,
      power: effectivePower,
      gapHalvingPeriod: state.energyGapHalvingPeriod,
      t0: state.energyCalculatedAt,
      t1: stateChangeTime,
    });

    if (key === 'energy') {
      if (delta > 0) {
        // Energy cannot be increased directly
        throw new Error('Positive energy delta is not allowed');
      }
      effective.energy += delta;
    }

    // Prepare new state
    const newState: AccountState = {
      power,
      lockedPower,
      energyCap: effective.energyCap,
      energy: effective.energy,
      energyCalculatedAt: stateChangeTime,
      serviceId: state.serviceId,
      accountId: state.accountId,
      energyGapHalvingPeriod: state.energyGapHalvingPeriod,
    };

    return this.store.changeAccountState(state, newState);
  }

  protected validateSameChain(id1: AccountId, id2: AccountId): void {
    if (id1.chainId.toString() !== id2.chainId.toString()) {
      throw new Error('Chain ID mismatch');
    }
  }
}
