import { BigNumber, BigNumberish } from 'ethers';

export type Address = string;

export interface EnterpriseParams {
  name: string;
  baseUri: string;
  gcFeePercent: BigNumberish;
  liquidityTokenAddress: Address;
  converterAddress: Address;
}

export interface EnterpriseData {
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
  baseToken: string;
  serviceFeePercent: BigNumberish;
  minLoanDuration: BigNumberish;
  maxLoanDuration: BigNumberish;
  minGCFee: BigNumberish;
  allowsPerpetualTokensForever: boolean;
}

export interface ServiceData {
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

export interface BlockchainProvider<TransactionResponse = Record<string, unknown>> {
  getNetworkId(): Promise<string>;

  deployEnterprise(params: EnterpriseParams): Promise<TransactionResponse>;

  listEnterprises(): Promise<EnterpriseData[]>;

  listEnterpriseServices(enterpriseAddress: Address): Promise<ServiceData[]>;

  getEnterprise(enterpriseAddress: Address): Promise<EnterpriseData>;

  getService(serviceAddress: Address): Promise<ServiceData>;

  registerService(enterpriseAddress: Address, serviceParams: ServiceParams): Promise<TransactionResponse>;
}
