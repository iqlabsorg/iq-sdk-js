import { Account, AccountState } from './types';
import { AccountStateError } from './errors';

const isEmpty = (value: unknown): boolean =>
  typeof value === 'undefined' || value === null || !String(value).trim().length;

export interface AccountStateValidator {
  validateAccount(account: Account): void;
  validateAccountState(accountState: AccountState): void;
}

export class DefaultValidator implements AccountStateValidator {
  validateAccount(account: Account): void {
    if (isEmpty(account.id)) {
      throw new Error('Empty id');
    }
  }

  validateAccountState(accountState: AccountState): void {
    const requiredProperties: Array<keyof AccountState> = [
      'serviceId',
      'accountId',
      'gapHalvingPeriod',
      'power',
      'lockedPower',
      'energyCap',
      'energy',
      'energyCalculatedAt',
    ];

    requiredProperties.forEach(propName => {
      if (isEmpty(accountState[propName])) {
        throw new AccountStateError(`Empty ${propName}`);
      }
    });

    if (accountState.power < 0) {
      throw new AccountStateError('Negative power');
    }

    if (accountState.gapHalvingPeriod <= 0) {
      throw new AccountStateError('Invalid gap halving period');
    }

    if (accountState.lockedPower < 0) {
      throw new AccountStateError('Negative locked power');
    }

    if (accountState.energy > accountState.energyCap) {
      throw new AccountStateError('Energy above cap');
    }

    if (accountState.energyCalculatedAt < 0) {
      throw new AccountStateError('Negative energy calculation time');
    }
  }
}
