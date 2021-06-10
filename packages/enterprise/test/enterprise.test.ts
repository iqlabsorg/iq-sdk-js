import { AccountID, ChainID } from '@iqprotocol/abstract-blockchain';
import { mockBlockchainProvider } from './support/mocks';
import { Enterprise } from '../src';

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

  it('returns correct ID', async () => {
    const chainId = new ChainID({ namespace: 'eip155', reference: '1' });
    mockBlockchainProvider.getChainId.mockResolvedValue(chainId);
    await expect(enterprise.getId()).resolves.toMatchObject(new AccountID({ chainId, address: ENTERPRISE_ADDRESS }));
  });

  it('retrieves on-chain data via blockchain provider', async () => {
    const mockGetEnterpriseInfo = jest.spyOn(mockBlockchainProvider, 'getEnterpriseInfo');
    await enterprise.getInfo();
    expect(mockGetEnterpriseInfo).toHaveBeenCalledWith(ENTERPRISE_ADDRESS);
  });

  it('lists registered services', async () => {
    mockBlockchainProvider.listEnterpriseServices.mockResolvedValue([
      '0x52De41D6a2104812f84ef596BE15B84d1d846ee5',
      '0x2C368A2E9Bd1bf16eb3DfCd924CA7eF4969CBBD9',
    ]);
    const services = await enterprise.listServices();
    expect(services).toHaveLength(2);
    expect(services[0].getAddress()).toEqual('0x52De41D6a2104812f84ef596BE15B84d1d846ee5');
    expect(services[1].getAddress()).toEqual('0x2C368A2E9Bd1bf16eb3DfCd924CA7eF4969CBBD9');
  });
});