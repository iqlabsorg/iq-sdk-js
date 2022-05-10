import { Adapter } from '../adapter';
import { ERC721PresetConfigurable__factory, WarperPresetFactory } from '../contracts';
import { AccountId } from 'caip';
import { ContractResolver } from '../contract-resolver';
import { AddressTranslator } from '../address-translator';
import { BytesLike, ContractTransaction, Overrides } from 'ethers';
import { defaultAbiCoder, formatBytes32String } from 'ethers/lib/utils';

export class WarperPresetFactoryAdapter extends Adapter {
  private readonly contract: WarperPresetFactory;

  constructor(
    accountId: AccountId,
    protected contractResolver: ContractResolver,
    protected addressTranslator: AddressTranslator,
  ) {
    super(contractResolver, addressTranslator);
    this.contract = contractResolver.resolveWarperPresetFactory(accountId.address);
  }

  async deployPreset(
    presetId: 'ERC721PresetConfigurable',
    data: { metahub: AccountId; original: AccountId },
    overrides?: Overrides,
  ): Promise<ContractTransaction> {
    return this.contract.deployPreset(
      formatBytes32String(presetId),
      this.encodePresetInitData(presetId, data),
      overrides,
    );
  }

  private encodePresetInitData(presetId: string, data: { metahub: AccountId; original: AccountId }): BytesLike {
    if (presetId !== 'ERC721PresetConfigurable') {
      throw new Error(`Unknown preset ID: "${presetId}"`);
    }

    return ERC721PresetConfigurable__factory.createInterface().encodeFunctionData('__initialize', [
      defaultAbiCoder.encode(
        ['address', 'address'],
        [this.accountIdToAddress(data.original), this.accountIdToAddress(data.metahub)],
      ),
    ]);
  }
}
