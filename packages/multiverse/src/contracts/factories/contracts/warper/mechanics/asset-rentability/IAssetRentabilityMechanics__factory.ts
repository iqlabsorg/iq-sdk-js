/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IAssetRentabilityMechanics,
  IAssetRentabilityMechanicsInterface,
} from "../../../../../contracts/warper/mechanics/asset-rentability/IAssetRentabilityMechanics";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "reason",
        type: "string",
      },
    ],
    name: "AssetIsNotRentable",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "renter",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "__isRentableAsset",
    outputs: [
      {
        internalType: "bool",
        name: "isRentable",
        type: "bool",
      },
      {
        internalType: "string",
        name: "errorMessage",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IAssetRentabilityMechanics__factory {
  static readonly abi = _abi;
  static createInterface(): IAssetRentabilityMechanicsInterface {
    return new utils.Interface(_abi) as IAssetRentabilityMechanicsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IAssetRentabilityMechanics {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IAssetRentabilityMechanics;
  }
}
