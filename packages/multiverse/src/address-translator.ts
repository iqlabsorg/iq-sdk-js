import { AccountId, AssetType, ChainId } from 'caip';
import { assertAccountChainId, assertSameChainId } from './utils';
import { Address } from './types';

export class AddressTranslator {
  constructor(private readonly chainId: ChainId) {}

  addressToAccountId(address: Address): AccountId {
    return new AccountId({ chainId: this.chainId, address });
  }

  addressToAssetType(address: Address, namespace: string): AssetType {
    return new AssetType({
      chainId: this.chainId,
      assetName: {
        namespace,
        reference: address,
      },
    });
  }

  accountIdToAddress(accountId: AccountId): Address {
    assertAccountChainId(accountId, this.chainId);
    return accountId.address;
  }

  optionalAccountIdToAddress(accountId?: AccountId): Address | undefined {
    return accountId ? this.accountIdToAddress(accountId) : undefined;
  }

  assetTypeToAddress(assetType: AssetType): Address {
    assertSameChainId(assetType.chainId, this.chainId);
    return assetType.assetName.reference;
  }
}
