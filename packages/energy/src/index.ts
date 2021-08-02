/* eslint-disable func-style */
export function halfLife(params: { initialValue: number; halvingPeriod: number; t0: number; t1: number }): number {
  const { initialValue, halvingPeriod, t0, t1 } = params;
  const period = t1 - t0;

  if (period < 0) {
    throw new Error('Invalid period');
  }
  if (period === 0) {
    return initialValue;
  }

  return initialValue * 0.5 ** (period / halvingPeriod);
}

export function calculateEnergyCap(params: {
  balance: number;
  prevEnergy: number;
  halvingPeriod: number;
  t0: number;
  t1: number;
}): number {
  const { balance, prevEnergy, halvingPeriod, t0, t1 } = params;

  if (balance < 0) {
    throw new Error('Invalid balance');
  }

  return balance + halfLife({ initialValue: prevEnergy - balance, halvingPeriod, t0, t1 });
}
