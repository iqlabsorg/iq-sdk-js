import { Signer } from 'ethers';
import { Address, ChainAware, FungibleTokenMetadata, NonFungibleTokenMetadata } from '@iqprotocol/abstract-blockchain';
import {
  Enterprise,
  Enterprise__factory,
  EnterpriseFactory,
  EnterpriseFactory__factory,
  ERC20,
  ERC20__factory,
  ERC721,
  ERC721__factory,
  PowerToken,
  PowerToken__factory,
  RentalToken,
  RentalToken__factory,
  StakeToken,
  StakeToken__factory,
} from './contracts';
import { ChainId } from 'caip';
import { BigNumberish } from '@ethersproject/bignumber';

export abstract class BlockchainEntity implements ChainAware {
  protected readonly signer: Signer;

  protected constructor(signer: Signer) {
    this.signer = signer;
  }

  async getChainId(): Promise<ChainId> {
    const reference = await this.signer.getChainId();
    return new ChainId({ namespace: 'eip155', reference: reference.toString() });
  }

  protected async getFungibleTokenMetadata(tokenAddress: Address): Promise<FungibleTokenMetadata> {
    const token = this.resolveERC20Token(tokenAddress);
    const [name, symbol, decimals] = await Promise.all([token.name(), token.symbol(), token.decimals()]);
    return { address: tokenAddress, name, symbol, decimals };
  }

  protected async getNonFungibleTokenMetadata(
    tokenAddress: Address,
    tokenId: BigNumberish,
  ): Promise<NonFungibleTokenMetadata> {
    const token = this.resolveERC721Token(tokenAddress);
    const [name, symbol, tokenUri] = await Promise.all([token.name(), token.symbol(), token.tokenURI(tokenId)]);
    return { address: tokenAddress, name, symbol, tokenUri };
  }

  protected async withFallbackToSignerAddress(accountAddress?: Address): Promise<Address> {
    return accountAddress ? accountAddress : this.signer.getAddress();
  }

  protected resolveEnterpriseFactory(enterpriseFactoryAddress: string): EnterpriseFactory {
    return EnterpriseFactory__factory.connect(enterpriseFactoryAddress, this.signer);
  }

  protected resolveEnterprise(enterpriseAddress: string): Enterprise {
    return Enterprise__factory.connect(enterpriseAddress, this.signer);
  }

  protected resolvePowerToken(serviceAddress: string): PowerToken {
    return PowerToken__factory.connect(serviceAddress, this.signer);
  }

  protected resolveStakeToken(tokenAddress: string): StakeToken {
    return StakeToken__factory.connect(tokenAddress, this.signer);
  }

  protected resolveRentalToken(tokenAddress: string): RentalToken {
    return RentalToken__factory.connect(tokenAddress, this.signer);
  }

  protected resolveERC20Token(tokenAddress: string): ERC20 {
    return ERC20__factory.connect(tokenAddress, this.signer);
  }

  protected resolveERC721Token(tokenAddress: string): ERC721 {
    return ERC721__factory.connect(tokenAddress, this.signer);
  }
}
