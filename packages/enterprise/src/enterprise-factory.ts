import { AccountId, AssetType } from 'caip';
import { AssetTypes, EnterpriseImpl } from './enterprise';
import { BlockchainProvider } from '@iqprotocol/abstract-blockchain';
import { Enterprise } from './types';

export class EnterpriseFactory<Transaction = unknown> {
  constructor(private readonly blockchain: BlockchainProvider<Transaction>) {}

  async create(accountId: AccountId): Promise<Enterprise<Transaction>> {
    const chainId = await this.blockchain.getChainId();
    if (chainId.toString() !== accountId.chainId.toString()) {
      throw new Error(`Chain ID mismatch!`);
    }
    const assetTypes = await this.loadAssetTypes(accountId);

    return new EnterpriseImpl<Transaction>(accountId, chainId, this.blockchain, assetTypes);
  }

  private async loadAssetTypes(accountId: AccountId): Promise<AssetTypes> {
    const { chainId } = accountId;
    const namespace = await this.blockchain.getNonFungibleTokenStandard();
    const blockchainEnterprise = this.blockchain.enterprise(accountId.address);
    return {
      rentalToken: new AssetType({
        chainId,
        assetName: {
          namespace,
          reference: await blockchainEnterprise.getRentalTokenAddress(),
        },
      }),
      stakeToken: new AssetType({
        chainId,
        assetName: {
          namespace,
          reference: await blockchainEnterprise.getStakeTokenAddress(),
        },
      }),
    };
  }
}
