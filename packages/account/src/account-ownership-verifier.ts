import { AccountId } from '@iqprotocol/abstract-blockchain';
import { recoverTypedSignature_v4, TypedMessage } from 'eth-sig-util';

interface MessageTypeProperty {
  name: string;
  type: string;
}

export interface MessageTypes {
  [additionalProperties: string]: MessageTypeProperty[];
  EIP712Domain: MessageTypeProperty[];
}

export class AccountOwnershipVerifier {
  static generateAccountOwnershipClaim(accountId: AccountId, version = '1'): TypedMessage<MessageTypes> {
    const { chainId, address } = accountId;
    if (chainId.namespace !== 'eip155') {
      throw new Error('Account chain ID namespace is not "eip155"');
    }
    if (version !== '1') {
      throw new Error('Unsupported claim version');
    }

    return {
      domain: {
        name: 'IQ Protocol',
        version,
        chainId: Number(chainId.reference),
      },

      // Defining the message signing data content.
      message: {
        claim: 'Hereby I confirm to be the owner of the following address',
        address,
      },
      primaryType: 'AccountOwnershipClaim',
      types: {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
        ],
        // Refer to PrimaryType
        AccountOwnershipClaim: [
          { name: 'claim', type: 'string' },
          { name: 'address', type: 'string' },
        ],
      },
    };
  }

  static verifyAccountOwnershipClaimSignature(
    accountId: AccountId,
    claim: TypedMessage<MessageTypes>,
    signature: string,
  ): boolean {
    const recoveredAddress = recoverTypedSignature_v4({
      data: claim,
      sig: signature,
    });

    return recoveredAddress === accountId.address;
  }
}
