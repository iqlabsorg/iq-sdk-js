# Enterprise and Services
This package is part of [IQ Protocol JS SDK.](https://github.com/iqlabsorg/iq-sdk-js)

| :exclamation: The package is in development and breaking changes should be expected. Use at your own risk! |
|:------------------------------------------------------------------------------------------------------------------|

This package provides higher level abstraction over IQ Protocol smart contracts, allowing application developers to work with IQ enterprises and services regardless of the underlying blockchain.   

Use this package to communicate with IQ Enterprises and Services deployed on-chain.

## Installation  
```bash
yarn add @iqprotocol/enterprise
```

## Usage
```ts
import { Enterprise } from '@iqprotocol/enterprise';
import { EIP155BlockchainProvider } from '@iqprotocol/eip155';

const enterpriseContractAddress = '0x...'
const blockchain = new EIP155BlockchainProvider(...);
const enterprise = new Enterprise({ blockchain, address: enterpriseContractAddress });

const enterpriseInfo = await enterprise.getInfo();
const services = await enterprise.getServices();
const serviceInfo = await services[0].getInfo();

```
