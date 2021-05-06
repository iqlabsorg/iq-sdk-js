import { createPool, DatabasePoolType, sql } from 'slonik';

export const truncateTables = async (pool: DatabasePoolType, tables: string[]): Promise<void> => {
  await pool.transaction(async connection => {
    for (const tableName of tables) {
      await connection.query(sql`TRUNCATE TABLE ${sql.identifier([tableName])} CASCADE;`);
    }
  });
};

export const ensureDatabase = async (connectionUri: string, databaseName: string): Promise<void> => {
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
