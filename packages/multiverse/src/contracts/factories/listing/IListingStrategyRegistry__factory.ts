/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IListingStrategyRegistry,
  IListingStrategyRegistryInterface,
} from "../../listing/IListingStrategyRegistry";

const _abi = [
  {
    inputs: [],
    name: "InvalidListingControllerInterface",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "strategyId",
        type: "bytes4",
      },
    ],
    name: "ListingStrategyIsAlreadyRegistered",
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
    name: "ListingStrategyMismatch",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "strategyId",
        type: "bytes4",
      },
    ],
    name: "UnregisteredListingStrategy",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes4",
        name: "strategyId",
        type: "bytes4",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newController",
        type: "address",
      },
    ],
    name: "ListingStrategyControllerChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes4",
        name: "strategyId",
        type: "bytes4",
      },
      {
        indexed: true,
        internalType: "address",
        name: "controller",
        type: "address",
      },
    ],
    name: "ListingStrategyRegistered",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "strategyId",
        type: "bytes4",
      },
    ],
    name: "checkRegisteredListingStrategy",
    outputs: [],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "strategyId",
        type: "bytes4",
      },
    ],
    name: "isRegisteredListingStrategy",
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
        name: "strategyId",
        type: "bytes4",
      },
    ],
    name: "listingController",
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
        internalType: "bytes4",
        name: "strategyId",
        type: "bytes4",
      },
    ],
    name: "listingStrategy",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "controller",
            type: "address",
          },
        ],
        internalType: "struct IListingStrategyRegistry.StrategyConfig",
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
        internalType: "bytes4",
        name: "strategyId",
        type: "bytes4",
      },
      {
        components: [
          {
            internalType: "address",
            name: "controller",
            type: "address",
          },
        ],
        internalType: "struct IListingStrategyRegistry.StrategyConfig",
        name: "config",
        type: "tuple",
      },
    ],
    name: "registerListingStrategy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "strategyId",
        type: "bytes4",
      },
      {
        internalType: "address",
        name: "controller",
        type: "address",
      },
    ],
    name: "setListingController",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IListingStrategyRegistry__factory {
  static readonly abi = _abi;
  static createInterface(): IListingStrategyRegistryInterface {
    return new utils.Interface(_abi) as IListingStrategyRegistryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IListingStrategyRegistry {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IListingStrategyRegistry;
  }
}