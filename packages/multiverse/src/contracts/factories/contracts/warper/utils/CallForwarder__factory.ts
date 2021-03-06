/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  CallForwarder,
  CallForwarderInterface,
} from "../../../../contracts/warper/utils/CallForwarder";

const _abi = [
  {
    inputs: [],
    name: "CallForwardToZeroAddress",
    type: "error",
  },
];

export class CallForwarder__factory {
  static readonly abi = _abi;
  static createInterface(): CallForwarderInterface {
    return new utils.Interface(_abi) as CallForwarderInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CallForwarder {
    return new Contract(address, _abi, signerOrProvider) as CallForwarder;
  }
}
