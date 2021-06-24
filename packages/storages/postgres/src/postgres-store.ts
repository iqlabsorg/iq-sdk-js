import {
  AbstractStore,
  Account,
  AccountData,
  AccountState,
  AccountStateChangeResult,
  AccountStateValidator,
} from '@iqprotocol/abstract-storage';
import { DatabasePoolType, IdentifierSqlTokenType, sql } from 'slonik';
import { DatabasePoolConnectionType, QueryMaybeOneFunctionType } from 'slonik/src/types';

export type PostgresStoreConfig = {
  pool: DatabasePoolType;
  accountTable?: string;
  stateTable?: string;
  validator?: AccountStateValidator;
};

export class PostgresStore extends AbstractStore {
  private readonly pool: DatabasePoolType;
  private readonly accountTableName: IdentifierSqlTokenType;
  private readonly stateTableName: IdentifierSqlTokenType;

  constructor({ pool, validator, accountTable, stateTable }: PostgresStoreConfig) {
    super({ validator });
    this.pool = pool;
    this.accountTableName = sql.identifier([accountTable ?? 'account']);
    this.stateTableName = sql.identifier([stateTable ?? 'state']);
  }

  private static rowToAccount(row: Record<string, unknown>): Account {
    return {
      id: String(row.id),
      data: row.data as AccountData,
    };
  }

  private static rowToAccountState(row: Record<string, unknown>): AccountState {
    return {
      serviceId: String(row.service_id),
      accountId: String(row.account_id),
      power: BigInt(row.power as string),
      lockedPower: BigInt(row.locked_power as string),
      energy: BigInt(row.energy as string),
      energyChangedAt: Number(row.energy_changed_at),
    };
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
          power varchar NOT NULL,
          locked_power varchar NOT NULL,
          energy varchar NOT NULL,
          energy_changed_at timestamp NOT NULL,
          PRIMARY KEY (account_id, service_id)
        )`,
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

      return row ? PostgresStore.rowToAccount(row) : null;
    });
  }

  async getAccountState(serviceId: string, accountId: string): Promise<AccountState | null> {
    return this.pool.connect(async connection => {
      const row = await this.readAccountStateRecord(connection, accountId, serviceId);
      return row ? PostgresStore.rowToAccountState(row) : null;
    });
  }

  protected async _saveAccount(account: Account): Promise<Account> {
    return this.pool.connect(async connection => {
      const result = await connection.query(
        sql`INSERT INTO ${this.accountTableName} (
            id,
            data
          ) VALUES (
            ${account.id},
            ${sql.json(account.data)}
          )
          ON CONFLICT (id)
          DO UPDATE SET data = EXCLUDED.data
          RETURNING *
        `,
      );

      return PostgresStore.rowToAccount(result.rows[0]);
    });
  }

  protected async _initAccountState({
    accountId,
    serviceId,
    power,
    lockedPower,
    energy,
    energyChangedAt,
  }: AccountState): Promise<AccountState> {
    return this.pool.connect(async connection => {
      const result = await connection.query(
        sql`INSERT INTO ${this.stateTableName} (
            account_id,
            service_id,
            power,
            locked_power,
            energy,
            energy_changed_at
          ) VALUES (
            ${accountId},
            ${serviceId},
            ${power.toString(10)},
            ${lockedPower.toString(10)},
            ${energy.toString(10)},
            to_timestamp(${energyChangedAt})
          )
          RETURNING *, EXTRACT(EPOCH FROM energy_changed_at) as energy_changed_at
        `,
      );

      return PostgresStore.rowToAccountState(result.rows[0]);
    });
  }

  protected async _changeAccountState(
    prevState: AccountState,
    newState: Omit<AccountState, 'serviceId' | 'accountId'>,
  ): Promise<AccountStateChangeResult> {
    return this.pool.connect(async connection => {
      const currentState = await this.readAccountStateRecord(connection, prevState.accountId, prevState.serviceId);
      if (!currentState) {
        throw new Error('State is not initialized');
      }

      const result = await connection.query(
        sql`UPDATE ${this.stateTableName}
            SET
              power = ${newState.power.toString(10)},
              locked_power = ${newState.lockedPower.toString(10)},
              energy = ${newState.energy.toString(10)},
              energy_changed_at = to_timestamp(${newState.energyChangedAt})
          WHERE
            account_id = ${prevState.accountId}
            AND service_id = ${prevState.serviceId}
            AND power = ${prevState.power.toString(10)}
            AND locked_power = ${prevState.lockedPower.toString(10)}
            AND energy = ${prevState.energy.toString(10)}
            AND energy_changed_at = to_timestamp(${prevState.energyChangedAt})
          RETURNING *, EXTRACT(EPOCH FROM energy_changed_at) as energy_changed_at
        `,
      );

      const successful = result.rowCount !== 0;
      return <AccountStateChangeResult>{
        successful,
        currentState: PostgresStore.rowToAccountState(successful ? result.rows[0] : currentState),
      };
    });
  }

  private async readAccountStateRecord(
    connection: DatabasePoolConnectionType,
    accountId: string,
    serviceId: string,
  ): Promise<ReturnType<QueryMaybeOneFunctionType>> {
    return connection.maybeOne(
      sql`SELECT account_id, service_id, power, locked_power, energy , EXTRACT(EPOCH FROM energy_changed_at) as energy_changed_at
          FROM ${this.stateTableName}
          WHERE account_id = ${accountId}
          AND service_id = ${serviceId}
        `,
    );
  }
}
