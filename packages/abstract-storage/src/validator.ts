import { Account, AccountState } from './types';

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
      'power',
      'lockedPower',
      'energyCap',
      'energy',
      'energyCalculatedAt',
    ];

    requiredProperties.forEach(propName => {
      if (isEmpty(accountState[propName])) {
        throw new Error(`Empty ${propName}`);
      }
    });

    if (accountState.power < 0) {
      throw new Error('Negative power');
    }

    if (accountState.lockedPower < 0) {
      throw new Error('Negative locked power');
    }

    if (accountState.energyCap < 0) {
      throw new Error('Negative energy cap');
    }

    if (accountState.energy > accountState.energyCap) {
      throw new Error('Energy above cap');
    }

    if (accountState.energyCalculatedAt < 0) {
      throw new Error('Negative energy calculation time');
    }
  }
}
