import { calculateEnergyCap, halfLife } from '../src';

/**
 * @group unit
 */
describe('Energy', () => {
  describe('halfLife', () => {
    // Algo: c0 * 0.5 ** ((t - t0) / t12)
    test.each`
      initialValue                     | halfLifePeriod | t0     | t1            | expected
      ${100}                           | ${50}          | ${0}   | ${25}         | ${70.71067811865476}
      ${1000}                          | ${20}          | ${100} | ${100}        | ${1000}
      ${1000}                          | ${20}          | ${100} | ${120}        | ${500}
      ${1000}                          | ${20}          | ${100} | ${140}        | ${250}
      ${1000}                          | ${20}          | ${100} | ${110}        | ${707.1067811865476}
      ${1997.25}                       | ${20}          | ${100} | ${110}        | ${1412.2690187248322}
      ${1997.25}                       | ${2373046875}  | ${0}   | ${2373046874} | ${998.6250002916901}
      ${199700000001.25}               | ${2373046875}  | ${0}   | ${2373046874} | ${99850000029.79036}
      ${4503599627370449.333}          | ${2373046875}  | ${0}   | ${2373046874} | ${2251799814342956.5}
      ${Number.MAX_SAFE_INTEGER / 2.0} | ${2373046875}  | ${0}   | ${2373046874} | ${2251799814342979.5}
    `(
      'returns $expected with initialValue = $initialValue, halfLifePeriod = $halfLifePeriod, t0 = $t0, t1 = $t1',
      ({ initialValue, halfLifePeriod, t0, t1, expected }) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        expect(halfLife({ initialValue, halvingPeriod: halfLifePeriod, t0, t1 })).toEqual(expected);
      },
    );

    it('throws when period is negative', () => {
      expect(() =>
        halfLife({
          initialValue: 1000,
          halvingPeriod: 50,
          t0: 50,
          t1: 20,
        }),
      ).toThrowError('Invalid period');
    });
  });

  describe('energy cap', () => {
    test.each`
      balance | prevEnergy | halfLifePeriod             | t0   | t1     | expected
      ${100}  | ${0}       | ${50}                      | ${0} | ${0}   | ${0}
      ${100}  | ${0}       | ${50}                      | ${0} | ${25}  | ${29.289321881345245}
      ${100}  | ${0}       | ${50}                      | ${0} | ${50}  | ${50}
      ${100}  | ${10}      | ${50}                      | ${0} | ${50}  | ${55}
      ${100}  | ${0}       | ${50}                      | ${0} | ${100} | ${75}
      ${100}  | ${0}       | ${50}                      | ${0} | ${150} | ${87.5}
      ${100}  | ${0}       | ${50}                      | ${0} | ${200} | ${93.75}
      ${100}  | ${200}     | ${50}                      | ${0} | ${25}  | ${170.71067811865476}
      ${100}  | ${200}     | ${50}                      | ${0} | ${50}  | ${150}
      ${100}  | ${200}     | ${50}                      | ${0} | ${100} | ${125}
      ${1}    | ${0}       | ${Number.MAX_SAFE_INTEGER} | ${0} | ${1}   | ${1.1102230246251565e-16}
    `(
      'returns $expected with balance = $balance, prevEnergy = $prevEnergy, halfLifePeriod = $halfLifePeriod, t0 = $t0, t1 = $t1',
      ({ balance, prevEnergy, halfLifePeriod, t0, t1, expected }) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        expect(calculateEnergyCap({ balance, prevEnergy, halvingPeriod: halfLifePeriod, t0, t1 })).toEqual(expected);
      },
    );

    it('throws when the balance is negative', () => {
      expect(() =>
        calculateEnergyCap({
          balance: -1,
          prevEnergy: 0,
          halvingPeriod: 50,
          t0: 50,
          t1: 20,
        }),
      ).toThrowError('Invalid balance');
    });
  });
});
