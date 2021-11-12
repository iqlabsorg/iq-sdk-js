import { AccountId, ChainId } from 'caip';
import { blockchainProviderMock } from './support/mocks';
import { ServiceFactory } from '../src/service-factory';
import { ServiceImpl } from '../src/service';

/**
 * @group unit
 */
describe('Service Factory', () => {
  let serviceFactory: ServiceFactory;

  beforeAll(() => {
    serviceFactory = new ServiceFactory(blockchainProviderMock);
  });

  it('creates service', async () => {
    const chainId = new ChainId({ namespace: 'eip155', reference: '1' });
    blockchainProviderMock.getChainId.mockResolvedValue(chainId);
    const serviceAccountId = new AccountId({ chainId, address: '0x44AdE077C3D5Aaffc0Ff5fe465B0cfa490915A35' });
    const service = await serviceFactory.create(serviceAccountId);

    expect(service).toBeInstanceOf(ServiceImpl);
    expect(service.getAccountId()).toEqual(serviceAccountId);
    expect(service.getChainId()).toEqual(chainId);
  });

  it('throws error on chain ID mismatch', async () => {
    const serviceAccountId = new AccountId({
      chainId: new ChainId({ namespace: 'eip155', reference: '2' }),
      address: '0x44AdE077C3D5Aaffc0Ff5fe465B0cfa490915A35',
    });
    await expect(serviceFactory.create(serviceAccountId)).rejects.toThrowError(new Error(`Chain ID mismatch!`));
  });
});
