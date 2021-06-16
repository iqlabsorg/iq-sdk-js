import { BlockchainProvider } from '@iqprotocol/abstract-blockchain';

export const mockBlockchainProvider: jest.Mocked<BlockchainProvider> = {
  addLiquidity: jest.fn(),
  deployEnterprise: jest.fn(),
  getAccountState: jest.fn(),
  getChainId: jest.fn(),
  getERC20Metadata: jest.fn(),
  getERC721Metadata: jest.fn(),
  getEnterpriseInfo: jest.fn(),
  getLiquidityAllowance: jest.fn(),
  getLiquidityTokenAddress: jest.fn(),
  getLiquidityTokenMetadata: jest.fn(),
  getServiceInfo: jest.fn(),
  getServices: jest.fn(),
  registerService: jest.fn(),
  setLiquidityAllowance: jest.fn(),
};
