import {
  AccountId,
  AccountState,
  Address,
  BigNumber,
  BigNumberish,
  BlockchainProvider,
  BlockchainService,
  ServiceInfo,
} from '@iqprotocol/abstract-blockchain';

export interface ServiceConfig<Transaction> {
  blockchain: BlockchainProvider<Transaction>;
  address: string;
}

export class Service<Transaction = unknown> {
  private readonly address: string;
  private readonly blockchain: BlockchainProvider<Transaction>;
  private readonly blockchainService: BlockchainService<Transaction>;

  constructor({ blockchain, address }: ServiceConfig<Transaction>) {
    this.address = address;
    this.blockchain = blockchain;
    this.blockchainService = blockchain.service(address);
  }

  attach(address: Address): Service<Transaction> {
    return new Service({ blockchain: this.blockchain, address });
  }

  connect<Transaction>(blockchain: BlockchainProvider<Transaction>, address: Address): Service<Transaction> {
    return new Service({ blockchain, address });
  }

  async getId(): Promise<AccountId> {
    const chainId = await this.blockchain.getChainId();
    return new AccountId({ chainId, address: this.address });
  }

  getAddress(): Address {
    return this.address;
  }

  async getInfo(): Promise<ServiceInfo> {
    return this.blockchainService.getInfo();
  }

  async getAccountState(accountAddress: Address): Promise<AccountState> {
    return this.blockchainService.getAccountState(accountAddress);
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

  async getBaseTokenAddress(): Promise<Address> {
    return this.blockchainService.getBaseTokenAddress();
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

  async getEnterpriseTokenAllowance(accountAddress?: Address): Promise<BigNumber> {
    return this.blockchainService.getEnterpriseTokenAllowance(accountAddress);
  }

  async setEnterpriseTokenAllowance(amount: BigNumberish): Promise<Transaction> {
    return this.blockchainService.setEnterpriseTokenAllowance(amount);
  }

  async setBaseRate(baseRate: BigNumberish, baseToken: Address, minGCFee: BigNumberish): Promise<Transaction> {
    return this.blockchainService.setBaseRate(baseRate, baseToken, minGCFee);
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

  async getAvailableBalance(accountAddress?: Address): Promise<BigNumber> {
    return this.blockchainService.getAvailableBalance(accountAddress);
  }

  async getBalance(accountAddress?: Address): Promise<BigNumber> {
    return this.blockchainService.getBalance(accountAddress);
  }

  async getEnergyAt(timestamp: number, accountAddress?: Address): Promise<BigNumber> {
    return this.blockchainService.getEnergyAt(timestamp, accountAddress);
  }

  async estimateRentalFee(
    paymentTokenAddress: Address,
    rentalAmount: BigNumberish,
    rentalPeriod: BigNumberish,
  ): Promise<{ poolFee: BigNumber; serviceFee: BigNumber; gcFee: BigNumber }> {
    return this.blockchainService.estimateRentalFee(paymentTokenAddress, rentalAmount, rentalPeriod);
  }
}
