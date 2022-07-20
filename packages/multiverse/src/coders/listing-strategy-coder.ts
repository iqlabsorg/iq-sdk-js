import { defaultAbiCoder } from 'ethers/lib/utils';
import { listingStrategies } from '../constants';
import { ListingStrategyParams } from '../types';
import { BigNumber } from '@ethersproject/bignumber';
import { Listings } from '../contracts/contracts/metahub/IMetahub';

export class ListingStrategyCoder {
  /**
   * Encodes listing strategy params structure.
   * @param params
   */
  static encode(params: ListingStrategyParams): Listings.ParamsStruct {
    const { FIXED_PRICE, FIXED_PRICE_WITH_REWARD } = listingStrategies;

    switch (params.name) {
      case FIXED_PRICE.name:
        return {
          strategy: FIXED_PRICE.id,
          data: defaultAbiCoder.encode(['uint256'], [params.data.price]),
        };
      case FIXED_PRICE_WITH_REWARD.name:
        return {
          strategy: FIXED_PRICE_WITH_REWARD.id,
          data: defaultAbiCoder.encode(['uint256', 'uint16'], [params.data.price, params.data.rewardPercent]),
        };
      default: {
        throw Error('Unrecognized listing strategy');
      }
    }
  }

  /**
   * Decodes listing strategy params structure.
   * @param params
   */
  static decode(params: Listings.ParamsStruct): ListingStrategyParams {
    const { FIXED_PRICE, FIXED_PRICE_WITH_REWARD } = listingStrategies;

    switch (params.strategy) {
      case FIXED_PRICE.id: {
        const [price] = defaultAbiCoder.decode(['uint256'], params.data) as [BigNumber];
        return {
          name: FIXED_PRICE.name,
          data: { price },
        };
      }

      case FIXED_PRICE_WITH_REWARD.id: {
        const [price, rewardPercent] = defaultAbiCoder.decode(['uint256'], params.data) as [BigNumber, BigNumber];
        return {
          name: FIXED_PRICE_WITH_REWARD.name,
          data: { price, rewardPercent },
        };
      }

      default: {
        throw Error('Unrecognized listing strategy');
      }
    }
  }
}
