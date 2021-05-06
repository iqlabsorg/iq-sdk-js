import { Account, AccountState, InMemoryStore } from '../src';

/**
 * @group unit
 */
describe('InMemoryStore', () => {
  let store: InMemoryStore;

  const account: Account = {
    id: 'test-id',
    data: {
      proof: 'test-proof',
    },
  };

  const accountState: AccountState = {
    accountId: account.id,
    serviceId: 'test-service',
    balance: 10n,
    energy: 5n,
    energyChangedAt: Math.floor(Date.now() / 1000),
  };

  describe('When the store is empty', () => {
    beforeEach(() => {
      store = new InMemoryStore();
    });

    it('does not return account data', async () => {
      await expect(store.getAccount(account.id)).resolves.toBeNull();
    });
    it('does not return account state', async () => {
      await expect(store.getAccountState(accountState.accountId, accountState.serviceId)).resolves.toBeNull();
    });

    it('saves account', async () => {
      await store.saveAccount(account);
      await expect(store.getAccount(account.id)).resolves.toEqual(account);
    });

    it('does not allow to save non-existent account state', async () => {
      await expect(store.saveAccountState(accountState)).rejects.toThrow();
    });
  });

  describe('When account is stored', () => {
    beforeEach(() => {
      store = new InMemoryStore([account]);
    });

    it('returns account data', async () => {
      await expect(store.getAccount(account.id)).resolves.toEqual(account);
    });

    it('saves account data with the same values', async () => {
      await store.saveAccount(account);
      await expect(store.getAccount(account.id)).resolves.toEqual(account);
    });

    it('updates account data', async () => {
      const updatedAccount = {
        ...account,
        data: {
          proof: 'updated-proof',
          newKey: { list: ['a', 'b'], number: 42 },
        },
      };
      await store.saveAccount(updatedAccount);
      await expect(store.getAccount(account.id)).resolves.toEqual(updatedAccount);
    });

    it('saves account state', async () => {
      await store.saveAccountState(accountState);
      await expect(store.getAccountState(accountState.accountId, accountState.serviceId)).resolves.toEqual(
        accountState,
      );
    });

    it('validates account state before insert', async () => {
      await expect(store.saveAccountState({ ...accountState, balance: -5n })).rejects.toThrow('Negative balance');
      await expect(store.getAccountState(accountState.accountId, accountState.serviceId)).resolves.toBeNull();
    });
  });

  describe('When account state is stored', () => {
    beforeEach(() => {
      store = new InMemoryStore([account], [accountState]);
    });

    it('returns account state', async () => {
      await expect(store.getAccountState(accountState.accountId, accountState.serviceId)).resolves.toEqual(
        accountState,
      );
    });

    it('updates account state', async () => {
      const updatedState = {
        ...accountState,
        balance: 15n,
        energy: 2n,
        energyChangedAt: Number(Date.now() / 1000),
      };
      await store.saveAccountState(updatedState);
      await expect(store.getAccountState(accountState.accountId, accountState.serviceId)).resolves.toEqual(
        updatedState,
      );
    });

    it('validates account state before update', async () => {
      await expect(store.saveAccountState({ ...accountState, balance: -5n })).rejects.toThrow('Negative balance');
      await expect(store.getAccountState(accountState.accountId, accountState.serviceId)).resolves.toEqual(
        accountState,
      );
    });
  });
});
