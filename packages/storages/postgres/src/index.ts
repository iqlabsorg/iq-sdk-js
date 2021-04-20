import { StorageProvider } from '@iqprotocol/abstract-storage';
import { createPool, DatabasePoolType, sql } from 'slonik';

export type PostgresStorageConfig = {
  connectionUri: string;
  accountTableName: string;
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

  init(): void {
    void this.pool.connect(async connection => {
      await connection.query(
        sql`CREATE TABLE IF NOT EXISTS ${sql.identifier([
          this.config.accountTableName,
        ])} (
          address varchar(45) NOT NULL,
          PRIMARY KEY (address)
        );`,
      );
    });
  }
}
