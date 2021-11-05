import {
  AccountId,
  ChainId,
  Address,
  BigNumber,
  BigNumberish,
  BlockchainProvider,
  BlockchainService,
} from '@iqprotocol/abstract-blockchain';
import { ServiceInfo, AccountState } from './types';
import { pick } from './utils';

export interface ServiceConfig<Transaction> {
  blockchain: BlockchainProvider<Transaction>;
  accountId: AccountId;
}

export class Service<Transaction = unknown> {
  private readonly accountId: AccountId;
  private readonly chainId: ChainId;
  private readonly blockchainService: BlockchainService<Transaction>;

  protected constructor({ blockchain, accountId, chainId }: ServiceConfig<Transaction> & { chainId: ChainId }) {
    this.accountId = accountId;
    this.chainId = chainId;
    this.blockchainService = blockchain.service(accountId.address);
  }

  static async create<Transaction = unknown>({
    blockchain,
    accountId,
  }: ServiceConfig<Transaction>): Promise<Service<Transaction>> {
    const chainId = await blockchain.getChainId();
    if (chainId.toString() !== accountId.chainId.toString()) {
      throw new Error(`Chain ID mismatch!`);
    }

    return new Service<Transaction>({ blockchain, accountId, chainId });
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
      accountId: this.toAccountId(info.address),
      baseTokenAccountId: this.toAccountId(info.baseToken),
      ...pick(info, [
        'name',
        'symbol',
        'baseRate',
        'minGCFee',
        'serviceFeePercent',
        'energyGapHalvingPeriod',
        'index',
        'minRentalPeriod',
        'maxRentalPeriod',
        'swappingEnabled',
        'transferEnabled',
      ]),
    };
  }

  async getAccountState(accountId: AccountId): Promise<AccountState> {
    const state = await this.blockchainService.getAccountState(this.toAddress(accountId));
    return {
      serviceId: this.accountId,
      accountId: this.toAccountId(state.accountAddress),
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
    return this.toAccountId(await this.blockchainService.getBaseTokenAddress());
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
    return this.blockchainService.getEnterpriseTokenAllowance(this.toOptionalAddress(accountId));
  }

  async setEnterpriseTokenAllowance(amount: BigNumberish): Promise<Transaction> {
    return this.blockchainService.setEnterpriseTokenAllowance(amount);
  }

  async setBaseRate(
    baseRate: BigNumberish,
    baseTokenAccountId: AccountId,
    minGCFee: BigNumberish,
  ): Promise<Transaction> {
    return this.blockchainService.setBaseRate(baseRate, this.toAddress(baseTokenAccountId), minGCFee);
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
    return this.blockchainService.getAvailableBalance(this.toOptionalAddress(accountId));
  }

  async getBalance(accountId?: AccountId): Promise<BigNumber> {
    return this.blockchainService.getBalance(this.toOptionalAddress(accountId));
  }

  async getEnergyAt(timestamp: number, accountId?: AccountId): Promise<BigNumber> {
    return this.blockchainService.getEnergyAt(timestamp, this.toOptionalAddress(accountId));
  }

  async estimateRentalFee(
    paymentTokenAccountId: AccountId,
    rentalAmount: BigNumberish,
    rentalPeriod: BigNumberish,
  ): Promise<{ poolFee: BigNumber; serviceFee: BigNumber; gcFee: BigNumber }> {
    return this.blockchainService.estimateRentalFee(this.toAddress(paymentTokenAccountId), rentalAmount, rentalPeriod);
  }

  protected toAccountId(address: Address): AccountId {
    return new AccountId({ chainId: this.chainId, address });
  }

  protected toAddress(accountId: AccountId): Address {
    if (this.chainId.toString() !== accountId.chainId.toString()) {
      throw new Error(`Chain ID mismatch for! Service chain ID: ${this.chainId.toString()}`);
    }
    return accountId.address;
  }

  protected toOptionalAddress(accountId?: AccountId): Address | undefined {
    return accountId ? this.toAddress(accountId) : undefined;
  }
}
