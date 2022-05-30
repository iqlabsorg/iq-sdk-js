/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IAssetVault,
  IAssetVaultInterface,
} from "../../../contracts/asset/IAssetVault";

const _abi = [
  {
    inputs: [],
    name: "AssetDepositIsNotAllowed",
    type: "error",
  },
  {
    inputs: [],
    name: "AssetNotFound",
    type: "error",
  },
  {
    inputs: [],
    name: "AssetReturnIsNotAllowed",
    type: "error",
  },
  {
    inputs: [],
    name: "VaultIsInRecoveryMode",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "RecoveryModeActivated",
    type: "event",
  },
  {
    inputs: [],
    name: "assetClass",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "isRecovery",
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
    name: "metahub",
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
    name: "pause",
    outputs: [],
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
    inputs: [],
    name: "switchToRecoveryMode",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IAssetVault__factory {
  static readonly abi = _abi;
  static createInterface(): IAssetVaultInterface {
    return new utils.Interface(_abi) as IAssetVaultInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IAssetVault {
    return new Contract(address, _abi, signerOrProvider) as IAssetVault;
  }
}