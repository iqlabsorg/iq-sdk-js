# In-Memory Storage
This package is part of [IQ Protocol JS SDK.](https://github.com/iqlabsorg/iq-sdk-js)

| :exclamation: The package is in development and breaking changes should be expected. Use at your own risk! |
|:------------------------------------------------------------------------------------------------------------------|

The package includes very basic [Account Store Interface](https://github.com/iqlabsorg/iq-sdk-js/tree/main/packages/abstract-storage) implementation for handling account states in memory.
Use this package when you want to test account state management functionality without setting up a persistent storage.

:warning: **This provider is meant for testing and does not guarantee data persistence. Do not use for production deployments!**


## Installation  
```bash
yarn add @iqprotocol/in-memory-storage
```

## Usage
```ts
import { InMemoryAccountStore, Account, AccountState } from '@iqprotocol/in-memory-storage';

const store = new InMemoryAccountStore(); 

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
