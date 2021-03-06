/* eslint-disable no-extra-parens */
import {
  calculateEffectiveEnergy,
  calculateEnergyCap,
  calculateLinearEnergy,
  EnergyCalculationParams,
  halfLife,
} from '../src';

/**
 * @group unit
 */
describe('Energy Utils', () => {
  describe('Half life', () => {
    // Algo: c0 * 0.5 ** ((t - t0) / t12)
    test.each`
      initialValue                           | gapHalvingPeriod | t0     | t1            | expected
      ${1152921504606846976000n}             | ${20}            | ${100} | ${120}        | ${576460752303423488000n}
      ${1152921504606846976000n}             | ${20}            | ${100} | ${140}        | ${288230376151711744000n}
      ${1152921504606846976000n}             | ${20}            | ${100} | ${110}        | ${815238614083298888273n}
      ${2302672475076025122816n}             | ${20}            | ${100} | ${110}        | ${1628235321977868704599n}
      ${2302672475076025122816n}             | ${2373046875}    | ${0}   | ${2373046874} | ${1151336237874308264392n}
      ${5192296858534774017680532110835712n} | ${2373046875}    | ${0}   | ${2373046874} | ${2596148430025700290926036596036491n}
      ${5192296858534827052069744025796608n} | ${2373046875}    | ${0}   | ${2373046874} | ${2596148430025726808120650298968105n}
    `(
      'equals $expected when: initialValue = $initialValue, halfLifePeriod = $gapHalvingPeriod, t0 = $t0, t1 = $t1',
      ({
        initialValue,
        gapHalvingPeriod,
        t0,
        t1,
        expected,
      }: EnergyCalculationParams & {
        expected: bigint;
      }) => {
        expect(halfLife({ initialValue, gapHalvingPeriod: gapHalvingPeriod, t0, t1 })).toEqual(expected);
      },
    );

    it('throws when period is negative', () => {
      expect(() =>
        halfLife({
          initialValue: 1000n,
          gapHalvingPeriod: 50,
          t0: 50,
          t1: 20,
        }),
      ).toThrowError('Negative period');
    });
  });

  describe('Linear energy', () => {
    test.each`
      power    | initialValue | gapHalvingPeriod           | t0   | t1                         | expected
      ${0n}    | ${200n}      | ${50}                      | ${0} | ${50}                      | ${200n}
      ${5n}    | ${200n}      | ${50}                      | ${0} | ${50}                      | ${201n}
      ${100n}  | ${200n}      | ${50}                      | ${0} | ${25}                      | ${212n}
      ${100n}  | ${200n}      | ${50}                      | ${0} | ${50}                      | ${225n}
      ${100n}  | ${200n}      | ${50}                      | ${0} | ${100}                     | ${250n}
      ${-100n} | ${200n}      | ${50}                      | ${0} | ${50}                      | ${175n}
      ${-100n} | ${200n}      | ${50}                      | ${0} | ${25}                      | ${188n}
      ${-100n} | ${200n}      | ${50}                      | ${0} | ${100}                     | ${150n}
      ${-100n} | ${-200n}     | ${50}                      | ${0} | ${100}                     | ${-250n}
      ${-200n} | ${-100n}     | ${50}                      | ${0} | ${100}                     | ${-200n}
      ${300n}  | ${0n}        | ${Number.MAX_SAFE_INTEGER} | ${0} | ${Number.MAX_SAFE_INTEGER} | ${75n}
    `(
      'equals $expected when: power = $power, initialValue = $initialValue, gapHalvingPeriod = $gapHalvingPeriod, t0 = $t0, t1 = $t1',
      ({
        power,
        initialValue,
        gapHalvingPeriod,
        t0,
        t1,
        expected,
      }: EnergyCalculationParams & {
        expected: bigint;
      }) => {
        expect(calculateLinearEnergy({ power, initialValue, gapHalvingPeriod, t0, t1 })).toEqual(expected);
      },
    );
  });

  describe('Energy cap', () => {
    test.each`
      power   | initialValue | gapHalvingPeriod           | t0   | t1     | expected
      ${100n} | ${0n}        | ${50}                      | ${0} | ${0}   | ${0n}
      ${100n} | ${0n}        | ${50}                      | ${0} | ${25}  | ${29n}
      ${100n} | ${0n}        | ${50}                      | ${0} | ${50}  | ${50n}
      ${100n} | ${10n}       | ${50}                      | ${0} | ${50}  | ${55n}
      ${100n} | ${0n}        | ${50}                      | ${0} | ${100} | ${75n}
      ${100n} | ${0n}        | ${50}                      | ${0} | ${150} | ${88n}
      ${100n} | ${0n}        | ${50}                      | ${0} | ${200} | ${94n}
      ${100n} | ${200n}      | ${50}                      | ${0} | ${25}  | ${171n}
      ${100n} | ${200n}      | ${50}                      | ${0} | ${50}  | ${150n}
      ${100n} | ${200n}      | ${50}                      | ${0} | ${100} | ${125n}
      ${1n}   | ${0n}        | ${Number.MAX_SAFE_INTEGER} | ${0} | ${1}   | ${0n}
    `(
      'equals $expected when: power = $power, initialValue = $initialValue, gapHalvingPeriod = $gapHalvingPeriod, t0 = $t0, t1 = $t1',
      ({
        power,
        initialValue,
        gapHalvingPeriod,
        t0,
        t1,
        expected,
      }: EnergyCalculationParams & {
        expected: bigint;
      }) => {
        expect(calculateEnergyCap({ power, initialValue, gapHalvingPeriod, t0, t1 })).toEqual(expected);
      },
    );
  });

  describe('Effective energy', () => {
    it('returns the minimum of linear energy and cap', () => {
      expect(
        calculateEffectiveEnergy({
          power: 100n,
          energyCap: 200n,
          energy: 200n,
          gapHalvingPeriod: 50,
          t0: 0,
          t1: 50,
        }),
      ).toEqual({ energyCap: 150n, linearEnergy: 225n, energy: 150n });
    });
  });
});
