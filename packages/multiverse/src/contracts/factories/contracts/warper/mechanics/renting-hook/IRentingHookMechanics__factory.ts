/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IRentingHookMechanics,
  IRentingHookMechanicsInterface,
} from "../../../../../contracts/warper/mechanics/renting-hook/IRentingHookMechanics";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "reason",
        type: "string",
      },
    ],
    name: "RentingHookError",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "rentalId",
        type: "uint256",
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
      {
        components: [
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
            name: "warpedAsset",
            type: "tuple",
          },
          {
            internalType: "bytes32",
            name: "collectionId",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "listingId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "renter",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "startTime",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "endTime",
            type: "uint32",
          },
          {
            components: [
              {
                internalType: "bytes4",
                name: "strategy",
                type: "bytes4",
              },
              {
                internalType: "bytes",
                name: "data",
                type: "bytes",
              },
            ],
            internalType: "struct Listings.Params",
            name: "listingParams",
            type: "tuple",
          },
        ],
        internalType: "struct Rentings.Agreement",
        name: "rentalAgreement",
        type: "tuple",
      },
      {
        components: [
          {
            components: [
              {
                internalType: "enum IPaymentManager.EarningType",
                name: "earningType",
                type: "uint8",
              },
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
            ],
            internalType: "struct Accounts.UserEarning[]",
            name: "userEarnings",
            type: "tuple[]",
          },
          {
            internalType: "uint256",
            name: "universeId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "universeEarningValue",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "universeEarningToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "protocolEarningValue",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "protocolEarningToken",
            type: "address",
          },
        ],
        internalType: "struct Accounts.RentalEarnings",
        name: "rentalEarnings",
        type: "tuple",
      },
    ],
    name: "__onRent",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
      {
        internalType: "string",
        name: "errorMessage",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IRentingHookMechanics__factory {
  static readonly abi = _abi;
  static createInterface(): IRentingHookMechanicsInterface {
    return new utils.Interface(_abi) as IRentingHookMechanicsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IRentingHookMechanics {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IRentingHookMechanics;
  }
}
