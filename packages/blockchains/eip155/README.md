# EVM Compatible Blockchain Provider 
This package is part of [IQ Protocol JS SDK.](https://github.com/iqalliance/iq-sdk-js)

The package includes [Blockchain Provider Interface](https://github.com/iqalliance/iq-sdk-js/tree/main/packages/abstract-blockchain) implementation which allows interacting with IQ Protocol smart contracts deployed to EVM powered blockchain.  
Whereas there are many [EVM powered blockchains](https://chainlist.org/), IQ protocol smart contracts can be deployed to any EVM-compatible blockchain and this package can be used to interact with them.

The package name comes from [EIP-155](https://eips.ethereum.org/EIPS/eip-155) which was the first adopted proposal which allowed to uniquely identify EVM-compatible blockchains and networks.

Use this package when you want to communicate with IQ Protocol smart contracts deployed to EVM-based blockchains (e.g. Ethereum, Binance Smart Chain).
         
## Installation
This package requires [ethers.js](https://github.com/ethers-io/ethers.js) peer dependency, so it needs to be installed too.
```bash
yarn add @iqprotocol/eip155 ethers
```

## Usage
You need to provide a [Signer](https://docs.ethers.io/v5/api/signer/#Signer) which suits your use-case. For example, `VoidSigner` is enough for reading data.
```ts
import { EIP155BlockchainProvider } from '@iqprotocol/eip155';
import { VoidSigner } from 'ethers';

const clientAddress = '0x...';
const blockchain = new EIP155BlockchainProvider({
  signer: new VoidSigner(clientAddress),
});

const enterpriseAddress = '0x...';
const enterpriseInfo = await blockchain.getEnterpriseInfo(enterpriseAddress);

```
