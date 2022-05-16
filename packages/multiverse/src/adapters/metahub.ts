import { ContractResolver } from '../contract-resolver';
import { Metahub } from '../contracts';
import { BigNumberish, ContractTransaction } from 'ethers';
import { Adapter } from '../adapter';
import { AddressTranslator } from '../address-translator';
import { IWarperManager } from '../contracts/metahub/Metahub';
import { AccountId, AssetType } from 'caip';

export class MetahubAdapter extends Adapter {
  private readonly contract: Metahub;

  constructor(accountId: AccountId, contractResolver: ContractResolver, addressTranslator: AddressTranslator) {
    super(contractResolver, addressTranslator);
    this.contract = contractResolver.resolveMetahub(accountId.address);
  }

  async pauseListing(listingId: BigNumberish): Promise<ContractTransaction> {
    return this.contract.pauseListing(listingId);
  }

  /**
   * Registers a new warper.
   * The warper must be deployed and configured prior to registration, since it becomes available for renting immediately.
   * @param warper Warper reference.
   * @param params Warper registration params.
   */
  async registerWarper(
    warper: AssetType,
    params: IWarperManager.WarperRegistrationParamsStruct,
  ): Promise<ContractTransaction> {
    return this.contract.registerWarper(this.assetTypeToAddress(warper), params);
  }
}
