import { AccountId, AssetId, AssetType, ChainId } from 'caip';
import { BigNumber, Overrides as BaseOverrides } from 'ethers';
import { BigNumberish } from '@ethersproject/bignumber';
import { Accounts, Listings, Rentings, Warpers } from './contracts/contracts/metahub/IMetahub';

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
  Listings.ListingStructOutput,
  'maxLockPeriod' | 'lockedTill' | 'immediatePayout' | 'delisted' | 'paused'
> & {
  id: BigNumber;
  asset: Asset;
  strategy: FixedPriceListingStrategyParams;
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
