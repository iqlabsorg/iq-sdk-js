import {
  recoverPersonalSignature,
  recoverTypedSignature_v4,
  TypedData,
} from 'eth-sig-util';

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
