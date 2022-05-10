import { AccountId } from 'caip';
import { ContractResolver } from '../contract-resolver';
import { BigNumberish, CallOverrides, ContractTransaction, Overrides } from 'ethers';
import { AddressTranslator } from '../address-translator';
import { IUniverseRegistry, UniverseRegistry } from '../contracts';
import { Adapter } from '../adapter';
import { pick } from '@iqprotocol/enterprise/src/utils';

type UniverseParams = IUniverseRegistry.UniverseParamsStruct;

export class UniverseRegistryAdapter extends Adapter {
  private readonly contract: UniverseRegistry;

  constructor(
    accountId: AccountId,
    protected contractResolver: ContractResolver,
    protected addressTranslator: AddressTranslator,
  ) {
    super(contractResolver, addressTranslator);
    this.contract = contractResolver.resolveUniverseRegistry(accountId.address);
  }

  async createUniverse(params: UniverseParams, overrides?: Overrides): Promise<ContractTransaction> {
    return this.contract.createUniverse(params, overrides);
  }

  async isUniverseOwner(universeId: BigNumberish, accountId: AccountId, overrides?: CallOverrides): Promise<boolean> {
    return this.contract.isUniverseOwner(universeId, this.accountIdToAddress(accountId), overrides);
  }

  async setUniverseName(universeId: BigNumberish, name: string, overrides?: Overrides): Promise<ContractTransaction> {
    return this.contract.setUniverseName(universeId, name, overrides);
  }

  async setUniverseRentalFeePercent(
    universeId: BigNumberish,
    rentalFeePercent: BigNumberish,
    overrides?: Overrides,
  ): Promise<ContractTransaction> {
    return this.contract.setUniverseRentalFeePercent(universeId, rentalFeePercent, overrides);
  }

  async setUniverseTokenBaseURI(baseURI: string, overrides?: Overrides): Promise<ContractTransaction> {
    return this.contract.setUniverseTokenBaseURI(baseURI, overrides);
  }

  async info(universeId: BigNumberish, overrides?: CallOverrides): Promise<{ name: string; rentalFeePercent: number }> {
    const info = await this.contract.universe(universeId, overrides);
    return pick(info, ['name', 'rentalFeePercent']);
  }

  async universeName(universeId: BigNumberish, overrides?: CallOverrides): Promise<string> {
    return this.contract.universeName(universeId, overrides);
  }

  async universeOwner(universeId: BigNumberish, overrides?: CallOverrides): Promise<AccountId> {
    return this.addressToAccountId(await this.contract.universeOwner(universeId, overrides));
  }

  async universeRentalFeePercent(universeId: BigNumberish, overrides?: CallOverrides): Promise<number> {
    return this.contract.universeRentalFeePercent(universeId, overrides);
  }

  async universeToken(overrides?: CallOverrides): Promise<AccountId> {
    return this.addressToAccountId(await this.contract.universeToken(overrides));
  }

  async universeTokenBaseURI(overrides?: CallOverrides): Promise<string> {
    return this.contract.universeTokenBaseURI(overrides);
  }
}
