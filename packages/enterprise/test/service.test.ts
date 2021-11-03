import { AccountId, ChainId } from '@iqprotocol/abstract-blockchain';
import { blockchainProviderMock, blockchainServiceMock } from './support/mocks';
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
    blockchainProviderMock.getChainId.mockResolvedValue(chainId);
    service = new Service({ blockchain: blockchainProviderMock, address: SERVICE_ADDRESS });
  });

  it('returns correct ID', async () => {
    await expect(service.getId()).resolves.toStrictEqual(serviceAccountId);
  });

  it('retrieves on-chain data via blockchain provider', async () => {
    const getServiceInfo = jest.spyOn(blockchainServiceMock, 'getInfo');
    await service.getInfo();
    expect(getServiceInfo).toHaveBeenCalled();
  });

  it('retrieves on-chain state via blockchain provider', async () => {
    const address = '0x52De41D6a2104812f84ef596BE15B84d1d846ee5';
    const getAccountState = jest.spyOn(blockchainServiceMock, 'getAccountState');
    await service.getAccountState(address);
    expect(getAccountState).toHaveBeenCalledWith(address);
  });
});
