import { AccountID, AccountState, Address, BlockchainProvider, ServiceInfo } from '@iqprotocol/abstract-blockchain';

export interface ServiceConfig<Transaction> {
  blockchain: BlockchainProvider<Transaction>;
  address: string;
}

export class Service<Transaction = unknown> {
  private readonly blockchain: BlockchainProvider<Transaction>;
  private readonly address: string;

  constructor({ blockchain, address }: ServiceConfig<Transaction>) {
    this.blockchain = blockchain;
    this.address = address;
  }

  attach(address: Address): Service<Transaction> {
    return new Service({ blockchain: this.blockchain, address });
  }

  connect<Transaction>(blockchain: BlockchainProvider<Transaction>, address: Address): Service<Transaction> {
    return new Service({ blockchain, address });
  }

  async getId(): Promise<AccountID> {
    const chainId = await this.blockchain.getChainId();
    return new AccountID({ chainId, address: this.address });
  }

  getAddress(): Address {
    return this.address;
  }

  async getInfo(): Promise<ServiceInfo> {
    return this.blockchain.getServiceInfo(this.address);
  }

  async getAccountState(accountId: AccountID): Promise<AccountState> {
    return this.blockchain.getAccountState(this.address, accountId.address);
  }
}
