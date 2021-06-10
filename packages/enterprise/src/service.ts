import { AccountID, Address, BlockchainProvider, ServiceInfo } from '@iqprotocol/abstract-blockchain';

export interface ServiceConfig {
  blockchain: BlockchainProvider;
  address: string;
}

export class Service {
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
    const chainId = await this.blockchain.getChainId();
    return new AccountID({ chainId, address: this.address });
  }

  getAddress(): Address {
    return this.address;
  }

  async getInfo(): Promise<ServiceInfo> {
    return this.blockchain.getServiceInfo(this.address);
  }

  // todo: this reads on-chain state
  // getAccountState(user address)

  // connectDVP(DVPConnector): DVPFactory
  // accept<T>(visitor: (s: Service, blockchain) => T): T {
  //   return visitor(this, blockchain);
  // }
}
