import { AccountId, AssetId, AssetType, ChainId } from 'caip';
import { BigNumber } from '@ethersproject/bignumber';
import {
  EnterpriseInfo as OnChainEnterpriseInfo,
  FungibleTokenMetadata,
  RentalAgreement as OnChainRentalAgreement,
} from '@iqprotocol/abstract-blockchain';
import { blockchainEnterpriseMock, blockchainProviderMock, blockchainServiceMock } from './support/mocks';
import {
  Enterprise,
  EnterpriseInfo,
  RentalFeeEstimationRequest,
  RentRequest,
  RentalAgreement,
  EnterpriseFactory,
} from '../src';
import { AssetTypes } from '../src/enterprise';
import { ServiceImpl } from '../src/service';

/**
 * @group unit
 */
describe('Enterprise', () => {
  const chainId = new ChainId({ namespace: 'eip155', reference: '1' });
  const nftStandard = 'erc721';
  const enterpriseAddress = '0x34437589B4DC1EAcBe08824645164F93E5d989E1';
  const rentalTokenAddress = '0x6A1f07F09952851fB0AEF2b37e502347688Ea074';
  const stakeTokenAddress = '0xCd64963Eb20Bf46F0fe6dd3EbdA1142d69bc6f3f';
  const service1Address = '0x52De41D6a2104812f84ef596BE15B84d1d846ee5';
  const address2Address = '0x2C368A2E9Bd1bf16eb3DfCd924CA7eF4969CBBD9';
  const service1AddressAccountId = new AccountId({ chainId, address: service1Address });
  const enterpriseAccountId = new AccountId({ chainId, address: enterpriseAddress });

  const assetTypes: AssetTypes = {
    rentalToken: new AssetType({
      chainId,
      assetName: { namespace: nftStandard, reference: rentalTokenAddress },
    }),
    stakeToken: new AssetType({
      chainId,
      assetName: { namespace: nftStandard, reference: stakeTokenAddress },
    }),
  };

  let enterprise: Enterprise;

  beforeEach(async () => {
    jest.clearAllMocks();
    blockchainProviderMock.getNonFungibleTokenStandard.mockResolvedValue(nftStandard);
    blockchainProviderMock.getChainId.mockResolvedValue(chainId);
    blockchainServiceMock.getChainId.mockResolvedValue(chainId);
    blockchainEnterpriseMock.getChainId.mockResolvedValue(chainId);
    blockchainEnterpriseMock.getRentalTokenAddress.mockResolvedValue(rentalTokenAddress);
    blockchainEnterpriseMock.getStakeTokenAddress.mockResolvedValue(stakeTokenAddress);
    blockchainEnterpriseMock.getServiceAddresses.mockResolvedValue([service1Address, address2Address]);

    enterprise = await new EnterpriseFactory(blockchainProviderMock).create(enterpriseAccountId);
  });

  it('returns correct ID', () => {
    expect(enterprise.getAccountId()).toStrictEqual(enterpriseAccountId);
  });

  it('returns rental token type', () => {
    expect(enterprise.getRentalTokenType()).toEqual(assetTypes.rentalToken);
  });

  it('returns stake token type', () => {
    expect(enterprise.getStakeTokenType()).toEqual(assetTypes.stakeToken);
  });

  it('returns service by account ID', async () => {
    const isRegisteredService = jest.spyOn(blockchainEnterpriseMock, 'isRegisteredService').mockResolvedValue(true);
    const service = await enterprise.getService(service1AddressAccountId);
    expect(isRegisteredService).toBeCalledWith(service1Address);
    expect(service.getAccountId()).toEqual(service1AddressAccountId);
  });

  it('retrieves enterprise info', async () => {
    const partialEnterpriseInfo: Partial<OnChainEnterpriseInfo> = {
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
      .mockResolvedValue({ ...partialEnterpriseInfo, address: enterpriseAddress } as OnChainEnterpriseInfo);

    await expect(enterprise.getInfo()).resolves.toEqual({
      ...partialEnterpriseInfo,
      accountId: enterpriseAccountId,
    } as EnterpriseInfo);
  });

  it('lists registered services', async () => {
    const address1 = '0x52De41D6a2104812f84ef596BE15B84d1d846ee5';
    const address2 = '0x2C368A2E9Bd1bf16eb3DfCd924CA7eF4969CBBD9';
    blockchainEnterpriseMock.getServiceAddresses.mockResolvedValue([address1, address2]);
    const services = await enterprise.findServices();
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
    const reward = await enterprise.getStakingReward(
      new AssetId({ chainId, assetName: assetTypes.stakeToken.assetName, tokenId: stakeTokenId }),
    );
    expect(getStakingReward).toHaveBeenCalledWith(stakeTokenId);
    expect(reward).toEqual(expectedReward);
  });

  it('retrieves enterprise token metadata', async () => {
    const expectedTokenMetadata: FungibleTokenMetadata = {
      address: '',
      decimals: 18,
      name: 'EnterpriseToken',
      symbol: 'ENT',
    };
    const getStakingReward = jest
      .spyOn(blockchainEnterpriseMock, 'getEnterpriseTokenMetadata')
      .mockResolvedValueOnce(expectedTokenMetadata);

    const tokenMetadata = await enterprise.getEnterpriseTokenMetadata();

    expect(getStakingReward).toHaveBeenCalledTimes(1);
    expect(tokenMetadata).toEqual(expectedTokenMetadata);
  });

  it('allows to claim staking reward', async () => {
    const stakeTokenId = '1';
    const claimStakingReward = jest.spyOn(blockchainEnterpriseMock, 'claimStakingReward');
    await enterprise.claimStakingReward(
      new AssetId({ chainId, assetName: assetTypes.stakeToken.assetName, tokenId: stakeTokenId }),
    );
    expect(claimStakingReward).toHaveBeenCalledWith(stakeTokenId);
  });

  it('allows to rent', async () => {
    const rent = jest.spyOn(blockchainEnterpriseMock, 'rent');
    const serviceAddress = '0x5f93C65C8541ff4d975ed61026C213F9b85A8ea1';
    const paymentTokenAddress = '0x923360eEbb90A53a1538365Cd674F529F117Ea99';
    const rentalAmount = BigNumber.from(10);
    const rentalPeriod = 86400 * 7;
    const maxPayment = BigNumber.from(1);

    await enterprise.rent({
      serviceAccountId: new AccountId({ chainId, address: serviceAddress }),
      paymentTokenAccountId: new AccountId({ chainId, address: paymentTokenAddress }),
      rentalAmount,
      rentalPeriod,
      maxPayment,
    } as RentRequest);

    expect(rent).toHaveBeenCalledWith(serviceAddress, paymentTokenAddress, rentalAmount, rentalPeriod, maxPayment);
  });

  it('allows to retrieve rental agreement', async () => {
    const tokenId = '27800435412689650177939536813617893929513777122578898467042797130853006610143';
    const rentalTokenId = new AssetId({ ...assetTypes.rentalToken.toJSON(), tokenId });
    const paymentTokenAddress = '0x2C368A2E9Bd1bf16eb3DfCd924CA7eF4969CBBD9';
    const gcRewardTokenIndex = 0;
    const partialRentalAgreement: Partial<OnChainRentalAgreement> = {
      rentalAmount: BigNumber.from('100000000000000000000'),
      startTime: 1636564117,
      endTime: 1637428117,
      renterOnlyReturnTime: 1637471317,
      enterpriseOnlyCollectionTime: 1637514517,
      gcRewardAmount: BigNumber.from('1000000000000000000'),
    };

    const getRentalAgreement = jest.spyOn(blockchainEnterpriseMock, 'getRentalAgreement').mockResolvedValue({
      ...partialRentalAgreement,
      powerTokenIndex: 0,
      gcRewardTokenIndex,
      rentalTokenId: BigNumber.from(tokenId),
    } as OnChainRentalAgreement);

    const getPaymentTokenAddressByIndex =
      blockchainEnterpriseMock.getPaymentTokenAddressByIndex.mockResolvedValue(paymentTokenAddress);

    const rentalAgreement = await enterprise.getRentalAgreement(rentalTokenId);

    expect(getRentalAgreement).toHaveBeenCalledWith(tokenId);
    expect(getPaymentTokenAddressByIndex).toHaveBeenCalledWith(gcRewardTokenIndex);
    expect(rentalAgreement).toEqual({
      rentalTokenId,
      service: new ServiceImpl(new AccountId({ chainId, address: service1Address }), chainId, blockchainProviderMock),
      gcRewardTokenAccountId: new AccountId({ chainId, address: paymentTokenAddress }),
      ...partialRentalAgreement,
    } as RentalAgreement);
  });

  it('allows to return rental', async () => {
    const rentalTokenId = '1';
    const returnRental = jest.spyOn(blockchainEnterpriseMock, 'returnRental');
    await enterprise.returnRental(
      new AssetId({ chainId, assetName: assetTypes.rentalToken.assetName, tokenId: rentalTokenId }),
    );
    expect(returnRental).toHaveBeenCalledWith(rentalTokenId);
  });
});
