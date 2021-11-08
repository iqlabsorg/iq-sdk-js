/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IRentalTokenStorage,
  IRentalTokenStorageInterface,
} from "../IRentalTokenStorage";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
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

export class IRentalTokenStorage__factory {
  static readonly abi = _abi;
  static createInterface(): IRentalTokenStorageInterface {
    return new utils.Interface(_abi) as IRentalTokenStorageInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IRentalTokenStorage {
    return new Contract(address, _abi, signerOrProvider) as IRentalTokenStorage;
  }
}