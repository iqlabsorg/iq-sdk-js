import { defaultAbiCoder } from 'ethers/lib/utils';
import { assetClasses, listingStrategies } from './constants';
import { BigNumberish } from '@ethersproject/bignumber';
import { Address } from './types';
import { Assets } from '@iqprotocol/solidity-contracts-nft/typechain/contracts/metahub/Metahub';

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

/**
 * Creates ERC721 Asset structure.
 * @param token
 * @param tokenId
 * @param value
 */
export const encodeERC721Asset = (
  token: Address,
  tokenId: BigNumberish,
  value: BigNumberish = 1,
): Assets.AssetStruct => {
  return {
    id: { class: assetClasses.ERC721.id, data: defaultAbiCoder.encode(['address', 'uint256'], [token, tokenId]) },
    value,
  };
};

/**
 * Creates Fixed Price listing strategy params structure.
 * @param baseRate
 */
export const encodeFixedPriceStrategy = (baseRate: BigNumberish): { strategy: string; data: string } => {
  return {
    strategy: listingStrategies.FIXED_PRICE.id,
    data: defaultAbiCoder.encode(['uint256'], [baseRate]),
  };
};
