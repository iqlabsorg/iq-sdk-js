import { InMemoryStore } from '@iqprotocol/in-memory-storage';
import { Account, AccountState, AccountStateChangeResult } from '@iqprotocol/abstract-storage';
import { AccountStateManager } from '../src';
import {
  AccountId,
  AccountState as OnChainAccountState,
  BigNumber,
  ChainId,
  ServiceInfo,
} from '@iqprotocol/abstract-blockchain';
import { EIP155BlockchainProvider, VoidSigner } from '@iqprotocol/eip155';

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
    balance: BigNumber.from(1000),
    energy: BigNumber.from(500),
    timestamp,
  };

  const onChainServiceInfo: ServiceInfo = {
    address: serviceAddress,
    name: 'Test Service',
    symbol: 'TST',
    baseRate: BigNumber.from(1),
    minGCFee: BigNumber.from(1),
    gapHalvingPeriod: 3600,
    index: 0,
    baseToken: '0x6238F38c32fd76E3189D1EAd943B8342Ff33055D',
    minLoanDuration: 3600,
    maxLoanDuration: 864000,
    serviceFeePercent: 5000,
    allowsPerpetual: false,
  };

  const chainId = new ChainId({ namespace: 'eip155', reference: '1' });
  const serviceId = new AccountId({ chainId, address: serviceAddress });
  const accountId = new AccountId({ chainId, address: accountAddress });
  const account: Account = {
    id: accountId.toString(),
    data: {
      proof: { v: '1', sig: 'signature' },
    },
  };
  const accountState: AccountState = {
    accountId: account.id,
    serviceId: serviceId.toString(),
    gapHalvingPeriod: onChainServiceInfo.gapHalvingPeriod,
    power: 1000n,
    lockedPower: 0n,
    energyCap: 500n,
    energy: 500n,
    energyCalculatedAt: timestamp,
  };

  let store: InMemoryStore;
  let accountStateManager: AccountStateManager;

  beforeEach(() => {
    store = new InMemoryStore();

    const blockchainProvider = new EIP155BlockchainProvider({
      signer: new VoidSigner('0x4429CeB244B101926b3780c6ee906139c0f0eEf1'), // random address
    });

    jest.spyOn(blockchainProvider, 'getAccountState').mockResolvedValue(onChainAccountState);
    jest.spyOn(blockchainProvider, 'getServiceInfo').mockResolvedValue(onChainServiceInfo);

    accountStateManager = new AccountStateManager({
      store,
      blockchain: blockchainProvider,
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
        const delta = 300n;
        const result = await accountStateManager.increasePower(serviceId, accountId, delta, now);
        expect(result).toEqual(<AccountStateChangeResult>{
          successful: true,
          currentState: { ...accountState, power: accountState.power + delta },
        });
      });

      it('decreases power based on blockchain data', async () => {
        const delta = 300n;
        const result = await accountStateManager.decreasePower(serviceId, accountId, delta, now);
        expect(result).toEqual(<AccountStateChangeResult>{
          successful: true,
          currentState: { ...accountState, power: accountState.power - delta },
        });
      });

      it('locks power based on blockchain data', async () => {
        const delta = 300n;
        const result = await accountStateManager.lockPower(serviceId, accountId, delta, now);
        expect(result).toEqual(<AccountStateChangeResult>{
          successful: true,
          currentState: { ...accountState, lockedPower: accountState.lockedPower + delta },
        });
      });

      it('spends energy based on blockchain data', async () => {
        const result = await accountStateManager.spendEnergy(serviceId, accountId, 255n, now);
        expect(result).toEqual(<AccountStateChangeResult>{
          successful: true,
          currentState: {
            ...accountState,
            energy: 245n,
            energyCap: 500n,
          },
        });
      });

      it('throws upon unlocking power', async () => {
        await expect(accountStateManager.unlockPower(serviceId, accountId, 1n, now)).rejects.toThrow();
      });

      describe('When account state is initialized', () => {
        let initialState: AccountState;
        const changeTimestamp = timestamp + onChainServiceInfo.gapHalvingPeriod;
        const changeDate = new Date(changeTimestamp * 1000);
        beforeEach(async () => {
          initialState = { ...accountState, power: 1500n, lockedPower: 700n };
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
          const delta = 300n;
          const result = await accountStateManager.increasePower(serviceId, accountId, delta, changeDate);
          expect(result).toEqual(<AccountStateChangeResult>{
            successful: true,
            currentState: {
              ...initialState,
              power: initialState.power + delta,
              energy: 775n,
              energyCap: 800n,
              energyCalculatedAt: changeTimestamp,
            },
          });
        });

        it('decreases power based on stored data', async () => {
          const delta = 300n;
          const result = await accountStateManager.decreasePower(serviceId, accountId, delta, changeDate);
          expect(result).toEqual(<AccountStateChangeResult>{
            successful: true,
            currentState: {
              ...initialState,
              power: initialState.power - delta,
              energy: 500n,
              energyCap: 500n,
              energyCalculatedAt: changeTimestamp,
            },
          });
        });

        it('locks power based on stored data', async () => {
          const delta = 500n;
          const result = await accountStateManager.lockPower(serviceId, accountId, delta, changeDate);
          expect(result).toEqual(<AccountStateChangeResult>{
            successful: true,
            currentState: {
              ...initialState,
              lockedPower: initialState.lockedPower + delta,
              energy: 400n,
              energyCap: 400n,
              energyCalculatedAt: changeTimestamp,
            },
          });
        });

        it('unlocks power based on stored data', async () => {
          const delta = 650n;
          const result = await accountStateManager.unlockPower(serviceId, accountId, delta, changeDate);
          expect(result).toEqual(<AccountStateChangeResult>{
            successful: true,
            currentState: {
              ...initialState,
              energy: 862n,
              energyCap: 975n,
              lockedPower: initialState.lockedPower - delta,
              energyCalculatedAt: changeTimestamp,
            },
          });
        });

        it('spends energy based on stored data', async () => {
          const result = await accountStateManager.spendEnergy(serviceId, accountId, 255n, changeDate);
          expect(result).toEqual(<AccountStateChangeResult>{
            successful: true,
            currentState: {
              ...initialState,
              energy: 395n,
              energyCap: 650n,
              energyCalculatedAt: changeTimestamp,
            },
          });
        });

        it('allows to delete account state for specific service', async () => {
          await expect(accountStateManager.deleteAccountState(serviceId, accountId)).resolves.toEqual(true);
          await expect(accountStateManager.getAccountState(serviceId, accountId)).resolves.toBeNull();
          await expect(accountStateManager.deleteAccountState(serviceId, accountId)).resolves.toEqual(false);
        });
      });
    });
  });
});
