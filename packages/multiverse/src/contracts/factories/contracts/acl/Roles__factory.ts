/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Roles, RolesInterface } from "../../../contracts/acl/Roles";

const _abi = [
  {
    inputs: [],
    name: "ADMIN",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SUPERVISOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60b7610038600b82828239805160001a607314602b57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe7300000000000000000000000000000000000000003014608060405260043610603d5760003560e01c80632a0acc6a1460425780637b3ba71714605b575b600080fd5b6049600081565b60405190815260200160405180910390f35b60497f060c8eced3c6b422fe5573c862b67b9f6e25a3fc7d9543b14f7aee77b138e70d8156fea2646970667358221220079a03ab508af647d9c069e6a19392bd16cddb7a0ec9ac8a25819b5518d8126c64736f6c634300080d0033";

type RolesConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RolesConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Roles__factory extends ContractFactory {
  constructor(...args: RolesConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Roles> {
    return super.deploy(overrides || {}) as Promise<Roles>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Roles {
    return super.attach(address) as Roles;
  }
  override connect(signer: Signer): Roles__factory {
    return super.connect(signer) as Roles__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RolesInterface {
    return new utils.Interface(_abi) as RolesInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Roles {
    return new Contract(address, _abi, signerOrProvider) as Roles;
  }
}
