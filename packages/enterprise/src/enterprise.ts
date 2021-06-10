import { Address, BlockchainProvider, EnterpriseInfo } from '@iqprotocol/abstract-blockchain';
import { Service } from './service';

export interface EnterpriseConfig {
  blockchain: BlockchainProvider;
  address: Address;
}

export class Enterprise {
  private readonly blockchain: BlockchainProvider;
  private readonly address: Address;

  constructor({ blockchain, address }: EnterpriseConfig) {
    this.blockchain = blockchain;
    this.address = address;
  }

  attach(address: Address): Enterprise {
    return new Enterprise({ blockchain: this.blockchain, address });
  }

  connect(blockchain: BlockchainProvider): Enterprise {
    return new Enterprise({ blockchain, address: this.address });
  }

  getAddress(): Address {
    return this.address;
  }

  async getInfo(): Promise<EnterpriseInfo> {
    return this.blockchain.getEnterpriseInfo(this.address);
  }

  async listServices(): Promise<Service[]> {
    return (await this.blockchain.listEnterpriseServices(this.address)).map(
      address =>
        new Service({
          blockchain: this.blockchain,
          address,
        }),
    );
  }
}
