import { BlockchainProvider, ServiceInfo } from '@iqprotocol/abstract-blockchain';

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

  getAddress(): string {
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
