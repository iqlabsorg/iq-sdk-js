import { Address, Asset, ChainAware, FixedPriceListingStrategyParams } from './types';
import { AccountId, AssetId, AssetType, ChainId } from 'caip';
import { AddressTranslator } from './address-translator';
import { ContractResolver } from './contract-resolver';
import { Assets, Listings } from './contracts/metahub/Metahub';
import { defaultAbiCoder } from 'ethers/lib/utils';
import { BigNumber } from '@ethersproject/bignumber';
import { listingStrategies } from './constants';

export abstract class Adapter implements ChainAware {
  protected constructor(
    protected readonly contractResolver: ContractResolver,
    protected readonly addressTranslator: AddressTranslator,
  ) {}

  async getChainId(): Promise<ChainId> {
    return this.contractResolver.getChainId();
  }

  protected assetClassToNamespace(assetClass: string): string {
    return this.addressTranslator.assetClassToNamespace(assetClass);
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

  protected decodeERC721AssetStruct(asset: Assets.AssetStructOutput): Asset {
    return this.addressTranslator.decodeERC721AssetStruct(asset);
  }

  protected decodeFixedPriceListingStrategy(params: Listings.ParamsStruct): FixedPriceListingStrategyParams {
    const [price] = defaultAbiCoder.decode(['uint256'], params.data) as [BigNumber];
    return {
      name: listingStrategies.FIXED_PRICE.name,
      data: {
        price,
      },
    };
  }

  protected async getERC20AssetMetadata(assetType: AssetType): Promise<{
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
}
