/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  EnterpriseOwnable,
  EnterpriseOwnableInterface,
} from "../EnterpriseOwnable";

const _abi = [
  {
    inputs: [],
    name: "getEnterprise",
    outputs: [
      {
        internalType: "contract IEnterprise",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IEnterprise",
        name: "enterprise",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class EnterpriseOwnable__factory {
  static readonly abi = _abi;
  static createInterface(): EnterpriseOwnableInterface {
    return new utils.Interface(_abi) as EnterpriseOwnableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): EnterpriseOwnable {
    return new Contract(address, _abi, signerOrProvider) as EnterpriseOwnable;
  }
}
