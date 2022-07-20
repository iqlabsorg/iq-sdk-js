import { assetClasses } from './constants';

export const pick = <T, K extends keyof T>(obj: T, names: readonly K[]): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  let idx = 0;
  while (idx < names.length) {
    if (names[idx] in obj) {
      result[names[idx]] = obj[names[idx]];
    }
    idx += 1;
  }
  return result;
};

export const assetClassToNamespace = (assetClass: string): string => {
  return Object.values(assetClasses).find(({ id }) => assetClass === id)?.namespace ?? 'unknown';
};
