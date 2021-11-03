import { ContractTransaction, Signer } from 'ethers';
import {
  AccountState,
  Address,
  BigNumber,
  BigNumberish,
  BlockchainService,
  ServiceInfo,
} from '@iqprotocol/abstract-blockchain';
import { PowerToken } from './contracts';
import { ContractResolver } from './contract-resolver';
import { pick } from './utils';

export class EIP155BlockchainService extends ContractResolver implements BlockchainService<ContractTransaction> {
  private readonly contract: PowerToken;

  constructor(address: Address, signer: Signer) {
    super(signer);
    this.contract = this.resolvePowerToken(address);
  }

  async setEnterpriseTokenAllowance(amount: BigNumberish): Promise<ContractTransaction> {
    const enterpriseAddress = await this.contract.getEnterprise();
    const enterpriseTokenAddress = await this.resolveEnterprise(enterpriseAddress).getEnterpriseToken();
    return this.resolveERC20Token(enterpriseTokenAddress).approve(this.contract.address, amount);
  }

  async swapIn(amount: BigNumberish): Promise<ContractTransaction> {
    return this.contract.swapIn(amount);
  }

  async swapOut(amount: BigNumberish): Promise<ContractTransaction> {
    return this.contract.swapOut(amount);
  }

  async setBaseRate(baseRate: BigNumberish, baseToken: string, minGCFee: BigNumberish): Promise<ContractTransaction> {
    return this.contract.setBaseRate(baseRate, baseToken, minGCFee);
  }

  async setRentalPeriodLimits(
    minRentalPeriod: BigNumberish,
    maxRentalPeriod: BigNumberish,
  ): Promise<ContractTransaction> {
    return this.contract.setRentalPeriodLimits(minRentalPeriod, maxRentalPeriod);
  }

  async setServiceFeePercent(feePercent: BigNumberish): Promise<ContractTransaction> {
    return this.contract.setServiceFeePercent(feePercent);
  }

  async getInfo(): Promise<ServiceInfo> {
    const info = pick(await this.contract.getInfo(), [
      'name',
      'symbol',
      'baseToken',
      'baseRate',
      'minGCFee',
      'serviceFeePercent',
      'energyGapHalvingPeriod',
      'index',
      'minRentalPeriod',
      'maxRentalPeriod',
      'swappingEnabled',
      'transferEnabled',
    ]);

    return { address: this.contract.address, ...info };
  }

  async getAccountState(accountAddress: Address): Promise<AccountState> {
    const targetAccountAddress = await this.withFallbackToSignerAddress(accountAddress);
    const balance = await this.contract.balanceOf(targetAccountAddress);
    const { energy, timestamp, lockedBalance } = await this.contract.getState(targetAccountAddress);
    return {
      serviceAddress: this.contract.address,
      accountAddress: targetAccountAddress,
      balance,
      lockedBalance,
      energy,
      timestamp,
    };
  }

  async isSwappingEnabled(): Promise<boolean> {
    return this.contract.isSwappingEnabled();
  }

  async isTransferEnabled(): Promise<boolean> {
    return this.contract.isTransferEnabled();
  }

  async getBaseRate(): Promise<BigNumber> {
    return this.contract.getBaseRate();
  }

  async getBaseTokenAddress(): Promise<Address> {
    return this.contract.getBaseToken();
  }

  async getEnergyGapHalvingPeriod(): Promise<number> {
    return this.contract.getEnergyGapHalvingPeriod();
  }

  async getMaxRentalPeriod(): Promise<number> {
    return this.contract.getMaxRentalPeriod();
  }

  async getMinGCFee(): Promise<BigNumber> {
    return this.contract.getMinGCFee();
  }

  async getMinRentalPeriod(): Promise<number> {
    return this.contract.getMinRentalPeriod();
  }

  async getServiceFeePercent(): Promise<number> {
    return this.contract.getServiceFeePercent();
  }

  async getIndex(): Promise<number> {
    return this.contract.getIndex();
  }

  async getEnterpriseTokenAllowance(accountAddress?: Address): Promise<BigNumber> {
    const enterpriseAddress = await this.contract.getEnterprise();
    const enterpriseTokenAddress = await this.resolveEnterprise(enterpriseAddress).getEnterpriseToken();
    const targetAccountAddress = await this.withFallbackToSignerAddress(accountAddress);
    return this.resolveERC20Token(enterpriseTokenAddress).allowance(targetAccountAddress, this.contract.address);
  }

  async getAvailableBalance(accountAddress?: Address): Promise<BigNumber> {
    const targetAccountAddress = await this.withFallbackToSignerAddress(accountAddress);
    return this.contract.availableBalanceOf(targetAccountAddress);
  }

  async getBalance(accountAddress?: Address): Promise<BigNumber> {
    const targetAccountAddress = await this.withFallbackToSignerAddress(accountAddress);
    return this.contract.balanceOf(targetAccountAddress);
  }

  async getEnergyAt(timestamp: number, accountAddress?: Address): Promise<BigNumber> {
    const targetAccountAddress = await this.withFallbackToSignerAddress(accountAddress);
    return this.contract.energyAt(targetAccountAddress, timestamp);
  }

  async estimateRentalFee(
    paymentTokenAddress: Address,
    rentalAmount: BigNumberish,
    rentalPeriod: BigNumberish,
  ): Promise<{ poolFee: BigNumber; serviceFee: BigNumber; gcFee: BigNumber }> {
    return pick(await this.contract.estimateRentalFee(paymentTokenAddress, rentalAmount, rentalPeriod), [
      'poolFee',
      'serviceFee',
      'gcFee',
    ]);
  }
}
