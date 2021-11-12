import { AssetId, AssetType } from 'caip';
import { BigNumber } from '@ethersproject/bignumber';

export class AssetIdTranslator {
  constructor(private readonly assetType: AssetType) {}

  tokenIdToAssetId(tokenId: BigNumber): AssetId {
    return new AssetId({
      tokenId: tokenId.toString(),
      ...this.assetType.toJson(),
    });
  }

  assetIdToTokenId(assetId: AssetId): string {
    const { chainId, assetName } = this.assetType;
    if (chainId.toString() !== assetId.chainId.toString()) {
      throw new Error(`Chain ID mismatch! Expected chain ID: ${chainId.toString()}`);
    }

    if (assetName.toString() !== assetId.assetName.toString()) {
      throw new Error(`Asset mismatch! Expected asset: ${assetName.toString()}`);
    }

    return assetId.tokenId;
  }
}
