import { AccountId, ChainId } from 'caip';
import { BigNumber } from '@ethersproject/bignumber';
import { EnterpriseInfo as OnChainEnterpriseInfo } from '@iqprotocol/abstract-blockchain';
import { blockchainEnterpriseMock, blockchainProviderMock } from './support/mocks';
import { Enterprise, RentalFeeEstimationRequest, EnterpriseInfo } from '../src';

/**
 * @group unit
 */
describe('Enterprise', () => {
  const chainId = new ChainId({ namespace: 'eip155', reference: '1' });
  const enterpriseAddress = '0x34437589B4DC1EAcBe08824645164F93E5d989E1';
  const enterpriseAccountId = new AccountId({ chainId, address: enterpriseAddress });

  let enterprise: Enterprise;

  beforeEach(async () => {
    jest.clearAllMocks();
    blockchainProviderMock.getChainId.mockResolvedValue(chainId);
    enterprise = await Enterprise.create({ blockchain: blockchainProviderMock, accountId: enterpriseAccountId });
  });

  it('ensures matching chain ID upon creation', async () => {
    await expect(
      Enterprise.create({
        blockchain: blockchainProviderMock,
        accountId: new AccountId({ address: enterpriseAddress, chainId: 'eip155:2' }),
      }),
    ).rejects.toThrow();
  });

  it('returns correct ID', () => {
    const chainId = new ChainId({ namespace: 'eip155', reference: '1' });
    blockchainProviderMock.getChainId.mockResolvedValue(chainId);
    expect(enterprise.getAccountId()).toStrictEqual(enterpriseAccountId);
  });

  it('retrieves enterprise info', async () => {
    const enterpriseInfo: Partial<OnChainEnterpriseInfo> = {
      name: 'Test Enterprise',
      baseUri: 'https://iq.space',
      totalShares: BigNumber.from(0),
      streamingReserveHalvingPeriod: 604800,
      renterOnlyReturnPeriod: 43200,
      enterpriseOnlyCollectionPeriod: 86400,
      gcFeePercent: 200,
      fixedReserve: BigNumber.from(0),
      usedReserve: BigNumber.from(0),
      streamingReserve: BigNumber.from(0),
      streamingReserveTarget: BigNumber.from(0),
      streamingReserveUpdated: 0,
    };
    jest
      .spyOn(blockchainEnterpriseMock, 'getInfo')
      .mockResolvedValue({ ...enterpriseInfo, address: enterpriseAddress } as OnChainEnterpriseInfo);

    await expect(enterprise.getInfo()).resolves.toEqual({
      ...enterpriseInfo,
      accountId: enterpriseAccountId,
    } as EnterpriseInfo);
  });

  it('lists registered services', async () => {
    const address1 = '0x52De41D6a2104812f84ef596BE15B84d1d846ee5';
    const address2 = '0x2C368A2E9Bd1bf16eb3DfCd924CA7eF4969CBBD9';
    blockchainEnterpriseMock.getServiceAddresses.mockResolvedValue([address1, address2]);
    const services = await enterprise.getServices();
    expect(services).toHaveLength(2);
    expect(services[0].getAccountId()).toEqual(new AccountId({ chainId, address: address1 }));
    expect(services[1].getAccountId()).toEqual(new AccountId({ chainId, address: address2 }));
  });

  it('allows to estimate rental fee', async () => {
    const expectedRentalFee = BigNumber.from(520);
    const serviceAddress = '0x52De41D6a2104812f84ef596BE15B84d1d846ee5';
    const paymentTokenAddress = '0x2C368A2E9Bd1bf16eb3DfCd924CA7eF4969CBBD9';
    const rentalAmount = 1000;
    const rentalPeriod = 86400;

    const rentParams: RentalFeeEstimationRequest = {
      serviceAccountId: new AccountId({ chainId, address: serviceAddress }),
      paymentTokenAccountId: new AccountId({ chainId, address: paymentTokenAddress }),
      rentalAmount,
      rentalPeriod,
    };

    const estimateRentalFee = jest
      .spyOn(blockchainEnterpriseMock, 'estimateRentalFee')
      .mockResolvedValueOnce(expectedRentalFee);

    const estimate = await enterprise.estimateRentalFee(rentParams);

    expect(estimate).toEqual(expectedRentalFee);
    expect(estimateRentalFee).toHaveBeenCalledWith(serviceAddress, paymentTokenAddress, rentalAmount, rentalPeriod);
  });

  it('retrieves accrued staking reward', async () => {
    const stakeTokenId = '1';
    const expectedReward = BigNumber.from(125);
    const getStakingReward = jest
      .spyOn(blockchainEnterpriseMock, 'getStakingReward')
      .mockResolvedValueOnce(expectedReward);
    const reward = await enterprise.getStakingReward(stakeTokenId);
    expect(getStakingReward).toHaveBeenCalledWith(stakeTokenId);
    expect(reward).toEqual(expectedReward);
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
