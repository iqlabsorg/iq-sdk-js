import {
  AbstractStore,
  Account,
  AccountState,
  AccountStateValidator,
  StorageProvider,
} from '../src';

class DummyStore extends AbstractStore {
  public getAccount = jest.fn();
  public getAccountState = jest.fn();
  protected _saveAccount = jest.fn();
  protected _saveAccountState = jest.fn();

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  public constructor(validator?: AccountStateValidator) {
    super(validator);
  }
}

const mockValidateAccountState = jest.fn();
jest.mock('../src/validator', () => {
  return {
    DefaultValidator: jest.fn().mockImplementation(() => {
      return { validateAccountState: mockValidateAccountState };
    }),
  };
});

/**
 * @group unit
 */
describe('AbstractStore', () => {
  let store: StorageProvider;

  const account: Account = {
    id: 'test-id',
    data: {
      proof: 'test-proof',
    },
  };

  const accountState: AccountState = {
    accountId: account.id,
    serviceId: 'test-service',
    balance: 10n,
    energy: 5n,
    energyChangedAt: Math.floor(Date.now() / 1000),
  };

  describe('When validator is not provided', () => {
    beforeEach(async () => {
      mockValidateAccountState.mockClear();
      store = new DummyStore();
      await store.saveAccount(account);
    });

    it('uses default validator to validate state', async () => {
      await store.saveAccountState(accountState);
      expect(mockValidateAccountState).toHaveBeenCalledWith(accountState);
    });
  });

  describe('When custom validator is provided', () => {
    it.todo('uses provided validator to validate state');
  });
});
