/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IWarperPresetFactory,
  IWarperPresetFactoryInterface,
} from "../../../contracts/warper/IWarperPresetFactory";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "presetId",
        type: "bytes32",
      },
    ],
    name: "DisabledWarperPreset",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "presetId",
        type: "bytes32",
      },
    ],
    name: "DuplicateWarperPresetId",
    type: "error",
  },
  {
    inputs: [],
    name: "EmptyPresetData",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "presetId",
        type: "bytes32",
      },
    ],
    name: "EnabledWarperPreset",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidWarperPresetInterface",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "presetId",
        type: "bytes32",
      },
    ],
    name: "WarperPresetNotRegistered",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "presetId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "WarperPresetAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "presetId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "warper",
        type: "address",
      },
    ],
    name: "WarperPresetDeployed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "presetId",
        type: "bytes32",
      },
    ],
    name: "WarperPresetDisabled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "presetId",
        type: "bytes32",
      },
    ],
    name: "WarperPresetEnabled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "presetId",
        type: "bytes32",
      },
    ],
    name: "WarperPresetRemoved",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "presetId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "addPreset",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "presetId",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "initData",
        type: "bytes",
      },
    ],
    name: "deployPreset",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "presetId",
        type: "bytes32",
      },
    ],
    name: "disablePreset",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "presetId",
        type: "bytes32",
      },
    ],
    name: "enablePreset",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "presetId",
        type: "bytes32",
      },
    ],
    name: "preset",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "implementation",
            type: "address",
          },
          {
            internalType: "bool",
            name: "enabled",
            type: "bool",
          },
        ],
        internalType: "struct IWarperPresetFactory.WarperPreset",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "presetId",
        type: "bytes32",
      },
    ],
    name: "presetEnabled",
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
    name: "presets",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "implementation",
            type: "address",
          },
          {
            internalType: "bool",
            name: "enabled",
            type: "bool",
          },
        ],
        internalType: "struct IWarperPresetFactory.WarperPreset[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "presetId",
        type: "bytes32",
      },
    ],
    name: "removePreset",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IWarperPresetFactory__factory {
  static readonly abi = _abi;
  static createInterface(): IWarperPresetFactoryInterface {
    return new utils.Interface(_abi) as IWarperPresetFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IWarperPresetFactory {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IWarperPresetFactory;
  }
}
