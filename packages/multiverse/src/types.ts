import { AccountId, AssetId, AssetType, ChainId } from 'caip';
import { BigNumber, Overrides as BaseOverrides } from 'ethers';
import { BigNumberish } from '@ethersproject/bignumber';
import { Accounts, Listings, Rentings } from './contracts/contracts/metahub/IMetahub';
import { Warpers } from './contracts/contracts/warper/IWarperManager';
import { listingStrategies } from './constants';

export type Address = string;

export type Overrides = BaseOverrides & { from?: string | Promise<string> };

export interface ChainAware {
  // https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-2.md
  getChainId(): Promise<ChainId>;
}

export type ListingStrategyParams = FixedPriceListingStrategyParams | FixedPriceWithRewardListingStrategyParams;

export type FixedPriceListingStrategyParams = {
  name: typeof listingStrategies.FIXED_PRICE.name;
  data: {
    price: BigNumberish;
  };
};

export type FixedPriceWithRewardListingStrategyParams = {
  name: typeof listingStrategies.FIXED_PRICE_WITH_REWARD.name;
  data: {
    price: BigNumberish;
    rewardPercent: BigNumberish;
  };
};

export type AssetListingParams = {
  asset: Asset;
  strategy: ListingStrategyParams;
  maxLockPeriod: BigNumberish;
  immediatePayout: boolean;
};

export type Listing = Pick<
  Listings.ListingStructOutput,
  'maxLockPeriod' | 'lockedTill' | 'immediatePayout' | 'delisted' | 'paused' | 'groupId'
> & {
  id: BigNumber;
  asset: Asset;
  strategy: ListingStrategyParams;
  lister: AccountId;
};

export type Asset = {
  id: AssetId;
  value: BigNumberish;
};

export type RegisteredWarper = Pick<Warpers.WarperStructOutput, 'name' | 'universeId' | 'paused'> & {
  self: AssetType;
  original: AssetType;
};

export type RentingEstimationParams = Pick<Rentings.ParamsStruct, 'listingId' | 'rentalPeriod'> & {
  warper: AssetType;
  renter: AccountId;
  paymentToken: AssetType;
};

export type RentingParams = RentingEstimationParams & { maxPaymentAmount: BigNumberish };

export type RentalFees = Pick<
  Rentings.RentalFeesStructOutput,
  'total' | 'protocolFee' | 'listerBaseFee' | 'listerPremium' | 'universeBaseFee' | 'universePremium'
>;

export type RentalAgreement = Pick<
  Rentings.AgreementStructOutput,
  'collectionId' | 'listingId' | 'startTime' | 'endTime'
> & {
  id: BigNumber;
  warpedAsset: Asset;
  renter: AccountId;
  listingParams: ListingStrategyParams;
};

export type AccountBalance = Pick<Accounts.BalanceStructOutput, 'amount'> & {
  token: AssetType;
};

export type BaseToken = {
  type: AssetType;
  name: string;
  symbol: string;
  decimals: number;
};

export type WarperRentingConstraints = {
  availabilityPeriod?: {
    start: number;
    end: number;
  };
  rentalPeriod?: {
    min: number;
    max: number;
  };
};
