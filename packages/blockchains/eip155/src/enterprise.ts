import { ContractTransaction, Signer } from 'ethers';
import {
  Address,
  BigNumber,
  BigNumberish,
  BlockchainEnterprise,
  EnterpriseInfo,
  RentalAgreement,
  ServiceParams,
  Stake,
} from '@iqprotocol/abstract-blockchain';
import { Enterprise } from './contracts';
import { ContractResolver } from './contract-resolver';
import { pick } from './utils';

export class EIP155BlockchainEnterprise extends ContractResolver implements BlockchainEnterprise<ContractTransaction> {
  private readonly contract: Enterprise;

  constructor(address: Address, signer: Signer) {
    super(signer);
    this.contract = this.resolveEnterprise(address);
  }

  async getServiceAddresses(): Promise<Address[]> {
    return this.contract.getPowerTokens();
  }

  async getInfo(): Promise<EnterpriseInfo> {
    const info = pick(await this.contract.getInfo(), [
      'name',
      'baseUri',
      'totalShares',
      'streamingReserveHalvingPeriod',
      'renterOnlyReturnPeriod',
      'enterpriseOnlyCollectionPeriod',
      'gcFeePercent',
      'fixedReserve',
      'usedReserve',
      'streamingReserve',
      'streamingReserveTarget',
      'streamingReserveUpdated',
    ]);

    return { address: this.contract.address, ...info };
  }

  async registerService(serviceParams: ServiceParams): Promise<ContractTransaction> {
    return this.contract.registerService(
      serviceParams.serviceName,
      serviceParams.serviceSymbol,
      serviceParams.energyGapHalvingPeriod,
      serviceParams.baseRate,
      serviceParams.baseToken,
      serviceParams.serviceFeePercent,
      serviceParams.minRentalPeriod,
      serviceParams.maxRentalPeriod,
      serviceParams.minGCFee,
      serviceParams.swappingEnabledForever,
    );
  }

  async stake(stakeAmount: BigNumberish): Promise<ContractTransaction> {
    return this.contract.stake(stakeAmount);
  }

  async unstake(stakeTokenId: BigNumberish): Promise<ContractTransaction> {
    return this.contract.unstake(stakeTokenId);
  }

  async increaseStake(stakeTokenId: BigNumberish, stakeAmountDelta: BigNumberish): Promise<ContractTransaction> {
    return this.contract.increaseStake(stakeTokenId, stakeAmountDelta);
  }

  async decreaseStake(stakeTokenId: BigNumberish, stakeAmountDelta: BigNumberish): Promise<ContractTransaction> {
    return this.contract.decreaseStake(stakeTokenId, stakeAmountDelta);
  }

  async claimStakingReward(stakeTokenId: BigNumberish): Promise<ContractTransaction> {
    return this.contract.claimStakingReward(stakeTokenId);
  }

  async rent(
    serviceAddress: Address,
    paymentTokenAddress: Address,
    rentalAmount: BigNumberish,
    rentalPeriod: BigNumberish,
    maxPayment: BigNumberish,
  ): Promise<ContractTransaction> {
    return this.contract.rent(serviceAddress, paymentTokenAddress, rentalAmount, rentalPeriod, maxPayment);
  }

  async returnRental(rentalTokenId: BigNumberish): Promise<ContractTransaction> {
    return this.contract.returnRental(rentalTokenId);
  }

  async setEnterpriseTokenAllowance(amount: BigNumberish): Promise<ContractTransaction> {
    const enterpriseTokenAddress = await this.contract.getEnterpriseToken();
    return this.resolveERC20Token(enterpriseTokenAddress).approve(this.contract.address, amount);
  }

  async setBaseUri(baseUri: string): Promise<ContractTransaction> {
    return this.contract.setBaseUri(baseUri);
  }

  async setBondingCurve(pole: BigNumberish, slope: BigNumberish): Promise<ContractTransaction> {
    return this.contract.setBondingCurve(pole, slope);
  }

  async setRenterOnlyReturnPeriod(period: number): Promise<ContractTransaction> {
    return this.contract.setRenterOnlyReturnPeriod(period);
  }

  async setConverterAddress(converterAddress: Address): Promise<ContractTransaction> {
    return this.contract.setConverter(converterAddress);
  }

  async setEnterpriseCollectorAddress(collectorAddress: Address): Promise<ContractTransaction> {
    return this.contract.setEnterpriseCollector(collectorAddress);
  }

  async setEnterpriseOnlyCollectionPeriod(period: number): Promise<ContractTransaction> {
    return this.contract.setEnterpriseOnlyCollectionPeriod(period);
  }

  async setEnterpriseWalletAddress(walletAddress: Address): Promise<ContractTransaction> {
    return this.contract.setEnterpriseWallet(walletAddress);
  }

  async setGcFeePercent(gcFeePercent: number): Promise<ContractTransaction> {
    return this.contract.setGcFeePercent(gcFeePercent);
  }

  async setStreamingReserveHalvingPeriod(streamingReserveHalvingPeriod: number): Promise<ContractTransaction> {
    return this.contract.setStreamingReserveHalvingPeriod(streamingReserveHalvingPeriod);
  }

