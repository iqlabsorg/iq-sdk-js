import { AccountState, AccountStateChangeResult, StorageProvider } from '@iqprotocol/abstract-storage';
import { AccountID, AccountState as OnChainAccountState, BlockchainProvider } from '@iqprotocol/abstract-blockchain';
import { calculateEnergyCap } from '@iqprotocol/energy';

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
    gapHalvingPeriod,
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
      gapHalvingPeriod,
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
      const { gapHalvingPeriod } = await this.blockchain.getServiceInfo(serviceId.address);

      return await this.initAccountState({
        serviceId,
        accountId,
        gapHalvingPeriod,
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

  async deleteAccountState(serviceId: AccountID, accountId: AccountID): Promise<boolean> {
    return this.store.deleteAccountState(serviceId.toString(), accountId.toString());
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
    return this.changeState(serviceId, accountId, 'power', power, timestamp);
  }

  async decreasePower(
    serviceId: AccountID,
    accountId: AccountID,
    power: bigint,
    timestamp: Date,
  ): Promise<AccountStateChangeResult> {
    return this.changeState(serviceId, accountId, 'power', -power, timestamp);
  }

  async lockPower(
    serviceId: AccountID,
    accountId: AccountID,
    power: bigint,
    timestamp: Date,
  ): Promise<AccountStateChangeResult> {
    return this.changeState(serviceId, accountId, 'lockedPower', power, timestamp);
  }

  async unlockPower(
    serviceId: AccountID,
    accountId: AccountID,
    power: bigint,
    timestamp: Date,
  ): Promise<AccountStateChangeResult> {
    return this.changeState(serviceId, accountId, 'lockedPower', -power, timestamp);
  }

  async spendEnergy(
    serviceId: AccountID,
    accountId: AccountID,
    energy: bigint,
    timestamp: Date,
  ): Promise<AccountStateChangeResult> {
    return this.changeState(serviceId, accountId, 'energy', -energy, timestamp);
  }

  protected calculateEnergy(params: {
    power: bigint;
    prevEnergy: bigint;
    gapHalvingPeriod: number;
    t0: number;
    t1: number;
  }): bigint {
    const { power, prevEnergy, gapHalvingPeriod, t0, t1 } = params;
    return prevEnergy + BigInt(power * (BigInt(t1) - BigInt(t0))) / BigInt(gapHalvingPeriod * 4);
  }

  protected async changeState(
    serviceId: AccountID,
    accountId: AccountID,
    key: 'power' | 'lockedPower' | 'energy',
    delta: bigint,
    timestamp: Date,
  ): Promise<AccountStateChangeResult> {
    const state = await this.getInitializedAccountState(serviceId, accountId);
    let { power, lockedPower } = state;
    let availablePower = power - lockedPower;

    if (key === 'power') {
      power += delta;
      availablePower += delta;
    } else if (key === 'lockedPower') {
      lockedPower += delta;
      availablePower -= delta;
    }

    // Re-calculate energy
    const stateChangeTime = Math.floor(timestamp.getTime() / 1000);
    const energyCalculationParams = {
      power: availablePower,
      gapHalvingPeriod: state.gapHalvingPeriod,
      t0: state.energyCalculatedAt,
      t1: stateChangeTime,
    };
    const energyCap = calculateEnergyCap({ prevEnergyCap: state.energyCap, ...energyCalculationParams });
    const linearEnergy = this.calculateEnergy({ prevEnergy: state.energy, ...energyCalculationParams });
    let energy = linearEnergy < energyCap ? linearEnergy : energyCap; // min(linearEnergy, energyCap)

    if (key === 'energy') {
      if (delta > 0) {
        throw new Error('Positive energy delta is not allowed');
      }
      energy += delta;
    }

    // Prepare new state
    const newState: AccountState = {
      power,
      lockedPower,
      energyCap,
      energy,
      energyCalculatedAt: stateChangeTime,
      serviceId: state.serviceId,
      accountId: state.accountId,
      gapHalvingPeriod: state.gapHalvingPeriod,
    };

    return this.store.changeAccountState(state, newState);
  }

  protected validateSameChain(id1: AccountID, id2: AccountID): void {
    if (id1.chainId.toString() !== id2.chainId.toString()) {
      throw new Error('Chain ID mismatch');
    }
  }
}
