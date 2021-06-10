import { ContractTransaction, Signer } from 'ethers';
import { Enterprise__factory, EnterpriseFactory__factory, PowerToken__factory } from '../types/contracts';
import {
  AccountState,
  Address,
  BlockchainProvider,
  ChainID,
  EnterpriseInfo,
  EnterpriseParams,
  ServiceInfo,
  ServiceParams,
} from '@iqprotocol/abstract-blockchain';

type DeployedContracts = {
  enterpriseFactory: Address;
};

export type EIP155BlockchainProviderConfig = {
  signer: Signer;
  contracts: DeployedContracts;
};

export class EIP155BlockchainProvider implements BlockchainProvider<ContractTransaction> {
  private readonly signer: Signer;
  private readonly contracts: DeployedContracts;

  constructor({ signer, contracts }: EIP155BlockchainProviderConfig) {
    this.signer = signer;
    this.contracts = contracts;
  }

  // https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-2.md
  async getChainId(): Promise<ChainID> {
    const reference = await this.signer.getChainId();
    return new ChainID({ namespace: 'eip155', reference: reference.toString() });
  }

  async deployEnterprise(params: EnterpriseParams): Promise<ContractTransaction> {
    return EnterpriseFactory__factory.connect(this.contracts.enterpriseFactory, this.signer).deploy(
      params.name,
      params.liquidityTokenAddress,
      params.baseUri,
      params.gcFeePercent,
      params.converterAddress,
    );
  }

  async listEnterpriseServices(enterpriseAddress: Address): Promise<Address[]> {
    const enterprise = Enterprise__factory.connect(enterpriseAddress, this.signer);
    return enterprise.getPowerTokens();
  }

  async getEnterpriseInfo(enterpriseAddress: Address): Promise<EnterpriseInfo> {
    return this.readEnterpriseInfo(enterpriseAddress);
  }

  async registerService(enterpriseAddress: Address, params: ServiceParams): Promise<ContractTransaction> {
    const enterprise = Enterprise__factory.connect(enterpriseAddress, this.signer);
    return enterprise.registerService(
      params.name,
      params.symbol,
      params.gapHalvingPeriod,
      params.baseRate,
      params.baseToken,
      params.serviceFeePercent,
      params.minLoanDuration,
      params.maxLoanDuration,
      params.minGCFee,
      params.allowsPerpetualTokensForever,
    );
  }

  async getServiceInfo(serviceAddress: Address): Promise<ServiceInfo> {
    return this.readServiceInfo(serviceAddress);
  }

  async getAccountState(serviceAddress: Address, accountAddress: Address): Promise<AccountState> {
    const powerToken = PowerToken__factory.connect(serviceAddress, this.signer);
    const balance = await powerToken.balanceOf(accountAddress);
    const { energy, timestamp } = await powerToken.getState(accountAddress);
    return {
      serviceAddress,
      accountAddress,
      balance,
      energy,
      timestamp,
    };
  }

  protected async readEnterpriseInfo(enterpriseAddress: Address): Promise<EnterpriseInfo> {
    const enterprise = Enterprise__factory.connect(enterpriseAddress, this.signer);
    const {
      name,
      baseUri,
      totalShares,
      interestGapHalvingPeriod,
      borrowerLoanReturnGracePeriod,
      enterpriseLoanCollectGracePeriod,
      gcFeePercent,
      fixedReserve,
      usedReserve,
      streamingReserve,
      streamingReserveTarget,
      streamingReserveUpdated,
    } = await enterprise.getInfo();

    return {
      address: enterpriseAddress,
      name,
      baseUri,
      totalShares,
      interestGapHalvingPeriod,
      borrowerLoanReturnGracePeriod,
      enterpriseLoanCollectGracePeriod,
      gcFeePercent,
      fixedReserve,
      usedReserve,
      streamingReserve,
      streamingReserveTarget,
      streamingReserveUpdated,
    };
  }

  protected async readServiceInfo(powerTokenAddress: Address): Promise<ServiceInfo> {
    const powerToken = PowerToken__factory.connect(powerTokenAddress, this.signer);

    const {
      name,
      symbol,
      baseRate,
      minGCFee,
      gapHalvingPeriod,
      index,
      baseToken,
      minLoanDuration,
      maxLoanDuration,
      serviceFeePercent,
      allowsPerpetual,
    } = await powerToken.getInfo();

    return {
      address: powerTokenAddress,
      name,
      symbol,
      baseRate,
      minGCFee,
      gapHalvingPeriod,
      index,
      baseToken,
      minLoanDuration,
      maxLoanDuration,
      serviceFeePercent,
      allowsPerpetual,
    };
  }
}
