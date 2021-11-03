import {
  AccountId,
  Address,
  BigNumber,
  BigNumberish,
  BlockchainProvider,
  EnterpriseInfo,
  Stake,
  RentalAgreement,
  BlockchainEnterprise,
} from '@iqprotocol/abstract-blockchain';
import { Service } from './service';

export type RentalFeeEstimationRequest = {
  serviceAddress: Address;
  paymentTokenAddress: Address;
  rentalAmount: BigNumberish;
  rentalPeriod: BigNumberish;
};

export type RentRequest = RentalFeeEstimationRequest & { maxPayment: BigNumberish };

export interface EnterpriseConfig<Transaction> {
  blockchain: BlockchainProvider<Transaction>;
  address: Address;
}

export class Enterprise<Transaction = unknown> {
  private readonly address: Address;
  private readonly blockchain: BlockchainProvider<Transaction>;
  private readonly blockchainEnterprise: BlockchainEnterprise<Transaction>;

  constructor({ blockchain, address }: EnterpriseConfig<Transaction>) {
    this.address = address;
    this.blockchain = blockchain;
    this.blockchainEnterprise = blockchain.enterprise(address);
  }

  attach(address: Address): Enterprise<Transaction> {
    return new Enterprise({ blockchain: this.blockchain, address });
  }

  connect<Transaction>(blockchain: BlockchainProvider<Transaction>, address: Address): Enterprise<Transaction> {
    return new Enterprise({ blockchain, address });
  }

  async getId(): Promise<AccountId> {
    const chainId = await this.blockchain.getChainId();
    return new AccountId({ chainId, address: this.address });
  }

  getAddress(): Address {
    return this.address;
  }

  async getInfo(): Promise<EnterpriseInfo> {
    return this.blockchainEnterprise.getInfo();
  }

  async getServices(): Promise<Service<Transaction>[]> {
    return (await this.blockchainEnterprise.getServiceAddresses()).map(
      address =>
        new Service({
          blockchain: this.blockchain,
          address,
        }),
    );
  }

  async estimateRentalFee({
    serviceAddress,
    paymentTokenAddress,
    rentalAmount,
    rentalPeriod,
  }: RentalFeeEstimationRequest): Promise<BigNumber> {
    return this.blockchainEnterprise.estimateRentalFee(serviceAddress, paymentTokenAddress, rentalAmount, rentalPeriod);
  }

  async rent({
    serviceAddress,
    paymentTokenAddress,
    rentalAmount,
    rentalPeriod,
    maxPayment,
  }: RentRequest): Promise<Transaction> {
    return this.blockchainEnterprise.rent(serviceAddress, paymentTokenAddress, rentalAmount, rentalPeriod, maxPayment);
  }

  async getStakingReward(stakeTokenId: BigNumberish): Promise<BigNumber> {
    return this.blockchainEnterprise.getStakingReward(stakeTokenId);
  }

  async claimStakingReward(stakeTokenId: BigNumberish): Promise<Transaction> {
    return this.blockchainEnterprise.claimStakingReward(stakeTokenId);
  }

  async returnRental(rentalTokenId: BigNumberish): Promise<Transaction> {
    return this.blockchainEnterprise.returnRental(rentalTokenId);
  }

  async findRentalAgreements(accountAddress?: Address): Promise<RentalAgreement[]> {
    const rentalTokenIds = await this.blockchainEnterprise.getRentalTokenIds(accountAddress);
    return Promise.all(rentalTokenIds.map(async tokenId => this.blockchainEnterprise.getRentalAgreement(tokenId)));
  }

  async getRentalAgreement(rentalTokenId: BigNumberish): Promise<RentalAgreement> {
    return this.blockchainEnterprise.getRentalAgreement(rentalTokenId);
  }

  async findStakes(accountAddress?: Address): Promise<Stake[]> {
    const stakeTokenIds = await this.blockchainEnterprise.getStakeTokenIds(accountAddress);
    return Promise.all(stakeTokenIds.map(async tokenId => this.blockchainEnterprise.getStake(tokenId)));
  }

  async getStake(stakeTokenId: BigNumberish): Promise<Stake> {
    return this.blockchainEnterprise.getStake(stakeTokenId);
  }

  async stake(amount: BigNumberish): Promise<Transaction> {
    return this.blockchainEnterprise.stake(amount);
  }

