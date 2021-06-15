import { PostgresStore } from '../src';
import { Account, AccountState, AccountStateValidator } from '@iqprotocol/abstract-storage';
import { createMockPool, createMockQueryResult } from 'slonik';

/**
 * @group unit
 */
describe('Postgres Store', () => {
  let store: PostgresStore;

  const account: Account = {
    id: 'test-id',
    data: {
      proof: 'test-proof',
    },
  };

  const accountState: AccountState = {
    accountId: 'account-id',
    serviceId: 'test-service',
    power: 10n,
    lockedPower: 0n,
    energy: 5n,
    energyChangedAt: Math.floor(Date.now() / 1000),
  };

  describe('When custom validator is provided', () => {
    const validator: AccountStateValidator = {
      validateAccount: () => jest.fn(),
      validateAccountState: () => jest.fn(),
    };
    beforeEach(() => {
      const pool = createMockPool({
        // eslint-disable-next-line @typescript-eslint/require-await
        query: async () => createMockQueryResult([]),
      });
      store = new PostgresStore({ pool, accountTable: '', stateTable: '', validator });
    });

    it('uses custom validator to validate account', async () => {
      const spy = jest.spyOn(validator, 'validateAccount');
      await store.saveAccount(account);
      expect(spy).toHaveBeenCalledWith(account);
    });

    it('uses custom validator to validate account state', async () => {
      const spy = jest.spyOn(validator, 'validateAccountState');
      await store.saveAccountState(accountState);
      expect(spy).toHaveBeenCalledWith(accountState);
    });
  });
});
