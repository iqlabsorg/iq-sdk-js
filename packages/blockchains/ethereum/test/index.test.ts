import { EthereumBlockchainProvider } from '../src';

describe('@iqprotocol/ethereum', () => {
  describe('EthereumBlockchainProvider', () => {
    it('recovers address', () => {
      const ethereum = new EthereumBlockchainProvider();
      const address = '0xFf0DFEc4a6BfD7CddA2c28b8c5418Ed5fAB21b4b';
      expect(
        ethereum.recoverAddress(
          `A message to be signed by address owner`,
          '0x4ada01149ec25bbb7058b5106b3d256ce91f5399de14df2f9b84b8de3c8cf41672e39b3fbf9f18d7b2f3bdeb3fec372007c01e4b0c71c80c5534c7592fb3bc4d1b',
        ),
      ).toBe(address);
    });
  });
});
