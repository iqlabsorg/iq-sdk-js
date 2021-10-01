/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  DefaultConverter,
  DefaultConverterInterface,
} from "../DefaultConverter";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "source",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "contract IERC20",
        name: "target",
        type: "address",
      },
    ],
    name: "convert",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "source",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "contract IERC20",
        name: "target",
        type: "address",
      },
    ],
    name: "estimateConvert",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506101a2806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063029b465d1461003b57806329fb92ce1461003b575b600080fd5b61004e6100493660046100de565b610060565b60405190815260200160405180910390f35b6000816001600160a01b0316846001600160a01b03161460405180604001604052806002815260200161199b60f11b815250906100b95760405162461bcd60e51b81526004016100b09190610119565b60405180910390fd5b50919392505050565b80356001600160a01b03811681146100d957600080fd5b919050565b6000806000606084860312156100f2578283fd5b6100fb846100c2565b925060208401359150610110604085016100c2565b90509250925092565b6000602080835283518082850152825b8181101561014557858101830151858201604001528201610129565b818111156101565783604083870101525b50601f01601f191692909201604001939250505056fea264697066735822122047fd7d62d4b39b691824ab59980591dcf52d2ae1a39647ad439a82374cf86a8964736f6c63430008040033";

export class DefaultConverter__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<DefaultConverter> {
    return super.deploy(overrides || {}) as Promise<DefaultConverter>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): DefaultConverter {
    return super.attach(address) as DefaultConverter;
  }
  connect(signer: Signer): DefaultConverter__factory {
    return super.connect(signer) as DefaultConverter__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DefaultConverterInterface {
    return new utils.Interface(_abi) as DefaultConverterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DefaultConverter {
    return new Contract(address, _abi, signerOrProvider) as DefaultConverter;
  }
}
