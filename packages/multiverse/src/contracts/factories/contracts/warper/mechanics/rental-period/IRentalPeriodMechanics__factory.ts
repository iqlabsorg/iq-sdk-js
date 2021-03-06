/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IRentalPeriodMechanics,
  IRentalPeriodMechanicsInterface,
} from "../../../../../contracts/warper/mechanics/rental-period/IRentalPeriodMechanics";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint32",
        name: "requestedRentalPeriod",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "minRentalPeriod",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "maxRentalPeriod",
        type: "uint32",
      },
    ],
    name: "WarperRentalPeriodIsOutOfRange",
    type: "error",
  },
  {
    inputs: [],
    name: "__maxRentalPeriod",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "__minRentalPeriod",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "__rentalPeriodRange",
    outputs: [
      {
        internalType: "uint32",
        name: "minRentalPeriod",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "maxRentalPeriod",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IRentalPeriodMechanics__factory {
  static readonly abi = _abi;
  static createInterface(): IRentalPeriodMechanicsInterface {
    return new utils.Interface(_abi) as IRentalPeriodMechanicsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IRentalPeriodMechanics {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IRentalPeriodMechanics;
  }
}
