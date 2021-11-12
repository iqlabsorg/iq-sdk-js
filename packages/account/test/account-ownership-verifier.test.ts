import { AccountId, ChainId } from 'caip';
import { normalize, signTypedMessage } from 'eth-sig-util';
import { AccountOwnershipVerifier, MessageTypes } from '../src';

/**
 * @group unit
 */
describe('AccountOwnershipVerifier', () => {
  const testPrivateKey = Buffer.from('6a7cc9ff0123c3e938a3ffa3315d22bb484f2c0e5869984f5ab973c0c19e3308', 'hex');
  const address = normalize('0xD4E8BC65f04B9f23bA8683776D36C12773D56500');
  const chainId = new ChainId({ namespace: 'eip155', reference: '1' });
  const accountId = new AccountId({ address, chainId });
  const ownershipClaim = {
    domain: {
      name: 'IQ Protocol',
      version: '1',
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

  it('generates account ownership claim', () => {
    expect(AccountOwnershipVerifier.generateAccountOwnershipClaim(accountId)).toEqual(ownershipClaim);
  });

  it('verifies account ownership claim', () => {
    const claim = AccountOwnershipVerifier.generateAccountOwnershipClaim(accountId);
    const signature = signTypedMessage<MessageTypes>(testPrivateKey, {
      data: ownershipClaim,
    });
    expect(AccountOwnershipVerifier.verifyAccountOwnershipClaimSignature(accountId, claim, signature)).toBeTruthy();
  });
});
