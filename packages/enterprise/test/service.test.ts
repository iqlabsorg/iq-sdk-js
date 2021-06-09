import { Service } from '../src';
import { BlockchainProvider } from '@iqprotocol/abstract-blockchain';

const mockBlockchainProvider: jest.Mocked<BlockchainProvider> = {
  getServiceInfo: jest.fn(),
  getEnterpriseInfo: jest.fn(),
  getNetworkId: jest.fn(),
  deployEnterprise: jest.fn(),
  listEnterprises: jest.fn(),
  listEnterpriseServices: jest.fn(),
  registerService: jest.fn(),
};

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

  it.todo('returns correct id');

  it('retrieves on-chain data via blockchain provider', async () => {
    const mockGetServiceInfo = jest.spyOn(mockBlockchainProvider, 'getServiceInfo');
    await service.getInfo();
    expect(mockGetServiceInfo).toHaveBeenCalledWith(SERVICE_ADDRESS);
  });
});
