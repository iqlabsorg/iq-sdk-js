/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  DelegateContext,
  DelegateContextInterface,
} from "../../../../contracts/asset/utils/DelegateContext";

const _abi = [
  {
    inputs: [],
    name: "FunctionMustBeCalledThroughDelegatecall",
    type: "error",
  },
];

export class DelegateContext__factory {
  static readonly abi = _abi;
  static createInterface(): DelegateContextInterface {
    return new utils.Interface(_abi) as DelegateContextInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DelegateContext {
    return new Contract(address, _abi, signerOrProvider) as DelegateContext;
  }
}
