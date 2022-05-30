import { Signer } from 'ethers';
import { ContractResolver } from './contract-resolver';
import { AccountId, ChainId } from 'caip';
import { AddressTranslator } from './address-translator';
import { ChainAware } from './types';
import { MetahubAdapter, UniverseRegistryAdapter, WarperPresetFactoryAdapter } from './adapters';

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

  static async init({ signer }: MultiverseParams): Promise<Multiverse> {
    const chainId = await signer.getChainId();
    return new Multiverse(signer, new ChainId({ namespace: 'eip155', reference: chainId.toString() }));
  }

  async getChainId(): Promise<ChainId> {
    return Promise.resolve(this.chainId);
  }

  universeRegistry(accountId: AccountId): UniverseRegistryAdapter {
    this.addressTranslator.assertSameChainId(accountId.chainId);
    return new UniverseRegistryAdapter(accountId, this.contractResolver, this.addressTranslator);
  }

  metahub(accountId: AccountId): MetahubAdapter {
    this.addressTranslator.assertSameChainId(accountId.chainId);
    return new MetahubAdapter(accountId, this.contractResolver, this.addressTranslator);
  }

  warperPresetFactory(accountId: AccountId): WarperPresetFactoryAdapter {
    this.addressTranslator.assertSameChainId(accountId.chainId);
    return new WarperPresetFactoryAdapter(accountId, this.contractResolver, this.addressTranslator);
  }
}
