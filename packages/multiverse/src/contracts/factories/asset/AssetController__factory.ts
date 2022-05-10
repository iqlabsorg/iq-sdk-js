/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  AssetController,
  AssetControllerInterface,
} from "../../asset/AssetController";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "provided",
        type: "bytes4",
      },
      {
        internalType: "bytes4",
        name: "required",
        type: "bytes4",
      },
    ],
    name: "AssetClassMismatch",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "bytes4",
                name: "class",
                type: "bytes4",
              },
              {
                internalType: "bytes",
                name: "data",
                type: "bytes",
              },
            ],
            internalType: "struct Assets.AssetId",
            name: "id",
            type: "tuple",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct Assets.Asset",
        name: "asset",
        type: "tuple",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "AssetTransfer",
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
    inputs: [
      {
        components: [
          {
            internalType: "bytes4",
            name: "class",
            type: "bytes4",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct Assets.AssetId",
        name: "assetId",
        type: "tuple",
      },
    ],
    name: "collectionId",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "bytes4",
                name: "class",
                type: "bytes4",
              },
              {
                internalType: "bytes",
                name: "data",
                type: "bytes",
              },
            ],
            internalType: "struct Assets.AssetId",
            name: "id",
            type: "tuple",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        internalType: "struct Assets.Asset",
        name: "asset",
        type: "tuple",
      },
      {
        internalType: "address",
        name: "vault",
        type: "address",
      },
    ],
    name: "returnAssetFromVault",
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
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "bytes4",
                name: "class",
                type: "bytes4",
              },
              {
                internalType: "bytes",
                name: "data",
                type: "bytes",
              },
            ],
            internalType: "struct Assets.AssetId",
            name: "id",
            type: "tuple",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        internalType: "struct Assets.Asset",
        name: "asset",
        type: "tuple",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "transfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "bytes4",
                name: "class",
                type: "bytes4",
              },
              {
                internalType: "bytes",
                name: "data",
                type: "bytes",
              },
            ],
            internalType: "struct Assets.AssetId",
            name: "id",
            type: "tuple",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        internalType: "struct Assets.Asset",
        name: "asset",
        type: "tuple",
      },
      {
        internalType: "address",
        name: "assetOwner",
        type: "address",
      },
      {
        internalType: "address",
        name: "vault",
        type: "address",
      },
    ],
    name: "transferAssetToVault",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class AssetController__factory {
  static readonly abi = _abi;
  static createInterface(): AssetControllerInterface {
    return new utils.Interface(_abi) as AssetControllerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AssetController {
    return new Contract(address, _abi, signerOrProvider) as AssetController;
  }
}