import { AbstractStore, Account, AccountState, AccountStateValidator, StorageProvider } from '../src';

class DummyStore extends AbstractStore {
  public getAccount = jest.fn();
  public getAccountState = jest.fn();
  protected _saveAccount = jest.fn();
  protected _initAccountState = jest.fn();
  protected _changeAccountState = jest.fn();

  public constructor(validator?: AccountStateValidator) {
    super({ validator });
  }
}
const defaultValidatorMock: AccountStateValidator = {
  validateAccount: jest.fn(),
  validateAccountState: jest.fn(),
};

jest.mock('../src/validator', () => {
  return {
    DefaultValidator: jest.fn().mockImplementation(() => defaultValidatorMock),
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
      proof: { v: '1', sig: 'signature' },
    },
  };

  const accountState: AccountState = {
    accountId: account.id,
    serviceId: 'test-service',
    power: 10n,
    lockedPower: 0n,
    energyCap: 5n,
    energy: 5n,
    energyCalculatedAt: Math.floor(Date.now() / 1000),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('When validator is not provided', () => {
    beforeEach(() => {
      store = new DummyStore();
    });

    it('calls default validator to validate account', async () => {
      const spy = jest.spyOn(defaultValidatorMock, 'validateAccount');
      await store.saveAccount(account);
      expect(spy).toHaveBeenCalledWith(account);
    });

    it('uses default validator to validate account state upon initialization', async () => {
      const spy = jest.spyOn(defaultValidatorMock, 'validateAccountState');
      await store.initAccountState(accountState);
      expect(spy).toHaveBeenCalledWith(accountState);
    });

    it('uses default validator to validate account state upon change', async () => {
      const spy = jest.spyOn(defaultValidatorMock, 'validateAccountState');
      const newState = { ...accountState, power: 20n };
      await store.changeAccountState(accountState, newState);
      expect(spy).toHaveBeenCalledWith(newState);
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

    it('uses custom validator to validate account state upon initialization', async () => {
      const spy = jest.spyOn(validator, 'validateAccountState');
      await store.initAccountState(accountState);
      expect(spy).toHaveBeenCalledWith(accountState);
    });

    it('uses custom validator to validate account state upon change', async () => {
      const newState = { ...accountState, power: 20n };
      const spy = jest.spyOn(validator, 'validateAccountState');
      await store.changeAccountState(accountState, newState);
      expect(spy).toHaveBeenCalledWith(newState);
    });
  });
});
