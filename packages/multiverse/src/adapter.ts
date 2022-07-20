import { Address, Asset, ChainAware, ListingStrategyParams } from './types';
import { AccountId, AssetId, AssetType, ChainId } from 'caip';
import { AddressTranslator } from './address-translator';
import { ContractResolver } from './contract-resolver';
import { Assets, Listings } from './contracts/contracts/metahub/IMetahub';
import { ListingStrategyCoder } from './coders/listing-strategy-coder';
import { AssetCoder } from './coders/asset-coder';

export abstract class Adapter implements ChainAware {
  protected constructor(
    protected readonly contractResolver: ContractResolver,
    protected readonly addressTranslator: AddressTranslator,
  ) {}

  async getChainId(): Promise<ChainId> {
    return this.contractResolver.getChainId();
  }

  protected addressToAccountId(address: Address): AccountId {
    return this.addressTranslator.addressToAccountId(address);
  }

  protected addressToAssetType(address: Address, namespace: string): AssetType {
    return this.addressTranslator.addressToAssetType(address, namespace);
  }

  protected accountIdToAddress(accountId: AccountId): Address {
    return this.addressTranslator.accountIdToAddress(accountId);
  }

  protected optionalAccountIdToAddress(accountId?: AccountId): Address | undefined {
    return this.addressTranslator.optionalAccountIdToAddress(accountId);
  }

  protected assetTypeToAddress(assetType: AssetType): Address {
    return this.addressTranslator.assetTypeToAddress(assetType);
  }

  protected assetIdToAddress(assetId: AssetId): Address {
    return this.addressTranslator.assetIdToAddress(assetId);
  }

  protected encodeAsset(asset: Asset): Assets.AssetStruct {
    this.addressTranslator.assertSameChainId(asset.id.chainId);
    return AssetCoder.encode(asset);
  }

  protected decodeAsset(asset: Assets.AssetStructOutput): Asset {
    return AssetCoder.decode(asset, this.addressTranslator.chainId);
  }

  protected encodeListingParams(params: ListingStrategyParams): Listings.ParamsStruct {
    return ListingStrategyCoder.encode(params);
  }

  protected decodeListingParams(params: Listings.ParamsStruct): ListingStrategyParams {
    return ListingStrategyCoder.decode(params);
  }

  protected async erc20AssetMetadata(assetType: AssetType): Promise<{
    name: string;
    symbol: string;
    decimals: number;
  }> {
    const metadata = this.contractResolver.resolveERC20Metadata(this.assetTypeToAddress(assetType));
    const [name, symbol, decimals]: [string, string, number] = await Promise.all([
      metadata.name(),
      metadata.symbol(),
      metadata.decimals(),
    ]);

    return { name, symbol, decimals };
  }

  protected async signerAddress(): Promise<Address> {
    return this.contractResolver.signerAddress();
  }
}
