import { AccountState, DefaultValidator } from '../src';

/**
 * @group unit
 */
describe('DefaultValidator', () => {
  const accountState: AccountState = {
    accountId: 'account-id',
    serviceId: 'test-service',
    balance: 10n,
    energy: 5n,
    energyChangedAt: Math.floor(Date.now() / 1000),
  };

  let validator: DefaultValidator;

  beforeEach(() => {
    validator = new DefaultValidator();
  });

  it('throws error when the balance is negative', () => {
    expect(() => validator.validateAccountState({ ...accountState, balance: -5n })).toThrowError('Negative balance');
  });
});
