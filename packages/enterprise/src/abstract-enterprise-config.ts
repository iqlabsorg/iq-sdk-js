import { EnterpriseConfigReader } from './types';
import { Address, BlockchainEnterprise } from '@iqprotocol/abstract-blockchain';
import { BigNumber } from '@ethersproject/bignumber';
import { AccountId } from 'caip';
import { AddressTranslator } from './address-translator';

export abstract class AbstractEnterpriseConfig<Transaction = unknown> implements EnterpriseConfigReader {
  protected constructor(
    protected readonly blockchainEnterprise: BlockchainEnterprise<Transaction>,
    protected readonly addressTranslator: AddressTranslator,
  ) {}

  async getBaseUri(): Promise<string> {
    return this.blockchainEnterprise.getBaseUri();
  }

  async getBondingCurve(): Promise<{ pole: BigNumber; slope: BigNumber }> {
    return this.blockchainEnterprise.getBondingCurve();
  }

  async getCollectorAccountId(): Promise<AccountId> {
    return this.addressToAccountId(await this.blockchainEnterprise.getEnterpriseCollectorAddress());
  }

  async getConverterAccountId(): Promise<AccountId> {
    return this.addressToAccountId(await this.blockchainEnterprise.getConverterAddress());
  }

  async getEnterpriseOnlyCollectionPeriod(): Promise<number> {
    return this.blockchainEnterprise.getEnterpriseOnlyCollectionPeriod();
  }

  async getGCFeePercent(): Promise<number> {
    return this.blockchainEnterprise.getGCFeePercent();
  }

  async getProxyAdminAccountId(): Promise<AccountId> {
    return this.addressToAccountId(await this.blockchainEnterprise.getProxyAdminAddress());
  }

  async getRenterOnlyReturnPeriod(): Promise<number> {
    return this.blockchainEnterprise.getRenterOnlyReturnPeriod();
  }

  async getStreamingReserveHalvingPeriod(): Promise<number> {
    return this.blockchainEnterprise.getStreamingReserveHalvingPeriod();
  }

  async getWalletAccountId(): Promise<AccountId> {
    return this.addressToAccountId(await this.blockchainEnterprise.getEnterpriseWalletAddress());
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
