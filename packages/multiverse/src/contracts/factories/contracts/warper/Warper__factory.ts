/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { Warper, WarperInterface } from "../../../contracts/warper/Warper";

const _abi = [
  {
    inputs: [],
    name: "CallForwardToZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "CallerIsNotMetahub",
    type: "error",
  },
  {
    inputs: [],
    name: "CallerIsNotWarperAdmin",
    type: "error",
  },
  {
    inputs: [],
    name: "ContractIsAlreadyInitialized",
    type: "error",
  },
  {
    inputs: [],
    name: "ContractIsNotInitializing",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "original",
        type: "address",
      },
      {
        internalType: "bytes4",
        name: "requiredInterfaceId",
        type: "bytes4",
      },
    ],
    name: "InvalidOriginalTokenInterface",
    type: "error",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "__assetClass",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "__metahub",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "__original",
    outputs: [
      {
        internalType: "address",
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
        internalType: "bytes4[]",
        name: "interfaceIds",
        type: "bytes4[]",
      },
    ],
    name: "__supportedInterfaces",
    outputs: [
      {
        internalType: "bool[]",
        name: "",
        type: "bool[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes[]",
        name: "data",
        type: "bytes[]",
      },
    ],
    name: "multicall",
    outputs: [
      {
        internalType: "bytes[]",
        name: "results",
        type: "bytes[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
    stateMutability: "payable",
    type: "receive",
  },
];

export class Warper__factory {
  static readonly abi = _abi;
  static createInterface(): WarperInterface {
    return new utils.Interface(_abi) as WarperInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Warper {
    return new Contract(address, _abi, signerOrProvider) as Warper;
  }
}
