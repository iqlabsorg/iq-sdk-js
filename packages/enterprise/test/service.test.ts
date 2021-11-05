import {
  AccountId,
  ServiceInfo as OnChainServiceInfo,
  AccountState as OnChainAccountState,
  BigNumber,
  ChainId,
} from '@iqprotocol/abstract-blockchain';
import { blockchainProviderMock, blockchainServiceMock } from './support/mocks';
import { Service, ServiceInfo, AccountState } from '../src';

/**
 * @group unit
 */
describe('Service', () => {
  const serviceAddress = '0x44AdE077C3D5Aaffc0Ff5fe465B0cfa490915A35';
  const chainId = new ChainId({ namespace: 'eip155', reference: '1' });
  const serviceAccountId = new AccountId({ chainId, address: serviceAddress });

  let service: Service;

  beforeEach(async () => {
    jest.clearAllMocks();
    blockchainProviderMock.getChainId.mockResolvedValue(chainId);
    service = await Service.create({ blockchain: blockchainProviderMock, accountId: serviceAccountId });
  });

  it('returns correct ID', () => {
    expect(service.getAccountId()).toStrictEqual(serviceAccountId);
  });

  it('retrieves on-chain data via blockchain provider', async () => {
    const baseTokenAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
    const serviceInfo: Partial<OnChainServiceInfo> = {
      energyGapHalvingPeriod: 86400,
      baseRate: BigNumber.from(200),
      serviceFeePercent: 300,
      minRentalPeriod: 43200,
      maxRentalPeriod: 5184000,
      minGCFee: BigNumber.from(200),
      swappingEnabled: true,
      transferEnabled: false,
      name: 'Test Service 1',
      symbol: 'TST IQPT1',
      index: 0,
    };

    jest.spyOn(blockchainServiceMock, 'getInfo').mockResolvedValue({
      ...serviceInfo,
      address: serviceAddress,
      baseToken: baseTokenAddress,
    } as OnChainServiceInfo);

    await expect(service.getInfo()).resolves.toEqual({
      ...serviceInfo,
      accountId: serviceAccountId,
      baseTokenAccountId: new AccountId({ chainId, address: baseTokenAddress }),
    } as ServiceInfo);
  });

  it('retrieves on-chain state via blockchain provider', async () => {
    const accountAddress = '0x52De41D6a2104812f84ef596BE15B84d1d846ee5';
    const accountState: Partial<OnChainAccountState> = {
      balance: BigNumber.from(0),
      lockedBalance: BigNumber.from(0),
      energy: BigNumber.from(0),
      timestamp: 0,
    };
    const getAccountState = jest.spyOn(blockchainServiceMock, 'getAccountState').mockResolvedValue({
      ...accountState,
      serviceAddress,
      accountAddress,
    } as OnChainAccountState);

    const accountId = new AccountId({ chainId, address: accountAddress });
    await expect(service.getAccountState(accountId)).resolves.toEqual({
      ...accountState,
      accountId,
      serviceId: serviceAccountId,
    } as AccountState);
    expect(getAccountState).toHaveBeenCalledWith(accountAddress);
  });
});
