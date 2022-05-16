import { Address, ChainAware } from './types';
import { AccountId, AssetType, ChainId } from 'caip';
import { AddressTranslator } from './address-translator';
import { ContractResolver } from './contract-resolver';

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

  protected accountIdToAddress(accountId: AccountId): Address {
    return this.addressTranslator.accountIdToAddress(accountId);
  }

  protected optionalAccountIdToAddress(accountId?: AccountId): Address | undefined {
    return this.addressTranslator.optionalAccountIdToAddress(accountId);
  }

  protected assetTypeToAddress(assetType: AssetType): Address {
    return this.addressTranslator.assetTypeToAddress(assetType);
  }
}
