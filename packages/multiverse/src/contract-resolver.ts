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
} from './contracts';
import { ChainId } from 'caip';
import { IERC721__factory } from './contracts/factories/@openzeppelin/contracts/token/ERC721';
import { IERC721 } from './contracts/@openzeppelin/contracts/token/ERC721';
import { IERC20 } from './contracts/@openzeppelin/contracts/token/ERC20';
import { IERC20__factory } from './contracts/factories/@openzeppelin/contracts/token/ERC20';
import { IERC20Metadata__factory } from './contracts/factories/@openzeppelin/contracts/token/ERC20/extensions';
import { IERC20Metadata } from './contracts/@openzeppelin/contracts/token/ERC20/extensions';
import { IERC721Metadata } from './contracts/@openzeppelin/contracts/token/ERC721/extensions';
import { IERC721Metadata__factory } from './contracts/factories/@openzeppelin/contracts/token/ERC721/extensions';

export class ContractResolver implements ChainAware {
  constructor(private readonly signer: Signer) {}

  async getChainId(): Promise<ChainId> {
    const reference = await this.signer.getChainId();
    return new ChainId({ namespace: 'eip155', reference: reference.toString() });
  }

  async signerAddress(): Promise<Address> {
    return this.signer.getAddress();
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

  resolveERC721Asset(address: Address): IERC721 {
    return IERC721__factory.connect(address, this.signer);
  }

  resolveERC721Metadata(address: Address): IERC721Metadata {
    return IERC721Metadata__factory.connect(address, this.signer);
  }

  resolveERC20Asset(address: Address): IERC20 {
    return IERC20__factory.connect(address, this.signer);
  }

  resolveERC20Metadata(address: Address): IERC20Metadata {
    return IERC20Metadata__factory.connect(address, this.signer);
  }
}
