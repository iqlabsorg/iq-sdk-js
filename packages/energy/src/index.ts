export class Energy {
  static halfLife(params: { initialValue: number; halfLifePeriod: number; t0: number; t1: number }): number {
    const { initialValue, halfLifePeriod, t0, t1 } = params;
    const period = t1 - t0;

    if (period < 0) {
      throw new Error('Invalid period');
    }
    if (period === 0) {
      return initialValue;
    }

    return initialValue * 0.5 ** (period / halfLifePeriod);
  }

  static calculateEnergy(params: {
    balance: number;
    prevEnergy: number;
    halfLifePeriod: number;
    t0: number;
    t1: number;
  }): number {
    const { balance, prevEnergy, halfLifePeriod, t0, t1 } = params;

    if (balance < 0) {
      throw new Error('Invalid balance');
    }

    return balance + this.halfLife({ initialValue: prevEnergy - balance, halfLifePeriod, t0, t1 });
  }
}
