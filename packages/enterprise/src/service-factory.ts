import { ServiceImpl } from './service';
import { BlockchainProvider } from '@iqprotocol/abstract-blockchain';
import { AccountId } from 'caip';
import { Service } from './types';

export class ServiceFactory<Transaction = unknown> {
  constructor(private readonly blockchain: BlockchainProvider<Transaction>) {}

  async create(accountId: AccountId): Promise<Service<Transaction>> {
    const chainId = await this.blockchain.getChainId();
    if (chainId.toString() !== accountId.chainId.toString()) {
      throw new Error(`Chain ID mismatch!`);
    }

    return new ServiceImpl<Transaction>(accountId, chainId, this.blockchain);
  }
}
