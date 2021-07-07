import { Account, AccountState, DefaultValidator } from '../src';

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
        `Empty ${prop}`,
      );
    });

    it('throws an error when the power is negative', () => {
      expect(() => validator.validateAccountState({ ...accountState, power: -5n })).toThrowError('Negative power');
    });

    it('throws an error when the locked power is negative', () => {
      expect(() => validator.validateAccountState({ ...accountState, lockedPower: -5n })).toThrowError(
        'Negative locked power',
      );
    });

    it('throws an error when the energyCalculatedAt is negative', () => {
      expect(() => validator.validateAccountState({ ...accountState, energyCalculatedAt: -1 })).toThrowError(
        'Negative energy calculation time',
      );
    });

    it('throws an error when the energyCap is negative', () => {
      expect(() => validator.validateAccountState({ ...accountState, energyCap: -1n })).toThrowError(
        'Negative energy cap',
      );
    });

    it('throws an error when the energy surpasses max cap', () => {
      expect(() => validator.validateAccountState({ ...accountState, energyCap: 3n })).toThrowError('Energy above cap');
    });
  });
});
