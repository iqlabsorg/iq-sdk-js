# Abstract Storage
This package is part of [IQ Protocol JS SDK.](https://github.com/iqlabsorg/iq-sdk-js)

| :exclamation: The package is in development and breaking changes should be expected. Use at your own risk! |
|:------------------------------------------------------------------------------------------------------------------|

The IQ Protocol off-chain state management is storage agnostic and relies on storage providers to implement required functionality.
This package provides `AbstractStore` class which can be extended to implement store specific provider.    

Use this package when you want to implement a new storage provider.

## Installation  
```bash
yarn add @iqprotocol/abstract-storage
```

## Usage
All `AbstractStore` implementations use built-in account state validator by default. It is also possible to provide a custom validator.
```ts
import { AbstractStore, AccountStateValidator } from '@iqprotocol/abstract-storage';

class CustomStore extends AbstractStore {
  // ...
}

class CustomAccountStateValidator implements AccountStateValidator {
  // ...
}

const validator = new CustomAccountStateValidator();
const customStore = new CustomStore({ validator });

```
  
