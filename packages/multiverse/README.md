# Multiverse NFT Renting
This package is part of [IQ Protocol JS SDK.](https://github.com/iqlabsorg/iq-sdk-js)

| :exclamation: The package is in development and breaking changes should be expected. Use at your own risk!  |
|:------------------------------------------------------------------------------------------------------------|

This package provides higher level abstraction over IQ Protocol smart contracts, allowing application developers to 
work with IQ NFT renting platform regardless of the underlying blockchain.

Use this package to create IQVerse, deploy Warper and communicate with Metahub to implement NFT listing & renting 
functionality.

## Installation  
This package requires [ethers.js](https://github.com/ethers-io/ethers.js) peer dependency, so it needs to be installed too.
```bash
yarn add @iqprotocol/multiverse ethers
```

## Usage

Start with `Multiverse` client initialization. Then you can use the client to resolve adapters for various 
contracts.

### Multiverse

#### Initialization
You need to provide a [Signer](https://docs.ethers.io/v5/api/signer/#Signer) which suits your use-case. For example, 
`VoidSigner` will be enough for reading data, but for listing, renting and other state-changing operations you need a 
signer, with private key.

```ts
import { Multiverse } from '@iqprotocol/multiverse';
import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider('<RPC URL>');
const accountAddress = '0x...'

const multiverse = await Multiverse.init({
  signer: new VoidSigner(accountAddress, provider),
});

```

#### Chain ID
Since IQ Protocol SDK is made to be used for interacting with contracts deployed on various blockchains,
it is crucial to make sure the correct contract addresses and asset identifiers are used. Therefor the SDK relies on
[CAIP](https://www.npmjs.com/package/caip) standard identifiers for referencing accounts and assets. 
Often you will need to know the chain ID to construct such identifiers.

```ts
const chainId = await multiverse.getChainId();
```



### Universe (IQVerse)

In order to create and manage your IQVerse you will need to use the `UniverseRegistryAdapter`.
```ts
import { AccountId, ChainId } from '@iqprotocol/multiverse'; 

const universeRegistryAddress = '0x...';
const universeRegistry = multiverse.universeRegistry(
    new AccountId({
        chainId,
        address: universeRegistryAddress 
    })
);
```


#### Creation

```ts
await universeRegistry.createUniverse({
  name: 'My IQVerse',
  rentalFeePercent: 500, // NOTE: 100 is 1%, 10_000 is 100%.
});
```

#### Universe ID
TODO

### Warper

#### Warper preset deployment

In order to deploy a warper from a preset you will need to use the `WarperPresetFactoryAdapter`.
```ts
import { AccountId, ChainId } from '@iqprotocol/multiverse'; 

// Resolve WarperPresetFactoryAdapter.
const warperPresetFactoryAddress = '0x...';
const warperPresetFactory = multiverse.warperPresetFactory(
    new AccountId({ 
      chainId,
      address: warperPresetFactoryAddress
    })
);

// Deploy ERC721PresetConfigurable preset.
const presetId = 'ERC721PresetConfigurable';
const metahubAddress = '0x...';
const originalAssetAddress = '0x...';

const tx = await warperPresetFactory.deployPreset(presetId, {
  metahub: new AccountId({
    chainId,
    address: metahubAddress,
  }),
  original: new AssetType({
    chainId,
    assetName: {
      namespace: 'erc721',
      reference: originalAssetAddress,
    },
  }),
});

// Wait for TX confirmation.
await tx.wait();

// Find out the deployed warper reference.
const warperAssetType = await warperPresetFactory.findWarperByDeploymentTransaction(tx); 
const warperAddress = warperAssetType.assetName.reference;

```

#### Warper registration 
```ts

const warperAddress = '0x...';
await metahub.registerWarper(
  new AssetType({
    chainId,
    assetName: { namespace: 'erc721', reference: warperAddress }
  }),
  {
    universeId: '<your universe ID>',
    name: 'My Warper',
    paused: false,
  }
);
```

