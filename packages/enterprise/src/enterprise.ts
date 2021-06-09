import { Address, BlockchainProvider, EnterpriseInfo } from '@iqprotocol/abstract-blockchain';

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

  // getId(): string {
  //   return '123';
  // }

  getAddress(): Address {
    return this.address;
  }

  async getInfo(): Promise<EnterpriseInfo> {
    return this.blockchain.getEnterpriseInfo(this.address);
  }

  // listServices(): Service[] {
  //   return [];
  // }

  // getService(address): Service {
  //   return {} as Service;
  // }
}
