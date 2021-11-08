import { ContractTransaction, Signer } from 'ethers';
import { BigNumber } from '@ethersproject/bignumber';
import {
  Address,
  BlockchainEnterprise,
  BlockchainProvider,
  BlockchainService,
  EnterpriseParams,
} from '@iqprotocol/abstract-blockchain';
import { BlockchainEntity } from './blockchain-entity';
import { EIP155BlockchainEnterprise } from './enterprise';
import { EIP155BlockchainService } from './service';

export type EIP155BlockchainProviderConfig = {
  signer: Signer;
};

export class EIP155BlockchainProvider extends BlockchainEntity implements BlockchainProvider<ContractTransaction> {
  constructor({ signer }: EIP155BlockchainProviderConfig) {
    super(signer);
  }

  enterprise(enterpriseAddress: Address): BlockchainEnterprise<ContractTransaction> {
    return new EIP155BlockchainEnterprise(enterpriseAddress, this.signer);
  }

  service(serviceAddress: Address): BlockchainService<ContractTransaction> {
    return new EIP155BlockchainService(serviceAddress, this.signer);
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

  async getTokenBalance(tokenAddress: Address, accountAddress?: Address): Promise<BigNumber> {
    const targetAccountAddress = await this.withFallbackToSignerAddress(accountAddress);
    return this.resolveERC20Token(tokenAddress).balanceOf(targetAccountAddress);
  }
}
