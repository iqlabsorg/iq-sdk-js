import { hexDataSlice, solidityKeccak256 } from 'ethers/lib/utils';

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

// TODO: use IQ NFT repos exports for this!
export const solidityId = (string: string): string => {
  return hexDataSlice(solidityKeccak256(['string'], [string]), 0, 4);
};
