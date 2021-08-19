import { AccountId, BigNumber, ChainId } from '@iqprotocol/abstract-blockchain';
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
    const chainId = new ChainId({ namespace: 'eip155', reference: '1' });
    mockBlockchainProvider.getChainId.mockResolvedValue(chainId);
    await expect(enterprise.getId()).resolves.toMatchObject(new AccountId({ chainId, address: ENTERPRISE_ADDRESS }));
  });

  it('retrieves enterprise info', async () => {
    const getEnterpriseInfo = jest.spyOn(mockBlockchainProvider, 'getEnterpriseInfo');
    await enterprise.getInfo();
    expect(getEnterpriseInfo).toHaveBeenCalledWith(ENTERPRISE_ADDRESS);
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

    const estimateLoan = jest.spyOn(mockBlockchainProvider, 'estimateLoan');
    estimateLoan.mockResolvedValueOnce(mockEstimation);
    const estimate = await enterprise.estimateLoan(loanParams);

    expect(estimate).toEqual(mockEstimation);
    expect(estimateLoan).toHaveBeenCalledWith(
      ENTERPRISE_ADDRESS,
      serviceAddress,
      paymentTokenAddress,
      amount,
      duration,
    );
  });

  it('retrieves accrued interest', async () => {
    const interestTokenId = '1';
    const mockInterest = BigNumber.from(125);
    const getAccruedInterest = jest.spyOn(mockBlockchainProvider, 'getAccruedInterest');
    getAccruedInterest.mockResolvedValueOnce(mockInterest);
    const interest = await enterprise.getAccruedInterest(interestTokenId);
    expect(getAccruedInterest).toHaveBeenCalledWith(ENTERPRISE_ADDRESS, interestTokenId);
    expect(interest).toEqual(mockInterest);
  });

  it('allows to withdraw interest', async () => {
    const interestTokenId = '1';
    const withdrawInterest = jest.spyOn(mockBlockchainProvider, 'withdrawInterest');
    await enterprise.withdrawInterest(interestTokenId);
    expect(withdrawInterest).toHaveBeenCalledWith(ENTERPRISE_ADDRESS, interestTokenId);
  });

  it('allows to return loan', async () => {
    const borrowTokenId = '1';
    const returnLoan = jest.spyOn(mockBlockchainProvider, 'returnLoan');
    await enterprise.returnLoan(borrowTokenId);
    expect(returnLoan).toHaveBeenCalledWith(ENTERPRISE_ADDRESS, borrowTokenId);
  });
});
