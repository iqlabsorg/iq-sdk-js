import { ContractResolver } from '../contract-resolver';
import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';
import { Adapter } from '../adapter';
import { AddressTranslator } from '../address-translator';
import { AccountId, AssetType } from 'caip';
import {
  AssetListingParams,
  Listing,
  RentalAgreement,
  RentalFees,
  RentingEstimationParams,
  RentingParams,
  Warper,
} from '../types';
import { encodeERC721Asset, encodeFixedPriceStrategy, pick } from '../utils';
import { Listings } from '../contracts/metahub/IMetahub';
import { IWarperManager, Metahub } from '../contracts';
import { assetClasses } from '../constants';

export class MetahubAdapter extends Adapter {
  private readonly contract: Metahub;

  constructor(accountId: AccountId, contractResolver: ContractResolver, addressTranslator: AddressTranslator) {
    super(contractResolver, addressTranslator);
    this.contract = contractResolver.resolveMetahub(accountId.address);
  }

  // Protocol Configuration

  /**
   * Returns the base token that's used for stable price denomination.
   */
  async baseToken(): Promise<AssetType> {
    return this.addressToAssetType(await this.contract.baseToken(), 'erc20');
  }

  /**
   * Returns the protocol rental fee percentage.
   */
  async protocolRentalFeePercent(): Promise<number> {
    return this.contract.protocolRentalFeePercent();
  }

  // Payment Management

  // Warper Management

  /**
   * Registers a new warper.
   * The warper must be deployed and configured prior to registration, since it becomes available for renting immediately.
   * @param warper Warper reference.
   * @param params Warper registration params.
   */
  async registerWarper(
    warper: AssetType,
    params: IWarperManager.WarperRegistrationParamsStruct,
  ): Promise<ContractTransaction> {
    return this.contract.registerWarper(this.assetTypeToAddress(warper), params);
  }

  /**
   * Returns the list of all supported assets.
   * @param offset Starting index.
   * @param limit Max number of items.
   */
  async supportedAssets(offset: BigNumberish, limit: BigNumberish): Promise<AssetType[]> {
    const addresses = await this.contract.supportedAssets(offset, limit);
    return addresses.map(address => this.addressToAssetType(address, assetClasses.ERC721.namespace));
  }

  /**
   * Returns the list of warpers belonging to the particular universe.
   * @param universeId The universe ID.
   * @param offset Starting index.
   * @param limit Max number of items.
   */
  async universeWarpers(universeId: BigNumberish, offset: BigNumberish, limit: BigNumberish): Promise<Warper[]> {
    const [addresses, warpers] = await this.contract.universeWarpers(universeId, offset, limit);
    return warpers.map((warper, i) => ({
      ...pick(warper, ['name', 'universeId', 'paused']),
      self: this.addressToAssetType(addresses[i], assetClasses.ERC721.namespace), // todo: infer from blockchain
      original: this.addressToAssetType(warper.original, assetClasses.ERC721.namespace), // todo: infer from blockchain
    }));
  }

  // Listing Management

  /**
   * Creates new asset listing.
   * @param params Listing params.
   */
  async listAsset(params: AssetListingParams): Promise<ContractTransaction> {
    const { asset, strategy, maxLockPeriod, immediatePayout } = params;
    if (asset.id.assetName.namespace !== assetClasses.ERC721.namespace) {
      throw new Error('Invalid namespace');
    }

    const address = this.assetIdToAddress(asset.id);
    const encodedAsset = encodeERC721Asset(address, asset.id.tokenId, asset.value);
    const listingParams = encodeFixedPriceStrategy(strategy.data.price);

    return this.contract.listAsset(encodedAsset, listingParams, maxLockPeriod, immediatePayout);
  }

  /**
   * Marks the asset as being delisted. This operation in irreversible.
   * After delisting, the asset can only be withdrawn when it has no active rentals.
   * @param listingId Listing ID.
   */
  async delistAsset(listingId: BigNumberish): Promise<ContractTransaction> {
    return this.contract.delistAsset(listingId);
  }

