import { AccountId, AssetId, AssetType, ChainId } from 'caip';
import { Address } from './types';
import { asstClasses } from './constants';

export class AddressTranslator {
  constructor(private readonly chainId: ChainId) {}

  static assertSameChainId(chainId: ChainId, expectedChainId: ChainId): void {
    if (chainId.toString() !== expectedChainId.toString()) {
      throw new Error(`Chain ID mismatch! Expected chain ID: ${expectedChainId.toString()}`);
    }
  }

  static assertSameAssetType(assetId: AssetId, assetType: AssetType): void {
    const { chainId, assetName } = assetType;
    this.assertSameChainId(assetId.chainId, chainId);

    if (assetName.toString() !== assetId.assetName.toString()) {
      throw new Error(`Asset mismatch! Expected asset: ${assetName.toString()}`);
    }
  }

  assetClassToNamespace(assetClass: string): string {
    return Object.values(asstClasses).find(({ id }) => assetClass === id)?.namespace ?? 'unknown';
  }

  assertSameChainId(chainId: ChainId): void {
    AddressTranslator.assertSameChainId(chainId, this.chainId);
  }

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
    this.assertSameChainId(accountId.chainId);
    return accountId.address;
  }

  optionalAccountIdToAddress(accountId?: AccountId): Address | undefined {
    return accountId ? this.accountIdToAddress(accountId) : undefined;
  }

  assetTypeToAddress(assetType: AssetType): Address {
    this.assertSameChainId(assetType.chainId);
    return assetType.assetName.reference;
  }
}
