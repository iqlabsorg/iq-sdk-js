import { ContractResolver } from '../contract-resolver';
import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';
import { Adapter } from '../adapter';
import { AddressTranslator } from '../address-translator';
import { AccountId, AssetType } from 'caip';
import {
  AccountBalance,
  Address,
  Asset,
  AssetListingParams,
  BaseToken,
  Listing,
  RegisteredWarper,
  RentalAgreement,
  RentalFees,
  RentingEstimationParams,
  RentingParams,
} from '../types';
import { encodeERC721Asset, encodeFixedPriceStrategy, pick } from '../utils';
import { Listings, Rentings, Warpers } from '../contracts/contracts/metahub/IMetahub';
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
  async baseToken(): Promise<BaseToken> {
    const type = this.addressToAssetType(await this.contract.baseToken(), 'erc20');
    const metadata = await this.erc20AssetMetadata(type);
    return { type, ...metadata };
  }

  /**
   * Returns the protocol rental fee percentage.
   */
  async protocolRentalFeePercent(): Promise<number> {
    return this.contract.protocolRentalFeePercent();
  }

  // Payment Management

  /**
   * Returns the amount of `token`, currently accumulated by the user.
   * @param account The account to query the balance for.
   * @param token The token in which the balance is nominated.
   * @return Balance of `token`.
   */
  async balance(account: AccountId, token: AssetType): Promise<BigNumber> {
    return this.contract.balance(this.accountIdToAddress(account), this.assetTypeToAddress(token));
  }

  /**
   * Returns the list of user balances in various tokens.
   * @param account The account to query the balance for.
   * @return List of balances.
   */
  async balances(account: AccountId): Promise<AccountBalance[]> {
    const balances = await this.contract.balances(this.accountIdToAddress(account));
    return balances.map(balance => ({
      amount: balance.amount,
      token: this.addressToAssetType(balance.token, 'erc20'),
    }));
  }

  /**
   * Returns the amount of `token`, currently accumulated by the universe.
   * @param universeId The universe ID.
   * @param token The token address.
   * @return Balance of `token`.
   */
  async universeBalance(universeId: BigNumberish, token: AssetType): Promise<BigNumber> {
    return this.contract.universeBalance(universeId, this.assetTypeToAddress(token));
  }

  /**
   * Returns the list of universe balances in various tokens.
   * @param universeId The universe ID.
   * @return List of balances.
   */
  async universeBalances(universeId: BigNumberish): Promise<AccountBalance[]> {
    const balances = await this.contract.universeBalances(universeId);
    return balances.map(balance => ({
      amount: balance.amount,
      token: this.addressToAssetType(balance.token, 'erc20'),
    }));
  }

  /**
   * Transfers the specific `amount` of `token` from a user balance to an arbitrary address.
   * @param token The balance token.
   * @param amount The amount to be withdrawn.
   * @param to The payee account.
   */
  async withdrawFunds(token: AssetType, amount: BigNumberish, to: AccountId): Promise<ContractTransaction> {
    return this.contract.withdrawFunds(this.assetTypeToAddress(token), amount, this.accountIdToAddress(to));
  }

  /**
   * Transfers the specific `amount` of `token` from a universe balance to an arbitrary address.
   * @param universeId The universe ID.
   * @param token The balance token.
   * @param amount The amount to be withdrawn.
   * @param to The payee account.
   */
  async withdrawUniverseFunds(
    universeId: BigNumberish,
    token: AssetType,
    amount: BigNumberish,
    to: AccountId,
  ): Promise<ContractTransaction> {
    return this.contract.withdrawUniverseFunds(
      universeId,
      this.assetTypeToAddress(token),
      amount,
      this.accountIdToAddress(to),
    );
  }

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
   * Deletes warper registration information.
   * All current rental agreements with the warper will stay intact, but the new rentals won't be possible.
   * @param warper Warper reference.
   */
  async deregisterWarper(warper: AssetType): Promise<ContractTransaction> {
    return this.contract.deregisterWarper(this.assetTypeToAddress(warper));
  }

  /**
   * Puts the warper on pause.
   * @param warper Warper reference.
   */
  async pauseWarper(warper: AssetType): Promise<ContractTransaction> {
    return this.contract.pauseWarper(this.assetTypeToAddress(warper));
  }

  /**
   * Lifts the warper pause.
   * @param warper Warper reference.
   */
  async unpauseWarper(warper: AssetType): Promise<ContractTransaction> {
    return this.contract.unpauseWarper(this.assetTypeToAddress(warper));
  }

  /**
   * Returns the number of currently supported assets.
   * @return Asset count.
   */
  async supportedAssetCount(): Promise<BigNumber> {
    return this.contract.supportedAssetCount();
  }

  /**
   * Returns the list of all supported assets.
   * @param offset Starting index.
   * @param limit Max number of items.
   */
  async supportedAssets(offset: BigNumberish, limit: BigNumberish): Promise<AssetType[]> {
    const [addresses, assetConfigs] = await this.contract.supportedAssets(offset, limit);
    return assetConfigs.map((assetConfig, i) =>
      this.addressToAssetType(addresses[i], this.assetClassToNamespace(assetConfig.assetClass)),
    );
  }

  /**
   * Returns the number of warpers belonging to the particular universe.
   * @param universeId The universe ID.
   * @return Warper count.
   */
  async universeWarperCount(universeId: BigNumberish): Promise<BigNumber> {
    return this.contract.universeWarperCount(universeId);
  }

  /**
   * Returns the list of warpers belonging to the particular universe.
   * @param universeId The universe ID.
   * @param offset Starting index.
   * @param limit Max number of items.
   */
  async universeWarpers(
    universeId: BigNumberish,
    offset: BigNumberish,
    limit: BigNumberish,
  ): Promise<RegisteredWarper[]> {
    const [addresses, warpers] = await this.contract.universeWarpers(universeId, offset, limit);
    return warpers.map((warper, i) => this.normalizeWarper(addresses[i], warper));
  }

  /**
   * Returns the number of warpers associated with the particular original asset.
   * @param asset Original asset reference.
   * @return Warper count.
   */
  async assetWarperCount(asset: AssetType): Promise<BigNumber> {
    return this.contract.assetWarperCount(this.assetTypeToAddress(asset));
  }

  /**
   * Returns the list of warpers associated with the particular original asset.
   * @param asset Original asset reference.
   * @param offset Starting index.
   * @param limit Max number of items.
   */
  async assetWarpers(asset: AssetType, offset: BigNumberish, limit: BigNumberish): Promise<RegisteredWarper[]> {
    const [addresses, warpers] = await this.contract.assetWarpers(this.assetTypeToAddress(asset), offset, limit);
    return warpers.map((warper, i) => this.normalizeWarper(addresses[i], warper));
  }

  /**
   * @dev Returns warper preset factory address.
   */
  async warperPresetFactory(): Promise<AccountId> {
    return this.addressToAccountId(await this.contract.warperPresetFactory());
  }

  /**
   * Checks whether `account` is the `warper` admin.
   * @param warper Warper reference.
   * @param account Admin account ID.
   * @return True if the `account` is the admin of the `warper` and false otherwise.
   */
  async isWarperAdmin(warper: AssetType, account: AccountId): Promise<boolean> {
    return this.contract.isWarperAdmin(this.assetTypeToAddress(warper), this.accountIdToAddress(account));
  }

  /**
   * Returns registered warper details.
   * @param warper Warper reference.
   * @return Warper details.
   */
  async warper(warper: AssetType): Promise<RegisteredWarper> {
    const warperAddress = this.assetTypeToAddress(warper);
    const warperInfo = await this.contract.warperInfo(warperAddress);
    return this.normalizeWarper(warperAddress, warperInfo);
  }

  // Listing Management

  /**
   * Approves Metahub to take an asset from lister account during listing process.
   * @param asset
   */
  async approveForListing(asset: Asset): Promise<ContractTransaction> {
    // todo: DRY! Use util function to check asset support and encode it.
    if (asset.id.assetName.namespace !== assetClasses.ERC721.namespace) {
      //eslint-disable-next-line sonarjs/no-duplicate-string
      throw new Error('Invalid namespace');
    }

    return this.contractResolver
      .resolveERC721Asset(this.assetIdToAddress(asset.id))
      .approve(this.contract.address, asset.id.tokenId);
  }

  /**
   * Checks whether the asset is approved for listing by the owner.
   * Returns `true` if the asset can be listed, and `false` if the required approval is missing.
   * @param asset
   */
  async isApprovedForListing(asset: Asset): Promise<boolean> {
    // todo: DRY! Use util function to check asset support and encode it.
    if (asset.id.assetName.namespace !== assetClasses.ERC721.namespace) {
      throw new Error('Invalid namespace');
    }

    // Check particular token allowance.
    const assetContract = this.contractResolver.resolveERC721Asset(this.assetIdToAddress(asset.id));
    //eslint-disable-next-line no-extra-parens
    if ((await assetContract.getApproved(asset.id.tokenId)) === this.contract.address) {
      return true;
    }

    // Check operator.
    const assumedOwner = await this.signerAddress();
    return assetContract.isApprovedForAll(assumedOwner, this.contract.address);
  }

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
   * Lifts the listing pause.
   * @param listingId Listing ID.
   */
  async unpauseListing(listingId: BigNumberish): Promise<ContractTransaction> {
    return this.contract.unpauseListing(listingId);
  }

  /**
   * Returns the listing details by the listing ID.
   * @param listingId Listing ID.
   * @return Listing details.
   */
  async listing(listingId: BigNumberish): Promise<Listing> {
    const listing = await this.contract.listingInfo(listingId);
    return this.normalizeListing(listingId, listing);
  }

  /**
   * Returns the number of currently registered listings.
   * @return Listing count.
   */
  async listingCount(): Promise<BigNumber> {
    return this.contract.listingCount();
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
   * Returns the number of currently registered listings for the particular lister account.
   * @param lister Lister account ID.
   * @return Listing count.
   */
  async userListingCount(lister: AccountId): Promise<BigNumber> {
    return this.contract.userListingCount(this.accountIdToAddress(lister));
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
   * Returns the number of currently registered listings for the particular original asset.
   * @param asset Original asset reference.
   * @return Listing count.
   */
  async assetListingCount(asset: AssetType): Promise<BigNumber> {
    return this.contract.assetListingCount(this.assetTypeToAddress(asset));
  }

  /**
   * Returns the paginated list of currently registered listings for the particular original asset.
   * @param asset Original asset reference.
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
   * Returns the rental agreement details.
   * @param rentalId Rental agreement ID.
   * @return Rental agreement details.
   */
  async rentalAgreement(rentalId: BigNumberish): Promise<RentalAgreement> {
    const rentalAgreement = await this.contract.rentalAgreementInfo(rentalId);
    return this.normalizeRentalAgreement(rentalId, rentalAgreement);
  }

  /**
   * Returns the number of currently registered rental agreements for particular renter account.
   * @param renter Renter account ID.
   * @return Rental agreement count.
   */
  async userRentalCount(renter: AccountId): Promise<BigNumber> {
    return this.contract.userRentalCount(this.accountIdToAddress(renter));
  }

  /**
   * Returns the paginated list of currently registered rental agreements for particular renter account.
   * @param renter Renter account ID.
   * @param offset Starting index.
   * @param limit Max number of items.
   */
  async userRentalAgreements(renter: AccountId, offset: BigNumberish, limit: BigNumberish): Promise<RentalAgreement[]> {
    const [rentalIds, agreements] = await this.contract.userRentalAgreements(
      this.accountIdToAddress(renter),
      offset,
      limit,
    );

    return agreements.map((agreement, i) => this.normalizeRentalAgreement(rentalIds[i], agreement));
  }

  /**
   * Normalizes rental agreement structure.
   * @param rentalId
   * @param agreement
   * @private
   */
  private normalizeRentalAgreement(rentalId: BigNumberish, agreement: Rentings.AgreementStructOutput): RentalAgreement {
    return {
      ...pick(agreement, ['collectionId', 'listingId', 'startTime', 'endTime']),
      id: BigNumber.from(rentalId),
      warpedAsset: this.decodeERC721AssetStruct(agreement.warpedAsset),
      renter: this.addressToAccountId(agreement.renter),
    };
  }

  /**
   * Resolves listings and normalizes them.
   * @param listingsRequest
   * @private
   */
  private async normalizeListings(
    listingsRequest: Promise<[BigNumber[], Listings.ListingStructOutput[]]>,
  ): Promise<Listing[]> {
    const [listingIds, listings] = await listingsRequest;
    return listings.map((listing, i) => this.normalizeListing(listingIds[i], listing));
  }

  /**
   * Normalizes listing structure.
   * @param listingId
   * @param listing
   * @private
   */
  private normalizeListing(listingId: BigNumberish, listing: Listings.ListingStructOutput): Listing {
    return {
      ...pick(listing, ['maxLockPeriod', 'lockedTill', 'immediatePayout', 'delisted', 'paused']),
      id: BigNumber.from(listingId),
      asset: this.decodeERC721AssetStruct(listing.asset),
      strategy: this.decodeFixedPriceListingStrategy(listing.params),
      lister: this.addressToAccountId(listing.lister),
    };
  }

  /**
   * Normalizes warper structure.
   * @param warperAddress
   * @param warper
   * @private
   */
  private normalizeWarper(warperAddress: Address, warper: Warpers.WarperStructOutput): RegisteredWarper {
    const namespace = this.assetClassToNamespace(warper.assetClass);
    return {
      ...pick(warper, ['name', 'universeId', 'paused']),
      self: this.addressToAssetType(warperAddress, namespace),
      original: this.addressToAssetType(warper.original, namespace),
    };
  }
}