  /**
   * Returns the asset back to the lister.
   * @param listingId Listing ID.
   */
  async withdrawAsset(listingId: BigNumberish): Promise<ContractTransaction> {
    return this.contract.withdrawAsset(listingId);
  }

  /**
   * Puts the listing on pause.
   * @param listingId Listing ID.
   */
  async pauseListing(listingId: BigNumberish): Promise<ContractTransaction> {
    return this.contract.pauseListing(listingId);
  }

  /**
   * Returns the paginated list of currently registered listings.
   * @param offset Starting index.
   * @param limit Max number of items.
   */
  async listings(offset: BigNumberish, limit: BigNumberish): Promise<Listing[]> {
    return this.normalizeListings(this.contract.listings(offset, limit));
  }

  /**
   * Returns the paginated list of currently registered listings for the particular lister account.
   * @param lister Lister account ID.
   * @param offset Starting index.
   * @param limit Max number of items.
   */
  async userListings(lister: AccountId, offset: BigNumberish, limit: BigNumberish): Promise<Listing[]> {
    return this.normalizeListings(this.contract.userListings(this.accountIdToAddress(lister), offset, limit));
  }

  /**
   * Returns the paginated list of currently registered listings for the particular original asset address.
   * @param asset Original asset.
   * @param offset Starting index.
   * @param limit Max number of items.
   */
  async assetListings(asset: AssetType, offset: BigNumberish, limit: BigNumberish): Promise<Listing[]> {
    return this.normalizeListings(this.contract.assetListings(this.assetTypeToAddress(asset), offset, limit));
  }

  // Renting Management

  /**
   * Evaluates renting params and returns rental fee breakdown.
   * @param params
   */
  async estimateRent(params: RentingEstimationParams): Promise<RentalFees> {
    const { listingId, paymentToken, rentalPeriod, renter, warper } = params;
    const fees = await this.contract.estimateRent({
      listingId,
      rentalPeriod,
      warper: this.assetTypeToAddress(warper),
      renter: this.accountIdToAddress(renter),
      paymentToken: this.assetTypeToAddress(paymentToken),
    });

    return pick(fees, ['total', 'protocolFee', 'listerBaseFee', 'listerPremium', 'universeBaseFee', 'universePremium']);
  }

  /**
   * Performs renting operation.
   * @param params Renting parameters.
   */
  async rent(params: RentingParams): Promise<ContractTransaction> {
    const { listingId, paymentToken, rentalPeriod, renter, warper, maxPaymentAmount } = params;
    return this.contract.rent(
      {
        listingId,
        rentalPeriod,
        warper: this.assetTypeToAddress(warper),
        renter: this.accountIdToAddress(renter),
        paymentToken: this.assetTypeToAddress(paymentToken),
      },
      maxPaymentAmount,
    );
  }

  /**
   * Returns the paginated list of currently registered rental agreements for particular renter account.
   * @param renter Renter account ID.
   * @param offset Starting index.
   * @param limit Max number of items.
   */
  async userRentalAgreements(renter: AccountId, offset: BigNumberish, limit: BigNumberish): Promise<RentalAgreement[]> {
    const [agreementIds, agreements] = await this.contract.userRentalAgreements(
      this.accountIdToAddress(renter),
      offset,
      limit,
    );

    return agreements.map((agreement, i) => ({
      ...pick(agreement, ['collectionId', 'listingId', 'startTime', 'endTime']),
      id: agreementIds[i],
      warpedAsset: this.decodeERC721AssetStruct(agreement.warpedAsset),
      renter: this.addressToAccountId(agreement.renter),
    }));
  }

  private async normalizeListings(
    listingsRequest: Promise<[BigNumber[], Listings.ListingStructOutput[]]>,
  ): Promise<Listing[]> {
    const [listingIds, listings] = await listingsRequest;
    return listings.map((listing, i) => ({
      ...pick(listing, ['maxLockPeriod', 'lockedTill', 'immediatePayout', 'delisted', 'paused']),
      id: listingIds[i],
      asset: this.decodeERC721AssetStruct(listing.asset),
      strategy: this.decodeFixedPriceListingStrategy(listing.params),
      lister: this.addressToAccountId(listing.lister),
    }));
  }
}
