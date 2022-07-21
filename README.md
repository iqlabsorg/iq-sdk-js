# IQ Protocol JS SDK Monorepo

| :exclamation: The SDK is in development and breaking changes should be expected. Use at your own risk! |
|:-------------------------------------------------------------------------------------------------------|

IQ Protocol JS SDK is a set of JavaScript packages which allows building applications powered by IQ Protocol.
It includes libraries for communicating with IQ Protocol smart contracts and provides necessary tools for managing account state off-chain, using pluggable storage providers.  
The SDK is designed with extensibility in mind, it indented to be blockchain and storage agnostic.
It includes EVM-compatible blockchain provider and storage provider for Postgre SQL. 

## Packages 📦
The SDK is modular, meaning application developers can select specific packages for their use case and avoid bloating an app with redundant dependencies.

| Package                                                                                            |                                                                                                 |
|:---------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------|
| [`@iqprotocol/multiverse`](https://www.npmjs.com/package/@iqprotocol/multiverse)                   | ![npm (scoped)](https://img.shields.io/npm/v/@iqprotocol/multiverse?style=flat-square)          |
| [`@iqprotocol/enterprise`](https://www.npmjs.com/package/@iqprotocol/enterprise)                   | ![npm (scoped)](https://img.shields.io/npm/v/@iqprotocol/enterprise?style=flat-square)          |
| [`@iqprotocol/account`](https://www.npmjs.com/package/@iqprotocol/account)                         | ![npm (scoped)](https://img.shields.io/npm/v/@iqprotocol/account?style=flat-square)             |
| [`@iqprotocol/discovery`](https://www.npmjs.com/package/@iqprotocol/discovery)                     | ![npm (scoped)](https://img.shields.io/npm/v/@iqprotocol/discovery?style=flat-square)           |
| [`@iqprotocol/energy`](https://www.npmjs.com/package/@iqprotocol/energy)                           | ![npm (scoped)](https://img.shields.io/npm/v/@iqprotocol/energy?style=flat-square)              |
| [`@iqprotocol/abstract-blockchain`](https://www.npmjs.com/package/@iqprotocol/abstract-blockchain) | ![npm (scoped)](https://img.shields.io/npm/v/@iqprotocol/abstract-blockchain?style=flat-square) |
| [`@iqprotocol/eip155`](https://www.npmjs.com/package/@iqprotocol/eip155)                           | ![npm (scoped)](https://img.shields.io/npm/v/@iqprotocol/eip155?style=flat-square)              |
| [`@iqprotocol/abstract-storage`](https://www.npmjs.com/package/@iqprotocol/abstract-storage)       | ![npm (scoped)](https://img.shields.io/npm/v/@iqprotocol/abstract-storage?style=flat-square)    |
| [`@iqprotocol/in-memory-storage`](https://www.npmjs.com/package/@iqprotocol/in-memory-storage)     | ![npm (scoped)](https://img.shields.io/npm/v/@iqprotocol/in-memory-storage?style=flat-square)   |
| [`@iqprotocol/postgres-storage`](https://www.npmjs.com/package/@iqprotocol/postgres-storage)       | ![npm (scoped)](https://img.shields.io/npm/v/@iqprotocol/postgres-storage?style=flat-square)    |


## Maintenance

### Testing

```shell
yarn test
yarn test:integration
```

### Dependency management
In order to keep dependencies up to date and synchronized across packages, the following commands can be used.
```shell
// Find outdated dependencies manually
yarn outdated

// Upgrade dependencies interactively
yarn upgrade-interactive
```

### Publishing
The publishing command is interactive. It allows to set individual package versions (no need to change package.json 
manually). Lerna updates the corresponding package.json and commits the version bump automatically.    
```shell
yarn build:prod
lerna publish --ignore-prepublish
```
