import { AccountId, ChainId } from '@iqprotocol/abstract-blockchain';
import { mockBlockchainProvider } from './support/mocks';
import { Service } from '../src';

/**
 * @group unit
 */
describe('Service', () => {
  const SERVICE_ADDRESS = '0x44AdE077C3D5Aaffc0Ff5fe465B0cfa490915A35';
  let service: Service;
  const chainId = new ChainId({ namespace: 'eip155', reference: '1' });
  const serviceAccountId = new AccountId({ chainId, address: SERVICE_ADDRESS });

  beforeEach(() => {
    jest.clearAllMocks();
    mockBlockchainProvider.getChainId.mockResolvedValue(chainId);
    service = new Service({ blockchain: mockBlockchainProvider, address: SERVICE_ADDRESS });
  });

  it('returns correct ID', async () => {
    await expect(service.getId()).resolves.toMatchObject(serviceAccountId);
  });

  it('retrieves on-chain data via blockchain provider', async () => {
    const mockGetServiceInfo = jest.spyOn(mockBlockchainProvider, 'getServiceInfo');
    await service.getInfo();
    expect(mockGetServiceInfo).toHaveBeenCalledWith(SERVICE_ADDRESS);
  });

  it('retrieves on-chain state via blockchain provider', async () => {
    const address = '0x52De41D6a2104812f84ef596BE15B84d1d846ee5';
    const mockGetAccountState = jest.spyOn(mockBlockchainProvider, 'getAccountState');
    await service.getAccountState(address);
    expect(mockGetAccountState).toHaveBeenCalledWith(SERVICE_ADDRESS, address);
  });
});
