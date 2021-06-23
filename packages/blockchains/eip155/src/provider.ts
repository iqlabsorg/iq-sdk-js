import { BigNumber, BigNumberish, ContractTransaction, Signer } from 'ethers';
import {
  BorrowToken,
  BorrowToken__factory,
  Enterprise,
  Enterprise__factory,
  EnterpriseFactory,
  EnterpriseFactory__factory,
  ERC20,
  ERC20__factory,
  ERC721,
  ERC721__factory,
  InterestToken,
  InterestToken__factory,
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
  ERC20Metadata,
  ERC721Metadata,
  LiquidityInfo,
  LoanInfo,
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

export class EIP155BlockchainProvider implements BlockchainProvider<ContractTransaction, Signer> {
  private readonly signer: Signer;
  private readonly contracts: DeployedContracts;

  constructor({ signer, contracts }: EIP155BlockchainProviderConfig) {
    this.signer = signer;
    this.contracts = contracts;
  }

  async connect(signer: Signer): Promise<EIP155BlockchainProvider> {
    // this provider does not require asynchronous calls to connect to signer but we keep 'async' for compatibility.
    return Promise.resolve(new EIP155BlockchainProvider({ signer, contracts: this.contracts }));
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

  async getServices(enterpriseAddress: Address): Promise<Address[]> {
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

  async getAvailableReserve(enterpriseAddress: Address): Promise<BigNumber> {
    return this.resolveEnterprise(enterpriseAddress).getAvailableReserve();
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

  async estimateLoan(
    enterpriseAddress: Address,
    serviceAddress: Address,
    paymentTokenAddress: Address,
    amount: BigNumberish,
    duration: BigNumberish,
  ): Promise<BigNumber> {
    return this.resolveEnterprise(enterpriseAddress).estimateLoan(
      serviceAddress,
      paymentTokenAddress,
      amount,
      duration,
    );
  }

  async addLiquidity(enterpriseAddress: Address, amount: BigNumberish): Promise<ContractTransaction> {
    const enterprise = this.resolveEnterprise(enterpriseAddress);
    return enterprise.addLiquidity(amount);
  }

  async decreaseLiquidity(
    enterpriseAddress: Address,
    interestTokenId: BigNumberish,
    amount: BigNumberish,
  ): Promise<ContractTransaction> {
    return this.resolveEnterprise(enterpriseAddress).decreaseLiquidity(interestTokenId, amount);
  }

  async increaseLiquidity(
    enterpriseAddress: Address,
    interestTokenId: BigNumberish,
    amount: BigNumberish,
  ): Promise<ContractTransaction> {
    return this.resolveEnterprise(enterpriseAddress).increaseLiquidity(interestTokenId, amount);
  }

  async removeLiquidity(enterpriseAddress: Address, interestTokenId: BigNumberish): Promise<ContractTransaction> {
    return this.resolveEnterprise(enterpriseAddress).removeLiquidity(interestTokenId);
  }

  async getAccruedInterest(enterpriseAddress: Address, interestTokenId: BigNumberish): Promise<BigNumber> {
    return this.resolveEnterprise(enterpriseAddress).getAccruedInterest(interestTokenId);
  }

  async withdrawInterest(enterpriseAddress: Address, interestTokenId: BigNumberish): Promise<ContractTransaction> {
    return this.resolveEnterprise(enterpriseAddress).withdrawInterest(interestTokenId);
  }

  async borrow(
    enterpriseAddress: Address,
    serviceAddress: Address,
    paymentTokenAddress: Address,
    amount: BigNumberish,
    duration: BigNumberish,
    maxPayment: BigNumberish,
  ): Promise<ContractTransaction> {
    return this.resolveEnterprise(enterpriseAddress).borrow(
      serviceAddress,
      paymentTokenAddress,
      amount,
      duration,
      maxPayment,
    );
  }

  async returnLoan(enterpriseAddress: Address, borrowTokenId: BigNumberish): Promise<ContractTransaction> {
    return this.resolveEnterprise(enterpriseAddress).returnLoan(borrowTokenId);
  }

  async setLiquidityAllowance(enterpriseAddress: Address, amount: BigNumberish): Promise<ContractTransaction> {
    const enterprise = this.resolveEnterprise(enterpriseAddress);
    const liquidityTokenAddress = await enterprise.getLiquidityToken();
    const liquidityToken = this.resolveERC20Token(liquidityTokenAddress);
    return liquidityToken.approve(enterprise.address, amount);
  }

  async getLiquidityAllowance(enterpriseAddress: Address, accountAddress?: Address): Promise<BigNumber> {
    const enterprise = this.resolveEnterprise(enterpriseAddress);
    const liquidityTokenAddress = await enterprise.getLiquidityToken();
    const liquidityToken = this.resolveERC20Token(liquidityTokenAddress);
    const targetAccountAddress = accountAddress ? accountAddress : await this.signer.getAddress();
    return liquidityToken.allowance(targetAccountAddress, enterprise.address);
  }

  async getLiquidityTokenAddress(enterpriseAddress: Address): Promise<Address> {
    return this.resolveEnterprise(enterpriseAddress).getLiquidityToken();
  }

  async getLiquidityTokenMetadata(enterpriseAddress: Address): Promise<ERC20Metadata> {
    const tokenAddress = await this.getLiquidityTokenAddress(enterpriseAddress);
    return this.getERC20Metadata(tokenAddress);
  }

  async getBorrowTokenAddress(enterpriseAddress: Address): Promise<Address> {
    return this.resolveEnterprise(enterpriseAddress).getBorrowToken();
  }

  async getBorrowTokenMetadata(enterpriseAddress: Address, tokenId: BigNumberish): Promise<ERC721Metadata> {
    const tokenAddress = await this.getBorrowTokenAddress(enterpriseAddress);
    return this.getERC721Metadata(tokenAddress, tokenId);
  }

  async getInterestTokenAddress(enterpriseAddress: Address): Promise<Address> {
    return this.resolveEnterprise(enterpriseAddress).getInterestToken();
  }

  async getInterestTokenMetadata(enterpriseAddress: Address, tokenId: BigNumberish): Promise<ERC721Metadata> {
    const tokenAddress = await this.getInterestTokenAddress(enterpriseAddress);
    return this.getERC721Metadata(tokenAddress, tokenId);
  }

  async getInterestTokenIds(enterpriseAddress: Address, accountAddress?: Address): Promise<BigNumber[]> {
    const targetAccountAddress = accountAddress ? accountAddress : await this.signer.getAddress();
    const tokenAddress = await this.getInterestTokenAddress(enterpriseAddress);
    const interestToken = this.resolveInterestToken(tokenAddress);
    const tokenCount = await interestToken.balanceOf(targetAccountAddress);

    const tokenIds: BigNumber[] = [];
    for (let i = 0; i < tokenCount.toNumber(); i++) {
      tokenIds.push(await interestToken.tokenOfOwnerByIndex(targetAccountAddress, i));
    }

    return tokenIds;
  }

  async getLiquidityInfo(enterpriseAddress: Address, interestTokenId: BigNumberish): Promise<LiquidityInfo> {
    const { amount, shares, block } = await this.resolveEnterprise(enterpriseAddress).getLiquidityInfo(interestTokenId);
    return { tokenId: BigNumber.from(interestTokenId), amount, shares, block };
  }

  async getBorrowTokenIds(enterpriseAddress: Address, accountAddress?: Address): Promise<BigNumber[]> {
    const targetAccountAddress = accountAddress ? accountAddress : await this.signer.getAddress();
    const tokenAddress = await this.getBorrowTokenAddress(enterpriseAddress);
    const borrowToken = this.resolveBorrowToken(tokenAddress);
    const tokenCount = await borrowToken.balanceOf(targetAccountAddress);

    const tokenIds: BigNumber[] = [];
    for (let i = 0; i < tokenCount.toNumber(); i++) {
      tokenIds.push(await borrowToken.tokenOfOwnerByIndex(targetAccountAddress, i));
    }

    return tokenIds;
  }

  async getLoanInfo(enterpriseAddress: Address, borrowTokenId: BigNumberish): Promise<LoanInfo> {
    const {
      amount,
      powerTokenIndex,
      borrowingTime,
      maturityTime,
      borrowerReturnGraceTime,
      enterpriseCollectGraceTime,
      gcFee,
      gcFeeTokenIndex,
    } = await this.resolveEnterprise(enterpriseAddress).getLoanInfo(borrowTokenId);

    return {
      tokenId: BigNumber.from(borrowTokenId),
      amount,
      powerTokenIndex,
      borrowingTime,
      maturityTime,
      borrowerReturnGraceTime,
      enterpriseCollectGraceTime,
      gcFee,
      gcFeeTokenIndex,
    };
  }

  async getERC20Metadata(tokenAddress: Address): Promise<ERC20Metadata> {
    const token = this.resolveERC20Token(tokenAddress);
    const [name, symbol, decimals] = await Promise.all([token.name(), token.symbol(), token.decimals()]);

    return { address: tokenAddress, name, symbol, decimals };
  }

  async getERC721Metadata(tokenAddress: Address, tokenId: BigNumberish): Promise<ERC721Metadata> {
    const token = this.resolveERC721Token(tokenAddress);
    const [name, symbol, tokenUri] = await Promise.all([token.name(), token.symbol(), token.tokenURI(tokenId)]);

    return { address: tokenAddress, name, symbol, tokenUri };
  }

  async getTokenBalance(tokenAddress: Address, accountAddress?: Address): Promise<BigNumber> {
    return this.resolveERC20Token(tokenAddress).balanceOf(
      accountAddress ? accountAddress : await this.signer.getAddress(),
    );
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

  protected resolveInterestToken(tokenAddress: string): InterestToken {
    return InterestToken__factory.connect(tokenAddress, this.signer);
  }

  protected resolveBorrowToken(tokenAddress: string): BorrowToken {
    return BorrowToken__factory.connect(tokenAddress, this.signer);
  }

  protected resolveERC20Token(tokenAddress: string): ERC20 {
    return ERC20__factory.connect(tokenAddress, this.signer);
  }

  protected resolveERC721Token(tokenAddress: string): ERC721 {
    return ERC721__factory.connect(tokenAddress, this.signer);
  }
}
