import { BigNumberish } from 'ethers';

export type EnterpriseData = {
  name: string;
  tokenAddress: string;
  baseUri: string;
};

export type ServiceData = {
  name: string;
  symbol: string;
  halfLife: BigNumberish;
  factor: BigNumberish;
  interestRateHalvingPeriod: BigNumberish;
  allowedLoanDurations: BigNumberish[];
  allowedRefundCurvatures: BigNumberish[];
};

export interface EvmCompatibleBlockchainProvider<TransactionResponse> {
  deployEnterprise(params: EnterpriseData): Promise<TransactionResponse>;

  getEnterpriseData(enterpriseAddress: string): Promise<EnterpriseData>;

  registerService(enterpriseAddress: string, serviceConfig: ServiceData): Promise<TransactionResponse>;
}
