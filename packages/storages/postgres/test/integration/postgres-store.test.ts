import * as path from 'path';
import { Account, AccountState } from '@iqprotocol/abstract-storage';
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
  });

  beforeEach(() => {
    pool = createPool(`${CONNECTION_URI}/${TEST_DATABASE_NAME}`, {
      maximumPoolSize: 1,
    });

    store = new PostgresStore({ pool });
  });

  afterAll(async () => {
    await pool.end();
    await environment.down();
  });

  it('initializes correct database structure with default table names', async () => {
    await store.init();
    await expectCorrectDatabaseStructure(pool, { accountTable, stateTable });
  });

  it('initializes correct database structure with custome table names', async () => {
    const accountTable = 'custom-account-table';
    const stateTable = 'custom-state-table';
    const store = new PostgresStore({ pool, accountTable, stateTable });
    await store.init();
    await expectCorrectDatabaseStructure(pool, { accountTable, stateTable });
  });

  describe('When the store is empty', () => {
    beforeEach(async () => truncateTables(pool, [accountTable, stateTable]));

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
    beforeEach(async () => store.saveAccount(account));

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

    it('validates account state before insert', async () => {
      await expect(store.saveAccountState({ ...accountState, power: -5n })).rejects.toThrow();
      await expect(store.getAccountState(accountState.accountId, accountState.serviceId)).resolves.toBeNull();
    });

    it('saves account state', async () => {
      await store.saveAccountState(accountState);
      await expect(store.getAccountState(accountState.accountId, accountState.serviceId)).resolves.toEqual(
        accountState,
      );
    });
  });

  describe('When account state is stored', () => {
    beforeEach(async () => {
      await store.saveAccount(account);
      await store.saveAccountState(accountState);
    });

    it('returns account state', async () => {
      await expect(store.getAccountState(accountState.accountId, accountState.serviceId)).resolves.toEqual(
        accountState,
      );
    });

    it('validates account state before update', async () => {
      await expect(store.saveAccountState({ ...accountState, power: -5n })).rejects.toThrow();
      await expect(store.getAccountState(accountState.accountId, accountState.serviceId)).resolves.toEqual(
        accountState,
      );
    });

    it('updates account state', async () => {
      const updatedState = {
        ...accountState,
        power: 15n,
        energy: 2n,
        energyChangedAt: Number(Date.now() / 1000),
      };
      await store.saveAccountState(updatedState);
      await expect(store.getAccountState(accountState.accountId, accountState.serviceId)).resolves.toEqual(
        updatedState,
      );
    });
  });
});
