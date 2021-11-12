import { BigNumberish } from '@ethersproject/bignumber';
import { AccountId } from 'caip';
import { AbstractServiceConfig } from './abstract-service-config';
import { ServiceConfigWriter } from './types';

export class ServiceConfigurator<Transaction = unknown>
  extends AbstractServiceConfig<Transaction>
  implements ServiceConfigWriter<Transaction>
{
  async setBaseRate(
    baseRate: BigNumberish,
    baseTokenAccountId: AccountId,
    minGCFee: BigNumberish,
  ): Promise<Transaction> {
    return this.blockchainService.setBaseRate(baseRate, this.accountIdToAddress(baseTokenAccountId), minGCFee);
  }

  async setServiceFeePercent(feePercent: BigNumberish): Promise<Transaction> {
    return this.blockchainService.setServiceFeePercent(feePercent);
  }

  async setRentalPeriodLimits(minRentalPeriod: BigNumberish, maxRentalPeriod: BigNumberish): Promise<Transaction> {
    return this.blockchainService.setRentalPeriodLimits(minRentalPeriod, maxRentalPeriod);
  }
}
