import * as path from 'path';
import { Account, AccountState } from '@iqprotocol/abstract-storage';
import { PostgresStorageConfig, PostgresStore } from '../../src';
import { createPool, DatabasePoolType, sql } from 'slonik';
import { ensureDatabase, truncateTables } from './support/utils';
import {
  DockerComposeEnvironment,
  StartedDockerComposeEnvironment,
} from 'testcontainers';

/**
 * @group integration
 */
describe('@iqprotocol/postgres', () => {
  const CONNECTION_URI = 'postgresql://postgres@localhost:5432';
  const TEST_DATABASE_NAME = 'iqprotocol-testing';

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

  const config: PostgresStorageConfig = {
    connectionUri: `${CONNECTION_URI}/${TEST_DATABASE_NAME}`,
    accountTable: 'account',
    stateTable: 'state',
  };

  // see: https://github.com/testcontainers/testcontainers-node#docker-compose
  let environment: StartedDockerComposeEnvironment;

  // isolated connection pool for utility operations & asserting
  let pool: DatabasePoolType;

  beforeAll(async () => {
    environment = await new DockerComposeEnvironment(
      path.resolve(__dirname, 'support'),
      'docker-compose.yml',
    )
      .withEnv('POSTGRES_DB', TEST_DATABASE_NAME)
      .up();

    await ensureDatabase(CONNECTION_URI, TEST_DATABASE_NAME);

    pool = createPool(config.connectionUri, {
      maximumPoolSize: 1,
    });
  });

  afterAll(async () => {
    await pool.end();
    await environment.down();
  });

  describe('PostgresStore', () => {
    let store: PostgresStore;

    beforeEach(() => {
      store = new PostgresStore(config);
    });

    it('creates required tables', async () => {
      await store.init();

      await pool.connect(async connection => {
        const count = await connection.oneFirst(
          sql`SELECT count(*) FROM information_schema.tables WHERE table_name IN (${sql.join(
            [config.accountTable, config.stateTable],
            sql`, `,
          )});`,
        );
        expect(count).toBe(2);
      });
    });

    describe('When the store is empty', () => {
      beforeEach(async () =>
        truncateTables(pool, [config.accountTable, config.stateTable]),
      );

      it('does not return account data', async () => {
        await expect(store.getAccount(account.id)).resolves.toBeNull();
      });

      it('does not return account state', async () => {
        await expect(
          store.getAccountState(accountState.accountId, accountState.serviceId),
        ).resolves.toBeNull();
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
        await expect(store.getAccount(account.id)).resolves.toEqual(
          updatedAccount,
        );
      });

      it('saves account state', async () => {
        await store.saveAccountState(accountState);
        await expect(
          store.getAccountState(accountState.accountId, accountState.serviceId),
        ).resolves.toEqual(accountState);
      });
    });

    describe('When account state is stored', () => {
      beforeEach(async () => {
        await store.saveAccount(account);
        await store.saveAccountState(accountState);
      });

      it('returns account state', async () => {
        await expect(
          store.getAccountState(accountState.accountId, accountState.serviceId),
        ).resolves.toEqual(accountState);
      });

      it('updates account state', async () => {
        const updatedState = {
          ...accountState,
          balance: 15n,
          energy: 2n,
          energyChangedAt: Number(Date.now() / 1000),
        };
        await store.saveAccountState(updatedState);
        await expect(
          store.getAccountState(accountState.accountId, accountState.serviceId),
        ).resolves.toEqual(updatedState);
      });
    });
  });
});
