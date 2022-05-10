/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IWarperPreset,
  IWarperPresetInterface,
} from "../../warper/IWarperPreset";

const _abi = [
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
    inputs: [
      {
        internalType: "bytes",
        name: "config",
        type: "bytes",
      },
    ],
    name: "__initialize",
    outputs: [],
    stateMutability: "nonpayable",
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
];

export class IWarperPreset__factory {
  static readonly abi = _abi;
  static createInterface(): IWarperPresetInterface {
    return new utils.Interface(_abi) as IWarperPresetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IWarperPreset {
    return new Contract(address, _abi, signerOrProvider) as IWarperPreset;
  }
}