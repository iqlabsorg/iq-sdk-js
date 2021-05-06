import { AccountState } from './types';

export interface AccountStateValidator {
  validateAccountState(accountState: AccountState): void;
}

export class DefaultValidator implements AccountStateValidator {
  validateAccountState(accountState: AccountState): void {
    if (accountState.balance < 0) {
      throw new Error('Negative balance');
    }
  }
}
