import { solidityId } from './utils';

// The `namespace` value must be a correct CAIP-19 asset type namespace.
export type AssetClassNamespace = 'erc721';
export const asstClasses: Record<string, { id: string; namespace: AssetClassNamespace }> = {
  ERC721: { id: solidityId('ERC721'), namespace: 'erc721' },
};

export type ListingStrategyName = 'FIXED_PRICE';
export const listingStrategies: Record<ListingStrategyName, string> = {
  FIXED_PRICE: solidityId('FIXED_PRICE'),
};
