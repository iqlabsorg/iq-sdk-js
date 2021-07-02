import {
  AccountID,
  AccountState,
  Address,
  BigNumber,
  BigNumberish,
  BlockchainProvider,
  ServiceInfo,
} from '@iqprotocol/abstract-blockchain';

export interface ServiceConfig<Transaction> {
  blockchain: BlockchainProvider<Transaction>;
  address: string;
}

export class Service<Transaction = unknown> {
  private readonly blockchain: BlockchainProvider<Transaction>;
  private readonly address: string;

  constructor({ blockchain, address }: ServiceConfig<Transaction>) {
    this.blockchain = blockchain;
    this.address = address;
  }

  attach(address: Address): Service<Transaction> {
    return new Service({ blockchain: this.blockchain, address });
  }

  connect<Transaction>(blockchain: BlockchainProvider<Transaction>, address: Address): Service<Transaction> {
    return new Service({ blockchain, address });
  }

  async getId(): Promise<AccountID> {
    const chainId = await this.blockchain.getChainId();
    return new AccountID({ chainId, address: this.address });
  }

  getAddress(): Address {
    return this.address;
  }

  async getInfo(): Promise<ServiceInfo> {
    return this.blockchain.getServiceInfo(this.address);
  }

  async getAccountState(accountAddress: Address): Promise<AccountState> {
    return this.blockchain.getAccountState(this.address, accountAddress);
  }

  async getBaseRate(): Promise<BigNumber> {
    return this.blockchain.getBaseRate(this.address);
  }

  async getMinGCFee(): Promise<BigNumber> {
    return this.blockchain.getMinGCFee(this.address);
  }

  async getGapHalvingPeriod(): Promise<number> {
    return this.blockchain.getGapHalvingPeriod(this.address);
  }

  async getServiceIndex(): Promise<number> {
    return this.blockchain.getServiceIndex(this.address);
  }

  async getBaseTokenAddress(): Promise<Address> {
    return this.blockchain.getBaseTokenAddress(this.address);
  }

  async getMinLoanDuration(): Promise<number> {
    return this.blockchain.getMinLoanDuration(this.address);
  }

  async getMaxLoanDuration(): Promise<number> {
    return this.blockchain.getMaxLoanDuration(this.address);
  }

  async getServiceFeePercent(): Promise<number> {
    return this.blockchain.getServiceFeePercent(this.address);
  }

  async isPerpetualTokenAllowed(): Promise<boolean> {
    return this.blockchain.getAllowsPerpetual(this.address);
  }

  async setBaseRate(baseRate: BigNumberish, baseToken: Address, minGCFee: BigNumberish): Promise<Transaction> {
    return this.blockchain.setBaseRate(this.address, baseRate, baseToken, minGCFee);
  }

  async setLoanDurationLimits(minLoanDuration: BigNumberish, maxLoanDuration: BigNumberish): Promise<Transaction> {
    return this.blockchain.setLoanDurationLimits(this.address, minLoanDuration, maxLoanDuration);
  }

  async setServiceFeePercent(feePercent: BigNumberish): Promise<Transaction> {
    return this.blockchain.setServiceFeePercent(this.address, feePercent);
  }
}
