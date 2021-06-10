import { BlockchainProvider } from '@iqprotocol/abstract-blockchain';

export const mockBlockchainProvider: jest.Mocked<BlockchainProvider> = {
  getAccountState: jest.fn(),
  getServiceInfo: jest.fn(),
  getEnterpriseInfo: jest.fn(),
  getNetworkId: jest.fn(),
  deployEnterprise: jest.fn(),
  listEnterpriseServices: jest.fn(),
  registerService: jest.fn(),
};
