# IQ Protocol JS SDK Monorepo

IQ Protocol JS SDK is a set of JavaScript packages which allows building applications powered by IQ Protocol.
It includes libraries for communicating with IQ Protocol smart contracts and provides necessary tools for managing account state off-chain, using pluggable storage providers.  
The SDK is designed with extensibility in mind, it indented to be blockchain and storage agnostic.
It includes EVM-compatible blockchain provider and storage provider for Postgre SQL. 


| :exclamation: The SDK is in active development and breaking changes should be expected. Use at your own risk!|
|-----------------------------------------|


## Packages 📦
The SDK is modular, meaning application developers can select specific packages for their use case and avoid bloating an app with redundant dependencies.

| Package                                                           |
|:------------------------------------------------------------------|
| [`@iqprotocol/enterprise`](packages/enterprise)                   |
| [`@iqprotocol/account`](packages/account)                         |
| [`@iqprotocol/discovery`](packages/discovery)                     |
| [`@iqprotocol/energy`](packages/energy)                           |
| [`@iqprotocol/abstract-blockchain`](packages/abstract-blockchain) |
| [`@iqprotocol/eip155`](packages/blockchains/eip155)               |
| [`@iqprotocol/abstract-storage`](packages/abstract-storage)       |
| [`@iqprotocol/in-memory-storage`](packages/storages/in-memory)    |
| [`@iqprotocol/postgres-storage`](packages/storages/postgres)      |
