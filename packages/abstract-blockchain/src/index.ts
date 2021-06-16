import { BigNumber, BigNumberish } from 'ethers';
import { ChainID, AccountID } from 'caip';

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

export interface BlockchainProvider<TransactionResponse = Record<string, unknown>> {
  getChainId(): Promise<ChainID>;

  deployEnterprise(params: EnterpriseParams): Promise<TransactionResponse>;

  getServices(enterpriseAddress: Address): Promise<Address[]>;

  getEnterpriseInfo(enterpriseAddress: Address): Promise<EnterpriseInfo>;

  addLiquidity(enterpriseAddress: Address, amount: BigNumberish): Promise<TransactionResponse>;

  getServiceInfo(serviceAddress: Address): Promise<ServiceInfo>;

  getAccountState(serviceAddress: Address, accountAddress: Address): Promise<AccountState>;

  registerService(enterpriseAddress: Address, serviceParams: ServiceParams): Promise<TransactionResponse>;

  setLiquidityAllowance(enterpriseAddress: Address, amount: BigNumberish): Promise<TransactionResponse>;

  getLiquidityAllowance(enterpriseAddress: Address): Promise<BigNumber>;

  getLiquidityTokenAddress(enterpriseAddress: Address): Promise<Address>;

  getLiquidityTokenMetadata(enterpriseAddress: Address): Promise<ERC20Metadata>;

  getERC20Metadata(address: Address): Promise<ERC20Metadata>;

  getERC721Metadata(address: Address, tokenId: BigNumberish): Promise<ERC721Metadata>;
}
