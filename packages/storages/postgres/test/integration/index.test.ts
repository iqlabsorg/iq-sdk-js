/**
 * @group integration
 */
import { PostgresStorage, PostgresStorageConfig } from '../../src';
import { createPool, DatabasePoolType, sql } from 'slonik';
import * as path from 'path';
import {
  DockerComposeEnvironment,
  StartedDockerComposeEnvironment,
} from 'testcontainers';

describe('@iqprotocol/postgres', () => {
  const CONNECTION_URI = 'postgresql://postgres@localhost:5432';
  const TEST_DATABASE_NAME = 'iqprotocol-testing';

  const config: PostgresStorageConfig = {
    connectionUri: `${CONNECTION_URI}/${TEST_DATABASE_NAME}`,
    accountTable: 'account',
    stateTable: 'state',
  };

  // see: https://github.com/testcontainers/testcontainers-node#docker-compose
  let environment: StartedDockerComposeEnvironment;

  beforeAll(async () => {
    environment = await new DockerComposeEnvironment(
      path.resolve(__dirname, 'support'),
      'docker-compose.yml',
    )
      .withEnv('POSTGRES_DB', TEST_DATABASE_NAME)
      .up();

    const pool0 = createPool(CONNECTION_URI, {
      maximumPoolSize: 1,
    });

    await pool0.connect(async connection => {
      await connection.query(sql`
      SELECT pg_terminate_backend(pid)
      FROM pg_stat_activity
      WHERE
        pid != pg_backend_pid() AND
        datname = ${TEST_DATABASE_NAME}
    `);
      await connection.query(
        sql`DROP DATABASE IF EXISTS ${sql.identifier([TEST_DATABASE_NAME])}`,
      );
      await connection.query(
        sql`CREATE DATABASE ${sql.identifier([TEST_DATABASE_NAME])}`,
      );
    });
    await pool0.end();
  });

  afterAll(async () => {
    await environment.down();
  });

  describe('PostgresStorage', () => {
    // isolated connection pool for utility operations & asserting
    let pool: DatabasePoolType;

    beforeAll(() => {
      pool = createPool(config.connectionUri, {
        maximumPoolSize: 1,
      });
    });

    afterAll(async () => {
      await pool.end();
    });

    it('creates required tables', async () => {
      const storage = new PostgresStorage(config);
      await storage.init();

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
  });
});
