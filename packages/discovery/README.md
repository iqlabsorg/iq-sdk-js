# Discovery Utils
This package is part of [IQ Protocol JS SDK.](https://github.com/iqalliance/iq-sdk-js)

The package helps to discover IQ Protocol smart contracts. It contains the lists of IQ Protocol smart contracts addresses deployed by the IQ Protocol team.  

Use this package when you need information about IQ Protocol deployments such as contract implementation addresses or blockchain details (decimals, RPC endpoints).  

## Installation  
```bash
yarn add @iqprotocol/discovery
```

## Usage

```ts
import { ChainId, IQContractName, getContractAddress } from '@iqprotocol/discovery' 

const chainId = new ChainId('eip155:56'); // Binance Smart Chain Mainnet 
const enterpriseFactoryAddress = getContractAddress(chainId, IQContractName.EnterpriseFactory);

```
