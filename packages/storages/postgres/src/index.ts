import {
  Account,
  AccountData,
  AccountState,
  StorageProvider,
} from '@iqprotocol/abstract-storage';
import {
  createPool,
  DatabasePoolType,
  IdentifierSqlTokenType,
  sql,
} from 'slonik';

export type PostgresStorageConfig = {
  connectionUri: string;
  accountTable: string;
  stateTable: string;
  pool?: Parameters<typeof createPool>[1];
};

export class PostgresStore implements StorageProvider {
  private readonly pool: DatabasePoolType;
  private readonly config: PostgresStorageConfig;
  private readonly accountTableName: IdentifierSqlTokenType;
  private readonly stateTableName: IdentifierSqlTokenType;

  constructor(config: PostgresStorageConfig) {
    this.config = config;
    this.pool = createPool(this.config.connectionUri, this.config.pool);
    this.accountTableName = sql.identifier([this.config.accountTable]);
    this.stateTableName = sql.identifier([this.config.stateTable]);
  }

  async init(): Promise<void> {
    await this.pool.connect(async connection => {
      await connection.query(
        sql`CREATE TABLE IF NOT EXISTS ${this.accountTableName} (
          id varchar NOT NULL PRIMARY KEY,
          data jsonb
        )`,
      );

      await connection.query(
        sql`CREATE TABLE IF NOT EXISTS ${this.stateTableName} (
          service_id varchar NOT NULL,
          account_id varchar NOT NULL REFERENCES ${this.accountTableName} ON UPDATE RESTRICT ON DELETE RESTRICT,
          balance varchar NOT NULL,
          energy varchar NOT NULL,
          energy_changed_at timestamp NOT NULL,
          PRIMARY KEY (account_id, service_id)
        )`,
      );
    });
  }

  async saveAccount(account: Account): Promise<void> {
    await this.pool.connect(async connection => {
      await connection.query(
        sql`INSERT INTO ${this.accountTableName} (
            id,
            data
          ) VALUES (
            ${account.id},
            ${sql.json(account.data)}
          )
          ON CONFLICT (id)
          DO UPDATE SET data = EXCLUDED.data
        `,
      );
    });
  }

  async getAccount(id: string): Promise<Account | null> {
    return this.pool.connect(async connection => {
      const row = await connection.maybeOne(
        sql`SELECT id, data
          FROM ${this.accountTableName}
          WHERE id = ${id}
        `,
      );

      if (row === null) {
        return null;
      }

      return {
        id: String(row.id),
        data: row.data as AccountData,
      };
    });
  }

  async saveAccountState({
    accountId,
    serviceId,
    balance,
    energy,
    energyChangedAt,
  }: AccountState): Promise<void> {
    await this.pool.connect(async connection => {
      await connection.query(
        sql`INSERT INTO ${this.stateTableName} (
            account_id,
            service_id,
            balance,
            energy,
            energy_changed_at
          ) VALUES (
            ${accountId},
            ${serviceId},
            ${balance.toString(10)},
            ${energy.toString(10)},
            to_timestamp(${energyChangedAt})
          )
          ON CONFLICT (account_id, service_id)
          DO UPDATE SET
            balance = EXCLUDED.balance,
            energy = EXCLUDED.energy,
            energy_changed_at = EXCLUDED.energy_changed_at
        `,
      );
    });
  }

  async getAccountState(
    accountId: string,
    serviceId: string,
  ): Promise<AccountState | null> {
    return this.pool.connect(async connection => {
      const row = await connection.maybeOne(
        sql`SELECT account_id, service_id, balance, energy, EXTRACT(EPOCH FROM energy_changed_at) as energy_changed_at
          FROM ${this.stateTableName}
          WHERE account_id = ${accountId}
          AND service_id = ${serviceId}
        `,
      );

      if (row === null) {
        return null;
      }

      return {
        serviceId: String(row.service_id),
        accountId: String(row.account_id),
        balance: BigInt(row.balance),
        energy: BigInt(row.energy),
        energyChangedAt: Number(row.energy_changed_at),
      };
    });
  }
}
