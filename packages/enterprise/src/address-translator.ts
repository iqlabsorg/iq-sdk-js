import { AccountId, ChainId } from 'caip';
import { Address } from '@iqprotocol/abstract-blockchain';

export class AddressTranslator {
  constructor(private readonly chainId: ChainId) {}

  addressToAccountId(address: Address): AccountId {
    return new AccountId({ chainId: this.chainId, address });
  }

  accountIdToAddress(accountId: AccountId): Address {
    if (this.chainId.toString() !== accountId.chainId.toString()) {
      throw new Error(`Chain ID mismatch! Expected chain ID: ${this.chainId.toString()}`);
    }
    return accountId.address;
  }

  optionalAccountIdToAddress(accountId?: AccountId): Address | undefined {
    return accountId ? this.accountIdToAddress(accountId) : undefined;
  }
}
