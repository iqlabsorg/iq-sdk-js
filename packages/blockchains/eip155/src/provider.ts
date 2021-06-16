import { BigNumber, BigNumberish, ContractTransaction, Signer } from 'ethers';
import {
  Enterprise,
  Enterprise__factory,
  EnterpriseFactory,
  EnterpriseFactory__factory,
  ERC20,
  ERC20__factory,
  ERC721,
  ERC721__factory,
  PowerToken,
  PowerToken__factory,
} from '../types/contracts';
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
    return this.resolveEnterpriseFactory().deploy(
      params.name,
      params.liquidityTokenAddress,
      params.baseUri,
      params.gcFeePercent,
      params.converterAddress,
    );
  }

  async getEnterpriseServices(enterpriseAddress: Address): Promise<Address[]> {
    return this.resolveEnterprise(enterpriseAddress).getPowerTokens();
  }

  async getEnterpriseInfo(enterpriseAddress: Address): Promise<EnterpriseInfo> {
    const enterprise = this.resolveEnterprise(enterpriseAddress);
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

  async registerService(enterpriseAddress: Address, params: ServiceParams): Promise<ContractTransaction> {
    const enterprise = this.resolveEnterprise(enterpriseAddress);
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
    const powerToken = this.resolvePowerToken(serviceAddress);

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
      address: serviceAddress,
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

  async getAccountState(serviceAddress: Address, accountAddress: Address): Promise<AccountState> {
    const powerToken = this.resolvePowerToken(serviceAddress);
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

  async addLiquidity(enterpriseAddress: Address, amount: BigNumberish): Promise<ContractTransaction> {
    const enterprise = this.resolveEnterprise(enterpriseAddress);
    return enterprise.addLiquidity(amount);
  }

  async approveLiquidityToken(enterpriseAddress: Address, amount: BigNumberish): Promise<ContractTransaction> {
    const enterprise = this.resolveEnterprise(enterpriseAddress);
    const liquidityTokenAddress = await enterprise.getLiquidityToken();
    const liquidityToken = this.resolveERC20Token(liquidityTokenAddress);
    return liquidityToken.approve(enterprise.address, amount);
  }

  async getLiquidityTokenAllowance(enterpriseAddress: Address): Promise<BigNumber> {
    const enterprise = this.resolveEnterprise(enterpriseAddress);
    const liquidityTokenAddress = await enterprise.getLiquidityToken();
    const liquidityToken = this.resolveERC20Token(liquidityTokenAddress);
    const signerAddress = await this.signer.getAddress();
    return liquidityToken.allowance(signerAddress, enterprise.address);
  }

  async getLiquidityTokenAddress(enterpriseAddress: Address): Promise<Address> {
    return this.resolveEnterprise(enterpriseAddress).getLiquidityToken();
  }

  async getLiquidityTokenMetadata(enterpriseAddress: Address): Promise<ERC20Metadata> {
    const tokenAddress = await this.resolveEnterprise(enterpriseAddress).getLiquidityToken();
    return this.getERC20Metadata(tokenAddress);
  }

  async getERC20Metadata(address: Address): Promise<ERC20Metadata> {
    const token = this.resolveERC20Token(address);
    const [name, symbol, decimals] = await Promise.all([token.name(), token.symbol(), token.decimals()]);

    return { address, name, symbol, decimals };
  }

  async getERC721Metadata(address: Address, tokenId: BigNumberish): Promise<ERC721Metadata> {
    const token = this.resolveERC721Token(address);
    const [name, symbol, tokenUri] = await Promise.all([token.name(), token.symbol(), token.tokenURI(tokenId)]);

    return { address, name, symbol, tokenUri };
  }

  protected resolveEnterpriseFactory(): EnterpriseFactory {
    return EnterpriseFactory__factory.connect(this.contracts.enterpriseFactory, this.signer);
  }

  protected resolveEnterprise(enterpriseAddress: string): Enterprise {
    return Enterprise__factory.connect(enterpriseAddress, this.signer);
  }

  protected resolvePowerToken(serviceAddress: string): PowerToken {
    return PowerToken__factory.connect(serviceAddress, this.signer);
  }

  protected resolveERC20Token(tokenAddress: string): ERC20 {
    return ERC20__factory.connect(tokenAddress, this.signer);
  }

  protected resolveERC721Token(tokenAddress: string): ERC721 {
    return ERC721__factory.connect(tokenAddress, this.signer);
  }
}
