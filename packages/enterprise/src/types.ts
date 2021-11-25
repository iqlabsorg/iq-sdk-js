import { AccountId, AssetId, AssetType, ChainId } from 'caip';
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import {
  AccountState as OnChainAccountState,
  EnterpriseInfo as OnChainEnterpriseInfo,
  RentalAgreement as OnChainRentalAgreement,
  ServiceInfo as OnChainServiceInfo,
  Stake as OnChainStake,
} from '@iqprotocol/abstract-blockchain';

export type EnterpriseInfo = Omit<OnChainEnterpriseInfo, 'address'> & {
  accountId: AccountId;
};

export type ServiceInfo = Omit<OnChainServiceInfo, 'address' | 'baseToken' | 'index'> & {
  accountId: AccountId;
  baseTokenAccountId: AccountId;
};

export type RentalFeeEstimationRequest = {
  serviceAccountId: AccountId;
  paymentTokenAccountId: AccountId;
  rentalAmount: BigNumberish;
  rentalPeriod: BigNumberish;
};

export type RentRequest = RentalFeeEstimationRequest & { maxPayment: BigNumberish };

/**
 * See [[@iqprotocol/abstract-blockchain.AccountState | OnChainAccountState]] for details.
 */
export type AccountState = Omit<OnChainAccountState, 'serviceAddress' | 'accountAddress'> & {
  serviceAccountId: AccountId;
  accountId: AccountId;
};

export type Stake = Omit<OnChainStake, 'tokenId'> & {
  stakeTokenId: AssetId;
};

export type RentalAgreement = Omit<
  OnChainRentalAgreement,
  'rentalTokenId' | 'powerTokenIndex' | 'gcRewardTokenIndex'
> & {
  rentalTokenId: AssetId;
  service: Service;
  gcRewardTokenAccountId: AccountId;
};

export interface Service<Transaction = unknown> {
  getConfigurator(): ServiceConfigWriter<Transaction>;

  getAccountId(): AccountId;

  getChainId(): ChainId;

  getInfo(): Promise<ServiceInfo>;

  getAccountState(accountId: AccountId): Promise<AccountState>;

  getEnterpriseTokenAllowance(accountId?: AccountId): Promise<BigNumber>;

  setEnterpriseTokenAllowance(amount: BigNumberish): Promise<Transaction>;

  swapIn(amount: BigNumberish): Promise<Transaction>;

  swapOut(amount: BigNumberish): Promise<Transaction>;

  getAvailableBalance(accountId?: AccountId): Promise<BigNumber>;

  getBalance(accountId?: AccountId): Promise<BigNumber>;

  getEnergyAt(timestamp: number, accountId?: AccountId): Promise<BigNumber>;

  estimateRentalFee(
    paymentTokenAccountId: AccountId,
    rentalAmount: BigNumberish,
    rentalPeriod: BigNumberish,
  ): Promise<{ poolFee: BigNumber; serviceFee: BigNumber; gcFee: BigNumber }>;
}

export interface ServiceConfigWriter<Transaction = unknown> extends ServiceConfigReader {
  setBaseRate(baseRate: BigNumberish, baseTokenAccountId: AccountId, minGCFee: BigNumberish): Promise<Transaction>;

  setRentalPeriodLimits(minRentalPeriod: BigNumberish, maxRentalPeriod: BigNumberish): Promise<Transaction>;

  setServiceFeePercent(feePercent: BigNumberish): Promise<Transaction>;
}

export interface ServiceConfigReader {
  getBaseRate(): Promise<BigNumber>;

  getMinGCFee(): Promise<BigNumber>;

  getEnergyGapHalvingPeriod(): Promise<number>;

  getBaseTokenAccountId(): Promise<AccountId>;

  getMinRentalPeriod(): Promise<number>;

  getMaxRentalPeriod(): Promise<number>;

  getServiceFeePercent(): Promise<number>;

  isSwappingEnabled(): Promise<boolean>;

  isTransferEnabled(): Promise<boolean>;
}

/**
 * Allows to communicate with the enterprise and use its services.
 */
