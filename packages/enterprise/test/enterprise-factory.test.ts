import { AccountId, ChainId } from 'caip';
import { blockchainProviderMock } from './support/mocks';
import { EnterpriseFactory } from '../src';
import { EnterpriseImpl } from '../src/enterprise';

/**
 * @group unit
 */
describe('Enterprise Factory', () => {
  let enterpriseFactory: EnterpriseFactory;

  beforeAll(() => {
    enterpriseFactory = new EnterpriseFactory(blockchainProviderMock);
  });

  it('creates enterprise', async () => {
    const chainId = new ChainId({ namespace: 'eip155', reference: '1' });
    blockchainProviderMock.getChainId.mockResolvedValue(chainId);
    const enterpriseAccountId = new AccountId({ chainId, address: '0x44AdE077C3D5Aaffc0Ff5fe465B0cfa490915A35' });
    const enterprise = await enterpriseFactory.create(enterpriseAccountId);

    expect(enterprise).toBeInstanceOf(EnterpriseImpl);
    expect(enterprise.getAccountId()).toEqual(enterpriseAccountId);
    expect(enterprise.getChainId()).toEqual(chainId);
  });

  it('throws error on chain ID mismatch', async () => {
    const enterpriseAccountId = new AccountId({
      chainId: new ChainId({ namespace: 'eip155', reference: '2' }),
      address: '0x44AdE077C3D5Aaffc0Ff5fe465B0cfa490915A35',
    });
    await expect(enterpriseFactory.create(enterpriseAccountId)).rejects.toThrowError(new Error(`Chain ID mismatch!`));
  });
});
