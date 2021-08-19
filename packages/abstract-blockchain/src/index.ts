import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { AccountId, ChainId } from 'caip';

export { ChainId, AccountId };
export { BigNumber, BigNumberish };
export type Address = string;

export interface EnterpriseParams {
  name: string;
  baseUri: string;
  gcFeePercent: BigNumberish;
  liquidityTokenAddress: Address;
  converterAddress: Address;
}

export interface EnterpriseInfo {
  address: Address;
  name: string;
  baseUri: string;
  totalShares: BigNumber;
  interestGapHalvingPeriod: number;
  borrowerLoanReturnGracePeriod: number;
  enterpriseLoanCollectGracePeriod: number;
  gcFeePercent: number;
  fixedReserve: BigNumber;
  usedReserve: BigNumber;
  streamingReserve: BigNumber;
  streamingReserveTarget: BigNumber;
  streamingReserveUpdated: number;
}

export interface ServiceParams {
  name: string;
  symbol: string;
  gapHalvingPeriod: BigNumberish;
  baseRate: BigNumberish;
  baseToken: Address;
  serviceFeePercent: BigNumberish;
  minLoanDuration: BigNumberish;
  maxLoanDuration: BigNumberish;
  minGCFee: BigNumberish;
  allowsPerpetualTokensForever: boolean;
}

export interface ServiceInfo {
  address: Address;
  name: string;
  symbol: string;
  baseRate: BigNumber;
  minGCFee: BigNumber;
  gapHalvingPeriod: number;
  index: number;
  baseToken: Address;
  minLoanDuration: number;
  maxLoanDuration: number;
  serviceFeePercent: number;
  allowsPerpetual: boolean;
}

export interface AccountState {
  serviceAddress: Address;
  accountAddress: Address;
  balance: BigNumber;
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

export interface LiquidityInfo {
  tokenId: BigNumber;
  amount: BigNumber;
  shares: BigNumber;
  block: BigNumber;
}

export interface LoanInfo {
  tokenId: BigNumber;
  amount: BigNumber;
  powerTokenIndex: number;
  borrowingTime: number;
  maturityTime: number;
  borrowerReturnGraceTime: number;
  enterpriseCollectGraceTime: number;
  gcFee: BigNumber;
  gcFeeTokenIndex: number;
}

export interface BlockchainProvider<Transaction = unknown> {
  getChainId(): Promise<ChainId>;

  deployEnterprise(enterpriseFactoryAddress: Address, params: EnterpriseParams): Promise<Transaction>;

  getERC20Metadata(tokenAddress: Address): Promise<ERC20Metadata>;

  getERC721Metadata(tokenAddress: Address, tokenId: BigNumberish): Promise<ERC721Metadata>;

  getTokenBalance(tokenAddress: Address, accountAddress?: Address): Promise<BigNumber>;

  // Enterprise

  addLiquidity(enterpriseAddress: Address, amount: BigNumberish): Promise<Transaction>;

  removeLiquidity(enterpriseAddress: Address, interestTokenId: BigNumberish): Promise<Transaction>;

  increaseLiquidity(
    enterpriseAddress: Address,
    interestTokenId: BigNumberish,
    amount: BigNumberish,
  ): Promise<Transaction>;

  decreaseLiquidity(
    enterpriseAddress: Address,
    interestTokenId: BigNumberish,
    amount: BigNumberish,
  ): Promise<Transaction>;

  withdrawInterest(enterpriseAddress: Address, interestTokenId: BigNumberish): Promise<Transaction>;

  registerService(enterpriseAddress: Address, serviceParams: ServiceParams): Promise<Transaction>;

  borrow(
    enterpriseAddress: Address,
    serviceAddress: Address,
    paymentTokenAddress: Address,
    amount: BigNumberish,
    duration: BigNumberish,
    maxPayment: BigNumberish,
  ): Promise<Transaction>;

  returnLoan(enterpriseAddress: Address, borrowTokenId: BigNumberish): Promise<Transaction>;

  setEnterpriseCollectorAddress(enterpriseAddress: Address, collectorAddress: Address): Promise<Transaction>;

  setEnterpriseVaultAddress(enterpriseAddress: Address, vaultAddress: Address): Promise<Transaction>;

  setConverterAddress(enterpriseAddress: Address, converterAddress: Address): Promise<Transaction>;

  setBondingCurve(enterpriseAddress: Address, pole: BigNumberish, slope: BigNumberish): Promise<Transaction>;

  setBorrowerLoanReturnGracePeriod(enterpriseAddress: Address, period: number): Promise<Transaction>;

  setEnterpriseLoanCollectGracePeriod(enterpriseAddress: Address, period: number): Promise<Transaction>;

  setBaseUri(enterpriseAddress: Address, baseUri: string): Promise<Transaction>;

  setInterestGapHalvingPeriod(enterpriseAddress: Address, interestGapHalvingPeriod: number): Promise<Transaction>;

  setGcFeePercent(enterpriseAddress: Address, gcFeePercent: number): Promise<Transaction>;

  approveLiquidityTokensToEnterprise(enterpriseAddress: Address, amount: BigNumberish): Promise<Transaction>;

  isRegisteredService(enterpriseAddress: Address, serviceAddress: Address): Promise<boolean>;

  getProxyAdminAddress(enterpriseAddress: Address): Promise<Address>;

