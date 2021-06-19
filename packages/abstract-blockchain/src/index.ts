import { BigNumber, BigNumberish } from 'ethers';
import { AccountID, ChainID } from 'caip';

export { ChainID, AccountID };
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

export interface BlockchainProvider<Transaction = unknown, TransactionSigner = unknown> {
  connect(signer: TransactionSigner): Promise<BlockchainProvider<Transaction, TransactionSigner>>;

  getChainId(): Promise<ChainID>;

  deployEnterprise(params: EnterpriseParams): Promise<Transaction>;

  getServices(enterpriseAddress: Address): Promise<Address[]>;

  getEnterpriseInfo(enterpriseAddress: Address): Promise<EnterpriseInfo>;

  getLiquidityInfo(enterpriseAddress: Address, interestTokenId: BigNumberish): Promise<LiquidityInfo>;

  getLoanInfo(enterpriseAddress: Address, borrowTokenId: BigNumberish): Promise<LoanInfo>;

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

  getServiceInfo(serviceAddress: Address): Promise<ServiceInfo>;

  getAccountState(serviceAddress: Address, accountAddress: Address): Promise<AccountState>;

  registerService(enterpriseAddress: Address, serviceParams: ServiceParams): Promise<Transaction>;

  estimateLoan(
    enterpriseAddress: Address,
    serviceAddress: Address,
    paymentTokenAddress: Address,
    amount: BigNumberish,
    duration: BigNumberish,
  ): Promise<BigNumber>;

  borrow(
    enterpriseAddress: Address,
    serviceAddress: Address,
    paymentTokenAddress: Address,
    amount: BigNumberish,
    duration: BigNumberish,
    maxPayment: BigNumberish,
  ): Promise<Transaction>;

  setLiquidityAllowance(enterpriseAddress: Address, amount: BigNumberish): Promise<Transaction>;

  getLiquidityAllowance(enterpriseAddress: Address, accountAddress?: Address): Promise<BigNumber>;

  getLiquidityTokenAddress(enterpriseAddress: Address): Promise<Address>;

  getLiquidityTokenMetadata(enterpriseAddress: Address): Promise<ERC20Metadata>;

  getBorrowTokenAddress(enterpriseAddress: Address): Promise<Address>;

  getBorrowTokenMetadata(enterpriseAddress: Address, tokenId: BigNumberish): Promise<ERC721Metadata>;

  getInterestTokenAddress(enterpriseAddress: Address): Promise<Address>;

  getInterestTokenMetadata(enterpriseAddress: Address, tokenId: BigNumberish): Promise<ERC721Metadata>;

  getInterestTokenIds(enterpriseAddress: Address, accountAddress?: Address): Promise<BigNumber[]>;

  getBorrowTokenIds(enterpriseAddress: Address, accountAddress?: Address): Promise<BigNumber[]>;

  getERC20Metadata(tokenAddress: Address): Promise<ERC20Metadata>;

  getERC721Metadata(tokenAddress: Address, tokenId: BigNumberish): Promise<ERC721Metadata>;

  getTokenBalance(tokenAddress: Address, accountAddress?: Address): Promise<BigNumber>;
}
