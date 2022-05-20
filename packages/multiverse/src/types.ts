import { AccountId, AssetId, AssetType, ChainId } from 'caip';
import { BigNumber, Overrides as BaseOverrides } from 'ethers';
import { BigNumberish } from '@ethersproject/bignumber';
import { Listings, Warpers, Rentings } from '@iqprotocol/solidity-contracts-nft/typechain/contracts/metahub/IMetahub';
import ListingStructOutput = Listings.ListingStructOutput;
import WarperStructOutput = Warpers.WarperStructOutput;

export type Address = string;

export type Overrides = BaseOverrides & { from?: string | Promise<string> };

export interface ChainAware {
  // https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-2.md
  getChainId(): Promise<ChainId>;
}

export type AssetListingParams = {
  asset: Asset;
  strategy: FixedPriceListingStrategyParams;
  maxLockPeriod: BigNumberish;
  immediatePayout: boolean;
};

export type FixedPriceListingStrategyParams = {
  name: 'FIXED_PRICE';
  data: {
    price: BigNumberish;
  };
};

export type Listing = Pick<
  ListingStructOutput,
  'maxLockPeriod' | 'lockedTill' | 'immediatePayout' | 'delisted' | 'paused'
> & {
  id: BigNumber;
  asset: Asset;
  strategy: FixedPriceListingStrategyParams;
  listerAccountId: AccountId;
};

export type Asset = {
  id: AssetId;
  value: BigNumberish;
};

export type Warper = Pick<WarperStructOutput, 'name' | 'universeId' | 'paused'> & {
  accountId: AccountId;
  original: AssetType;
};

export type EstimateRentParams = Pick<Rentings.ParamsStruct, 'listingId' | 'rentalPeriod'> & {
  warper: AssetType;
  renter: AccountId;
  paymentToken: AssetType;
};
