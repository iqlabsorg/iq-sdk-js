import { AccountStateValidator, AccountStore } from '../../src';

export class DummyStore extends AccountStore {
  public getAccount = jest.fn();
  public deleteAccount = jest.fn();
  public getAccountState = jest.fn();
  public deleteAccountState = jest.fn();
  protected _saveAccount = jest.fn();
  protected _initAccountState = jest.fn();
  protected _changeAccountState = jest.fn();

  public constructor(validator?: AccountStateValidator) {
    super({ validator });
  }
}

export const defaultValidatorMock: AccountStateValidator = {
  validateAccount: jest.fn(),
  validateAccountState: jest.fn(),
};
