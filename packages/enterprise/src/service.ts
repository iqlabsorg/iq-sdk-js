import { AccountId, ChainId } from 'caip';
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { Address, BlockchainProvider, BlockchainService } from '@iqprotocol/abstract-blockchain';
import { ServiceInfo, AccountState } from './types';
import { pick } from './utils';
import { AddressTranslator } from './address-translator';

export interface ServiceConfig<Transaction> {
  blockchain: BlockchainProvider<Transaction>;
  accountId: AccountId;
}

export class Service<Transaction = unknown> {
  private readonly blockchainService: BlockchainService<Transaction>;
  private readonly addressTranslator: AddressTranslator;

  protected constructor(
    private readonly accountId: AccountId,
    private readonly chainId: ChainId,
    readonly blockchain: BlockchainProvider<Transaction>,
  ) {
    this.blockchainService = blockchain.service(accountId.address);
    this.addressTranslator = new AddressTranslator(chainId);
  }

  static async create<Transaction = unknown>({
    blockchain,
    accountId,
  }: ServiceConfig<Transaction>): Promise<Service<Transaction>> {
    const chainId = await blockchain.getChainId();
    if (chainId.toString() !== accountId.chainId.toString()) {
      throw new Error(`Chain ID mismatch!`);
    }

    return new Service<Transaction>(accountId, chainId, blockchain);
  }

  getAccountId(): AccountId {
    return this.accountId;
  }

  getChainId(): ChainId {
    return this.chainId;
  }

  async getInfo(): Promise<ServiceInfo> {
    const info = await this.blockchainService.getInfo();
    return {
      accountId: this.addressToAccountId(info.address),
      baseTokenAccountId: this.addressToAccountId(info.baseToken),
      ...pick(info, [
        'name',
        'symbol',
        'baseRate',
        'minGCFee',
        'serviceFeePercent',
        'energyGapHalvingPeriod',
        'minRentalPeriod',
        'maxRentalPeriod',
        'swappingEnabled',
        'transferEnabled',
      ]),
    };
  }

  async getAccountState(accountId: AccountId): Promise<AccountState> {
    const state = await this.blockchainService.getAccountState(this.accountIdToAddress(accountId));
    return {
      serviceAccountId: this.accountId,
      accountId: this.addressToAccountId(state.accountAddress),
      ...pick(state, ['balance', 'lockedBalance', 'energy', 'timestamp']),
    };
  }

  async getBaseRate(): Promise<BigNumber> {
    return this.blockchainService.getBaseRate();
  }

  async getMinGCFee(): Promise<BigNumber> {
    return this.blockchainService.getMinGCFee();
  }

  async getEnergyGapHalvingPeriod(): Promise<number> {
    return this.blockchainService.getEnergyGapHalvingPeriod();
  }

  async getServiceIndex(): Promise<number> {
    return this.blockchainService.getIndex();
  }

  async getBaseTokenAccountId(): Promise<AccountId> {
    return this.addressToAccountId(await this.blockchainService.getBaseTokenAddress());
  }

  async getMinRentalPeriod(): Promise<number> {
    return this.blockchainService.getMinRentalPeriod();
  }

  async getMaxRentalPeriod(): Promise<number> {
    return this.blockchainService.getMaxRentalPeriod();
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

  async getEnterpriseTokenAllowance(accountId?: AccountId): Promise<BigNumber> {
    return this.blockchainService.getEnterpriseTokenAllowance(this.optionalAccountIdToAddress(accountId));
  }

  async setEnterpriseTokenAllowance(amount: BigNumberish): Promise<Transaction> {
    return this.blockchainService.setEnterpriseTokenAllowance(amount);
  }

  async setBaseRate(
    baseRate: BigNumberish,
    baseTokenAccountId: AccountId,
    minGCFee: BigNumberish,
  ): Promise<Transaction> {
    return this.blockchainService.setBaseRate(baseRate, this.accountIdToAddress(baseTokenAccountId), minGCFee);
  }

  async setRentalPeriodLimits(minRentalPeriod: BigNumberish, maxRentalPeriod: BigNumberish): Promise<Transaction> {
    return this.blockchainService.setRentalPeriodLimits(minRentalPeriod, maxRentalPeriod);
  }

  async setServiceFeePercent(feePercent: BigNumberish): Promise<Transaction> {
    return this.blockchainService.setServiceFeePercent(feePercent);
  }

  async swapIn(amount: BigNumberish): Promise<Transaction> {
    return this.blockchainService.swapIn(amount);
  }

  async swapOut(amount: BigNumberish): Promise<Transaction> {
    return this.blockchainService.swapOut(amount);
  }

  async getAvailableBalance(accountId?: AccountId): Promise<BigNumber> {
    return this.blockchainService.getAvailableBalance(this.optionalAccountIdToAddress(accountId));
  }

  async getBalance(accountId?: AccountId): Promise<BigNumber> {
    return this.blockchainService.getBalance(this.optionalAccountIdToAddress(accountId));
  }

  async getEnergyAt(timestamp: number, accountId?: AccountId): Promise<BigNumber> {
    return this.blockchainService.getEnergyAt(timestamp, this.optionalAccountIdToAddress(accountId));
  }

  async estimateRentalFee(
    paymentTokenAccountId: AccountId,
    rentalAmount: BigNumberish,
    rentalPeriod: BigNumberish,
  ): Promise<{ poolFee: BigNumber; serviceFee: BigNumber; gcFee: BigNumber }> {
    return this.blockchainService.estimateRentalFee(
      this.accountIdToAddress(paymentTokenAccountId),
      rentalAmount,
      rentalPeriod,
    );
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
