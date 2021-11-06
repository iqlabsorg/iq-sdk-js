import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { ChainId } from 'caip';

export type Address = string;

export interface EnterpriseParams {
  name: string;
  baseUri: string;
  gcFeePercent: BigNumberish;
  enterpriseTokenAddress: Address;
  converterAddress: Address;
}

export interface EnterpriseInfo {
  address: Address;
  name: string;
  baseUri: string;
  totalShares: BigNumber;
  streamingReserveHalvingPeriod: number;
  renterOnlyReturnPeriod: number;
  enterpriseOnlyCollectionPeriod: number;
  gcFeePercent: number;
  fixedReserve: BigNumber;
  usedReserve: BigNumber;
  streamingReserve: BigNumber;
  streamingReserveTarget: BigNumber;
  streamingReserveUpdated: number;
}

export interface ServiceParams {
  serviceName: string;
  serviceSymbol: string;
  energyGapHalvingPeriod: BigNumberish;
  baseRate: BigNumberish;
  baseToken: Address;
  serviceFeePercent: BigNumberish;
  minRentalPeriod: BigNumberish;
  maxRentalPeriod: BigNumberish;
  minGCFee: BigNumberish;
  swappingEnabledForever: boolean;
}

export interface ServiceInfo {
  address: Address;
  name: string;
  symbol: string;
  baseToken: Address;
  baseRate: BigNumber;
  minGCFee: BigNumber;
  serviceFeePercent: number;
  energyGapHalvingPeriod: number;
  index: number;
  minRentalPeriod: number;
  maxRentalPeriod: number;
  swappingEnabled: boolean;
  transferEnabled: boolean;
}

export interface AccountState {
  serviceAddress: Address;
  accountAddress: Address;
  balance: BigNumber;
  lockedBalance: BigNumber;
  energy: BigNumber;
  timestamp: number;
}

export interface ERC20Metadata {
  address: Address;
  name: string;
  symbol: string;
  decimals: number;
}

export interface ERC721Metadata {
  address: Address;
  name: string;
  symbol: string;
  tokenUri: string;
}

export interface Stake {
  tokenId: BigNumber;
  amount: BigNumber;
  shares: BigNumber;
  block: BigNumber;
}

export interface RentalAgreement {
  rentalTokenId: BigNumber;
  rentalAmount: BigNumber;
  powerTokenIndex: number;
  startTime: number;
  endTime: number;
  renterOnlyReturnTime: number;
  enterpriseOnlyCollectionTime: number;
  gcRewardAmount: BigNumber;
  gcRewardTokenIndex: number;
}

export interface BlockchainEnterprise<Transaction = unknown> {
  registerService(serviceParams: ServiceParams): Promise<Transaction>;

  // Staking

  stake(stakeAmount: BigNumberish): Promise<Transaction>;

  unstake(stakeTokenId: BigNumberish): Promise<Transaction>;

  increaseStake(stakeTokenId: BigNumberish, stakeAmountDelta: BigNumberish): Promise<Transaction>;

  decreaseStake(stakeTokenId: BigNumberish, stakeAmountDelta: BigNumberish): Promise<Transaction>;

  claimStakingReward(stakeTokenId: BigNumberish): Promise<Transaction>;

  // Renting

  rent(
    serviceAddress: Address,
    paymentTokenAddress: Address,
    rentalAmount: BigNumberish,
    rentalPeriod: BigNumberish,
    maxPayment: BigNumberish,
  ): Promise<Transaction>;

  returnRental(rentalTokenId: BigNumberish): Promise<Transaction>;

  estimateRentalFee(
    serviceAddress: Address,
    paymentTokenAddress: Address,
    rentalAmount: BigNumberish,
    rentalPeriod: BigNumberish,
  ): Promise<BigNumber>;

  // Configuration

  setEnterpriseCollectorAddress(collectorAddress: Address): Promise<Transaction>;

  setEnterpriseWalletAddress(walletAddress: Address): Promise<Transaction>;

  setConverterAddress(converterAddress: Address): Promise<Transaction>;

  setBondingCurve(pole: BigNumberish, slope: BigNumberish): Promise<Transaction>;

  setRenterOnlyReturnPeriod(period: number): Promise<Transaction>;

  setEnterpriseOnlyCollectionPeriod(period: number): Promise<Transaction>;

  setBaseUri(baseUri: string): Promise<Transaction>;

  setStreamingReserveHalvingPeriod(streamingReserveHalvingPeriod: number): Promise<Transaction>;

  setGcFeePercent(gcFeePercent: number): Promise<Transaction>;

  setEnterpriseTokenAllowance(amount: BigNumberish): Promise<Transaction>;

