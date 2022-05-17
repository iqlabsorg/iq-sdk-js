import { Signer } from 'ethers';
import { Address, ChainAware } from './types';
import {
  ACL,
  ACL__factory,
  AssetClassRegistry,
  AssetClassRegistry__factory,
  IWarper,
  IWarper__factory,
  ListingStrategyRegistry,
  ListingStrategyRegistry__factory,
  Metahub,
  Metahub__factory,
  UniverseRegistry,
  UniverseRegistry__factory,
  UniverseToken,
  UniverseToken__factory,
  WarperPresetFactory,
  WarperPresetFactory__factory,
} from '@iqprotocol/solidity-contracts-nft';
import { ChainId } from 'caip';

export class ContractResolver implements ChainAware {
  constructor(private readonly signer: Signer) {}

  async getChainId(): Promise<ChainId> {
    const reference = await this.signer.getChainId();
    return new ChainId({ namespace: 'eip155', reference: reference.toString() });
  }

  resolveACL(address: Address): ACL {
    return ACL__factory.connect(address, this.signer);
  }

  resolveAssetClassRegistry(address: Address): AssetClassRegistry {
    return AssetClassRegistry__factory.connect(address, this.signer);
  }

  resolveListingStrategyRegistry(address: Address): ListingStrategyRegistry {
    return ListingStrategyRegistry__factory.connect(address, this.signer);
  }

  resolveMetahub(address: Address): Metahub {
    return Metahub__factory.connect(address, this.signer);
  }

  resolveUniverseRegistry(address: Address): UniverseRegistry {
    return UniverseRegistry__factory.connect(address, this.signer);
  }

  resolveUniverseToken(address: Address): UniverseToken {
    return UniverseToken__factory.connect(address, this.signer);
  }

  resolveWarperPresetFactory(address: Address): WarperPresetFactory {
    return WarperPresetFactory__factory.connect(address, this.signer);
  }

  resolveWarper(address: Address): IWarper {
    return IWarper__factory.connect(address, this.signer);
  }
}
