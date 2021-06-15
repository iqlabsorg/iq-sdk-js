import { AbstractStore, Account, AccountState, AccountStateValidator, StorageProvider } from '../src';

class DummyStore extends AbstractStore {
  public getAccount = jest.fn();
  public getAccountState = jest.fn();
  protected _saveAccount = jest.fn();
  protected _saveAccountState = jest.fn();

  public constructor(validator?: AccountStateValidator) {
    super({ validator });
  }
}

const mockValidateAccount = jest.fn();
const mockValidateAccountState = jest.fn();
jest.mock('../src/validator', () => {
  return {
    DefaultValidator: jest.fn().mockImplementation(() => {
      return <AccountStateValidator>{
        validateAccount: mockValidateAccount,
        validateAccountState: mockValidateAccountState,
      };
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
    power: 10n,
    lockedPower: 0n,
    energy: 5n,
    energyChangedAt: Math.floor(Date.now() / 1000),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('When validator is not provided', () => {
    beforeEach(() => {
      store = new DummyStore();
    });

    it('calls default validator to validate account', async () => {
      await store.saveAccount(account);
      expect(mockValidateAccount).toHaveBeenCalledWith(account);
    });

    it('uses default validator to validate account state', async () => {
      await store.saveAccountState(accountState);
      expect(mockValidateAccountState).toHaveBeenCalledWith(accountState);
    });
  });

  describe('When custom validator is provided', () => {
    const validator: AccountStateValidator = {
      validateAccount: () => jest.fn(),
      validateAccountState: () => jest.fn(),
    };
    beforeEach(async () => {
      store = new DummyStore(validator);
      await store.saveAccount(account);
    });

    it('uses custom validator to validate account', async () => {
      const spy = jest.spyOn(validator, 'validateAccount');
      await store.saveAccount(account);
      expect(spy).toHaveBeenCalledWith(account);
    });

    it('uses custom validator to validate account state', async () => {
      const spy = jest.spyOn(validator, 'validateAccountState');
      await store.saveAccountState(accountState);
      expect(spy).toHaveBeenCalledWith(accountState);
    });
  });
});
