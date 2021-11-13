/* eslint-disable sonarjs/no-duplicate-string,sonarjs/no-nested-template-literals */
import { createPool, DatabasePoolType, sql } from 'slonik';
import { PostgresAccountStoreConfig } from '../../../src/account-store';

export const ensureEmptyDatabase = async (connectionUri: string, databaseName: string): Promise<void> => {
  const pool = createPool(connectionUri, {
    maximumPoolSize: 1,
  });
  await pool.connect(async connection => {
    await connection.query(sql`
      SELECT pg_terminate_backend(pid)
      FROM pg_stat_activity
      WHERE
        pid != pg_backend_pid() AND
        datname = ${databaseName}
    `);
    await connection.query(sql`DROP DATABASE IF EXISTS ${sql.identifier([databaseName])}`);
    await connection.query(sql`CREATE DATABASE ${sql.identifier([databaseName])}`);
  });
  await pool.end();
};

export const ensureSchema = async (pool: DatabasePoolType, dbSchema: string): Promise<void> => {
  await pool.connect(async connection => {
    await connection.query(sql`CREATE SCHEMA IF NOT EXISTS ${sql.identifier([dbSchema])}`);
  });
};

export const truncateTables = async (pool: DatabasePoolType, tables: string[], dbSchema = 'public'): Promise<void> => {
  await pool.transaction(async connection => {
    for (const tableName of tables) {
      await connection.query(sql`TRUNCATE TABLE ${sql.identifier([dbSchema, tableName])} CASCADE;`);
    }
  });
};

export const expectCorrectDatabaseStructure = async (
  pool: DatabasePoolType,
  {
    accountTable,
    stateTable,
    dbSchema,
  }: Required<Pick<PostgresAccountStoreConfig, 'accountTable' | 'stateTable' | 'dbSchema'>>,
): Promise<void> => {
  await pool.connect(async connection => {
    const tableCount = await connection.oneFirst(
      sql`SELECT count(*) FROM information_schema.tables WHERE table_schema = ${dbSchema} AND table_name IN (${sql.join(
        [accountTable, stateTable],
        sql`, `,
      )});`,
    );

    expect(tableCount).toBe(2);

    // verify account table columns
    const accountTableColumns = await connection.many(
      sql`SELECT column_name, data_type FROM information_schema.columns WHERE table_schema = ${dbSchema} AND table_name = ${accountTable};`,
    );

    expect(accountTableColumns).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ column_name: 'id', data_type: 'character varying' }),
        expect.objectContaining({ column_name: 'data', data_type: 'jsonb' }),
      ]),
    );

    // verify state table columns
    const stateTableColumns = await connection.many(
      sql`SELECT column_name, data_type FROM information_schema.columns WHERE table_schema = ${dbSchema} AND table_name = ${stateTable};`,
    );

    expect(stateTableColumns).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ column_name: 'service_id', data_type: 'character varying' }),
        expect.objectContaining({ column_name: 'account_id', data_type: 'character varying' }),
        expect.objectContaining({ column_name: 'energy_gap_halving_period', data_type: 'character varying' }),
        expect.objectContaining({ column_name: 'power', data_type: 'character varying' }),
        expect.objectContaining({ column_name: 'locked_power', data_type: 'character varying' }),
        expect.objectContaining({ column_name: 'energy_cap', data_type: 'character varying' }),
        expect.objectContaining({ column_name: 'energy', data_type: 'character varying' }),
        expect.objectContaining({ column_name: 'energy_calculated_at', data_type: 'timestamp without time zone' }),
      ]),
    );
  });
};
