/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IEnterpriseStorage,
  IEnterpriseStorageInterface,
} from "../IEnterpriseStorage";

const _abi = [
  {
    inputs: [],
    name: "getAvailableReserve",
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
    inputs: [],
    name: "getBaseUri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBondingCurve",
    outputs: [
      {
        internalType: "uint256",
        name: "pole",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "slope",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getConverter",
    outputs: [
      {
        internalType: "contract IConverter",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getEnterpriseToken",
    outputs: [
      {
        internalType: "contract IERC20Metadata",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getGCFeePercent",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getPaymentToken",
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
        internalType: "uint256",
        name: "rentalTokenId",
        type: "uint256",
      },
    ],
    name: "getRentalAgreement",
    outputs: [
      {
        components: [
          {
            internalType: "uint112",
            name: "rentalAmount",
            type: "uint112",
          },
          {
            internalType: "uint16",
            name: "powerTokenIndex",
            type: "uint16",
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
            internalType: "uint32",
            name: "renterOnlyReturnTime",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "enterpriseOnlyCollectionTime",
            type: "uint32",
          },
          {
            internalType: "uint112",
            name: "gcRewardAmount",
            type: "uint112",
          },
          {
            internalType: "uint16",
            name: "gcRewardTokenIndex",
            type: "uint16",
          },
        ],
        internalType: "struct IEnterpriseStorage.RentalAgreement",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getReserve",
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
    inputs: [],
    name: "getUsedReserve",
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
        internalType: "string",
        name: "enterpriseName",
        type: "string",
      },
      {
        internalType: "string",
        name: "baseUri",
        type: "string",
      },
      {
        internalType: "uint16",
        name: "gcFeePercent",
        type: "uint16",
      },
      {
        internalType: "contract IConverter",
        name: "converter",
        type: "address",
      },
      {
        internalType: "contract ProxyAdmin",
        name: "proxyAdmin",
        type: "address",
      },
      {
        internalType: "address",
        name: "initialOwner",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20Metadata",
        name: "enterpriseToken",
        type: "address",
      },
      {
        internalType: "contract IStakeToken",
        name: "stakeToken",
        type: "address",
      },
      {
        internalType: "contract IRentalToken",
        name: "rentalToken",
        type: "address",
      },
    ],
    name: "initializeTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "isSupportedPaymentToken",
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
    name: "owner",
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
];

export class IEnterpriseStorage__factory {
  static readonly abi = _abi;
  static createInterface(): IEnterpriseStorageInterface {
    return new utils.Interface(_abi) as IEnterpriseStorageInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IEnterpriseStorage {
    return new Contract(address, _abi, signerOrProvider) as IEnterpriseStorage;
  }
}
