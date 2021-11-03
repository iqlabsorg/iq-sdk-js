import {
  Address,
  BigNumber,
  BigNumberish,
  BlockchainEnterprise,
  BlockchainProvider,
  BlockchainService,
  ChainId,
  EnterpriseParams,
  ERC20Metadata,
  ERC721Metadata,
} from '@iqprotocol/abstract-blockchain';

import { ContractTransaction, Signer } from 'ethers';
import { ContractResolver } from './contract-resolver';
import { EIP155BlockchainEnterprise } from './enterprise';
import { EIP155BlockchainService } from './service';

export type EIP155BlockchainProviderConfig = {
  signer: Signer;
};

export class EIP155BlockchainProvider extends ContractResolver implements BlockchainProvider<ContractTransaction> {
  constructor({ signer }: EIP155BlockchainProviderConfig) {
    super(signer);
  }

  enterprise(enterpriseAddress: Address): BlockchainEnterprise<ContractTransaction> {
    return new EIP155BlockchainEnterprise(enterpriseAddress, this.signer);
  }

  service(serviceAddress: Address): BlockchainService<ContractTransaction> {
    return new EIP155BlockchainService(serviceAddress, this.signer);
  }

  // https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-2.md
  async getChainId(): Promise<ChainId> {
    const reference = await this.signer.getChainId();
    return new ChainId({ namespace: 'eip155', reference: reference.toString() });
  }

  async getERC20Metadata(tokenAddress: Address): Promise<ERC20Metadata> {
    const token = this.resolveERC20Token(tokenAddress);
    const [name, symbol, decimals] = await Promise.all([token.name(), token.symbol(), token.decimals()]);

    return { address: tokenAddress, name, symbol, decimals };
  }

  async getERC721Metadata(tokenAddress: Address, tokenId: BigNumberish): Promise<ERC721Metadata> {
    const token = this.resolveERC721Token(tokenAddress);
    const [name, symbol, tokenUri] = await Promise.all([token.name(), token.symbol(), token.tokenURI(tokenId)]);

    return { address: tokenAddress, name, symbol, tokenUri };
  }

  async getTokenBalance(tokenAddress: Address, accountAddress?: Address): Promise<BigNumber> {
    const targetAccountAddress = await this.withFallbackToSignerAddress(accountAddress);
    return this.resolveERC20Token(tokenAddress).balanceOf(targetAccountAddress);
  }

  async deployEnterprise(enterpriseFactoryAddress: string, params: EnterpriseParams): Promise<ContractTransaction> {
    return this.resolveEnterpriseFactory(enterpriseFactoryAddress).deploy(
      params.name,
      params.enterpriseTokenAddress,
      params.baseUri,
      params.gcFeePercent,
      params.converterAddress,
    );
  }

  async getEnterpriseTokenMetadata(enterpriseAddress: Address): Promise<ERC20Metadata> {
    const tokenAddress = await this.enterprise(enterpriseAddress).getEnterpriseTokenAddress();
    return this.getERC20Metadata(tokenAddress);
  }

  async getRentalTokenMetadata(enterpriseAddress: Address, tokenId: BigNumberish): Promise<ERC721Metadata> {
    const tokenAddress = await this.enterprise(enterpriseAddress).getRentalTokenAddress();
    return this.getERC721Metadata(tokenAddress, tokenId);
  }

  async getStakeTokenMetadata(enterpriseAddress: Address, tokenId: BigNumberish): Promise<ERC721Metadata> {
    const tokenAddress = await this.enterprise(enterpriseAddress).getStakeTokenAddress();
    return this.getERC721Metadata(tokenAddress, tokenId);
  }
}
