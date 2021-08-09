# @iqprotocol/account
This package is part of [IQ Protocol JS SDK.](https://github.com/iqalliance/iq-sdk-js)

This is high level package which provides tools for IQ Protocol off-chain account state management.
It is storage and blockchain agnostic and relies on injected providers.  
For example, it uses storage provider (e.g. [Postgres Store](https://github.com/iqalliance/iq-sdk-js/tree/main/packages/storages/postgres)) to persist account information and manage off-chain state.
It also allows to automatically initialize account state using blockchain provider (e.g. [EIP155BlockchainProvider](https://github.com/iqalliance/iq-sdk-js/tree/main/packages/blockchains/eip155)).  


## Installation  
```bash
yarn add @iqprotocol/account
```


