import { AccountID, BigNumber, ChainID } from '@iqprotocol/abstract-blockchain';
import { mockBlockchainProvider } from './support/mocks';
import { Enterprise, LoanEstimationRequest } from '../src';

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
    const addr1 = '0x52De41D6a2104812f84ef596BE15B84d1d846ee5';
    const addr2 = '0x2C368A2E9Bd1bf16eb3DfCd924CA7eF4969CBBD9';
    mockBlockchainProvider.getServices.mockResolvedValue([addr1, addr2]);
    const services = await enterprise.getServices();
    expect(services).toHaveLength(2);
    expect(services[0].getAddress()).toEqual(addr1);
    expect(services[1].getAddress()).toEqual(addr2);
  });

  it('allows to estimate loan', async () => {
    const mockEstimation = BigNumber.from(520);

    const serviceAddress = '0x52De41D6a2104812f84ef596BE15B84d1d846ee5';
    const paymentTokenAddress = '0x2C368A2E9Bd1bf16eb3DfCd924CA7eF4969CBBD9';
    const amount = 1000;
    const duration = 86400;

    const loanParams: LoanEstimationRequest = {
      serviceAddress,
      paymentTokenAddress,
      amount,
      duration,
    };

    const mockEstimateLoan = jest.spyOn(mockBlockchainProvider, 'estimateLoan');
    mockEstimateLoan.mockResolvedValueOnce(mockEstimation);
    const estimate = await enterprise.estimateLoan(loanParams);

    expect(estimate).toEqual(mockEstimation);
    expect(mockEstimateLoan).toHaveBeenCalledWith(
      ENTERPRISE_ADDRESS,
      serviceAddress,
      paymentTokenAddress,
      amount,
      duration,
    );
  });
});
