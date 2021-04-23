import { StorageProvider } from '@iqprotocol/abstract-storage';
import { createPool, DatabasePoolType, sql } from 'slonik';

export type PostgresStorageConfig = {
  connectionUri: string;
  accountTable: string;
  stateTable: string;
  pool?: Parameters<typeof createPool>[1];
};

export class PostgresStorage extends StorageProvider {
  private readonly pool: DatabasePoolType;
  private readonly config: PostgresStorageConfig;

  constructor(config: PostgresStorageConfig) {
    super();
    this.config = config;
    this.pool = createPool(this.config.connectionUri, this.config.pool);
  }

  async init(): Promise<void> {
    await this.pool.connect(async connection => {
      const accountTableName = sql.identifier([this.config.accountTable]);
      const stateTableName = sql.identifier([this.config.stateTable]);

      await connection.query(
        sql`CREATE TABLE IF NOT EXISTS ${accountTableName} (
          id varchar NOT NULL PRIMARY KEY,
          proof varchar,
          authorized_keys jsonb
        );`,
      );

      await connection.query(
        sql`CREATE TABLE IF NOT EXISTS ${stateTableName} (
          service_id varchar NOT NULL,
          account_id varchar NOT NULL REFERENCES ${accountTableName} ON UPDATE RESTRICT ON DELETE RESTRICT,
          balance varchar NOT NULL,
          energy varchar NOT NULL,
          update_time timestamp NOT NULL,
          PRIMARY KEY (service_id, account_id)
        );`,
      );
    });
  }
}
