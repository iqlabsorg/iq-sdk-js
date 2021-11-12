import { AccountId, ChainId } from 'caip';
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { BlockchainProvider } from '@iqprotocol/abstract-blockchain';
import { AccountState, Service, ServiceConfigWriter, ServiceInfo } from './types';
import { pick } from './utils';
import { AddressTranslator } from './address-translator';
import { AbstractServiceConfig } from './abstract-service-config';
import { ServiceConfigurator } from './service-configurator';

export class ServiceImpl<Transaction = unknown>
  extends AbstractServiceConfig<Transaction>
  implements Service<Transaction>
{
  constructor(
    private readonly accountId: AccountId,
    private readonly chainId: ChainId,
    readonly blockchain: BlockchainProvider<Transaction>,
  ) {
    super(blockchain.service(accountId.address), new AddressTranslator(chainId));
    if (chainId.toString() !== accountId.chainId.toString()) {
      throw new Error(`Chain ID mismatch!`);
    }
  }

  getConfigurator(): ServiceConfigWriter<Transaction> {
    return new ServiceConfigurator<Transaction>(this.blockchainService, this.addressTranslator);
  }

  getAccountId(): AccountId {
    return this.accountId;
  }

  getChainId(): ChainId {
    return this.chainId;
  }

  async getInfo(): Promise<ServiceInfo> {
    const info = await this.blockchainService.getInfo();
    return {
      accountId: this.addressToAccountId(info.address),
      baseTokenAccountId: this.addressToAccountId(info.baseToken),
      ...pick(info, [
        'name',
        'symbol',
        'baseRate',
        'minGCFee',
        'serviceFeePercent',
        'energyGapHalvingPeriod',
        'minRentalPeriod',
        'maxRentalPeriod',
        'swappingEnabled',
        'transferEnabled',
      ]),
    };
  }

  async getAccountState(accountId: AccountId): Promise<AccountState> {
    const state = await this.blockchainService.getAccountState(this.accountIdToAddress(accountId));
    return {
      serviceAccountId: this.accountId,
      accountId: this.addressToAccountId(state.accountAddress),
      ...pick(state, ['balance', 'lockedBalance', 'energy', 'timestamp']),
    };
  }

  async getEnterpriseTokenAllowance(accountId?: AccountId): Promise<BigNumber> {
    return this.blockchainService.getEnterpriseTokenAllowance(this.optionalAccountIdToAddress(accountId));
  }

  async setEnterpriseTokenAllowance(amount: BigNumberish): Promise<Transaction> {
    return this.blockchainService.setEnterpriseTokenAllowance(amount);
  }

  async swapIn(amount: BigNumberish): Promise<Transaction> {
    return this.blockchainService.swapIn(amount);
  }

  async swapOut(amount: BigNumberish): Promise<Transaction> {
    return this.blockchainService.swapOut(amount);
  }

  async getAvailableBalance(accountId?: AccountId): Promise<BigNumber> {
    return this.blockchainService.getAvailableBalance(this.optionalAccountIdToAddress(accountId));
  }

  async getBalance(accountId?: AccountId): Promise<BigNumber> {
    return this.blockchainService.getBalance(this.optionalAccountIdToAddress(accountId));
  }

  async getEnergyAt(timestamp: number, accountId?: AccountId): Promise<BigNumber> {
    return this.blockchainService.getEnergyAt(timestamp, this.optionalAccountIdToAddress(accountId));
  }

  async estimateRentalFee(
    paymentTokenAccountId: AccountId,
    rentalAmount: BigNumberish,
    rentalPeriod: BigNumberish,
  ): Promise<{ poolFee: BigNumber; serviceFee: BigNumber; gcFee: BigNumber }> {
    return this.blockchainService.estimateRentalFee(
      this.accountIdToAddress(paymentTokenAccountId),
      rentalAmount,
      rentalPeriod,
    );
  }
}
