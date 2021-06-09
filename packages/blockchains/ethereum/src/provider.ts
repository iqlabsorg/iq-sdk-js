import { ContractTransaction, Signer } from 'ethers';
import {
  Enterprise__factory,
  EnterpriseFactory__factory,
  ERC20__factory,
  PowerToken__factory,
} from '../types/contracts';
import {
  Address,
  BlockchainProvider,
  EnterpriseInfo,
  EnterpriseParams,
  ServiceInfo,
  ServiceParams,
} from '@iqprotocol/abstract-blockchain';

type DeployedContracts = {
  enterpriseFactory: Address;
};

export type EthereumBlockchainProviderConfig = {
  signer: Signer;
  contracts: DeployedContracts;
};

export class EthereumBlockchainProvider implements BlockchainProvider<ContractTransaction> {
  private readonly signer: Signer;
  private readonly contracts: DeployedContracts;
  private readonly wellKnownEnterprises = new Set<Address>();

  constructor({ signer, contracts }: EthereumBlockchainProviderConfig) {
    this.signer = signer;
    this.contracts = contracts;
  }

  addWellKnownEnterprise(address: Address): void {
    this.wellKnownEnterprises.add(address);
  }

  async getNetworkId(): Promise<string> {
    return (await this.signer.getChainId()).toString();
  }

  async getTokenBalance(tokenAddress: Address, address: Address): Promise<string> {
    const token = ERC20__factory.connect(tokenAddress, this.signer);
    return (await token.balanceOf(address)).toString();
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

  async listEnterprises(): Promise<EnterpriseInfo[]> {
    return Promise.all(
      [...this.wellKnownEnterprises].map(async enterpriseAddress => this.readEnterpriseInfo(enterpriseAddress)),
    );
  }

  async listEnterpriseServices(enterpriseAddress: Address): Promise<ServiceInfo[]> {
    const enterprise = Enterprise__factory.connect(enterpriseAddress, this.signer);
    const powerTokens = await enterprise.getPowerTokens();
    if (!powerTokens.length) {
      return [];
    }

    return Promise.all(powerTokens.map(async powerTokenAddress => this.readServiceInfo(powerTokenAddress)));
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
