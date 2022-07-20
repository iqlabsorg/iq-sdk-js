import { Signer } from 'ethers';
import { ContractResolver } from './contract-resolver';
import { AccountId, AssetType, ChainId } from 'caip';
import { AddressTranslator } from './address-translator';
import { ChainAware } from './types';
import { MetahubAdapter, UniverseRegistryAdapter, WarperManagerAdapter, WarperPresetFactoryAdapter } from './adapters';
import { assetClasses } from './constants';
import { ERC721WarperAdapter } from './adapters/erc721-warper';

type MultiverseParams = {
  signer: Signer;
};

export class Multiverse implements ChainAware {
  private readonly contractResolver: ContractResolver;
  private readonly addressTranslator: AddressTranslator;

  private constructor(private readonly signer: Signer, private readonly chainId: ChainId) {
    this.contractResolver = new ContractResolver(signer);
    this.addressTranslator = new AddressTranslator(chainId);
  }

  /**
   * Multiverse connection initializer.
   * @param params
   */
  static async init(params: MultiverseParams): Promise<Multiverse> {
    const { signer } = params;
    const chainId = await signer.getChainId();
    return new Multiverse(signer, new ChainId({ namespace: 'eip155', reference: chainId.toString() }));
  }

  async getChainId(): Promise<ChainId> {
    return Promise.resolve(this.chainId);
  }

  warper(assetType: AssetType): ERC721WarperAdapter {
    const { namespace } = assetType.assetName;
    if (namespace !== assetClasses.ERC721.namespace) {
      throw new Error(`Invalid asset type: "${namespace}"! Expected: "erc721"`);
    }

    return new ERC721WarperAdapter(assetType, this.contractResolver, this.addressTranslator);
  }

  /**
   * Resolves the universe registry adapter.
   * @param accountId Universe registry account ID.
   */
  universeRegistry(accountId: AccountId): UniverseRegistryAdapter {
    this.addressTranslator.assertSameChainId(accountId.chainId);
    return new UniverseRegistryAdapter(accountId, this.contractResolver, this.addressTranslator);
  }

  /**
   * Resolves the metahub registry adapter.
   * @param accountId Metahub account ID.
   */
  metahub(accountId: AccountId): MetahubAdapter {
    this.addressTranslator.assertSameChainId(accountId.chainId);
    return new MetahubAdapter(accountId, this.contractResolver, this.addressTranslator);
  }

  /**
   * Resolves the warper preset factory adapter.
   * @param accountId Warper preset factory account ID.
   */
  warperPresetFactory(accountId: AccountId): WarperPresetFactoryAdapter {
    this.addressTranslator.assertSameChainId(accountId.chainId);
    return new WarperPresetFactoryAdapter(accountId, this.contractResolver, this.addressTranslator);
  }

  /**
   * Resolves the warper manager adapter.
   * @param accountId Warper manager account ID.
   */
  warperManager(accountId: AccountId): WarperManagerAdapter {
    this.addressTranslator.assertSameChainId(accountId.chainId);
    return new WarperManagerAdapter(accountId, this.contractResolver, this.addressTranslator);
  }
}
