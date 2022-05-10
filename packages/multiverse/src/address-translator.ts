import { AccountId, ChainId } from 'caip';
import { assertAccountChainId } from './utils';
import { Address } from './types';

export class AddressTranslator {
  constructor(private readonly chainId: ChainId) {}

  addressToAccountId(address: Address): AccountId {
    return new AccountId({ chainId: this.chainId, address });
  }

  accountIdToAddress(accountId: AccountId): Address {
    assertAccountChainId(accountId, this.chainId);
    return accountId.address;
  }

  optionalAccountIdToAddress(accountId?: AccountId): Address | undefined {
    return accountId ? this.accountIdToAddress(accountId) : undefined;
  }
}
