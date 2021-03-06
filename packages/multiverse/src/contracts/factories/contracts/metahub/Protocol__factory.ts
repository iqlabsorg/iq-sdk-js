/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  Protocol,
  ProtocolInterface,
} from "../../../contracts/metahub/Protocol";

const _abi = [
  {
    inputs: [],
    name: "BaseTokenMismatch",
    type: "error",
  },
];

const _bytecode =
  "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea26469706673582212205fff6d253f5859c9b16adfbc8eee440446499aa9c30d57af49ab5e85d3c18ebb64736f6c634300080d0033";

type ProtocolConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ProtocolConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Protocol__factory extends ContractFactory {
  constructor(...args: ProtocolConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Protocol> {
    return super.deploy(overrides || {}) as Promise<Protocol>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Protocol {
    return super.attach(address) as Protocol;
  }
  override connect(signer: Signer): Protocol__factory {
    return super.connect(signer) as Protocol__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ProtocolInterface {
    return new utils.Interface(_abi) as ProtocolInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Protocol {
    return new Contract(address, _abi, signerOrProvider) as Protocol;
  }
}
