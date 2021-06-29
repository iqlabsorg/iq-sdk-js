import { InMemoryStore } from '@iqprotocol/in-memory-storage';
import { AccountID, ChainID } from '@iqprotocol/abstract-blockchain';
import { Account } from '@iqprotocol/abstract-storage';
import { AccountManager } from '../src';

/**
 * @group unit
 */
describe('AccountManager', () => {
  const accountAddress = '0xcC0070C1E41b82c95C5a76A564F78301b1B8b3CB';
  const chainId = new ChainID({ namespace: 'eip155', reference: '1' });
  const accountId = new AccountID({ chainId, address: accountAddress });
  const account: Account = {
    id: accountId.toString(),
    data: {
      proof: 'test-proof',
    },
  };

  let store: InMemoryStore;
  let accountManager: AccountManager;

  beforeEach(() => {
    store = new InMemoryStore();
    accountManager = new AccountManager({ store });
  });

  describe('When account is not registered', () => {
    it('returns null upon account data request', async () => {
      await expect(accountManager.getAccount(accountId)).resolves.toBeNull();
    });

    it('registers new account', async () => {
      await expect(accountManager.resister(accountId, account.data)).resolves.toEqual(account);
      await expect(store.getAccount(accountId.toString())).resolves.toEqual(account);
    });
  });
});
