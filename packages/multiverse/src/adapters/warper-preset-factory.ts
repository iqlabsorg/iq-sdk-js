import { Adapter } from '../adapter';
import { ERC721PresetConfigurable__factory, WarperPresetFactory } from '../contracts';
import { AccountId, AssetType } from 'caip';
import { ContractResolver } from '../contract-resolver';
import { AddressTranslator } from '../address-translator';
import { BytesLike, ContractTransaction } from 'ethers';
import { defaultAbiCoder, formatBytes32String } from 'ethers/lib/utils';

export class WarperPresetFactoryAdapter extends Adapter {
  private readonly contract: WarperPresetFactory;

  constructor(accountId: AccountId, contractResolver: ContractResolver, addressTranslator: AddressTranslator) {
    super(contractResolver, addressTranslator);
    this.contract = contractResolver.resolveWarperPresetFactory(accountId.address);
  }

  async deployPreset(
    presetId: 'ERC721PresetConfigurable',
    data: { metahub: AccountId; original: AssetType },
  ): Promise<ContractTransaction> {
    return this.contract.deployPreset(formatBytes32String(presetId), this.encodePresetInitData(presetId, data));
  }

  private encodePresetInitData(presetId: string, data: { metahub: AccountId; original: AssetType }): BytesLike {
    if (presetId !== 'ERC721PresetConfigurable') {
      throw new Error(`Unknown preset ID: "${presetId}"`);
    }

    const { namespace, reference } = data.original.assetName;
    if (namespace !== 'erc721') {
      throw new Error(`Invalid asset type: "${namespace}"! Expected: "erc721"`);
    }

    return ERC721PresetConfigurable__factory.createInterface().encodeFunctionData('__initialize', [
      defaultAbiCoder.encode(
        ['address', 'address'],
        [
          this.accountIdToAddress(new AccountId({ chainId: data.original.chainId, address: reference })),
          this.accountIdToAddress(data.metahub),
        ],
      ),
    ]);
  }
}
