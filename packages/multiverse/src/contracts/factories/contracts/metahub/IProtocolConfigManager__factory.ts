/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IProtocolConfigManager,
  IProtocolConfigManagerInterface,
} from "../../../contracts/metahub/IProtocolConfigManager";

const _abi = [
  {
    inputs: [],
    name: "CallerIsNotWarperManager",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint16",
        name: "rentalFeePercent",
        type: "uint16",
      },
    ],
    name: "ProtocolRentalFeeChanged",
    type: "event",
  },
  {
    inputs: [],
    name: "baseToken",
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
    name: "protocolRentalFeePercent",
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
        internalType: "uint16",
        name: "rentalFeePercent",
        type: "uint16",
      },
    ],
    name: "setProtocolRentalFeePercent",
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
    name: "warperController",
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

export class IProtocolConfigManager__factory {
  static readonly abi = _abi;
  static createInterface(): IProtocolConfigManagerInterface {
    return new utils.Interface(_abi) as IProtocolConfigManagerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IProtocolConfigManager {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IProtocolConfigManager;
  }
}
