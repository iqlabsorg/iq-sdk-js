export class Energy {
  static halfLife(t0: number, c0: number, t12: number, t: number): number {
    if (t < t0) {
      throw new Error('Invalid period');
    }
    if (t === t0) {
      return c0;
    }

    return c0 * 0.5 ** ((t - t0) / t12);
  }

  static calculateEnergy(
    balance: number,
    prevEnergy: number,
    t0: number,
    t1: number,
  ): number {
    if (balance > prevEnergy) {
      return balance - this.halfLife(t0, balance - prevEnergy, 100, t1);
    }
    return balance + this.halfLife(t0, prevEnergy - balance, 100, t1);
  }
}
