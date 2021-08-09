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

const DEFAULT_SCHEMA = 'public';
const DEFAULT_ACCOUNT_TABLE_NAME = 'account';
const DEFAULT_STATE_TABLE_NAME = 'state';

export type PostgresStoreConfig = {
  pool: DatabasePoolType;
  dbSchema?: string;
  accountTable?: string;
  stateTable?: string;
  validator?: AccountStateValidator;
};

export class PostgresStore extends AbstractStore {
  private readonly pool: DatabasePoolType;
  private readonly accountTableName: IdentifierSqlTokenType;
  private readonly stateTableName: IdentifierSqlTokenType;

  constructor({ pool, validator, accountTable, stateTable, dbSchema }: PostgresStoreConfig) {
    super({ validator });
    this.pool = pool;

    // eslint-disable-next-line prettier/prettier
    this.accountTableName = sql.identifier([
      dbSchema ?? DEFAULT_SCHEMA,
      accountTable ?? DEFAULT_ACCOUNT_TABLE_NAME
    ]);

    // eslint-disable-next-line prettier/prettier
    this.stateTableName = sql.identifier([
      dbSchema ?? DEFAULT_SCHEMA,
      stateTable ?? DEFAULT_STATE_TABLE_NAME
    ]);
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
      gapHalvingPeriod: Number(row.gap_halving_period),
      power: BigInt(row.power as string),
      lockedPower: BigInt(row.locked_power as string),
      energyCap: BigInt(row.energy_cap as string),
      energy: BigInt(row.energy as string),
      energyCalculatedAt: Number(row.energy_calculated_at),
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
          gap_halving_period varchar NOT NULL,
          power varchar NOT NULL,
          locked_power varchar NOT NULL,
          energy_cap varchar NOT NULL,
          energy varchar NOT NULL,
          energy_calculated_at timestamp NOT NULL,
          PRIMARY KEY (service_id, account_id)
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

  async deleteAccount(id: string): Promise<boolean> {
    return this.pool.connect(async connection => {
      return connection.transaction(async () => {
        await connection.query(sql`DELETE FROM ${this.stateTableName} WHERE account_id = ${id}`);
        const { rowCount } = await connection.query(sql`DELETE FROM ${this.accountTableName} WHERE id = ${id}`);
        return rowCount > 0;
      });
    });
  }

  async getAccountState(serviceId: string, accountId: string): Promise<AccountState | null> {
    return this.pool.connect(async connection => {
      const row = await this.readAccountStateRecord(connection, serviceId, accountId);
      return row ? PostgresStore.rowToAccountState(row) : null;
    });
  }

  async deleteAccountState(serviceId: string, accountId: string): Promise<boolean> {
    return this.pool.connect(async connection => {
      const { rowCount } = await connection.query(
        sql`DELETE FROM ${this.stateTableName}
          WHERE service_id = ${serviceId}
            AND account_id = ${accountId}
        `,
      );
      return rowCount > 0;
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
    gapHalvingPeriod,
    power,
    lockedPower,
    energyCap,
    energy,
    energyCalculatedAt,
  }: AccountState): Promise<AccountState> {
    return this.pool.connect(async connection => {
      const result = await connection.query(
        sql`INSERT INTO ${this.stateTableName} (
            account_id,
            service_id,
            gap_halving_period,
            power,
            locked_power,
            energy_cap,
            energy,
            energy_calculated_at
          ) VALUES (
            ${accountId},
            ${serviceId},
            ${gapHalvingPeriod.toString(10)},
            ${power.toString(10)},
            ${lockedPower.toString(10)},
            ${energyCap.toString(10)},
            ${energy.toString(10)},
            to_timestamp(${energyCalculatedAt})
          )
          RETURNING *, EXTRACT(EPOCH FROM energy_calculated_at) as energy_calculated_at
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
      const currentState = await this.readAccountStateRecord(connection, prevState.serviceId, prevState.accountId);
      if (!currentState) {
        throw new Error('State is not initialized');
      }

      const result = await connection.query(
        sql`UPDATE ${this.stateTableName}
            SET
              power = ${newState.power.toString(10)},
              locked_power = ${newState.lockedPower.toString(10)},
              energy = ${newState.energy.toString(10)},
              energy_calculated_at = to_timestamp(${newState.energyCalculatedAt})
          WHERE
            account_id = ${prevState.accountId}
            AND service_id = ${prevState.serviceId}
            AND gap_halving_period = ${prevState.gapHalvingPeriod.toString(10)}
            AND power = ${prevState.power.toString(10)}
            AND locked_power = ${prevState.lockedPower.toString(10)}
            AND energy_cap = ${prevState.energyCap.toString(10)}
            AND energy = ${prevState.energy.toString(10)}
            AND energy_calculated_at = to_timestamp(${prevState.energyCalculatedAt})
          RETURNING *, EXTRACT(EPOCH FROM energy_calculated_at) as energy_calculated_at
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
    serviceId: string,
    accountId: string,
  ): Promise<ReturnType<QueryMaybeOneFunctionType>> {
    return connection.maybeOne(
      sql`SELECT
            account_id,
            service_id,
            gap_halving_period,
            power,
            locked_power,
            energy_cap,
            energy,
            EXTRACT(EPOCH FROM energy_calculated_at) as energy_calculated_at
          FROM ${this.stateTableName}
          WHERE service_id = ${serviceId}
            AND account_id = ${accountId}
        `,
    );
  }
}
