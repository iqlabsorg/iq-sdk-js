import { InMemoryStore } from '@iqprotocol/in-memory-storage';
import { AccountId, ChainId } from '@iqprotocol/abstract-blockchain';
import { Account, AccountOwnershipProof } from '@iqprotocol/abstract-storage';
import { AccountManager, AccountOwnershipVerifier, MessageTypes } from '../src';
import { normalize, signTypedMessage } from 'eth-sig-util';

/**
 * @group unit
 */
describe('AccountManager', () => {
  const testPrivateKey = Buffer.from('6a7cc9ff0123c3e938a3ffa3315d22bb484f2c0e5869984f5ab973c0c19e3308', 'hex');
  const address = normalize('0xD4E8BC65f04B9f23bA8683776D36C12773D56500');
  const chainId = new ChainId({ namespace: 'eip155', reference: '1' });
  const accountId = new AccountId({ address, chainId });

  const account: Account = {
    id: accountId.toString(),
    data: {
      proof: { v: '1', sig: 'signature' },
    },
  };

  let store: InMemoryStore;
  let accountManager: AccountManager;

  beforeEach(() => {
    store = new InMemoryStore();
    accountManager = new AccountManager({ store });
  });

  describe('When account does not exist', () => {
    it('returns null upon account data request', async () => {
      await expect(accountManager.getAccount(accountId)).resolves.toBeNull();
    });

    it('allows to create new account', async () => {
      await expect(accountManager.createAccount(accountId, account.data)).resolves.toEqual(account);
      await expect(store.getAccount(accountId.toString())).resolves.toEqual(account);
    });

    it('registers new account performing ownership verification', async () => {
      // Front-end
      const claimVersion = '1';
      const signature = signTypedMessage<MessageTypes>(testPrivateKey, {
        data: AccountOwnershipVerifier.generateAccountOwnershipClaim(accountId, claimVersion),
      });
      const proof: AccountOwnershipProof = { v: claimVersion, sig: signature };

      // Back-end
      await expect(accountManager.register(accountId, { proof })).resolves.toEqual({
        id: accountId.toString(),
        data: { proof },
      });

      // Ensure the proof can be re-validated
      const account = (await accountManager.getAccount(accountId)) as Account;
      const claim = AccountOwnershipVerifier.generateAccountOwnershipClaim(accountId, account.data.proof.v);
      expect(
        AccountOwnershipVerifier.verifyAccountOwnershipClaimSignature(accountId, claim, account.data.proof.sig),
      ).toBeTruthy();
    });
  });
  describe('When account exists', () => {
    beforeEach(async () => {
      await accountManager.createAccount(accountId, account.data);
    });

    it('allows to delete account', async () => {
      await expect(accountManager.deleteAccount(accountId)).resolves.toEqual(true);
      await expect(store.getAccount(accountId.toString())).resolves.toBeNull();
      await expect(accountManager.deleteAccount(accountId)).resolves.toEqual(false);
    });
  });
});
