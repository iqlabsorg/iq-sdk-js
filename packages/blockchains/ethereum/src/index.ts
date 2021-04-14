import { BlockchainProvider } from '@iqprotocol/abstract-blockchain';
import { utils } from 'ethers';

export class EthereumBlockchainProvider implements BlockchainProvider {
  recoverAddress(message: string, signature: string): string {
    const prefix = Buffer.from('\x19Ethereum Signed Message:\n');
    const prefixedMsg = utils.keccak256(
      Buffer.concat([
        prefix,
        new Buffer(String(message.length)),
        Buffer.from(message),
      ]),
    );

    return utils.recoverAddress(prefixedMsg, signature);
  }
}
