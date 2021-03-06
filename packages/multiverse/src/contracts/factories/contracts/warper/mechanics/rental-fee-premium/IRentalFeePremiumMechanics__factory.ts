/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IRentalFeePremiumMechanics,
  IRentalFeePremiumMechanicsInterface,
} from "../../../../../contracts/warper/mechanics/rental-fee-premium/IRentalFeePremiumMechanics";

const _abi = [
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
      {
        internalType: "uint32",
        name: "rentalPeriod",
        type: "uint32",
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
    name: "__calculatePremiums",
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
];

export class IRentalFeePremiumMechanics__factory {
  static readonly abi = _abi;
  static createInterface(): IRentalFeePremiumMechanicsInterface {
    return new utils.Interface(_abi) as IRentalFeePremiumMechanicsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IRentalFeePremiumMechanics {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IRentalFeePremiumMechanics;
  }
}
