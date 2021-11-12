import { AccountId, AssetId, AssetType, ChainId } from 'caip';
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { Address, BlockchainProvider } from '@iqprotocol/abstract-blockchain';
import {
  Enterprise,
  EnterpriseConfigWriter,
  EnterpriseInfo,
  RentalAgreement,
  RentalFeeEstimationRequest,
  RentRequest,
  Service,
  Stake,
} from './types';
import { pick } from './utils';
import { ServiceImpl } from './service';
import { AddressTranslator } from './address-translator';
import { AssetIdTranslator } from './asset-id-translator';
import { AbstractEnterpriseConfig } from './abstract-enterprise-config';
import { EnterpriseConfigurator } from './enterprise-configurator';

export type AssetTypes = Record<'rentalToken' | 'stakeToken', AssetType>;

export class EnterpriseImpl<Transaction = unknown>
  extends AbstractEnterpriseConfig<Transaction>
  implements Enterprise<Transaction>
{
  private readonly rentalTokenIdTranslator: AssetIdTranslator;
  private readonly stakeTokenIdTranslator: AssetIdTranslator;

  constructor(
    private readonly accountId: AccountId,
    private readonly chainId: ChainId,
    private readonly blockchain: BlockchainProvider<Transaction>,
    private readonly assetTypes: AssetTypes,
  ) {
    super(blockchain.enterprise(accountId.address), new AddressTranslator(chainId));
    this.rentalTokenIdTranslator = new AssetIdTranslator(assetTypes.rentalToken);
    this.stakeTokenIdTranslator = new AssetIdTranslator(assetTypes.stakeToken);
  }

  getConfigurator(): EnterpriseConfigWriter<Transaction> {
    return new EnterpriseConfigurator(this.blockchainEnterprise, this.addressTranslator);
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

  async findServices(): Promise<Service<Transaction>[]> {
    return (await this.blockchainEnterprise.getServiceAddresses()).map(address => this.instantiateService(address));
  }

  async getService(serviceAccountId: AccountId): Promise<Service<Transaction>> {
    const isRegisteredService = await this.blockchainEnterprise.isRegisteredService(
      this.accountIdToAddress(serviceAccountId),
    );
    if (!isRegisteredService) {
      throw new Error('Unknown service');
    }
    return this.instantiateService(serviceAccountId.address);
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
    const serviceAddresses = await this.blockchainEnterprise.getServiceAddresses();
    const paymentTokenAddress = await this.blockchainEnterprise.getPaymentTokenAddressByIndex(
      agreement.gcRewardTokenIndex,
    );

    return {
      service: this.instantiateService(serviceAddresses[agreement.powerTokenIndex]),
      rentalTokenId: this.rentalTokenIdToAssetId(agreement.rentalTokenId),
      gcRewardTokenAccountId: this.addressToAccountId(paymentTokenAddress),
      ...pick(agreement, [
        'rentalAmount',
        'startTime',
        'endTime',
        'renterOnlyReturnTime',
        'enterpriseOnlyCollectionTime',
        'gcRewardAmount',
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
      stakeTokenId: this.stakeTokenIdToAssetId(stake.tokenId),
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

  async getReserve(): Promise<BigNumber> {
    return this.blockchainEnterprise.getReserve();
  }

  async getUsedReserve(): Promise<BigNumber> {
    return this.blockchainEnterprise.getUsedReserve();
  }

  async getAvailableReserve(): Promise<BigNumber> {
    return this.blockchainEnterprise.getAvailableReserve();
  }

  getRentalTokenType(): AssetType {
    return this.assetTypes.rentalToken;
  }

  getStakeTokenType(): AssetType {
    return this.assetTypes.stakeToken;
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

  protected instantiateService(address: Address): Service<Transaction> {
    return new ServiceImpl<Transaction>(this.addressToAccountId(address), this.chainId, this.blockchain);
  }
}