  getEnterpriseCollectorAddress(enterpriseAddress: Address): Promise<Address>;

  getEnterpriseVaultAddress(enterpriseAddress: Address): Promise<Address>;

  getBorrowerLoanReturnGracePeriod(enterpriseAddress: Address): Promise<number>;

  getEnterpriseLoanCollectGracePeriod(enterpriseAddress: Address): Promise<number>;

  getInterestGapHalvingPeriod(enterpriseAddress: Address): Promise<number>;

  getConverterAddress(enterpriseAddress: Address): Promise<Address>;

  getBaseUri(enterpriseAddress: Address): Promise<string>;

  getEnterpriseInfo(enterpriseAddress: Address): Promise<EnterpriseInfo>;

  getServices(enterpriseAddress: Address): Promise<Address[]>;

  getLoanInfo(enterpriseAddress: Address, borrowTokenId: BigNumberish): Promise<LoanInfo>;

  getLiquidityInfo(enterpriseAddress: Address, interestTokenId: BigNumberish): Promise<LiquidityInfo>;

  getReserve(enterpriseAddress: Address): Promise<BigNumber>;

  getUsedReserve(enterpriseAddress: Address): Promise<BigNumber>;

  getAvailableReserve(enterpriseAddress: Address): Promise<BigNumber>;

  getBondingCurve(enterpriseAddress: Address): Promise<{ pole: BigNumber; slope: BigNumber }>;

  getGCFeePercent(enterpriseAddress: Address): Promise<number>;

  getLiquidityTokenEnterpriseAllowance(enterpriseAddress: Address, accountAddress?: Address): Promise<BigNumber>;

  getLiquidityTokenAddress(enterpriseAddress: Address): Promise<Address>;

  getLiquidityTokenMetadata(enterpriseAddress: Address): Promise<ERC20Metadata>;

  getBorrowTokenAddress(enterpriseAddress: Address): Promise<Address>;

  getBorrowTokenMetadata(enterpriseAddress: Address, tokenId: BigNumberish): Promise<ERC721Metadata>;

  getInterestTokenAddress(enterpriseAddress: Address): Promise<Address>;

  getInterestTokenMetadata(enterpriseAddress: Address, tokenId: BigNumberish): Promise<ERC721Metadata>;

  getInterestTokenIds(enterpriseAddress: Address, accountAddress?: Address): Promise<BigNumber[]>;

  getBorrowTokenIds(enterpriseAddress: Address, accountAddress?: Address): Promise<BigNumber[]>;

  getAccruedInterest(enterpriseAddress: Address, interestTokenId: BigNumberish): Promise<BigNumber>;

  estimateLoan(
    enterpriseAddress: Address,
    serviceAddress: Address,
    paymentTokenAddress: Address,
    amount: BigNumberish,
    duration: BigNumberish,
  ): Promise<BigNumber>;

  // Service

  approveLiquidityTokensToService(serviceAddress: Address, amount: BigNumberish): Promise<Transaction>;

  wrap(serviceAddress: Address, amount: BigNumberish): Promise<Transaction>;

  wrapTo(serviceAddress: Address, accountAddress: Address, amount: BigNumberish): Promise<Transaction>;

  unwrap(serviceAddress: Address, amount: BigNumberish): Promise<Transaction>;

  setBaseRate(
    serviceAddress: Address,
    baseRate: BigNumberish,
    baseToken: string,
    minGCFee: BigNumberish,
  ): Promise<Transaction>;

  setServiceFeePercent(serviceAddress: Address, feePercent: BigNumberish): Promise<Transaction>;

  setLoanDurationLimits(
    serviceAddress: Address,
    minLoanDuration: BigNumberish,
    maxLoanDuration: BigNumberish,
  ): Promise<Transaction>;

  getServiceInfo(serviceAddress: Address): Promise<ServiceInfo>;

  getAccountState(serviceAddress: Address, accountAddress: Address): Promise<AccountState>;

  getBaseRate(serviceAddress: Address): Promise<BigNumber>;

  getMinGCFee(serviceAddress: Address): Promise<BigNumber>;

  getGapHalvingPeriod(serviceAddress: Address): Promise<number>;

  getServiceIndex(serviceAddress: Address): Promise<number>;

  getBaseTokenAddress(serviceAddress: Address): Promise<Address>;

  getMinLoanDuration(serviceAddress: Address): Promise<number>;

  getMaxLoanDuration(serviceAddress: Address): Promise<number>;

  getServiceFeePercent(serviceAddress: Address): Promise<number>;

  getAllowsPerpetual(serviceAddress: Address): Promise<boolean>;

  getLiquidityTokenServiceAllowance(serviceAddress: Address, accountAddress?: Address): Promise<BigNumber>;

  getPowerTokenAvailableBalance(serviceAddress: Address, accountAddress?: Address): Promise<BigNumber>;

  getPowerTokenBalance(serviceAddress: Address, accountAddress?: Address): Promise<BigNumber>;

  getEnergyAt(serviceAddress: Address, timestamp: number, accountAddress?: Address): Promise<BigNumber>;

  estimateLoanDetailed(
    serviceAddress: Address,
    paymentTokenAddress: Address,
    amount: BigNumberish,
    duration: BigNumberish,
  ): Promise<{
    interest: BigNumber;
    serviceFee: BigNumber;
    gcFee: BigNumber;
  }>;
}
