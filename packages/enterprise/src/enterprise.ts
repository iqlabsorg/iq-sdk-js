import {
  AccountID,
  Address,
  BigNumber,
  BigNumberish,
  BlockchainProvider,
  EnterpriseInfo,
  LiquidityInfo,
  LoanInfo,
} from '@iqprotocol/abstract-blockchain';
import { Service } from './service';

export type LoanEstimationRequest = {
  serviceAddress: Address;
  paymentTokenAddress: Address;
  amount: BigNumberish;
  duration: BigNumberish;
};

export type BorrowRequest = LoanEstimationRequest & { maxPayment: BigNumberish };

export interface EnterpriseConfig<Transaction> {
  blockchain: BlockchainProvider<Transaction>;
  address: Address;
}

export class Enterprise<Transaction = unknown> {
  private readonly blockchain: BlockchainProvider<Transaction>;
  private readonly address: Address;

  constructor({ blockchain, address }: EnterpriseConfig<Transaction>) {
    this.blockchain = blockchain;
    this.address = address;
  }

  attach(address: Address): Enterprise<Transaction> {
    return new Enterprise({ blockchain: this.blockchain, address });
  }

  connect<Transaction>(blockchain: BlockchainProvider<Transaction>, address: Address): Enterprise<Transaction> {
    return new Enterprise({ blockchain, address });
  }

  async getId(): Promise<AccountID> {
    const chainId = await this.blockchain.getChainId();
    return new AccountID({ chainId, address: this.address });
  }

  getAddress(): Address {
    return this.address;
  }

  async getInfo(): Promise<EnterpriseInfo> {
    return this.blockchain.getEnterpriseInfo(this.address);
  }

  async getServices(): Promise<Service<Transaction>[]> {
    return (await this.blockchain.getServices(this.address)).map(
      address =>
        new Service({
          blockchain: this.blockchain,
          address,
        }),
    );
  }

  async estimateLoan({
    serviceAddress,
    paymentTokenAddress,
    amount,
    duration,
  }: LoanEstimationRequest): Promise<BigNumber> {
    return this.blockchain.estimateLoan(this.address, serviceAddress, paymentTokenAddress, amount, duration);
  }

  async borrow({
    serviceAddress,
    paymentTokenAddress,
    amount,
    duration,
    maxPayment,
  }: BorrowRequest): Promise<Transaction> {
    return this.blockchain.borrow(this.address, serviceAddress, paymentTokenAddress, amount, duration, maxPayment);
  }

  async getAccruedInterest(interestTokenId: BigNumberish): Promise<BigNumber> {
    return this.blockchain.getAccruedInterest(this.address, interestTokenId);
  }

  async returnLoan(borrowTokenId: BigNumberish): Promise<Transaction> {
    return this.blockchain.returnLoan(this.address, borrowTokenId);
  }

  async listLoanInfo(accountAddress?: Address): Promise<LoanInfo[]> {
    const borrowTokenIds = await this.blockchain.getBorrowTokenIds(this.address, accountAddress);
    return Promise.all(borrowTokenIds.map(async tokenId => this.blockchain.getLoanInfo(this.address, tokenId)));
  }

  async getLoanInfo(borrowTokenId: BigNumberish): Promise<LoanInfo> {
    return this.blockchain.getLoanInfo(this.address, borrowTokenId);
  }

  async listLiquidityInfo(accountAddress?: Address): Promise<LiquidityInfo[]> {
    const interestTokenIds = await this.blockchain.getInterestTokenIds(this.address, accountAddress);
    return Promise.all(interestTokenIds.map(async tokenId => this.blockchain.getLiquidityInfo(this.address, tokenId)));
  }

  async getLiquidityInfo(interestTokenId: BigNumberish): Promise<LiquidityInfo> {
    return this.blockchain.getLiquidityInfo(this.address, interestTokenId);
  }

  async addLiquidity(amount: BigNumberish): Promise<Transaction> {
    return this.blockchain.addLiquidity(this.address, amount);
  }

  async removeLiquidity(interestTokenId: BigNumberish): Promise<Transaction> {
    return this.blockchain.removeLiquidity(this.address, interestTokenId);
  }

  async increaseLiquidity(interestTokenId: BigNumberish, amount: BigNumberish): Promise<Transaction> {
    return this.blockchain.increaseLiquidity(this.address, interestTokenId, amount);
  }

  async decreaseLiquidity(interestTokenId: BigNumberish, amount: BigNumberish): Promise<Transaction> {
    return this.blockchain.decreaseLiquidity(this.address, interestTokenId, amount);
  }

  async setLiquidityAllowance(amount: BigNumberish): Promise<Transaction> {
    return this.blockchain.setLiquidityAllowance(this.address, amount);
  }

  async getLiquidityAllowance(accountAddress?: Address): Promise<BigNumber> {
    return this.blockchain.getLiquidityAllowance(this.address, accountAddress);
  }
}
