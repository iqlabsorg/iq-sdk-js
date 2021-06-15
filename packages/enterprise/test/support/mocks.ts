import { BlockchainProvider } from '@iqprotocol/abstract-blockchain';

export const mockBlockchainProvider: jest.Mocked<BlockchainProvider> = {
  addLiquidity: jest.fn(),
  getAccountState: jest.fn(),
  getServiceInfo: jest.fn(),
  getEnterpriseInfo: jest.fn(),
  getChainId: jest.fn(),
  deployEnterprise: jest.fn(),
  getEnterpriseServices: jest.fn(),
  registerService: jest.fn(),
};
