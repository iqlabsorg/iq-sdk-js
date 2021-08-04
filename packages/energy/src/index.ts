/* eslint-disable func-style,prettier/prettier */
import { strict as assert } from 'assert';

const ONE = 1n << 144n;
const LOG_ONE_HALF = 15457698658747239244624307340191628289589491n; // log(0.5) * 2 ** 144
const MAX_SAFE_UINT112 = 2n ** 112n - 1n;

export function halfLife(params: { initialValue: bigint; halvingPeriod: number; t0: number; t1: number }): bigint {
  const { halvingPeriod, t0, t1 } = params;
  let { initialValue } = params;

  if (initialValue < 0) {
    throw new Error('Initial value underflow');
  }

  if (initialValue > MAX_SAFE_UINT112) {
    throw new Error('Initial value overflow');
  }

  let period = t1 - t0;
  if (period < 0) {
    throw new Error('Negative period');
  }

  if (period === 0) {
    return initialValue;
  }

  initialValue >>= BigInt(period) / BigInt(halvingPeriod);
  if (initialValue === 0n) {
    return initialValue;
  }

  period %= halvingPeriod;
  const x = BigInt(LOG_ONE_HALF) * BigInt(period) / BigInt(halvingPeriod);
  let z = BigInt(initialValue);
  let i = ONE;
  let sum = 0n;

  while (z !== 0n) {
    sum += z;
    z = z * x / i;
    i += ONE;
    sum -= z;
    z = z * x / i;
    i += ONE;
  }

  assert(sum <= MAX_SAFE_UINT112)

  return sum;
}

export function calculateEnergyCap(params: {
  power: bigint;
  prevEnergyCap: bigint;
  halvingPeriod: number;
  t0: number;
  t1: number;
}): bigint {
  const { power, prevEnergyCap, halvingPeriod, t0, t1 } = params;
  if (power < 0) {
    throw new Error('Negative power');
  }

  if (power > prevEnergyCap) {
    return power - halfLife({ initialValue: power - prevEnergyCap, halvingPeriod, t0, t1 });
  }
  return power + halfLife({ initialValue: prevEnergyCap - power, halvingPeriod, t0, t1 });
}
