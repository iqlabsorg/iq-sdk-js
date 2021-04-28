export type EnterpriseData = {
  name: string;
  tokenAddress: string;
  baseUri: string;
};

export interface EvmCompatibleBlockchainProvider<TransactionResponse> {
  deployEnterprise(params: EnterpriseData): Promise<TransactionResponse>;

  getEnterpriseData(enterpriseAddress: string): Promise<EnterpriseData>;
}
