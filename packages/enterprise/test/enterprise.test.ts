import { AccountId, BigNumber, ChainId } from '@iqprotocol/abstract-blockchain';
import { blockchainEnterpriseMock, blockchainProviderMock } from './support/mocks';
import { Enterprise, RentalFeeEstimationRequest } from '../src';

/**
 * @group unit
 */
describe('Enterprise', () => {
  const ENTERPRISE_ADDRESS = '0x34437589B4DC1EAcBe08824645164F93E5d989E1';
  let enterprise: Enterprise;

  beforeEach(() => {
    jest.clearAllMocks();
    enterprise = new Enterprise({ blockchain: blockchainProviderMock, address: ENTERPRISE_ADDRESS });
  });

  it('returns correct ID', async () => {
    const chainId = new ChainId({ namespace: 'eip155', reference: '1' });
    blockchainProviderMock.getChainId.mockResolvedValue(chainId);
    await expect(enterprise.getId()).resolves.toStrictEqual(new AccountId({ chainId, address: ENTERPRISE_ADDRESS }));
  });

  it('retrieves enterprise info', async () => {
    const getEnterpriseInfo = jest.spyOn(blockchainEnterpriseMock, 'getInfo');
    await enterprise.getInfo();
    expect(getEnterpriseInfo).toHaveBeenCalled();
  });

  it('lists registered services', async () => {
    const addr1 = '0x52De41D6a2104812f84ef596BE15B84d1d846ee5';
    const addr2 = '0x2C368A2E9Bd1bf16eb3DfCd924CA7eF4969CBBD9';
    blockchainEnterpriseMock.getServiceAddresses.mockResolvedValue([addr1, addr2]);
    const services = await enterprise.getServices();
    expect(services).toHaveLength(2);
    expect(services[0].getAddress()).toEqual(addr1);
    expect(services[1].getAddress()).toEqual(addr2);
  });

  it('allows to estimate rental fee', async () => {
    const mockEstimatedRentalFee = BigNumber.from(520);

    const serviceAddress = '0x52De41D6a2104812f84ef596BE15B84d1d846ee5';
    const paymentTokenAddress = '0x2C368A2E9Bd1bf16eb3DfCd924CA7eF4969CBBD9';
    const rentalAmount = 1000;
    const rentalPeriod = 86400;

    const rentParams: RentalFeeEstimationRequest = {
      serviceAddress,
      paymentTokenAddress,
      rentalAmount,
      rentalPeriod,
    };

    const estimateRentalFee = jest.spyOn(blockchainEnterpriseMock, 'estimateRentalFee');
    estimateRentalFee.mockResolvedValueOnce(mockEstimatedRentalFee);
    const estimate = await enterprise.estimateRentalFee(rentParams);

    expect(estimate).toEqual(mockEstimatedRentalFee);
    expect(estimateRentalFee).toHaveBeenCalledWith(serviceAddress, paymentTokenAddress, rentalAmount, rentalPeriod);
  });

  it('retrieves accrued staking reward', async () => {
    const stakeTokenId = '1';
    const mockReward = BigNumber.from(125);
    const getStakingReward = jest.spyOn(blockchainEnterpriseMock, 'getStakingReward');
    getStakingReward.mockResolvedValueOnce(mockReward);
    const reward = await enterprise.getStakingReward(stakeTokenId);
    expect(getStakingReward).toHaveBeenCalledWith(stakeTokenId);
    expect(reward).toEqual(mockReward);
  });

  it('allows to claim staking reward', async () => {
    const stakeTokenId = '1';
    const claimStakingReward = jest.spyOn(blockchainEnterpriseMock, 'claimStakingReward');
    await enterprise.claimStakingReward(stakeTokenId);
    expect(claimStakingReward).toHaveBeenCalledWith(stakeTokenId);
  });

  it('allows to return rental', async () => {
    const rentalTokenId = '1';
    const returnRental = jest.spyOn(blockchainEnterpriseMock, 'returnRental');
    await enterprise.returnRental(rentalTokenId);
    expect(returnRental).toHaveBeenCalledWith(rentalTokenId);
  });
});
