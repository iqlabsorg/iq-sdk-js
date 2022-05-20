import { ContractResolver } from '../contract-resolver';
import { IWarperManager, Metahub } from '@iqprotocol/solidity-contracts-nft';
import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';
import { Adapter } from '../adapter';
import { AddressTranslator } from '../address-translator';
import { AccountId, AssetType } from 'caip';

import { AssetListingParams, Listing, Warper } from '../types';
import { encodeERC721Asset, encodeFixedPriceStrategy, pick } from '../utils';
import { Listings } from '@iqprotocol/solidity-contracts-nft/typechain/contracts/metahub/IMetahub';
import ListingStructOutput = Listings.ListingStructOutput;

export class MetahubAdapter extends Adapter {
  private readonly contract: Metahub;

  constructor(accountId: AccountId, contractResolver: ContractResolver, addressTranslator: AddressTranslator) {
    super(contractResolver, addressTranslator);
    this.contract = contractResolver.resolveMetahub(accountId.address);
  }

  async pauseListing(listingId: BigNumberish): Promise<ContractTransaction> {
    return this.contract.pauseListing(listingId);
  }

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
   * Creates new asset listing.
   * @param asset
   * @param strategy
   * @param maxLockPeriod
   * @param immediatePayout
   */
  async listAsset({
    asset,
    strategy,
    maxLockPeriod,
    immediatePayout,
  }: AssetListingParams): Promise<ContractTransaction> {
    if (asset.id.assetName.namespace !== 'erc721') {
      throw new Error('Invalid namespace');
    }

    const address = this.assetIdToAddress(asset.id);
    const encodedAsset = encodeERC721Asset(address, asset.id.tokenId, asset.value);
    const listingParams = encodeFixedPriceStrategy(strategy.data.price);

    return this.contract.listAsset(encodedAsset, listingParams, maxLockPeriod, immediatePayout);
  }

  /**
   * Delists asset.
   * @param listingId
   */
  async delistAsset(listingId: BigNumberish): Promise<ContractTransaction> {
    return this.contract.delistAsset(listingId);
  }

  /**
   * Withdraws listed asset.
   * @param listingId
   */
  async withdrawAsset(listingId: BigNumberish): Promise<ContractTransaction> {
    return this.contract.withdrawAsset(listingId);
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
   * Returns user listings.
   * @param listerAccountId
   * @param offset
   * @param limit
   */
  async userListings(listerAccountId: AccountId, offset: BigNumberish, limit: BigNumberish): Promise<Listing[]> {
    return this.normalizeListings(this.contract.userListings(this.accountIdToAddress(listerAccountId), offset, limit));
  }

  /**
   * Returns asset listings.
   * @param assetAccountId
   * @param offset
   * @param limit
   */
  async assetListings(assetAccountId: AccountId, offset: BigNumberish, limit: BigNumberish): Promise<Listing[]> {
    return this.normalizeListings(this.contract.assetListings(this.accountIdToAddress(assetAccountId), offset, limit));
  }

  /**
   * Returns the list of supported assets.
   * @param offset
   * @param limit
   */
  async supportedAssets(offset: BigNumberish, limit: BigNumberish): Promise<AccountId[]> {
    const addresses = await this.contract.supportedAssets(offset, limit);
    return addresses.map(address => this.addressToAccountId(address));
  }

  async universeWarpers(universeId: BigNumberish, offset: BigNumberish, limit: BigNumberish): Promise<Warper[]> {
    const [addresses, warpers] = await this.contract.universeWarpers(universeId, offset, limit);
    return warpers.map((warper, i) => ({
      ...pick(warper, ['name', 'universeId', 'paused']),
      accountId: this.addressToAccountId(addresses[i]),
      original: this.addressToAssetType(warper.original, 'erc721'), // todo: infer from blockchain
    }));
  }

  private async normalizeListings(
    listingsRequest: Promise<[BigNumber[], Listings.ListingStructOutput[]]>,
  ): Promise<Listing[]> {
    const [listingIds, listings] = await listingsRequest;
    return listings.map((listing: ListingStructOutput, i) => ({
      ...pick(listing, ['maxLockPeriod', 'lockedTill', 'immediatePayout', 'delisted', 'paused']),
      id: listingIds[i],
      asset: this.decodeERC721AssetStruct(listing.asset),
      strategy: this.decodeFixedPriceListingStrategy(listing.params),
      listerAccountId: this.addressToAccountId(listing.lister),
    }));
  }
}
