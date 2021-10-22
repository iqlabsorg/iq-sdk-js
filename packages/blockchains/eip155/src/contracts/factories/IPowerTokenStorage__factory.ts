/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IPowerTokenStorage,
  IPowerTokenStorageInterface,
} from "../IPowerTokenStorage";

const _abi = [
  {
    inputs: [],
    name: "getIndex",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
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
      {
        internalType: "uint112",
        name: "baseRate",
        type: "uint112",
      },
      {
        internalType: "uint96",
        name: "minGCFee",
        type: "uint96",
      },
      {
        internalType: "uint32",
        name: "gapHalvingPeriod",
        type: "uint32",
      },
      {
        internalType: "uint16",
        name: "index",
        type: "uint16",
      },
      {
        internalType: "contract IERC20Metadata",
        name: "baseToken",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "minLoanDuration",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "maxLoanDuration",
        type: "uint32",
      },
      {
        internalType: "uint16",
        name: "serviceFeePercent",
        type: "uint16",
      },
      {
        internalType: "bool",
        name: "wrappingEnabled",
        type: "bool",
      },
    ],
    name: "initialize2",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "duration",
        type: "uint32",
      },
    ],
    name: "isAllowedLoanDuration",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isTransferEnabled",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isWrappingEnabled",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IPowerTokenStorage__factory {
  static readonly abi = _abi;
  static createInterface(): IPowerTokenStorageInterface {
    return new utils.Interface(_abi) as IPowerTokenStorageInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IPowerTokenStorage {
    return new Contract(address, _abi, signerOrProvider) as IPowerTokenStorage;
  }
}
