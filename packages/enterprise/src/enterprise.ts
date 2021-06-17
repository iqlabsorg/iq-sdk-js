import {
  AccountID,
  Address,
  BigNumber,
  BigNumberish,
  BlockchainProvider,
  EnterpriseInfo,
} from '@iqprotocol/abstract-blockchain';
import { Service } from './service';

export interface EnterpriseConfig {
  blockchain: BlockchainProvider;
  address: Address;
}

export class Enterprise {
  private id?: AccountID;
  private readonly blockchain: BlockchainProvider;
  private readonly address: Address;

  constructor({ blockchain, address }: EnterpriseConfig) {
    this.blockchain = blockchain;
    this.address = address;
  }

  attach(address: Address): Enterprise {
    return new Enterprise({ blockchain: this.blockchain, address });
  }

  connect(blockchain: BlockchainProvider, address: Address): Enterprise {
    return new Enterprise({ blockchain, address });
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

  async getInfo(): Promise<EnterpriseInfo> {
    return this.blockchain.getEnterpriseInfo(this.address);
  }

  async getServices(): Promise<Service[]> {
    return (await this.blockchain.getServices(this.address)).map(
      address =>
        new Service({
          blockchain: this.blockchain,
          address,
        }),
    );
  }

  async addLiquidity(amount: BigNumberish): Promise<void> {
    await this.blockchain.addLiquidity(this.address, amount);
  }

  async removeLiquidity(interestTokenId: BigNumberish): Promise<void> {
    await this.blockchain.removeLiquidity(this.address, interestTokenId);
  }

  async increaseLiquidity(interestTokenId: BigNumberish, amount: BigNumberish): Promise<void> {
    await this.blockchain.increaseLiquidity(this.address, interestTokenId, amount);
  }

  async decreaseLiquidity(interestTokenId: BigNumberish, amount: BigNumberish): Promise<void> {
    await this.blockchain.decreaseLiquidity(this.address, interestTokenId, amount);
  }

  async setLiquidityAllowance(amount: BigNumberish): Promise<void> {
    await this.blockchain.setLiquidityAllowance(this.address, amount);
  }

  async getLiquidityAllowance(): Promise<BigNumber> {
    return this.blockchain.getLiquidityAllowance(this.address);
  }
}
