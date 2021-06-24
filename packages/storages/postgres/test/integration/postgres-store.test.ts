import * as path from 'path';
import { Account, AccountState, AccountStateChangeResult, AccountStateValidator } from '@iqprotocol/abstract-storage';
import { PostgresStore } from '../../src';
import { createPool, DatabasePoolType } from 'slonik';
import { ensureDatabase, expectCorrectDatabaseStructure, truncateTables } from './support/utils';
import { DockerComposeEnvironment, StartedDockerComposeEnvironment } from 'testcontainers';

/**
 * @group integration
 */
describe('PostgresStore', () => {
  const CONNECTION_URI = 'postgresql://postgres@localhost:5432';
  const TEST_DATABASE_NAME = 'iqprotocol-testing';
  const accountTable = 'account';
  const stateTable = 'state';

  const account: Account = {
    id: 'test-id',
    data: {
      proof: 'test-proof',
    },
  };

  const accountState: AccountState = {
    accountId: account.id,
    serviceId: 'test-service',
    power: 10n,
    lockedPower: 2n,
    energy: 5n,
    energyChangedAt: Math.floor(Date.now() / 1000),
  };

  // see: https://github.com/testcontainers/testcontainers-node#docker-compose
  let environment: StartedDockerComposeEnvironment;
  let pool: DatabasePoolType;
  let store: PostgresStore;

  beforeAll(async () => {
    environment = await new DockerComposeEnvironment(path.resolve(__dirname, 'support'), 'docker-compose.yml')
      .withEnv('POSTGRES_DB', TEST_DATABASE_NAME)
      .up();

    await ensureDatabase(CONNECTION_URI, TEST_DATABASE_NAME);

    pool = createPool(`${CONNECTION_URI}/${TEST_DATABASE_NAME}`, {
      maximumPoolSize: 1,
    });

    store = new PostgresStore({ pool });
  });

  afterAll(async () => {
    await pool.end();
    await environment.down();
  });

  describe('When the store is not initialized', () => {
    it('initializes correct database structure with default table names', async () => {
      await store.init();
      await expectCorrectDatabaseStructure(pool, { accountTable, stateTable });
    });

    it('initializes correct database structure with custom table names', async () => {
      const accountTable = 'custom-account-table';
      const stateTable = 'custom-state-table';
      const store = new PostgresStore({ pool, accountTable, stateTable });
      await store.init();
      await expectCorrectDatabaseStructure(pool, { accountTable, stateTable });
    });
  });

  describe('When the store is empty', () => {
    beforeEach(async () => {
      await store.init();
      await truncateTables(pool, [accountTable, stateTable]);
    });

    it('does not return account data', async () => {
      await expect(store.getAccount(account.id)).resolves.toBeNull();
    });

    it('does not return account state', async () => {
      await expect(store.getAccountState(accountState.serviceId, accountState.accountId)).resolves.toBeNull();
    });

    it('saves account', async () => {
      const result = await store.saveAccount(account);
      expect(result).toMatchObject(account);
      await expect(store.getAccount(account.id)).resolves.toEqual(account);
    });

    it('does not allow to initialize non-existent account state', async () => {
      await expect(store.initAccountState(accountState)).rejects.toThrow();
    });

    describe('When account is stored', () => {
      beforeEach(async () => {
        await store.saveAccount(account);
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

      it('initializes account state', async () => {
        const result = await store.initAccountState(accountState);
        expect(result).toEqual(accountState);
        await expect(store.getAccountState(accountState.serviceId, accountState.accountId)).resolves.toEqual(
          accountState,
        );
      });

      describe('When account state is initialized', () => {
        beforeEach(async () => {
          await store.initAccountState(accountState);
        });

        it('throws error upon subsequent initialization', async () => {
          await expect(store.initAccountState(accountState)).rejects.toThrow();
        });

        it('returns account state', async () => {
          await expect(store.getAccountState(accountState.serviceId, accountState.accountId)).resolves.toEqual(
            accountState,
          );
        });

        it('updates account state and returns correct response', async () => {
          const newState = <AccountState>{
            ...accountState,
            power: 15n,
            energy: 2n,
            energyChangedAt: Number(Date.now() / 1000),
          };
          const stateChangeResult = await store.changeAccountState(accountState, newState);
          expect(stateChangeResult).toEqual(<AccountStateChangeResult>{
            successful: true,
            currentState: newState,
          });
          await expect(store.getAccountState(accountState.serviceId, accountState.accountId)).resolves.toEqual(
            newState,
          );
        });

        it('does not update state with incorrect previous state and returns correct response', async () => {
          const incorrectPrevState = <AccountState>{
            ...accountState,
            power: 15n,
          };
          const newState = {
            ...accountState,
            power: 20n,
          };
          const stateChangeResult = await store.changeAccountState(incorrectPrevState, newState);
          expect(stateChangeResult).toEqual(<AccountStateChangeResult>{
            successful: false,
            currentState: accountState,
          });
          await expect(store.getAccountState(accountState.serviceId, accountState.accountId)).resolves.toEqual(
            accountState,
          );
        });
      });
    });

    describe('When custom validator is provided', () => {
      const validator: AccountStateValidator = {
        validateAccount: () => jest.fn(),
        validateAccountState: () => jest.fn(),
      };
      beforeEach(async () => {
        store = new PostgresStore({ pool, accountTable, stateTable, validator });
        await store.saveAccount(account);
      });

      it('uses custom validator to validate account', async () => {
        const spy = jest.spyOn(validator, 'validateAccount');
        await store.saveAccount(account);
        expect(spy).toHaveBeenCalledWith(account);
      });

      it('uses custom validator to validate account state upon initialization', async () => {
        const spy = jest.spyOn(validator, 'validateAccountState');
        await store.initAccountState(accountState);
        expect(spy).toHaveBeenCalledWith(accountState);
      });

      it('uses custom validator to validate account state upon change', async () => {
        await store.initAccountState(accountState);
        const newState = { ...accountState, power: 20n };
        const spy = jest.spyOn(validator, 'validateAccountState');
        await store.changeAccountState(accountState, newState);
        expect(spy).toHaveBeenCalledWith(newState);
      });
    });
  });
});
