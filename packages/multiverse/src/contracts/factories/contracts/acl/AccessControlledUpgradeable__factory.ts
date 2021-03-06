/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  AccessControlledUpgradeable,
  AccessControlledUpgradeableInterface,
} from "../../../contracts/acl/AccessControlledUpgradeable";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
];

export class AccessControlledUpgradeable__factory {
  static readonly abi = _abi;
  static createInterface(): AccessControlledUpgradeableInterface {
    return new utils.Interface(_abi) as AccessControlledUpgradeableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AccessControlledUpgradeable {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as AccessControlledUpgradeable;
  }
}