  async unstake(stakeTokenId: BigNumberish): Promise<Transaction> {
    return this.blockchainEnterprise.unstake(stakeTokenId);
  }

  async increaseStake(stakeTokenId: BigNumberish, amount: BigNumberish): Promise<Transaction> {
    return this.blockchainEnterprise.increaseStake(stakeTokenId, amount);
  }

  async decreaseStake(stakeTokenId: BigNumberish, amount: BigNumberish): Promise<Transaction> {
    return this.blockchainEnterprise.decreaseStake(stakeTokenId, amount);
  }

  async setEnterpriseTokenAllowance(amount: BigNumberish): Promise<Transaction> {
    return this.blockchainEnterprise.setEnterpriseTokenAllowance(amount);
  }

  async getEnterpriseTokenAllowance(accountAddress?: Address): Promise<BigNumber> {
    return this.blockchainEnterprise.getEnterpriseTokenAllowance(accountAddress);
  }

  async isRegisteredService(serviceAddress: Address): Promise<boolean> {
    return this.blockchainEnterprise.isRegisteredService(serviceAddress);
  }

  async getProxyAdminAddress(): Promise<Address> {
    return this.blockchainEnterprise.getProxyAdminAddress();
  }

  async getCollectorAddress(): Promise<Address> {
    return this.blockchainEnterprise.getEnterpriseCollectorAddress();
  }

  async getWalletAddress(): Promise<Address> {
    return this.blockchainEnterprise.getEnterpriseWalletAddress();
  }

  async getRenterOnlyReturnPeriod(): Promise<number> {
    return this.blockchainEnterprise.getRenterOnlyReturnPeriod();
  }

  async getEnterpriseOnlyCollectionPeriod(): Promise<number> {
    return this.blockchainEnterprise.getEnterpriseOnlyCollectionPeriod();
  }

  async getStreamingReserveHalvingPeriod(): Promise<number> {
    return this.blockchainEnterprise.getStreamingReserveHalvingPeriod();
  }

  async getConverterAddress(): Promise<Address> {
    return this.blockchainEnterprise.getConverterAddress();
  }

  async getBaseUri(): Promise<string> {
    return this.blockchainEnterprise.getBaseUri();
  }

  async getReserve(): Promise<BigNumber> {
    return this.blockchainEnterprise.getReserve();
  }

  async getUsedReserve(): Promise<BigNumber> {
    return this.blockchainEnterprise.getUsedReserve();
  }

  async getAvailableReserve(): Promise<BigNumber> {
    return this.blockchainEnterprise.getAvailableReserve();
  }

  async getBondingCurve(): Promise<{ pole: BigNumber; slope: BigNumber }> {
    return this.blockchainEnterprise.getBondingCurve();
  }

  async getGCFeePercent(): Promise<number> {
    return this.blockchainEnterprise.getGCFeePercent();
  }

  async setCollectorAddress(collectorAddress: Address): Promise<Transaction> {
    return this.blockchainEnterprise.setEnterpriseCollectorAddress(collectorAddress);
  }

  async setWalletAddress(vaultAddress: Address): Promise<Transaction> {
    return this.blockchainEnterprise.setEnterpriseWalletAddress(vaultAddress);
  }

  async setConverterAddress(converterAddress: Address): Promise<Transaction> {
    return this.blockchainEnterprise.setConverterAddress(converterAddress);
  }

  async setBondingCurve(pole: BigNumberish, slope: BigNumberish): Promise<Transaction> {
    return this.blockchainEnterprise.setBondingCurve(pole, slope);
  }

  async setRenterOnlyReturnPeriod(period: number): Promise<Transaction> {
    return this.blockchainEnterprise.setRenterOnlyReturnPeriod(period);
  }

  async setEnterpriseOnlyCollectionPeriod(period: number): Promise<Transaction> {
    return this.blockchainEnterprise.setEnterpriseOnlyCollectionPeriod(period);
  }

  async setBaseUri(baseUri: string): Promise<Transaction> {
    return this.blockchainEnterprise.setBaseUri(baseUri);
  }

  async setStreamingReserveHalvingPeriod(streamingReserveHalvingPeriod: number): Promise<Transaction> {
    return this.blockchainEnterprise.setStreamingReserveHalvingPeriod(streamingReserveHalvingPeriod);
  }

  async setGcFeePercent(gcFeePercent: number): Promise<Transaction> {
    return this.blockchainEnterprise.setGcFeePercent(gcFeePercent);
  }
}
