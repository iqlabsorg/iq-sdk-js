import { AccountId, AssetId, AssetType, ChainId } from 'caip';
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { Address, BlockchainEnterprise, BlockchainProvider } from '@iqprotocol/abstract-blockchain';
import { EnterpriseInfo, RentalAgreement, RentalFeeEstimationRequest, RentRequest, Stake } from './types';
import { pick } from './utils';
import { Service } from './service';
import { AddressTranslator } from './address-translator';
import { AssetIdTranslator } from './asset-id-translator';

export type AssetTypes = Record<'rentalToken' | 'stakeToken', AssetType>;
export interface EnterpriseConfig<Transaction> {
  blockchain: BlockchainProvider<Transaction>;
  accountId: AccountId;
}

export class Enterprise<Transaction = unknown> {
  private readonly blockchainEnterprise: BlockchainEnterprise<Transaction>;
  private readonly addressTranslator: AddressTranslator;
  private readonly rentalTokenIdTranslator: AssetIdTranslator;
  private readonly stakeTokenIdTranslator: AssetIdTranslator;

  protected constructor(
    private readonly accountId: AccountId,
    private readonly chainId: ChainId,
    private readonly blockchain: BlockchainProvider<Transaction>,
    private readonly assetTypes: AssetTypes,
  ) {
    this.blockchainEnterprise = blockchain.enterprise(accountId.address);
    this.addressTranslator = new AddressTranslator(chainId);
    this.rentalTokenIdTranslator = new AssetIdTranslator(assetTypes.rentalToken);
    this.stakeTokenIdTranslator = new AssetIdTranslator(assetTypes.stakeToken);
  }

