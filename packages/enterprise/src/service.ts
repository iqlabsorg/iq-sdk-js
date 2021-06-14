import { AccountID, AccountState, Address, BlockchainProvider, ServiceInfo } from '@iqprotocol/abstract-blockchain';

export interface ServiceConfig {
  blockchain: BlockchainProvider;
  address: string;
}

export class Service {
  private id?: AccountID;
  private readonly blockchain: BlockchainProvider;
  private readonly address: string;

  constructor({ blockchain, address }: ServiceConfig) {
    this.blockchain = blockchain;
    this.address = address;
  }

  attach(address: Address): Service {
    return new Service({ blockchain: this.blockchain, address });
  }

  connect(blockchain: BlockchainProvider): Service {
    return new Service({ blockchain, address: this.address });
  }

  async getId(): Promise<AccountID> {
    if (!this.id) {
      const chainId = await this.blockchain.getChainId();
      this.id = new AccountID({ chainId, address: this.address });
    }

    return this.id;
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
