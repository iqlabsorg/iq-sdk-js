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
        proof: 'test-proof',
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
      energy: 5n,
      energyChangedAt: Math.floor(Date.now() / 1000),
    };

    test.each(<Array<keyof AccountState>>[
      'serviceId',
      'accountId',
      'power',
      'lockedPower',
      'energy',
      'energyChangedAt',
    ])('throws error when the "%s" is missing', prop => {
      expect(() => validator.validateAccountState({ ...accountState, [prop]: undefined })).toThrowError(
        `Empty ${prop}`,
      );
    });

    it('throws an error when the power is negative', () => {
      expect(() => validator.validateAccountState({ ...accountState, power: -5n })).toThrowError('Negative power');
    });

    it('throws an error when the energyChangedAt is negative', () => {
      expect(() => validator.validateAccountState({ ...accountState, energyChangedAt: -1 })).toThrowError(
        'Negative energyChangedAt',
      );
    });
  });
});