  async getReserve(): Promise<BigNumber> {
    return this.contract.getReserve();
  }

  async getUsedReserve(): Promise<BigNumber> {
    return this.contract.getUsedReserve();
  }

  async getAvailableReserve(): Promise<BigNumber> {
    return this.contract.getAvailableReserve();
  }

  async estimateRentalFee(
    serviceAddress: Address,
    paymentTokenAddress: Address,
    rentalAmount: BigNumberish,
    rentalPeriod: BigNumberish,
  ): Promise<BigNumber> {
    return this.contract.estimateRentalFee(serviceAddress, paymentTokenAddress, rentalAmount, rentalPeriod);
  }

  async getStakingReward(stakeTokenId: BigNumberish): Promise<BigNumber> {
    return this.contract.getStakingReward(stakeTokenId);
  }

  async getEnterpriseTokenAllowance(accountAddress?: Address): Promise<BigNumber> {
    const enterpriseTokenAddress = await this.contract.getEnterpriseToken();
    const targetAccountAddress = await this.withFallbackToSignerAddress(accountAddress);
    return this.resolveERC20Token(enterpriseTokenAddress).allowance(targetAccountAddress, this.contract.address);
  }

  async getEnterpriseTokenAddress(): Promise<Address> {
    return this.contract.getEnterpriseToken();
  }

  async getRentalTokenAddress(): Promise<Address> {
    return this.contract.getRentalToken();
  }

  async getStakeTokenAddress(): Promise<Address> {
    return this.contract.getStakeToken();
  }

  async getStakeTokenIds(accountAddress?: Address): Promise<BigNumber[]> {
    const targetAccountAddress = await this.withFallbackToSignerAddress(accountAddress);
    const tokenAddress = await this.getStakeTokenAddress();
    const stakeToken = this.resolveStakeToken(tokenAddress);
    const tokenCount = await stakeToken.balanceOf(targetAccountAddress);

    const tokenIds: BigNumber[] = [];
    for (let i = 0; i < tokenCount.toNumber(); i++) {
      tokenIds.push(await stakeToken.tokenOfOwnerByIndex(targetAccountAddress, i));
    }

    return tokenIds;
  }

  async getStake(stakeTokenId: BigNumberish): Promise<Stake> {
    const info = pick(await this.contract.getStake(stakeTokenId), ['amount', 'shares', 'block']);

    return { tokenId: BigNumber.from(stakeTokenId), ...info };
  }

  async getRentalTokenIds(accountAddress?: Address): Promise<BigNumber[]> {
    const targetAccountAddress = await this.withFallbackToSignerAddress(accountAddress);
    const tokenAddress = await this.getRentalTokenAddress();
    const rentalToken = this.resolveRentalToken(tokenAddress);
    const tokenCount = await rentalToken.balanceOf(targetAccountAddress);

    const tokenIds: BigNumber[] = [];
    for (let i = 0; i < tokenCount.toNumber(); i++) {
      tokenIds.push(await rentalToken.tokenOfOwnerByIndex(targetAccountAddress, i));
    }

    return tokenIds;
  }

  async getRentalAgreement(rentalTokenId: BigNumberish): Promise<RentalAgreement> {
    const info = pick(await this.contract.getRentalAgreement(rentalTokenId), [
      'rentalAmount',
      'powerTokenIndex',
      'startTime',
      'endTime',
      'renterOnlyReturnTime',
      'enterpriseOnlyCollectionTime',
      'gcRewardAmount',
      'gcRewardTokenIndex',
    ]);

    return { rentalTokenId: BigNumber.from(rentalTokenId), ...info };
  }

  async isRegisteredService(serviceAddress: Address): Promise<boolean> {
    return this.contract.isRegisteredPowerToken(serviceAddress);
  }

  async getBaseUri(): Promise<string> {
    return this.contract.getBaseUri();
  }

  async getBondingCurve(): Promise<{ pole: BigNumber; slope: BigNumber }> {
    return pick(await this.contract.getBondingCurve(), ['pole', 'slope']);
  }

  async getRenterOnlyReturnPeriod(): Promise<number> {
    return this.contract.getRenterOnlyReturnPeriod();
  }

  async getConverterAddress(): Promise<Address> {
    return this.contract.getConverter();
  }

  async getEnterpriseCollectorAddress(): Promise<Address> {
    return this.contract.getEnterpriseCollector();
  }

  async getEnterpriseOnlyCollectionPeriod(): Promise<number> {
    return this.contract.getEnterpriseOnlyCollectionPeriod();
  }

  async getEnterpriseWalletAddress(): Promise<Address> {
    return this.contract.getEnterpriseWallet();
  }

  async getGCFeePercent(): Promise<number> {
    return this.contract.getGCFeePercent();
  }

  async getStreamingReserveHalvingPeriod(): Promise<number> {
    return this.contract.getStreamingReserveHalvingPeriod();
  }

  async getProxyAdminAddress(): Promise<Address> {
    return this.contract.getProxyAdmin();
  }
}
