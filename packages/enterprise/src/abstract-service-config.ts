import { Address, BlockchainService } from '@iqprotocol/abstract-blockchain';
import { AddressTranslator } from './address-translator';
import { AccountId } from 'caip';
import { ServiceConfigReader } from './types';
import { BigNumber } from '@ethersproject/bignumber';

export abstract class AbstractServiceConfig<Transaction = unknown> implements ServiceConfigReader {
  protected constructor(
    protected readonly blockchainService: BlockchainService<Transaction>,
    protected readonly addressTranslator: AddressTranslator,
  ) {}

  async getBaseRate(): Promise<BigNumber> {
    return this.blockchainService.getBaseRate();
  }

  async getBaseTokenAccountId(): Promise<AccountId> {
    return this.addressToAccountId(await this.blockchainService.getBaseTokenAddress());
  }

  async getEnergyGapHalvingPeriod(): Promise<number> {
    return this.blockchainService.getEnergyGapHalvingPeriod();
  }

  async getMaxRentalPeriod(): Promise<number> {
    return this.blockchainService.getMaxRentalPeriod();
  }

  async getMinGCFee(): Promise<BigNumber> {
    return this.blockchainService.getMinGCFee();
  }

  async getMinRentalPeriod(): Promise<number> {
    return this.blockchainService.getMinRentalPeriod();
  }

  async getServiceFeePercent(): Promise<number> {
    return this.blockchainService.getServiceFeePercent();
  }

  async isSwappingEnabled(): Promise<boolean> {
    return this.blockchainService.isSwappingEnabled();
  }

  async isTransferEnabled(): Promise<boolean> {
    return this.blockchainService.isTransferEnabled();
  }

  protected addressToAccountId(address: Address): AccountId {
    return this.addressTranslator.addressToAccountId(address);
  }

  protected accountIdToAddress(accountId: AccountId): Address {
    return this.addressTranslator.accountIdToAddress(accountId);
  }

  protected optionalAccountIdToAddress(accountId?: AccountId): Address | undefined {
    return this.addressTranslator.optionalAccountIdToAddress(accountId);
  }
}
