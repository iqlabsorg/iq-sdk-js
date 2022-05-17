import { AccountId } from 'caip';
import { ContractResolver } from '../contract-resolver';
import { BigNumberish, ContractTransaction } from 'ethers';
import { AddressTranslator } from '../address-translator';
import { UniverseRegistry } from '@iqprotocol/solidity-contracts-nft';
import { Adapter } from '../adapter';
import { pick } from '../utils';

export class UniverseRegistryAdapter extends Adapter {
  private readonly contract: UniverseRegistry;

  constructor(accountId: AccountId, contractResolver: ContractResolver, addressTranslator: AddressTranslator) {
    super(contractResolver, addressTranslator);
    this.contract = contractResolver.resolveUniverseRegistry(accountId.address);
  }

  async createUniverse(params: { name: string; rentalFeePercent: BigNumberish }): Promise<ContractTransaction> {
    return this.contract.createUniverse(params);
  }

  async isUniverseOwner(universeId: BigNumberish, accountId: AccountId): Promise<boolean> {
    return this.contract.isUniverseOwner(universeId, this.accountIdToAddress(accountId));
  }

  async setUniverseName(universeId: BigNumberish, name: string): Promise<ContractTransaction> {
    return this.contract.setUniverseName(universeId, name);
  }

  async setUniverseRentalFeePercent(
    universeId: BigNumberish,
    rentalFeePercent: BigNumberish,
  ): Promise<ContractTransaction> {
    return this.contract.setUniverseRentalFeePercent(universeId, rentalFeePercent);
  }

  async setUniverseTokenBaseURI(baseURI: string): Promise<ContractTransaction> {
    return this.contract.setUniverseTokenBaseURI(baseURI);
  }

  async info(universeId: BigNumberish): Promise<{ name: string; rentalFeePercent: number }> {
    const info = await this.contract.universe(universeId);
    return pick(info, ['name', 'rentalFeePercent']);
  }

  async universeName(universeId: BigNumberish): Promise<string> {
    return this.contract.universeName(universeId);
  }

  async universeOwner(universeId: BigNumberish): Promise<AccountId> {
    return this.addressToAccountId(await this.contract.universeOwner(universeId));
  }

  async universeRentalFeePercent(universeId: BigNumberish): Promise<number> {
    return this.contract.universeRentalFeePercent(universeId);
  }

  async universeToken(): Promise<AccountId> {
    return this.addressToAccountId(await this.contract.universeToken());
  }

  async universeTokenBaseURI(): Promise<string> {
    return this.contract.universeTokenBaseURI();
  }
}
