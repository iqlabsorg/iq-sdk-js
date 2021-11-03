import { Signer } from 'ethers';
import { Address } from '@iqprotocol/abstract-blockchain';
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

export abstract class ContractResolver {
  protected readonly signer: Signer;

  protected constructor(signer: Signer) {
    this.signer = signer;
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
