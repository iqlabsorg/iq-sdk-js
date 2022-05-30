import { AccountId } from 'caip';
import { ContractResolver } from '../contract-resolver';
import { BigNumberish, ContractTransaction } from 'ethers';
import { AddressTranslator } from '../address-translator';
import { Adapter } from '../adapter';
import { pick } from '../utils';
import { UniverseRegistry } from '../contracts';

export class UniverseRegistryAdapter extends Adapter {
  private readonly contract: UniverseRegistry;

  constructor(accountId: AccountId, contractResolver: ContractResolver, addressTranslator: AddressTranslator) {
    super(contractResolver, addressTranslator);
    this.contract = contractResolver.resolveUniverseRegistry(accountId.address);
  }

  /**
   * Creates new Universe. This includes minting new universe NFT, where the caller of this method becomes the
   * universe owner.
   * @param params The universe properties & initial configuration params.
   */
  async createUniverse(params: { name: string; rentalFeePercent: BigNumberish }): Promise<ContractTransaction> {
    return this.contract.createUniverse(params);
  }

  /**
   * Returns `true` if the universe owner is the supplied account address.
   * @param universeId The universe ID.
   * @param accountId The expected owner account.
   */
  async isUniverseOwner(universeId: BigNumberish, accountId: AccountId): Promise<boolean> {
    return this.contract.isUniverseOwner(universeId, this.accountIdToAddress(accountId));
  }

  /**
   * Updates the universe name.
   * @param universeId The universe ID.
   * @param name The universe name to set.
   */
  async setUniverseName(universeId: BigNumberish, name: string): Promise<ContractTransaction> {
    return this.contract.setUniverseName(universeId, name);
  }

  /**
   * Updates the universe rental fee percent.
   * @param universeId The universe ID.
   * @param rentalFeePercent The universe rental fee percent.
   */
  async setUniverseRentalFeePercent(
    universeId: BigNumberish,
    rentalFeePercent: BigNumberish,
  ): Promise<ContractTransaction> {
    return this.contract.setUniverseRentalFeePercent(universeId, rentalFeePercent);
  }

  /**
   * Returns aggregated universe data.
   * @param universeId The universe ID.
   * @return {{ name: string, rentalFeePercent: number }}
   */
  async universeInfo(universeId: BigNumberish): Promise<{ name: string; rentalFeePercent: number }> {
    const info = await this.contract.universe(universeId);
    return pick(info, ['name', 'rentalFeePercent']);
  }

  /**
   * Returns Universe owner address.
   * @param universeId Universe ID.
   * @return Universe owner.
   */
  async universeOwner(universeId: BigNumberish): Promise<AccountId> {
    return this.addressToAccountId(await this.contract.universeOwner(universeId));
  }

  /**
   * Returns the Universe token address.
   */
  async universeToken(): Promise<AccountId> {
    return this.addressToAccountId(await this.contract.universeToken());
  }

  /**
   * Returns the Universe token base URI.
   */
  async universeTokenBaseURI(): Promise<string> {
    return this.contract.universeTokenBaseURI();
  }
}
