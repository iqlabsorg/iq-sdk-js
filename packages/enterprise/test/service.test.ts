import { AccountID, ChainID } from '@iqprotocol/abstract-blockchain';
import { mockBlockchainProvider } from './support/mocks';
import { Service } from '../src';

/**
 * @group unit
 */
describe('Service', () => {
  const SERVICE_ADDRESS = '0x44AdE077C3D5Aaffc0Ff5fe465B0cfa490915A35';
  let service: Service;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new Service({ blockchain: mockBlockchainProvider, address: SERVICE_ADDRESS });
  });

  it('returns correct ID', async () => {
    const chainId = new ChainID({ namespace: 'eip155', reference: '1' });
    mockBlockchainProvider.getChainId.mockResolvedValue(chainId);
    await expect(service.getId()).resolves.toMatchObject(new AccountID({ chainId, address: SERVICE_ADDRESS }));
  });

  it('retrieves on-chain data via blockchain provider', async () => {
    const mockGetServiceInfo = jest.spyOn(mockBlockchainProvider, 'getServiceInfo');
    await service.getInfo();
    expect(mockGetServiceInfo).toHaveBeenCalledWith(SERVICE_ADDRESS);
  });
});
