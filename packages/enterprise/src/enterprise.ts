import { AccountId, ChainId } from 'caip';
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { Address, BlockchainEnterprise, BlockchainProvider } from '@iqprotocol/abstract-blockchain';
import { Service } from './service';
import { EnterpriseInfo, RentalAgreement, RentalFeeEstimationRequest, RentRequest, Stake } from './types';
import { pick } from './utils';

export interface EnterpriseConfig<Transaction> {
  blockchain: BlockchainProvider<Transaction>;
  accountId: AccountId;
}

export class Enterprise<Transaction = unknown> {
  protected constructor(
    private readonly accountId: AccountId,
    private readonly chainId: ChainId,
    private readonly blockchain: BlockchainProvider<Transaction>,
    private readonly blockchainEnterprise: BlockchainEnterprise<Transaction>,
  ) {}

  static async create<Transaction = unknown>({
    blockchain,
    accountId,
  }: EnterpriseConfig<Transaction>): Promise<Enterprise<Transaction>> {
    const chainId = await blockchain.getChainId();
    if (chainId.toString() !== accountId.chainId.toString()) {
      throw new Error(`Chain ID mismatch!`);
    }
    // todo load: all tokens asset types for  future validation
    const blockchainEnterprise = blockchain.enterprise(accountId.address);

    return new Enterprise<Transaction>(accountId, chainId, blockchain, blockchainEnterprise);
  }

  getAccountId(): AccountId {
    return this.accountId;
  }

  getChainId(): ChainId {
    return this.chainId;
  }

  async getInfo(): Promise<EnterpriseInfo> {
    const info = await this.blockchainEnterprise.getInfo();
    return {
      accountId: this.toAccountId(info.address),
      ...pick(info, [
        'name',
        'baseUri',
        'totalShares',
        'streamingReserveHalvingPeriod',
        'renterOnlyReturnPeriod',
        'enterpriseOnlyCollectionPeriod',
        'gcFeePercent',
        'fixedReserve',
        'usedReserve',
        'streamingReserve',
        'streamingReserveTarget',
        'streamingReserveUpdated',
      ]),
    };
  }

  async getServices(): Promise<Service<Transaction>[]> {
    const services = [];
    const serviceAddresses = await this.blockchainEnterprise.getServiceAddresses();
    for (const address of serviceAddresses) {
      const service = await Service.create({
        blockchain: this.blockchain,
        accountId: this.toAccountId(address),
      });
      services.push(service);
    }
    return services;
  }

  async estimateRentalFee({
    serviceAccountId,
    paymentTokenAccountId,
    rentalAmount,
    rentalPeriod,
  }: RentalFeeEstimationRequest): Promise<BigNumber> {
    return this.blockchainEnterprise.estimateRentalFee(
      this.toAddress(serviceAccountId),
      this.toAddress(paymentTokenAccountId),
      rentalAmount,
      rentalPeriod,
    );
  }

  async rent({
    serviceAccountId,
    paymentTokenAccountId,
    rentalAmount,
    rentalPeriod,
    maxPayment,
  }: RentRequest): Promise<Transaction> {
    return this.blockchainEnterprise.rent(
      this.toAddress(serviceAccountId),
      this.toAddress(paymentTokenAccountId),
      rentalAmount,
      rentalPeriod,
      maxPayment,
    );
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

  async findRentalAgreements(accountId?: AccountId): Promise<RentalAgreement[]> {
    const rentalTokenIds = await this.blockchainEnterprise.getRentalTokenIds(this.toOptionalAddress(accountId));
    return Promise.all(rentalTokenIds.map(async tokenId => this.blockchainEnterprise.getRentalAgreement(tokenId)));
  }

  async getRentalAgreement(rentalTokenId: BigNumberish): Promise<RentalAgreement> {
    // todo: replace  caip19
    return this.blockchainEnterprise.getRentalAgreement(rentalTokenId);
  }

  async findStakes(accountId?: AccountId): Promise<Stake[]> {
    const stakeTokenIds = await this.blockchainEnterprise.getStakeTokenIds(this.toOptionalAddress(accountId));
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

  async getEnterpriseTokenAllowance(accountId?: AccountId): Promise<BigNumber> {
    return this.blockchainEnterprise.getEnterpriseTokenAllowance(this.toOptionalAddress(accountId));
  }

  async isRegisteredService(serviceAccountId: AccountId): Promise<boolean> {
    return this.blockchainEnterprise.isRegisteredService(this.toAddress(serviceAccountId));
  }

  async getProxyAdminAccountId(): Promise<AccountId> {
    return this.toAccountId(await this.blockchainEnterprise.getProxyAdminAddress());
  }

  async getCollectorAccountId(): Promise<AccountId> {
    return this.toAccountId(await this.blockchainEnterprise.getEnterpriseCollectorAddress());
  }

  async getWalletAccountId(): Promise<AccountId> {
    return this.toAccountId(await this.blockchainEnterprise.getEnterpriseWalletAddress());
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

  async getConverterAccountId(): Promise<AccountId> {
    return this.toAccountId(await this.blockchainEnterprise.getConverterAddress());
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

  async setCollectorAccountId(accountId: AccountId): Promise<Transaction> {
    return this.blockchainEnterprise.setEnterpriseCollectorAddress(this.toAddress(accountId));
  }

  async setWalletAccountId(accountId: AccountId): Promise<Transaction> {
    return this.blockchainEnterprise.setEnterpriseWalletAddress(this.toAddress(accountId));
  }

  async setConverterAccountId(accountId: AccountId): Promise<Transaction> {
    return this.blockchainEnterprise.setConverterAddress(this.toAddress(accountId));
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

  protected toAccountId(address: Address): AccountId {
    return new AccountId({ chainId: this.chainId, address });
  }

  protected toAddress(accountId: AccountId): Address {
    if (this.chainId.toString() !== accountId.chainId.toString()) {
      throw new Error(`Chain ID mismatch for! Enterprise chain ID: ${this.chainId.toString()}`);
    }
    return accountId.address;
  }

  protected toOptionalAddress(accountId?: AccountId): Address | undefined {
    return accountId ? this.toAddress(accountId) : undefined;
  }
}
