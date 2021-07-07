import { InMemoryStore } from '@iqprotocol/in-memory-storage';
import { Account, AccountState, AccountStateChangeResult } from '@iqprotocol/abstract-storage';
import { AccountStateManager, OnChainAccountStateReader } from '../src';
import { AccountID, AccountState as OnChainAccountState, BigNumber, ChainID } from '@iqprotocol/abstract-blockchain';

/**
 * @group unit
 */
describe('AccountStateManager', () => {
  const now = new Date();
  const timestamp = Math.floor(now.getTime() / 1000);
  const serviceAddress = '0x36F898881c06f636b7aFAAcA35d652Bc38261C4b';
  const accountAddress = '0xcC0070C1E41b82c95C5a76A564F78301b1B8b3CB';
  const onChainAccountState = <OnChainAccountState>{
    serviceAddress,
    accountAddress,
    balance: BigNumber.from(10),
    energy: BigNumber.from(5),
    timestamp,
  };

  const onChainAccountStateReader: OnChainAccountStateReader = {
    getAccountState: jest.fn().mockResolvedValue(onChainAccountState),
  };
  const chainId = new ChainID({ namespace: 'eip155', reference: '1' });
  const serviceId = new AccountID({ chainId, address: serviceAddress });
  const accountId = new AccountID({ chainId, address: accountAddress });
  const account: Account = {
    id: accountId.toString(),
    data: {
      proof: { v: '1', sig: 'signature' },
    },
  };
  const accountState: AccountState = {
    accountId: account.id,
    serviceId: serviceId.toString(),
    power: 10n,
    lockedPower: 0n,
    energyCap: 5n,
    energy: 5n,
    energyCalculatedAt: timestamp,
  };

  let store: InMemoryStore;
  let accountStateManager: AccountStateManager;

  beforeEach(() => {
    store = new InMemoryStore();
    accountStateManager = new AccountStateManager({
      store,
      blockchain: onChainAccountStateReader,
    });
  });

  describe('When account is not registered', () => {
    it('throws upon increasing power', async () => {
      await expect(accountStateManager.increasePower(serviceId, accountId, 1n, now)).rejects.toThrow();
    });

    it('throws upon decreasing power', async () => {
      await expect(accountStateManager.decreasePower(serviceId, accountId, 1n, now)).rejects.toThrow();
    });

    it('throws upon locking power', async () => {
      await expect(accountStateManager.lockPower(serviceId, accountId, 1n, now)).rejects.toThrow();
    });

    it('throws upon unlocking power', async () => {
      await expect(accountStateManager.unlockPower(serviceId, accountId, 1n, now)).rejects.toThrow();
    });

    it('throws upon spending energy', async () => {
      await expect(accountStateManager.spendEnergy(serviceId, accountId, 1n, now)).rejects.toThrow();
    });
  });

  describe('When account is registered', () => {
    beforeEach(async () => {
      await store.saveAccount(account);
    });
    describe('When account state is not initialized', () => {
      it('returns null upon account state request', async () => {
        await expect(accountStateManager.getAccountState(serviceId, accountId)).resolves.toBeNull();
      });

      it('returns state from blockchain', async () => {
        await expect(accountStateManager.getBlockchainAccountState(serviceId, accountId)).resolves.toEqual(
          onChainAccountState,
        );
      });

      it('returns initialized state', async () => {
        await expect(accountStateManager.getInitializedAccountState(serviceId, accountId)).resolves.toEqual(
          accountState,
        );
      });

      it('increases power based on blockchain data', async () => {
        const result = await accountStateManager.increasePower(serviceId, accountId, 3n, now);
        expect(result).toEqual(<AccountStateChangeResult>{
          successful: true,
          currentState: { ...accountState, power: accountState.power + 3n },
        });
      });

      it('decreases power based on blockchain data', async () => {
        const result = await accountStateManager.decreasePower(serviceId, accountId, 3n, now);
        expect(result).toEqual(<AccountStateChangeResult>{
          successful: true,
          currentState: { ...accountState, power: accountState.power - 3n },
        });
      });

      it('locks power based on blockchain data', async () => {
        const result = await accountStateManager.lockPower(serviceId, accountId, 3n, now);
        expect(result).toEqual(<AccountStateChangeResult>{
          successful: true,
          currentState: { ...accountState, lockedPower: accountState.lockedPower + 3n },
        });
      });

      it('throws upon unlocking power', async () => {
        await expect(accountStateManager.unlockPower(serviceId, accountId, 1n, now)).rejects.toThrow();
      });

      describe('When account state is initialized', () => {
        let initialState: AccountState;
        beforeEach(async () => {
          initialState = { ...accountState, power: 15n, lockedPower: 7n };
          await store.initAccountState(initialState);
        });

        it('returns correct state', async () => {
          await expect(accountStateManager.getAccountState(serviceId, accountId)).resolves.toEqual(initialState);
        });

        it('returns initialized state', async () => {
          await expect(accountStateManager.getInitializedAccountState(serviceId, accountId)).resolves.toEqual(
            initialState,
          );
        });

        it('increases power based on stored data', async () => {
          const result = await accountStateManager.increasePower(serviceId, accountId, 3n, now);
          expect(result).toEqual(<AccountStateChangeResult>{
            successful: true,
            currentState: { ...initialState, power: initialState.power + 3n },
          });
        });

        it('decreases power based on stored data', async () => {
          const result = await accountStateManager.decreasePower(serviceId, accountId, 3n, now);
          expect(result).toEqual(<AccountStateChangeResult>{
            successful: true,
            currentState: { ...initialState, power: initialState.power - 3n },
          });
        });

        it('locks power based on stored data', async () => {
          const result = await accountStateManager.lockPower(serviceId, accountId, 3n, now);
          expect(result).toEqual(<AccountStateChangeResult>{
            successful: true,
            currentState: { ...initialState, lockedPower: initialState.lockedPower + 3n },
          });
        });

        it('unlocks power based on stored data', async () => {
          const result = await accountStateManager.unlockPower(serviceId, accountId, 3n, now);
          expect(result).toEqual(<AccountStateChangeResult>{
            successful: true,
            currentState: { ...initialState, lockedPower: initialState.lockedPower - 3n },
          });
        });
      });
    });
  });
});
