import { hexDataSlice, solidityKeccak256 } from 'ethers/lib/utils';

// TODO: use IQ NFT repos exports for this!
export const solidityId = (string: string): string => {
  return hexDataSlice(solidityKeccak256(['string'], [string]), 0, 4);
};

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
