import { AccountId } from 'caip';
import { ContractResolver } from '../contract-resolver';
import { Metahub } from '../contracts';
import { BigNumberish, ContractTransaction } from 'ethers';
import { Adapter } from '../adapter';
import { AddressTranslator } from '../address-translator';

export class MetahubAdapter extends Adapter {
  private readonly contract: Metahub;

  constructor(accountId: AccountId, contractResolver: ContractResolver, addressTranslator: AddressTranslator) {
    super(contractResolver, addressTranslator);
    this.contract = contractResolver.resolveMetahub(accountId.address);
  }

  async pauseListing(listingId: BigNumberish): Promise<ContractTransaction> {
    return this.contract.pauseListing(listingId);
  }
}
