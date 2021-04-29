import { ContractTransaction, Signer } from 'ethers';
import {
  Enterprise__factory,
  EnterpriseFactory__factory,
  ERC20Mock__factory,
} from '../types/contracts';
import {
  EnterpriseData,
  EvmCompatibleBlockchainProvider,
  ServiceData,
} from '@iqprotocol/abstract-blockchain';

type DeployedContracts = {
  enterpriseFactory: string;
};

export class EthereumBlockchainProvider
  implements EvmCompatibleBlockchainProvider<ContractTransaction> {
  private readonly signer: Signer;
  private readonly contracts: DeployedContracts;

  constructor(signer: Signer, contracts: DeployedContracts) {
    this.signer = signer;
    this.contracts = contracts;
  }

  async getBalance(tokenAddress: string, address: string): Promise<string> {
    const token = ERC20Mock__factory.connect(tokenAddress, this.signer);
    return (await token.balanceOf(address)).toString();
  }

  async deployEnterprise({
    name,
    tokenAddress,
    baseUri,
  }: EnterpriseData): Promise<ContractTransaction> {
    return EnterpriseFactory__factory.connect(
      this.contracts.enterpriseFactory,
      this.signer,
    ).deploy(name, tokenAddress, baseUri);
  }

  async getEnterpriseData(enterpriseAddress: string): Promise<EnterpriseData> {
    const enterprise = Enterprise__factory.connect(
      enterpriseAddress,
      this.signer,
    );
    const [name, tokenAddress, baseUri] = await Promise.all([
      enterprise.name(),
      enterprise.liquidityToken(),
      enterprise.baseUri(),
    ]);
    return { name, baseUri, tokenAddress };
  }

  async registerService(
    enterpriseAddress: string,
    serviceConfig: ServiceData,
  ): Promise<ContractTransaction> {
    const enterprise = Enterprise__factory.connect(
      enterpriseAddress,
      this.signer,
    );
    const {
      name,
      symbol,
      halfLife,
      factor,
      interestRateHalvingPeriod,
      allowedLoanDurations,
      allowedRefundCurvatures,
    } = serviceConfig;

    return enterprise.registerService(
      name,
      symbol,
      halfLife,
      factor,
      interestRateHalvingPeriod,
      allowedLoanDurations,
      allowedRefundCurvatures,
    );
  }
}
