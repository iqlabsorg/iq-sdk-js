import { AbstractEnterpriseConfig } from './abstract-enterprise-config';
import { EnterpriseConfigWriter } from './types';
import { BigNumberish } from '@ethersproject/bignumber';
import { AccountId } from 'caip';

export class EnterpriseConfigurator<Transaction = unknown>
  extends AbstractEnterpriseConfig<Transaction>
  implements EnterpriseConfigWriter<Transaction>
{
  async setBaseUri(baseUri: string): Promise<Transaction> {
    return this.blockchainEnterprise.setBaseUri(baseUri);
  }

  async setBondingCurve(pole: BigNumberish, slope: BigNumberish): Promise<Transaction> {
    return this.blockchainEnterprise.setBondingCurve(pole, slope);
  }

  async setCollectorAccountId(accountId: AccountId): Promise<Transaction> {
    return this.blockchainEnterprise.setEnterpriseCollectorAddress(this.accountIdToAddress(accountId));
  }

  async setConverterAccountId(accountId: AccountId): Promise<Transaction> {
    return this.blockchainEnterprise.setConverterAddress(this.accountIdToAddress(accountId));
  }

  async setEnterpriseOnlyCollectionPeriod(period: number): Promise<Transaction> {
    return this.blockchainEnterprise.setEnterpriseOnlyCollectionPeriod(period);
  }

  async setGcFeePercent(gcFeePercent: number): Promise<Transaction> {
    return this.blockchainEnterprise.setGcFeePercent(gcFeePercent);
  }

  async setRenterOnlyReturnPeriod(period: number): Promise<Transaction> {
    return this.blockchainEnterprise.setRenterOnlyReturnPeriod(period);
  }

  async setStreamingReserveHalvingPeriod(streamingReserveHalvingPeriod: number): Promise<Transaction> {
    return this.blockchainEnterprise.setStreamingReserveHalvingPeriod(streamingReserveHalvingPeriod);
  }

  async setWalletAccountId(accountId: AccountId): Promise<Transaction> {
    return this.blockchainEnterprise.setEnterpriseWalletAddress(this.accountIdToAddress(accountId));
  }
}
