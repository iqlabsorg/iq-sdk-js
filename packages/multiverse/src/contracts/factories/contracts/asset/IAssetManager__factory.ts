/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IAssetManager,
  IAssetManagerInterface,
} from "../../../contracts/asset/IAssetManager";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "assetClass",
        type: "bytes4",
      },
    ],
    name: "assetClassController",
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
        internalType: "address",
        name: "warper",
        type: "address",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "isWarperAdmin",
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
    inputs: [
      {
        internalType: "bytes4",
        name: "assetClass",
        type: "bytes4",
      },
      {
        internalType: "address",
        name: "original",
        type: "address",
      },
    ],
    name: "registerAsset",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "supportedAssetCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "offset",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "limit",
        type: "uint256",
      },
    ],
    name: "supportedAssets",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
      {
        components: [
          {
            internalType: "contract IAssetController",
            name: "controller",
            type: "address",
          },
          {
            internalType: "bytes4",
            name: "assetClass",
            type: "bytes4",
          },
          {
            internalType: "contract IAssetVault",
            name: "vault",
            type: "address",
          },
        ],
        internalType: "struct Assets.AssetConfig[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IAssetManager__factory {
  static readonly abi = _abi;
  static createInterface(): IAssetManagerInterface {
    return new utils.Interface(_abi) as IAssetManagerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IAssetManager {
    return new Contract(address, _abi, signerOrProvider) as IAssetManager;
  }
}
