import { PostgresStore } from '../src';
import { AccountState } from '@iqprotocol/abstract-storage';
import { createMockPool, createMockQueryResult } from 'slonik';

/**
 * @group unit
 */
describe('Postgres Store', () => {
  let store: PostgresStore;

  const accountState: AccountState = {
    accountId: 'account-id',
    serviceId: 'test-service',
    balance: 10n,
    energy: 5n,
    energyChangedAt: Math.floor(Date.now() / 1000),
  };

  describe('When custom validator is provided', () => {
    const validator = { validateAccountState: () => jest.fn() };
    beforeEach(() => {
      const pool = createMockPool({
        // eslint-disable-next-line @typescript-eslint/require-await
        query: async () => createMockQueryResult([]),
      });
      store = new PostgresStore({ pool, accountTable: '', stateTable: '', validator });
    });

    it('uses provided validator to validate state', async () => {
      const spy = jest.spyOn(validator, 'validateAccountState');
      await store.saveAccountState(accountState);
      expect(spy).toHaveBeenCalledWith(accountState);
    });
  });
});