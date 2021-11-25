/**
 * The package provided various utility functions for *energy* calculation.
 *
 * ## Installation
 * ```bash
 * yarn add @iqprotocol/energy
 * ```
 *
 * ## Usage
 * ```ts
 * import { calculateEnergyCap } from '@iqprotocol/energy';
 *
 * const params = {
 *  power: 100n,
 *  initialValue: 50n, // power at t0
 *  gapHalvingPeriod: 86400,
 *  t0: 1629906900,
 *  t1: 1629906900 + 86400
 * };
 *
 * const energyCap = calculateEnergyCap(params); // 75n
 * ```
 *
 * ## Energy & Power
 *
 * In IQ protocol *Power* is the reinterpreted pTokens balance that is responsible for *Energy* generation. Simply `1 pToken = 1 Unit of Power`.
 * Whereas the Energy is a spendable asset that is generated over time by the Power.
 *
 * **Linear Energy** the actual energy value at the specific time. As the name implies, it changes linearly over time.
 *
 * **Energy Cap** is the potential maximum possible energy value at specific time. It corresponds to the IQ protocol *Proof Of Hold*.
 *
 * **Effective Energy** is the current available energy. It is the lowest value between the current linear energy value and energy cap.
 *
 * @module energy
 */

/* eslint-disable no-extra-parens */
const ONE = 1n << 144n;
const LOG_ONE_HALF = 15457698658747239244624307340191628289589491n; // log(0.5) * 2 ** 144
const MAX_SAFE_UINT112 = 5192296858534827628530496329220095n; // 2 ** 112 - 1;

export type HalfLifeParams = {
  initialValue: bigint;
  gapHalvingPeriod: number;
  t0: number;
  t1: number;
};

export type EnergyCalculationParams = HalfLifeParams & {
  power: bigint;
};

export type EffectiveEnergyCalculationParams = Omit<EnergyCalculationParams, 'initialValue'> & {
  energy: bigint;
  energyCap: bigint;
};

export const halfLife = (params: HalfLifeParams): bigint => {
  const { gapHalvingPeriod, t0, t1 } = params;
  let { initialValue } = params;

  if (initialValue < 0) {
    throw new Error('Initial value underflow');
  }

  if (initialValue > MAX_SAFE_UINT112) {
    throw new Error('Initial value overflow');
  }

  let period = BigInt(t1 - t0);
  if (period < 0n) {
    throw new Error('Negative period');
  }

  if (period === 0n) {
    return initialValue;
  }

  initialValue >>= BigInt(period) / BigInt(gapHalvingPeriod);
  if (initialValue === 0n) {
    return initialValue;
  }

  period %= BigInt(gapHalvingPeriod);
  const x = BigInt(LOG_ONE_HALF * period) / BigInt(gapHalvingPeriod);
  let z = BigInt(initialValue);
  let i = ONE;
  let sum = 0n;

  while (z !== 0n) {
    sum += z;
    z = (z * x) / i;
    i += ONE;
    sum -= z;
    z = (z * x) / i;
    i += ONE;
  }

  return BigInt.asUintN(112, sum);
};

export const calculateLinearEnergy = ({
  power,
  initialValue,
  gapHalvingPeriod,
  t0,
  t1,
}: EnergyCalculationParams): bigint => {
  const period = BigInt(t1 - t0);
  if (period < 0n) {
    throw new Error('Negative period');
  }
  return initialValue + (power * period) / BigInt(gapHalvingPeriod * 4);
};

export const calculateEnergyCap = ({
  power,
  initialValue,
  gapHalvingPeriod,
  t0,
  t1,
}: EnergyCalculationParams): bigint => {
  if (power > initialValue) {
    return power - halfLife({ initialValue: power - initialValue, gapHalvingPeriod, t0, t1 });
  }
  return power + halfLife({ initialValue: initialValue - power, gapHalvingPeriod, t0, t1 });
};

export const calculateEffectiveEnergy = (
  params: EffectiveEnergyCalculationParams,
): { energyCap: bigint; linearEnergy: bigint; energy: bigint } => {
  const energyCap = calculateEnergyCap({ ...params, initialValue: params.energyCap });
  const linearEnergy = calculateLinearEnergy({ ...params, initialValue: params.energy });
  const energy = linearEnergy < energyCap ? linearEnergy : energyCap; // min(linearEnergy, energyCap)

  return { energyCap, linearEnergy, energy };
};
