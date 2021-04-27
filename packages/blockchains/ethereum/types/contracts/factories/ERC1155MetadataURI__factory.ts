/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { ERC1155MetadataURI } from "../ERC1155MetadataURI";

export class ERC1155MetadataURI__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC1155MetadataURI {
    return new Contract(address, _abi, signerOrProvider) as ERC1155MetadataURI;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "uri",
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
];
