# Abstract Blockchain
This package is part of [IQ Protocol JS SDK.](https://github.com/iqlabsorg/iq-sdk-js)

| :exclamation: The package is in development and breaking changes should be expected. Use at your own risk! |
|:------------------------------------------------------------------------------------------------------------------|

The main purpose of this package is to provide `BlockchainProvider` interface.
The interface implementation will cover all the necessary functions to work with IQ Protocol smart contracts.  
An example of such implementation can be [EIP155BlockchainProvider](https://github.com/iqlabsorg/iq-sdk-js/tree/main/packages/blockchains/eip155)
provided as a part of IQ Protocol JS SDK.

Use this package when you want to implement a new blockchain provider.

## Installation  
```bash
yarn add @iqprotocol/abstract-blockchain
```

## Usage
```ts
import { BlockchainProvider } from '@iqprotocol/abstract-blockchain';

class CustomBlockchainProvider implements BlockchainProvider {
 // ...
}

```
