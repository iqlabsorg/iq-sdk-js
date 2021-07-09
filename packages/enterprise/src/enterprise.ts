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

  async withdrawInterest(interestTokenId: BigNumberish): Promise<Transaction> {
    return this.blockchain.withdrawInterest(this.address, interestTokenId);
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
    return this.blockchain.approveLiquidityTokensToEnterprise(this.address, amount);
  }

  async getLiquidityAllowance(accountAddress?: Address): Promise<BigNumber> {
    return this.blockchain.getLiquidityTokenEnterpriseAllowance(this.address, accountAddress);
  }

  async isRegisteredService(serviceAddress: Address): Promise<boolean> {
    return this.blockchain.isRegisteredService(this.address, serviceAddress);
  }

  async getProxyAdminAddress(): Promise<Address> {
    return this.blockchain.getProxyAdminAddress(this.address);
  }

  async getCollectorAddress(): Promise<Address> {
    return this.blockchain.getEnterpriseCollectorAddress(this.address);
  }

  async getVaultAddress(): Promise<Address> {
    return this.blockchain.getEnterpriseVaultAddress(this.address);
  }

  async getBorrowerLoanReturnGracePeriod(): Promise<number> {
    return this.blockchain.getBorrowerLoanReturnGracePeriod(this.address);
  }

  async getLoanCollectGracePeriod(): Promise<number> {
    return this.blockchain.getEnterpriseLoanCollectGracePeriod(this.address);
  }

  async getInterestGapHalvingPeriod(): Promise<number> {
    return this.blockchain.getInterestGapHalvingPeriod(this.address);
  }

  async getConverterAddress(): Promise<Address> {
    return this.blockchain.getConverterAddress(this.address);
  }

  async getBaseUri(): Promise<string> {
    return this.blockchain.getBaseUri(this.address);
  }

  async getReserve(): Promise<BigNumber> {
    return this.blockchain.getReserve(this.address);
  }

  async getUsedReserve(): Promise<BigNumber> {
    return this.blockchain.getUsedReserve(this.address);
  }

  async getAvailableReserve(): Promise<BigNumber> {
    return this.blockchain.getAvailableReserve(this.address);
  }

  async getBondingCurve(): Promise<{ pole: BigNumber; slope: BigNumber }> {
    return this.blockchain.getBondingCurve(this.address);
  }

  async getGCFeePercent(): Promise<number> {
    return this.blockchain.getGCFeePercent(this.address);
  }

  async setCollectorAddress(collectorAddress: Address): Promise<Transaction> {
    return this.blockchain.setEnterpriseCollectorAddress(this.address, collectorAddress);
  }

  async setVaultAddress(vaultAddress: Address): Promise<Transaction> {
    return this.blockchain.setEnterpriseVaultAddress(this.address, vaultAddress);
  }

  async setConverterAddress(converterAddress: Address): Promise<Transaction> {
    return this.blockchain.setConverterAddress(this.address, converterAddress);
  }

  async setBondingCurve(pole: BigNumberish, slope: BigNumberish): Promise<Transaction> {
    return this.blockchain.setBondingCurve(this.address, pole, slope);
  }

  async setBorrowerLoanReturnGracePeriod(period: number): Promise<Transaction> {
    return this.blockchain.setBorrowerLoanReturnGracePeriod(this.address, period);
  }

  async setLoanCollectGracePeriod(period: number): Promise<Transaction> {
    return this.blockchain.setEnterpriseLoanCollectGracePeriod(this.address, period);
  }

  async setBaseUri(baseUri: string): Promise<Transaction> {
    return this.blockchain.setBaseUri(this.address, baseUri);
  }

  async setInterestGapHalvingPeriod(interestGapHalvingPeriod: number): Promise<Transaction> {
    return this.blockchain.setInterestGapHalvingPeriod(this.address, interestGapHalvingPeriod);
  }

  async setGcFeePercent(gcFeePercent: number): Promise<Transaction> {
    return this.blockchain.setGcFeePercent(this.address, gcFeePercent);
  }
}