export interface Enterprise<Transaction = unknown> extends EnterpriseConfigReader {
  /**
   *  Returns an instance of [[EnterpriseConfigWriter]].
   */
  getConfigurator(): EnterpriseConfigWriter<Transaction>;

  /**
   * Returns enterprise account ID (CAIP-10).
   */
  getAccountId(): AccountId;

  /**
   * Returns the enterprise connected chain ID (CAIP-2).
   */
  getChainId(): ChainId;

  /**
   * Returns the enterprise information.
   */
  getInfo(): Promise<EnterpriseInfo>;

  /**
   * Returns a list of enterprise services.
   */
  findServices(): Promise<Service<Transaction>[]>;

  /**
   * Returns an instance of [[Service]].
   *
   * @param serviceAccountId
   */
  getService(serviceAccountId: AccountId): Promise<Service<Transaction>>;

  /**
   * Estimates potential rental fee based on provided rental parameters.
   *
   * @param rentalFeeEstimationRequest
   */
  estimateRentalFee(rentalFeeEstimationRequest: RentalFeeEstimationRequest): Promise<BigNumber>;

  rent(rentRequest: RentRequest): Promise<Transaction>;

  getStakingReward(stakeTokenId: AssetId): Promise<BigNumber>;

  claimStakingReward(stakeTokenId: AssetId): Promise<Transaction>;

  returnRental(rentalTokenId: AssetId): Promise<Transaction>;

  findRentalAgreements(accountId?: AccountId): Promise<RentalAgreement[]>;

  getRentalAgreement(rentalTokenId: AssetId): Promise<RentalAgreement>;

  findStakes(accountId?: AccountId): Promise<Stake[]>;

  getStake(stakeTokenId: AssetId): Promise<Stake>;

  stake(amount: BigNumberish): Promise<Transaction>;

  unstake(stakeTokenId: AssetId): Promise<Transaction>;

  increaseStake(stakeTokenId: AssetId, amount: BigNumberish): Promise<Transaction>;

  decreaseStake(stakeTokenId: AssetId, amount: BigNumberish): Promise<Transaction>;

  setEnterpriseTokenAllowance(amount: BigNumberish): Promise<Transaction>;

  getEnterpriseTokenAllowance(accountId?: AccountId): Promise<BigNumber>;

  isRegisteredService(serviceAccountId: AccountId): Promise<boolean>;

  getReserve(): Promise<BigNumber>;

  getUsedReserve(): Promise<BigNumber>;

  getAvailableReserve(): Promise<BigNumber>;

  getRentalTokenType(): AssetType;

  getStakeTokenType(): AssetType;
}

export interface EnterpriseConfigReader {
  getBaseUri(): Promise<string>;

  getProxyAdminAccountId(): Promise<AccountId>;

  getCollectorAccountId(): Promise<AccountId>;

  getWalletAccountId(): Promise<AccountId>;

  getConverterAccountId(): Promise<AccountId>;

  getBondingCurve(): Promise<{ pole: BigNumber; slope: BigNumber }>;

  getRenterOnlyReturnPeriod(): Promise<number>;

  getEnterpriseOnlyCollectionPeriod(): Promise<number>;

  getStreamingReserveHalvingPeriod(): Promise<number>;

  getGCFeePercent(): Promise<number>;
}

export interface EnterpriseConfigWriter<Transaction = unknown> extends EnterpriseConfigReader {
  setBaseUri(baseUri: string): Promise<Transaction>;

  setCollectorAccountId(accountId: AccountId): Promise<Transaction>;

  setWalletAccountId(accountId: AccountId): Promise<Transaction>;

  setConverterAccountId(accountId: AccountId): Promise<Transaction>;

  setBondingCurve(pole: BigNumberish, slope: BigNumberish): Promise<Transaction>;

  setRenterOnlyReturnPeriod(period: number): Promise<Transaction>;

  setEnterpriseOnlyCollectionPeriod(period: number): Promise<Transaction>;

  setStreamingReserveHalvingPeriod(streamingReserveHalvingPeriod: number): Promise<Transaction>;

  setGcFeePercent(gcFeePercent: number): Promise<Transaction>;
}
