/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BytesLike,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ERC721ReceiverMock,
  ERC721ReceiverMockInterface,
} from "../../../../contracts/mocks/ERC721Receiver.sol/ERC721ReceiverMock";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "retval",
        type: "bytes4",
      },
      {
        internalType: "enum ERC721ReceiverMock.Error",
        name: "error",
        type: "uint8",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "Received",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60c060405234801561001057600080fd5b506040516104c73803806104c783398101604081905261002f9161006e565b6001600160e01b0319821660805280600381111561004f5761004f6100b9565b60a0816003811115610063576100636100b9565b8152505050506100cf565b6000806040838503121561008157600080fd5b82516001600160e01b03198116811461009957600080fd5b6020840151909250600481106100ae57600080fd5b809150509250929050565b634e487b7160e01b600052602160045260246000fd5b60805160a0516103c76101006000396000818160660152818160eb0152610129015260006101ac01526103c76000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063150b7a0214610030575b600080fd5b61004361003e366004610205565b610060565b6040516001600160e01b0319909116815260200160405180910390f35b600060017f00000000000000000000000000000000000000000000000000000000000000006003811115610096576100966102e1565b036100e75760405162461bcd60e51b815260206004820152601d60248201527f45524337323152656365697665724d6f636b3a20726576657274696e67000000604482015260640160405180910390fd5b60027f0000000000000000000000000000000000000000000000000000000000000000600381111561011b5761011b6102e1565b0361012557600080fd5b60037f00000000000000000000000000000000000000000000000000000000000000006003811115610159576101596102e1565b0361016d57600061016a81806102f7565b50505b7ed9411ae77b2bacabe5cbe62a2abdbeb78992a0182c6f3c83e0029c7615d6b6858585856040516101a19493929190610319565b60405180910390a1507f0000000000000000000000000000000000000000000000000000000000000000949350505050565b80356001600160a01b03811681146101ea57600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b6000806000806080858703121561021b57600080fd5b610224856101d3565b9350610232602086016101d3565b925060408501359150606085013567ffffffffffffffff8082111561025657600080fd5b818701915087601f83011261026a57600080fd5b81358181111561027c5761027c6101ef565b604051601f8201601f19908116603f011681019083821181831017156102a4576102a46101ef565b816040528281528a60208487010111156102bd57600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b634e487b7160e01b600052602160045260246000fd5b60008261031457634e487b7160e01b600052601260045260246000fd5b500490565b600060018060a01b038087168352602081871681850152856040850152608060608501528451915081608085015260005b828110156103665785810182015185820160a00152810161034a565b8281111561037857600060a084870101525b5050601f01601f19169190910160a0019594505050505056fea2646970667358221220b11728d13cc319edffd9cf2b43c94767be1d159305d04ee84f84338bad2a9d6964736f6c634300080d0033";

type ERC721ReceiverMockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC721ReceiverMockConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC721ReceiverMock__factory extends ContractFactory {
  constructor(...args: ERC721ReceiverMockConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    retval: BytesLike,
    error: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC721ReceiverMock> {
    return super.deploy(
      retval,
      error,
      overrides || {}
    ) as Promise<ERC721ReceiverMock>;
  }
  override getDeployTransaction(
    retval: BytesLike,
    error: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(retval, error, overrides || {});
  }
  override attach(address: string): ERC721ReceiverMock {
    return super.attach(address) as ERC721ReceiverMock;
  }
  override connect(signer: Signer): ERC721ReceiverMock__factory {
    return super.connect(signer) as ERC721ReceiverMock__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC721ReceiverMockInterface {
    return new utils.Interface(_abi) as ERC721ReceiverMockInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC721ReceiverMock {
    return new Contract(address, _abi, signerOrProvider) as ERC721ReceiverMock;
  }
}