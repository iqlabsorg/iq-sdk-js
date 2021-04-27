import { Utils } from '../src';
import { normalize } from 'eth-sig-util';

/**
 * @group unit
 */
describe('@iqprotocol/ethereum', () => {
  describe('Utils', () => {
    it('recovers address from personal signature', () => {
      const address = normalize('0xFf0DFEc4a6BfD7CddA2c28b8c5418Ed5fAB21b4b');
      expect(
        Utils.recoverAddress(
          `A message to be signed by address owner`,
          '0x4ada01149ec25bbb7058b5106b3d256ce91f5399de14df2f9b84b8de3c8cf41672e39b3fbf9f18d7b2f3bdeb3fec372007c01e4b0c71c80c5534c7592fb3bc4d1b',
        ),
      ).toBe(address);
    });

    it('recovers address from typed data signature', () => {
      const address = normalize('0xFf0DFEc4a6BfD7CddA2c28b8c5418Ed5fAB21b4b');

      const msgData = {
        domain: {
          name: 'IQ Protocol',
        },
        message: {
          someString: 'A message to be signed by address owner',
        },
        primaryType: 'Message',
        types: {
          EIP712Domain: [
            {
              name: 'name',
              type: 'string',
            },
          ],
          Message: [
            {
              name: 'someString',
              type: 'string',
            },
          ],
        },
      };

      expect(
        Utils.recoverAddress(
          msgData,
          '0xc11b2047c58b08c338110bafc19d0c34187f3644b73bdc5c5beed0108be14cb072039f04907d9b40e4a9643395fdc06d532facc79ba9bbce0c7f9ca7ac61e3461b',
        ),
      ).toBe(address);
    });
  });
});
