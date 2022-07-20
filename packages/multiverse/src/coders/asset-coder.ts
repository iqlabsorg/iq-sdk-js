/* eslint-disable sonarjs/no-small-switch */
import { defaultAbiCoder } from 'ethers/lib/utils';
import { assetClasses } from '../constants';
import { Asset } from '../types';
import { BigNumber } from '@ethersproject/bignumber';
import { Assets } from '../contracts/contracts/metahub/IMetahub';
import { AssetId, ChainId } from 'caip';
import { assetClassToNamespace } from '../utils';

export class AssetCoder {
  /**
   * Encodes asset structure.
   * @param asset
   */
  static encode({ id, value }: Asset): Assets.AssetStruct {
    const { ERC721 } = assetClasses;

    switch (id.assetName.namespace) {
      case ERC721.namespace: {
        return {
          id: {
            class: ERC721.id,
            data: defaultAbiCoder.encode(['address', 'uint256'], [id.assetName.reference, id.tokenId]),
          },
          value,
        };
      }
      // Add new asset class support below:
      // case ERC1155.namespace: {}

      default: {
        throw Error('Unrecognized asset class');
      }
    }
  }

  /**
   * Decodes asset structure.
   * @param params
   * @param chainId
   */
  static decode({ id, value }: Assets.AssetStructOutput, chainId: ChainId): Asset {
    const { ERC721 } = assetClasses;

    switch (id.class) {
      case ERC721.id: {
        const [address, tokenId] = defaultAbiCoder.decode(['address', 'uint256'], id.data) as [string, BigNumber];
        return {
          value,
          id: new AssetId({
            chainId,
            assetName: {
              namespace: assetClassToNamespace(id.class),
              reference: address,
            },
            tokenId: tokenId.toString(),
          }),
        };
      }
      // Add new asset class support below:
      // case ERC1155.id: {}

      default: {
        throw Error('Unrecognized asset class');
      }
    }
  }
}
