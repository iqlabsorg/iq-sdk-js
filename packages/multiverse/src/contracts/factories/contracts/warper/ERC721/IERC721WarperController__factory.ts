/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IERC721WarperController,
  IERC721WarperControllerInterface,
} from "../../../../contracts/warper/ERC721/IERC721WarperController";

const _abi = [
  {
    inputs: [],
    name: "AlreadyRented",
    type: "error",
  },
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
    inputs: [],
    name: "IncompatibleWarperInterface",
    type: "error",
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
        name: "asset",
        type: "address",
      },
    ],
    name: "InvalidAssetForWarper",
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
        components: [
          {
            internalType: "uint256",
            name: "listingId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "warper",
            type: "address",
          },
          {
            internalType: "address",
            name: "renter",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "rentalPeriod",
            type: "uint32",
          },
          {
            internalType: "address",
            name: "paymentToken",
            type: "address",
          },
        ],
        internalType: "struct Rentings.Params",
        name: "rentingParams",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "universeFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "listerFee",
        type: "uint256",
      },
    ],
    name: "calculatePremiums",
    outputs: [
      {
        internalType: "uint256",
        name: "universePremium",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "listerPremium",
        type: "uint256",
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
    ],
    name: "checkCompatibleWarper",
    outputs: [],
    stateMutability: "view",
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
        internalType: "uint256",
        name: "rentalId",
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
    name: "executeRentingHooks",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "warper",
        type: "address",
      },
    ],
    name: "isCompatibleWarper",
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
        internalType: "address",
        name: "metahub",
        type: "address",
      },
      {
        internalType: "address",
        name: "warper",
        type: "address",
      },
      {
        internalType: "address",
        name: "renter",
        type: "address",
      },
    ],
    name: "rentalBalance",
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
        internalType: "address",
        name: "metahub",
        type: "address",
      },
      {
        internalType: "address",
        name: "warper",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "rentalStatus",
    outputs: [
      {
        internalType: "enum Rentings.RentalStatus",
        name: "",
        type: "uint8",
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
        components: [
          {
            internalType: "uint256",
            name: "listingId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "warper",
            type: "address",
          },
          {
            internalType: "address",
            name: "renter",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "rentalPeriod",
            type: "uint32",
          },
          {
            internalType: "address",
            name: "paymentToken",
            type: "address",
          },
        ],
        internalType: "struct Rentings.Params",
        name: "rentingParams",
        type: "tuple",
      },
    ],
    name: "validateRentingParams",
    outputs: [],
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
        name: "warper",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "warp",
    outputs: [
      {
        internalType: "bytes32",
        name: "warpedCollectionId",
        type: "bytes32",
      },
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
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IERC721WarperController__factory {
  static readonly abi = _abi;
  static createInterface(): IERC721WarperControllerInterface {
    return new utils.Interface(_abi) as IERC721WarperControllerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IERC721WarperController {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IERC721WarperController;
  }
}
