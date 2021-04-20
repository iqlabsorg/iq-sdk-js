import { PostgresStorage, PostgresStorageConfig } from '../src';
import { createPool, sql } from 'slonik';

describe('@iqprotocol/postgres', () => {
  const CONNECTION_URI = 'postgresql://postgres@localhost:15432';
  const TEST_DATABASE_NAME = 'iqprotocol-testing';

  const config: PostgresStorageConfig = {
    connectionUri: `${CONNECTION_URI}/${TEST_DATABASE_NAME}`,
    accountTableName: 'accounts',
  };

  beforeAll(async () => {
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

  it('works', () => {
    const storage = new PostgresStorage(config);
    expect(storage.init()).toBe(undefined);
  });
});
