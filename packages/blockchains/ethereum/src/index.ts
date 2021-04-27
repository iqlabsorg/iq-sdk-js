import {
  recoverPersonalSignature,
  recoverTypedSignature_v4,
  TypedData,
} from 'eth-sig-util';

import { ContractTransaction, Signer } from 'ethers';
import {
  EnterpriseFactory__factory,
  ERC20Mock__factory,
} from '../types/contracts';

export class EthereumBlockchainProvider {
  private readonly signer: Signer;

  constructor(signer: Signer) {
    this.signer = signer;
  }

  async getBalance(tokenAddress: string, address: string): Promise<string> {
    const token = ERC20Mock__factory.connect(tokenAddress, this.signer);
    return (await token.balanceOf(address)).toString();
  }

  async deployEnterprise(
    factoryAddress: string,
    tokenAddress: string,
  ): Promise<ContractTransaction> {
    const enterpriseFactory = EnterpriseFactory__factory.connect(
      factoryAddress,
      this.signer,
    );
    return enterpriseFactory.deploy(
      'Testing',
      tokenAddress,
      'https://test.iq.io',
    );
  }
}

export class Utils {
  static recoverAddress(message: unknown, signature: string): string {
    if (typeof message === 'string') {
      return recoverPersonalSignature({
        data: message,
        sig: signature,
      });
    }

    return recoverTypedSignature_v4({
      data: message as TypedData,
      sig: signature,
    });
  }
}
