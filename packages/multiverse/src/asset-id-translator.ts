import { AssetId, AssetType } from 'caip';
import { BigNumber } from '@ethersproject/bignumber';
import { assertSameAssetType } from './utils';

export class AssetIdTranslator {
  constructor(private readonly assetType: AssetType) {}

  tokenIdToAssetId(tokenId: BigNumber): AssetId {
    return new AssetId({
      tokenId: tokenId.toString(),
      ...this.assetType.toJson(),
    });
  }

  assetIdToTokenId(assetId: AssetId): string {
    assertSameAssetType(assetId, this.assetType);
    return assetId.tokenId;
  }
}