  isRegisteredService(serviceAddress: Address): Promise<boolean>;

  getProxyAdminAddress(): Promise<Address>;

  getEnterpriseCollectorAddress(): Promise<Address>;

  getEnterpriseWalletAddress(): Promise<Address>;

  getRenterOnlyReturnPeriod(): Promise<number>;

  getEnterpriseOnlyCollectionPeriod(): Promise<number>;

  getStreamingReserveHalvingPeriod(): Promise<number>;

  getConverterAddress(): Promise<Address>;

  getBaseUri(): Promise<string>;

  getInfo(): Promise<EnterpriseInfo>;

  getServiceAddresses(): Promise<Address[]>;

  getRentalAgreement(rentalTokenId: BigNumberish): Promise<RentalAgreement>;

  getStake(stakeTokenId: BigNumberish): Promise<Stake>;

  getReserve(): Promise<BigNumber>;

  getUsedReserve(): Promise<BigNumber>;

  getAvailableReserve(): Promise<BigNumber>;

  getBondingCurve(): Promise<{ pole: BigNumber; slope: BigNumber }>;

  getGCFeePercent(): Promise<number>;

  getEnterpriseTokenAllowance(accountAddress?: Address): Promise<BigNumber>;

  getEnterpriseTokenAddress(): Promise<Address>;

  getRentalTokenAddress(): Promise<Address>;

  getStakeTokenAddress(): Promise<Address>;

  getStakeTokenIds(accountAddress?: Address): Promise<BigNumber[]>;

  getRentalTokenIds(accountAddress?: Address): Promise<BigNumber[]>;

  getStakingReward(stakeTokenId: BigNumberish): Promise<BigNumber>;
}

export interface BlockchainService<Transaction = unknown> {
  setEnterpriseTokenAllowance(amount: BigNumberish): Promise<Transaction>;

  swapIn(amount: BigNumberish): Promise<Transaction>;

  swapOut(amount: BigNumberish): Promise<Transaction>;

  setBaseRate(baseRate: BigNumberish, baseToken: string, minGCFee: BigNumberish): Promise<Transaction>;

  setServiceFeePercent(feePercent: BigNumberish): Promise<Transaction>;

  setRentalPeriodLimits(minRentalPeriod: BigNumberish, maxRentalPeriod: BigNumberish): Promise<Transaction>;

  getInfo(): Promise<ServiceInfo>;

  getAccountState(accountAddress?: Address): Promise<AccountState>;

  getBaseRate(): Promise<BigNumber>;

  getMinGCFee(): Promise<BigNumber>;

  getEnergyGapHalvingPeriod(): Promise<number>;

  getIndex(): Promise<number>;

  getBaseTokenAddress(): Promise<Address>;

  getMinRentalPeriod(): Promise<number>;

  getMaxRentalPeriod(): Promise<number>;

  getServiceFeePercent(): Promise<number>;

  isSwappingEnabled(): Promise<boolean>;

  isTransferEnabled(): Promise<boolean>;

  getEnterpriseTokenAllowance(accountAddress?: Address): Promise<BigNumber>;

  getAvailableBalance(accountAddress?: Address): Promise<BigNumber>;

  getBalance(accountAddress?: Address): Promise<BigNumber>;

  getEnergyAt(timestamp: number, accountAddress?: Address): Promise<BigNumber>;

  estimateRentalFee(
    paymentTokenAddress: Address,
    rentalAmount: BigNumberish,
    rentalPeriod: BigNumberish,
  ): Promise<{ poolFee: BigNumber; serviceFee: BigNumber; gcFee: BigNumber }>;
}

export interface BlockchainProvider<Transaction = unknown> {
  getChainId(): Promise<ChainId>;

  enterprise(enterpriseAddress: Address): BlockchainEnterprise<Transaction>;

  service(serviceAddress: Address): BlockchainService<Transaction>;

  deployEnterprise(enterpriseFactoryAddress: Address, params: EnterpriseParams): Promise<Transaction>;

  getERC20Metadata(tokenAddress: Address): Promise<ERC20Metadata>;

  getERC721Metadata(tokenAddress: Address, tokenId: BigNumberish): Promise<ERC721Metadata>;

  getTokenBalance(tokenAddress: Address, accountAddress?: Address): Promise<BigNumber>;

  getEnterpriseTokenMetadata(enterpriseAddress: Address): Promise<ERC20Metadata>;

  getRentalTokenMetadata(enterpriseAddress: Address, tokenId: BigNumberish): Promise<ERC721Metadata>;

  getStakeTokenMetadata(enterpriseAddress: Address, tokenId: BigNumberish): Promise<ERC721Metadata>;
}
