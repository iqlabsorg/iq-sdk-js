import { Account, AccountState, DefaultValidator } from '../src';
import { AccountStateError } from '../src/errors';

/**
 * @group unit
 */
describe('DefaultValidator', () => {
  let validator: DefaultValidator;

  beforeEach(() => {
    validator = new DefaultValidator();
  });

  describe('Account validation', () => {
    const account: Account = {
      id: 'test-id',
      data: {
        proof: { v: '1', sig: 'signature' },
      },
    };

    it('throws error when the id is empty', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(() => validator.validateAccount({ ...account, id: undefined })).toThrowError('Empty id');
    });
  });

  describe('Account state validation', () => {
    const accountState: AccountState = {
      accountId: 'account-id',
      serviceId: 'test-service',
      energyGapHalvingPeriod: 86400,
      power: 10n,
      lockedPower: 2n,
      energyCap: 5n,
      energy: 5n,
      energyCalculatedAt: Math.floor(Date.now() / 1000),
    };

    test.each(<Array<keyof AccountState>>[
      'serviceId',
      'accountId',
      'power',
      'lockedPower',
      'energy',
      'energyCalculatedAt',
    ])('throws error when the "%s" is missing', prop => {
      expect(() => validator.validateAccountState({ ...accountState, [prop]: undefined })).toThrowError(
        new AccountStateError(`Empty ${prop}`),
      );
    });

    it('throws an error when the power is negative', () => {
      expect(() => validator.validateAccountState({ ...accountState, power: -5n })).toThrowError(
        new AccountStateError('Negative power'),
      );
    });

    it('throws an error when the gap halving period is not positive', () => {
      expect(() => validator.validateAccountState({ ...accountState, energyGapHalvingPeriod: 0 })).toThrowError(
        new AccountStateError('Invalid energy gap halving period'),
      );
      expect(() => validator.validateAccountState({ ...accountState, energyGapHalvingPeriod: -1 })).toThrowError(
        new AccountStateError('Invalid energy gap halving period'),
      );
    });

    it('throws an error when the locked power is negative', () => {
      expect(() => validator.validateAccountState({ ...accountState, lockedPower: -5n })).toThrowError(
        new AccountStateError('Negative locked power'),
      );
    });

    it('throws an error when the energyCalculatedAt is negative', () => {
      expect(() => validator.validateAccountState({ ...accountState, energyCalculatedAt: -1 })).toThrowError(
        new AccountStateError('Negative energy calculation time'),
      );
    });

    it('throws an error when the energy surpasses max cap', () => {
      expect(() => validator.validateAccountState({ ...accountState, energyCap: 3n })).toThrowError(
        new AccountStateError('Energy above cap'),
      );
    });
  });
});
