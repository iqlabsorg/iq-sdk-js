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
} from './contracts';

import { pick } from './utils';
import {
  AccountState,
  Address,
  BlockchainProvider,
  ChainId,
  EnterpriseInfo,
  EnterpriseParams,
  ERC20Metadata,
  ERC721Metadata,
  LiquidityInfo,
  LoanInfo,
  ServiceInfo,
  ServiceParams,
} from '@iqprotocol/abstract-blockchain';

export type EIP155BlockchainProviderConfig = {
  signer: Signer;
};

export class EIP155BlockchainProvider implements BlockchainProvider<ContractTransaction> {
  private readonly signer: Signer;

  constructor({ signer }: EIP155BlockchainProviderConfig) {
    this.signer = signer;
  }

  // https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-2.md
  async getChainId(): Promise<ChainId> {
    const reference = await this.signer.getChainId();
    return new ChainId({ namespace: 'eip155', reference: reference.toString() });
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
    const targetAccountAddress = await this.withFallbackToSignerAddress(accountAddress);
    return this.resolveERC20Token(tokenAddress).balanceOf(targetAccountAddress);
  }

  async deployEnterprise(enterpriseFactoryAddress: string, params: EnterpriseParams): Promise<ContractTransaction> {
    return this.resolveEnterpriseFactory(enterpriseFactoryAddress).deploy(
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
    const info = pick(await enterprise.getInfo(), [
      'name',
      'baseUri',
      'totalShares',
      'interestGapHalvingPeriod',
      'borrowerLoanReturnGracePeriod',
      'enterpriseLoanCollectGracePeriod',
      'gcFeePercent',
      'fixedReserve',
      'usedReserve',
      'streamingReserve',
      'streamingReserveTarget',
      'streamingReserveUpdated',
    ]);

    return { address: enterpriseAddress, ...info };
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

  async addLiquidity(enterpriseAddress: Address, amount: BigNumberish): Promise<ContractTransaction> {
    const enterprise = this.resolveEnterprise(enterpriseAddress);
    return enterprise.addLiquidity(amount);
  }

  async removeLiquidity(enterpriseAddress: Address, interestTokenId: BigNumberish): Promise<ContractTransaction> {
    return this.resolveEnterprise(enterpriseAddress).removeLiquidity(interestTokenId);
  }

  async increaseLiquidity(
    enterpriseAddress: Address,
    interestTokenId: BigNumberish,
    amount: BigNumberish,
  ): Promise<ContractTransaction> {
    return this.resolveEnterprise(enterpriseAddress).increaseLiquidity(interestTokenId, amount);
  }

  async decreaseLiquidity(
    enterpriseAddress: Address,
    interestTokenId: BigNumberish,
    amount: BigNumberish,
  ): Promise<ContractTransaction> {
    return this.resolveEnterprise(enterpriseAddress).decreaseLiquidity(interestTokenId, amount);
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

  async approveLiquidityTokensToEnterprise(
    enterpriseAddress: Address,
    amount: BigNumberish,
  ): Promise<ContractTransaction> {
    const enterprise = this.resolveEnterprise(enterpriseAddress);
    const liquidityTokenAddress = await enterprise.getLiquidityToken();
    return this.resolveERC20Token(liquidityTokenAddress).approve(enterprise.address, amount);
  }

  async setBaseUri(enterpriseAddress: Address, baseUri: string): Promise<ContractTransaction> {
    return this.resolveEnterprise(enterpriseAddress).setBaseUri(baseUri);
  }

  async setBondingCurve(
    enterpriseAddress: Address,
    pole: BigNumberish,
    slope: BigNumberish,
  ): Promise<ContractTransaction> {
    return this.resolveEnterprise(enterpriseAddress).setBondingCurve(pole, slope);
  }

  async setBorrowerLoanReturnGracePeriod(enterpriseAddress: Address, period: number): Promise<ContractTransaction> {
    return this.resolveEnterprise(enterpriseAddress).setBorrowerLoanReturnGracePeriod(period);
  }

  async setConverterAddress(enterpriseAddress: Address, converterAddress: Address): Promise<ContractTransaction> {
    return this.resolveEnterprise(enterpriseAddress).setConverter(converterAddress);
  }

  async setEnterpriseCollectorAddress(
    enterpriseAddress: Address,
    collectorAddress: Address,
  ): Promise<ContractTransaction> {
    return this.resolveEnterprise(enterpriseAddress).setEnterpriseCollector(collectorAddress);
  }

  async setEnterpriseLoanCollectGracePeriod(enterpriseAddress: Address, period: number): Promise<ContractTransaction> {
    return this.resolveEnterprise(enterpriseAddress).setEnterpriseLoanCollectGracePeriod(period);
  }

  async setEnterpriseVaultAddress(enterpriseAddress: Address, vaultAddress: Address): Promise<ContractTransaction> {
    return this.resolveEnterprise(enterpriseAddress).setEnterpriseVault(vaultAddress);
  }

  async setGcFeePercent(enterpriseAddress: Address, gcFeePercent: number): Promise<ContractTransaction> {
    return this.resolveEnterprise(enterpriseAddress).setGcFeePercent(gcFeePercent);
  }

  async setInterestGapHalvingPeriod(
    enterpriseAddress: Address,
    interestGapHalvingPeriod: number,
  ): Promise<ContractTransaction> {
    return this.resolveEnterprise(enterpriseAddress).setInterestGapHalvingPeriod(interestGapHalvingPeriod);
  }

  async getReserve(enterpriseAddress: Address): Promise<BigNumber> {
    return this.resolveEnterprise(enterpriseAddress).getReserve();
  }

  async getUsedReserve(enterpriseAddress: Address): Promise<BigNumber> {
    return this.resolveEnterprise(enterpriseAddress).getUsedReserve();
  }

  async getAvailableReserve(enterpriseAddress: Address): Promise<BigNumber> {
    return this.resolveEnterprise(enterpriseAddress).getAvailableReserve();
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

  async getAccruedInterest(enterpriseAddress: Address, interestTokenId: BigNumberish): Promise<BigNumber> {
    return this.resolveEnterprise(enterpriseAddress).getAccruedInterest(interestTokenId);
  }

  async getLiquidityTokenEnterpriseAllowance(enterpriseAddress: Address, accountAddress?: Address): Promise<BigNumber> {
    const enterprise = this.resolveEnterprise(enterpriseAddress);
    const liquidityTokenAddress = await enterprise.getLiquidityToken();
    const targetAccountAddress = await this.withFallbackToSignerAddress(accountAddress);
    return this.resolveERC20Token(liquidityTokenAddress).allowance(targetAccountAddress, enterprise.address);
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
    const targetAccountAddress = await this.withFallbackToSignerAddress(accountAddress);
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
    const info = pick(await this.resolveEnterprise(enterpriseAddress).getLiquidityInfo(interestTokenId), [
      'amount',
      'shares',
      'block',
    ]);

    return { tokenId: BigNumber.from(interestTokenId), ...info };
  }

  async getBorrowTokenIds(enterpriseAddress: Address, accountAddress?: Address): Promise<BigNumber[]> {
    const targetAccountAddress = await this.withFallbackToSignerAddress(accountAddress);
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
    const info = pick(await this.resolveEnterprise(enterpriseAddress).getLoanInfo(borrowTokenId), [
      'amount',
      'powerTokenIndex',
      'borrowingTime',
      'maturityTime',
      'borrowerReturnGraceTime',
      'enterpriseCollectGraceTime',
      'gcFee',
      'gcFeeTokenIndex',
    ]);

    return { tokenId: BigNumber.from(borrowTokenId), ...info };
  }

  async isRegisteredService(enterpriseAddress: Address, serviceAddress: Address): Promise<boolean> {
    return this.resolveEnterprise(enterpriseAddress).isRegisteredPowerToken(serviceAddress);
  }

  async getBaseUri(enterpriseAddress: Address): Promise<string> {
    return this.resolveEnterprise(enterpriseAddress).getBaseUri();
  }

  async getBondingCurve(enterpriseAddress: Address): Promise<{ pole: BigNumber; slope: BigNumber }> {
    return pick(await this.resolveEnterprise(enterpriseAddress).getBondingCurve(), ['pole', 'slope']);
  }

  async getBorrowerLoanReturnGracePeriod(enterpriseAddress: Address): Promise<number> {
    return this.resolveEnterprise(enterpriseAddress).getBorrowerLoanReturnGracePeriod();
  }

  async getConverterAddress(enterpriseAddress: Address): Promise<Address> {
    return this.resolveEnterprise(enterpriseAddress).getConverter();
  }

  async getEnterpriseCollectorAddress(enterpriseAddress: Address): Promise<Address> {
    return this.resolveEnterprise(enterpriseAddress).getEnterpriseCollector();
  }

  async getEnterpriseLoanCollectGracePeriod(enterpriseAddress: Address): Promise<number> {
    return this.resolveEnterprise(enterpriseAddress).getEnterpriseLoanCollectGracePeriod();
  }

  async getEnterpriseVaultAddress(enterpriseAddress: Address): Promise<Address> {
    return this.resolveEnterprise(enterpriseAddress).getEnterpriseVault();
  }

  async getGCFeePercent(enterpriseAddress: Address): Promise<number> {
    return this.resolveEnterprise(enterpriseAddress).getGCFeePercent();
  }

  async getInterestGapHalvingPeriod(enterpriseAddress: Address): Promise<number> {
    return this.resolveEnterprise(enterpriseAddress).getInterestGapHalvingPeriod();
  }

  async getProxyAdminAddress(enterpriseAddress: Address): Promise<Address> {
    return this.resolveEnterprise(enterpriseAddress).getProxyAdmin();
  }

  async approveLiquidityTokensToService(serviceAddress: Address, amount: BigNumberish): Promise<ContractTransaction> {
    const enterpriseAddress = await this.resolvePowerToken(serviceAddress).getEnterprise();
    const liquidityTokenAddress = await this.resolveEnterprise(enterpriseAddress).getLiquidityToken();
    return this.resolveERC20Token(liquidityTokenAddress).approve(serviceAddress, amount);
  }

  async wrap(serviceAddress: Address, amount: BigNumberish): Promise<ContractTransaction> {
    return this.resolvePowerToken(serviceAddress).wrap(amount);
  }

  async wrapTo(serviceAddress: Address, accountAddress: Address, amount: BigNumberish): Promise<ContractTransaction> {
    return this.resolvePowerToken(serviceAddress).wrapTo(accountAddress, amount);
  }

  async unwrap(serviceAddress: Address, amount: BigNumberish): Promise<ContractTransaction> {
    return this.resolvePowerToken(serviceAddress).unwrap(amount);
  }

  async setBaseRate(
    serviceAddress: Address,
    baseRate: BigNumberish,
    baseToken: Address,
    minGCFee: BigNumberish,
  ): Promise<ContractTransaction> {
    return this.resolvePowerToken(serviceAddress).setBaseRate(baseRate, baseToken, minGCFee);
  }

  async setLoanDurationLimits(
    serviceAddress: Address,
    minLoanDuration: BigNumberish,
    maxLoanDuration: BigNumberish,
  ): Promise<ContractTransaction> {
    return this.resolvePowerToken(serviceAddress).setLoanDurationLimits(minLoanDuration, maxLoanDuration);
  }

  async setServiceFeePercent(serviceAddress: Address, feePercent: BigNumberish): Promise<ContractTransaction> {
    return this.resolvePowerToken(serviceAddress).setServiceFeePercent(feePercent);
  }

  async getServiceInfo(serviceAddress: Address): Promise<ServiceInfo> {
    const powerToken = this.resolvePowerToken(serviceAddress);
    const info = pick(await powerToken.getInfo(), [
      'name',
      'symbol',
      'baseRate',
      'minGCFee',
      'gapHalvingPeriod',
      'index',
      'baseToken',
      'minLoanDuration',
      'maxLoanDuration',
      'serviceFeePercent',
      'allowsPerpetual',
    ]);

    return { address: serviceAddress, ...info };
  }

  async getAccountState(serviceAddress: Address, accountAddress?: Address): Promise<AccountState> {
    const targetAccountAddress = await this.withFallbackToSignerAddress(accountAddress);
    const powerToken = this.resolvePowerToken(serviceAddress);
    const balance = await powerToken.balanceOf(targetAccountAddress);
    const { energy, timestamp } = await powerToken.getState(targetAccountAddress);
    return {
      serviceAddress,
      accountAddress: targetAccountAddress,
      balance,
      energy,
      timestamp,
    };
  }

  async getAllowsPerpetual(serviceAddress: Address): Promise<boolean> {
    return this.resolvePowerToken(serviceAddress).getAllowsPerpetual();
  }

  async getBaseRate(serviceAddress: Address): Promise<BigNumber> {
    return this.resolvePowerToken(serviceAddress).getBaseRate();
  }

  async getBaseTokenAddress(serviceAddress: Address): Promise<Address> {
    return this.resolvePowerToken(serviceAddress).getBaseToken();
  }

  async getGapHalvingPeriod(serviceAddress: Address): Promise<number> {
    return this.resolvePowerToken(serviceAddress).getGapHalvingPeriod();
  }

  async getMaxLoanDuration(serviceAddress: Address): Promise<number> {
    return this.resolvePowerToken(serviceAddress).getMaxLoanDuration();
  }

  async getMinGCFee(serviceAddress: Address): Promise<BigNumber> {
    return this.resolvePowerToken(serviceAddress).getMinGCFee();
  }

  async getMinLoanDuration(serviceAddress: Address): Promise<number> {
    return this.resolvePowerToken(serviceAddress).getMinLoanDuration();
  }

  async getServiceFeePercent(serviceAddress: Address): Promise<number> {
    return this.resolvePowerToken(serviceAddress).getServiceFeePercent();
  }

  async getServiceIndex(serviceAddress: Address): Promise<number> {
    return this.resolvePowerToken(serviceAddress).getIndex();
  }

  async getLiquidityTokenServiceAllowance(serviceAddress: Address, accountAddress?: Address): Promise<BigNumber> {
    const enterpriseAddress = await this.resolvePowerToken(serviceAddress).getEnterprise();
    const liquidityTokenAddress = await this.resolveEnterprise(enterpriseAddress).getLiquidityToken();
    const targetAccountAddress = await this.withFallbackToSignerAddress(accountAddress);
    return this.resolveERC20Token(liquidityTokenAddress).allowance(targetAccountAddress, serviceAddress);
  }

  async getPowerTokenAvailableBalance(serviceAddress: Address, accountAddress?: Address): Promise<BigNumber> {
    const targetAccountAddress = await this.withFallbackToSignerAddress(accountAddress);
    return this.resolvePowerToken(serviceAddress).availableBalanceOf(targetAccountAddress);
  }

  async getPowerTokenBalance(serviceAddress: Address, accountAddress?: Address): Promise<BigNumber> {
    const targetAccountAddress = await this.withFallbackToSignerAddress(accountAddress);
    return this.resolvePowerToken(serviceAddress).balanceOf(targetAccountAddress);
  }

  async getEnergyAt(serviceAddress: Address, timestamp: number, accountAddress?: Address): Promise<BigNumber> {
    const targetAccountAddress = await this.withFallbackToSignerAddress(accountAddress);
    return this.resolvePowerToken(serviceAddress).energyAt(targetAccountAddress, timestamp);
  }

  async estimateLoanDetailed(
    serviceAddress: Address,
    paymentTokenAddress: Address,
    amount: BigNumberish,
    duration: BigNumberish,
  ): Promise<{
    interest: BigNumber;
    serviceFee: BigNumber;
    gcFee: BigNumber;
  }> {
    return pick(
      await this.resolvePowerToken(serviceAddress).estimateLoanDetailed(paymentTokenAddress, amount, duration),
      ['interest', 'serviceFee', 'gcFee'],
    );
  }

  protected resolveEnterpriseFactory(enterpriseFactoryAddress: string): EnterpriseFactory {
    return EnterpriseFactory__factory.connect(enterpriseFactoryAddress, this.signer);
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

  protected async withFallbackToSignerAddress(accountAddress?: Address): Promise<Address> {
    return accountAddress ? accountAddress : this.signer.getAddress();
  }
}
