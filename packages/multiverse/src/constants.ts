import { solidityId } from '@iqprotocol/solidity-contracts-nft';

// The `namespace` value must be a correct CAIP-19 asset type namespace.
export type AssetClassNamespace = 'erc721';
export type AssetClass = 'ERC721';
export const assetClasses: Record<AssetClass, { id: string; namespace: AssetClassNamespace }> = {
  ERC721: { id: solidityId('ERC721'), namespace: 'erc721' },
};

export type ListingStrategyName = 'FIXED_PRICE';
export const listingStrategies: Record<ListingStrategyName, { id: string; name: ListingStrategyName }> = {
  FIXED_PRICE: { id: solidityId('FIXED_PRICE'), name: 'FIXED_PRICE' },
};
