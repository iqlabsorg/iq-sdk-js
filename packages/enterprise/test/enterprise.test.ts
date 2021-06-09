import { Enterprise } from '../src';
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
describe('Enterprise', () => {
  const ENTERPRISE_ADDRESS = '0x34437589B4DC1EAcBe08824645164F93E5d989E1';
  let enterprise: Enterprise;

  beforeEach(() => {
    jest.clearAllMocks();
    enterprise = new Enterprise({ blockchain: mockBlockchainProvider, address: ENTERPRISE_ADDRESS });
  });

  it.todo('returns correct id');

  it('retrieves on-chain data via blockchain provider', async () => {
    const mockGetEnterpriseInfo = jest.spyOn(mockBlockchainProvider, 'getEnterpriseInfo');
    await enterprise.getInfo();
    expect(mockGetEnterpriseInfo).toHaveBeenCalledWith(ENTERPRISE_ADDRESS);
  });
});
