import { hexDataSlice, solidityKeccak256 } from 'ethers/lib/utils';
import { BigNumber } from '@ethersproject/bignumber';
import { AccountId, AssetId, AssetType, ChainId } from 'caip';

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

export const solidityId = (string: string): string => {
  return hexDataSlice(solidityKeccak256(['string'], [string]), 0, 4);
};

export const assertSameChainId = (chainId: ChainId, expectedChainId: ChainId): void => {
  if (chainId.toString() !== expectedChainId.toString()) {
    throw new Error(`Chain ID mismatch! Expected chain ID: ${expectedChainId.toString()}`);
  }
};

export const assertAccountChainId = (accountId: AccountId, expectedChainId: ChainId): void =>
  assertSameChainId(accountId.chainId, expectedChainId);

export const assertSameAssetType = (assetId: AssetId, assetType: AssetType): void => {
  const { chainId, assetName } = assetType;
  assertSameChainId(assetId.chainId, chainId);

  if (assetName.toString() !== assetId.assetName.toString()) {
    throw new Error(`Asset mismatch! Expected asset: ${assetName.toString()}`);
  }
};

export const createAssetId = ({ chainId, assetName }: AssetType, tokenId: BigNumber): AssetId =>
  new AssetId({ chainId, assetName, tokenId: tokenId.toString() });
