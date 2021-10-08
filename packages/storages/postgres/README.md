# PostgreSQL storage
This package is part of [IQ Protocol JS SDK.](https://github.com/iqlabsorg/iq-sdk-js)

| :exclamation: The package is in development and breaking changes should be expected. Use at your own risk! |
|:------------------------------------------------------------------------------------------------------------------|

The package includes [Storage Provider Interface](https://github.com/iqlabsorg/iq-sdk-js/tree/main/packages/abstract-storage) implementation for PostgreSQL.

## Installation  
```bash
yarn add @iqprotocol/postgres-storage
```


## Usage

```ts
import { PostgresStore, createPool, Account, AccountState } from '@iqprotocol/postgres-storage';

const connectionUri = 'postgresql://user:secret@localhost/mydb';
const pool = createPool(connectionUri);
const store = new PostgresStore({ pool });

const account: Account = {
  id: 'test-id',
  data: { ... },
};

await store.saveAccount(account);

const accountState: AccountState = {
  accountId: account.id,
  serviceId: 'test-service',
  gapHalvingPeriod: 86400,
  power: 10n,
  lockedPower: 2n,
  energyCap: 5n,
  energy: 5n,
  energyCalculatedAt: Math.floor(Date.now() / 1000),
};

await store.initAccountState(accountState); 

```