  static async create<Transaction = unknown>({
    blockchain,
    accountId,
  }: EnterpriseConfig<Transaction>): Promise<Enterprise<Transaction>> {
    const chainId = await blockchain.getChainId();
    if (chainId.toString() !== accountId.chainId.toString()) {
      throw new Error(`Chain ID mismatch!`);
    }

    const namespace = await blockchain.getNonFungibleTokenStandard();
    const blockchainEnterprise = blockchain.enterprise(accountId.address);
    const assetTypes = {
      rentalToken: new AssetType({
        chainId,
        assetName: {
          namespace,
          reference: await blockchainEnterprise.getRentalTokenAddress(),
        },
      }),
      stakeToken: new AssetType({
        chainId,
        assetName: {
          namespace,
          reference: await blockchainEnterprise.getStakeTokenAddress(),
        },
      }),
    };

    return new Enterprise<Transaction>(accountId, chainId, blockchain, assetTypes);
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
      accountId: this.addressToAccountId(info.address),
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
        accountId: this.addressToAccountId(address),
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
      this.accountIdToAddress(serviceAccountId),
      this.accountIdToAddress(paymentTokenAccountId),
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
      this.accountIdToAddress(serviceAccountId),
      this.accountIdToAddress(paymentTokenAccountId),
      rentalAmount,
      rentalPeriod,
      maxPayment,
    );
  }

  async getStakingReward(stakeTokenId: AssetId): Promise<BigNumber> {
    return this.blockchainEnterprise.getStakingReward(this.stakeAssetIdToTokenId(stakeTokenId));
  }

  async claimStakingReward(stakeTokenId: AssetId): Promise<Transaction> {
    return this.blockchainEnterprise.claimStakingReward(this.stakeAssetIdToTokenId(stakeTokenId));
  }

  async returnRental(rentalTokenId: AssetId): Promise<Transaction> {
    return this.blockchainEnterprise.returnRental(this.rentalAssetIdToTokenId(rentalTokenId));
  }

  async findRentalAgreements(accountId?: AccountId): Promise<RentalAgreement[]> {
    const rentalTokenIds = await this.blockchainEnterprise.getRentalTokenIds(
      this.optionalAccountIdToAddress(accountId),
    );
    return Promise.all(
      rentalTokenIds.map(async tokenId => this.getRentalAgreement(this.rentalTokenIdToAssetId(tokenId))),
    );
  }

  async getRentalAgreement(rentalTokenId: AssetId): Promise<RentalAgreement> {
    const agreement = await this.blockchainEnterprise.getRentalAgreement(this.rentalAssetIdToTokenId(rentalTokenId));
    return {
      rentalTokenId: this.rentalTokenIdToAssetId(agreement.rentalTokenId),
      ...pick(agreement, [
        'rentalAmount',
        'powerTokenIndex',
        'startTime',
        'endTime',
        'renterOnlyReturnTime',
        'enterpriseOnlyCollectionTime',
        'gcRewardAmount',
        'gcRewardTokenIndex',
      ]),
    };
  }

  async findStakes(accountId?: AccountId): Promise<Stake[]> {
    const stakeTokenIds = await this.blockchainEnterprise.getStakeTokenIds(this.optionalAccountIdToAddress(accountId));
    return Promise.all(stakeTokenIds.map(async tokenId => this.getStake(this.stakeTokenIdToAssetId(tokenId))));
  }

  async getStake(stakeTokenId: AssetId): Promise<Stake> {
    const stake = await this.blockchainEnterprise.getStake(this.stakeAssetIdToTokenId(stakeTokenId));
    return {
      tokenId: this.stakeTokenIdToAssetId(stake.tokenId),
      ...pick(stake, ['amount', 'shares', 'block']),
    };
  }

  async stake(amount: BigNumberish): Promise<Transaction> {
    return this.blockchainEnterprise.stake(amount);
  }

  async unstake(stakeTokenId: AssetId): Promise<Transaction> {
    return this.blockchainEnterprise.unstake(this.stakeAssetIdToTokenId(stakeTokenId));
  }

  async increaseStake(stakeTokenId: AssetId, amount: BigNumberish): Promise<Transaction> {
    return this.blockchainEnterprise.increaseStake(this.stakeAssetIdToTokenId(stakeTokenId), amount);
  }

  async decreaseStake(stakeTokenId: AssetId, amount: BigNumberish): Promise<Transaction> {
    return this.blockchainEnterprise.decreaseStake(this.stakeAssetIdToTokenId(stakeTokenId), amount);
  }

  async setEnterpriseTokenAllowance(amount: BigNumberish): Promise<Transaction> {
    return this.blockchainEnterprise.setEnterpriseTokenAllowance(amount);
  }

  async getEnterpriseTokenAllowance(accountId?: AccountId): Promise<BigNumber> {
    return this.blockchainEnterprise.getEnterpriseTokenAllowance(this.optionalAccountIdToAddress(accountId));
  }

  async isRegisteredService(serviceAccountId: AccountId): Promise<boolean> {
    return this.blockchainEnterprise.isRegisteredService(this.accountIdToAddress(serviceAccountId));
  }

  async getProxyAdminAccountId(): Promise<AccountId> {
    return this.addressToAccountId(await this.blockchainEnterprise.getProxyAdminAddress());
  }

  async getCollectorAccountId(): Promise<AccountId> {
    return this.addressToAccountId(await this.blockchainEnterprise.getEnterpriseCollectorAddress());
  }

  async getWalletAccountId(): Promise<AccountId> {
    return this.addressToAccountId(await this.blockchainEnterprise.getEnterpriseWalletAddress());
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
    return this.addressToAccountId(await this.blockchainEnterprise.getConverterAddress());
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
    return this.blockchainEnterprise.setEnterpriseCollectorAddress(this.accountIdToAddress(accountId));
  }

  async setWalletAccountId(accountId: AccountId): Promise<Transaction> {
    return this.blockchainEnterprise.setEnterpriseWalletAddress(this.accountIdToAddress(accountId));
  }

  async setConverterAccountId(accountId: AccountId): Promise<Transaction> {
    return this.blockchainEnterprise.setConverterAddress(this.accountIdToAddress(accountId));
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

  getRentalTokenType(): AssetType {
    return this.assetTypes.rentalToken;
  }

  getStakeTokenType(): AssetType {
    return this.assetTypes.stakeToken;
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

  protected rentalTokenIdToAssetId(tokenId: BigNumber): AssetId {
    return this.rentalTokenIdTranslator.tokenIdToAssetId(tokenId);
  }

  protected rentalAssetIdToTokenId(assetId: AssetId): string {
    return this.rentalTokenIdTranslator.assetIdToTokenId(assetId);
  }

  protected stakeTokenIdToAssetId(tokenId: BigNumber): AssetId {
    return this.stakeTokenIdTranslator.tokenIdToAssetId(tokenId);
  }

  protected stakeAssetIdToTokenId(assetId: AssetId): string {
    return this.stakeTokenIdTranslator.assetIdToTokenId(assetId);
  }
}
