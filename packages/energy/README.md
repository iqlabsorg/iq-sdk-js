# Energy Utils
This package is part of [IQ Protocol JS SDK.](https://github.com/iqlabsorg/iq-sdk-js)

| :exclamation: The package is in development and breaking changes should be expected. Use at your own risk! |
|:------------------------------------------------------------------------------------------------------------------|

The package provided various utility functions for *energy* calculation.

## Installation  
```bash
yarn add @iqprotocol/energy
```

## Usage
```ts
import { calculateEnergyCap } from '@iqprotocol/energy';

const params = {
  power: 100n,
  initialValue: 50n, // power at t0
  gapHalvingPeriod: 86400,
  t0: 1629906900,
  t1: 1629906900 + 86400
};

const energyCap = calculateEnergyCap(params); // 75n 

```

## Energy & Power

In IQ protocol *Power* is the reinterpreted pTokens balance that is responsible for *Energy* generation. Simply `1 pToken = 1 Unit of Power`.
Whereas the Energy is a spendable asset that is generated over time by the Power. 

**Linear Energy** the actual energy value at the specific time. As the name implies, it changes linearly over time. 

**Energy Cap** is the potential maximum possible energy value at specific time. It corresponds to the IQ protocol *Proof Of Hold*. 

**Effective Energy** is the current available energy. It is the lowest value between the current linear energy value and energy cap.   
