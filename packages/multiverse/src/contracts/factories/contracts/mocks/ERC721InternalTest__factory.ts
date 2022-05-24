/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ERC721InternalTest,
  ERC721InternalTestInterface,
} from "../../../contracts/mocks/ERC721InternalTest";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
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
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
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
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
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
    inputs: [
      {
        internalType: "string",
        name: "newTokenURI",
        type: "string",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
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
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
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
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "newTokenURI",
        type: "string",
      },
    ],
    name: "setTokenURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
    name: "symbol",
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
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
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
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620016c0380380620016c08339810160408190526200003491620001e1565b8151829082906200004d9060009060208501906200006e565b508051620000639060019060208401906200006e565b505050505062000287565b8280546200007c906200024b565b90600052602060002090601f016020900481019282620000a05760008555620000eb565b82601f10620000bb57805160ff1916838001178555620000eb565b82800160010185558215620000eb579182015b82811115620000eb578251825591602001919060010190620000ce565b50620000f9929150620000fd565b5090565b5b80821115620000f95760008155600101620000fe565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200013c57600080fd5b81516001600160401b038082111562000159576200015962000114565b604051601f8301601f19908116603f0116810190828211818310171562000184576200018462000114565b81604052838152602092508683858801011115620001a157600080fd5b600091505b83821015620001c55785820183015181830184015290820190620001a6565b83821115620001d75760008385830101525b9695505050505050565b60008060408385031215620001f557600080fd5b82516001600160401b03808211156200020d57600080fd5b6200021b868387016200012a565b935060208501519150808211156200023257600080fd5b5062000241858286016200012a565b9150509250929050565b600181811c908216806200026057607f821691505b6020821081036200028157634e487b7160e01b600052602260045260246000fd5b50919050565b61142980620002976000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c80636352211e11610097578063b88d4fde11610066578063b88d4fde146101ff578063c87b56dd14610212578063d85d3d2714610225578063e985e9c51461023857600080fd5b80636352211e146101b057806370a08231146101c357806395d89b41146101e4578063a22cb465146101ec57600080fd5b8063095ea7b3116100d3578063095ea7b314610162578063162094c41461017757806323b872dd1461018a57806342842e0e1461019d57600080fd5b806301ffc9a7146100fa57806306fdde0314610122578063081812fc14610137575b600080fd5b61010d610108366004610f2a565b610274565b60405190151581526020015b60405180910390f35b61012a6102c6565b6040516101199190610f9b565b61014a610145366004610fae565b610358565b6040516001600160a01b039091168152602001610119565b610175610170366004610fe3565b6103f2565b005b6101756101853660046110b9565b610507565b610175610198366004611100565b610526565b6101756101ab366004611100565b610557565b61014a6101be366004610fae565b610572565b6101d66101d136600461113c565b6105e9565b604051908152602001610119565b61012a610670565b6101756101fa366004611157565b61067f565b61017561020d366004611193565b61068e565b61012a610220366004610fae565b6106c6565b61017561023336600461120f565b6107e3565b61010d610246366004611244565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b60006001600160e01b031982166380ac58cd60e01b14806102a557506001600160e01b03198216635b5e139f60e01b145b806102c057506301ffc9a760e01b6001600160e01b03198316145b92915050565b6060600080546102d590611277565b80601f016020809104026020016040519081016040528092919081815260200182805461030190611277565b801561034e5780601f106103235761010080835404028352916020019161034e565b820191906000526020600020905b81548152906001019060200180831161033157829003601f168201915b5050505050905090565b6000818152600260205260408120546001600160a01b03166103d65760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b60006103fd82610572565b9050806001600160a01b0316836001600160a01b03160361046a5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084016103cd565b336001600160a01b038216148061048657506104868133610246565b6104f85760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c000000000000000060648201526084016103cd565b6105028383610836565b505050565b6000828152600760209081526040909120825161050292840190610e7b565b61053033826108a4565b61054c5760405162461bcd60e51b81526004016103cd906112b1565b61050283838361099b565b6105028383836040518060200160405280600081525061068e565b6000818152600260205260408120546001600160a01b0316806102c05760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b60648201526084016103cd565b60006001600160a01b0382166106545760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b60648201526084016103cd565b506001600160a01b031660009081526003602052604090205490565b6060600180546102d590611277565b61068a338383610b37565b5050565b61069833836108a4565b6106b45760405162461bcd60e51b81526004016103cd906112b1565b6106c084848484610c05565b50505050565b6000818152600260205260409020546060906001600160a01b03166107455760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b60648201526084016103cd565b6000828152600760205260409020805461075e90611277565b80601f016020809104026020016040519081016040528092919081815260200182805461078a90611277565b80156107d75780601f106107ac576101008083540402835291602001916107d7565b820191906000526020600020905b8154815290600101906020018083116107ba57829003601f168201915b50505050509050919050565b6107f5336107f060065490565b610c38565b806007600061080360065490565b81526020019081526020016000209080519060200190610824929190610e7b565b50610833600680546001019055565b50565b600081815260046020526040902080546001600160a01b0319166001600160a01b038416908117909155819061086b82610572565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000818152600260205260408120546001600160a01b031661091d5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084016103cd565b600061092883610572565b9050806001600160a01b0316846001600160a01b031614806109635750836001600160a01b031661095884610358565b6001600160a01b0316145b8061099357506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b949350505050565b826001600160a01b03166109ae82610572565b6001600160a01b031614610a125760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b60648201526084016103cd565b6001600160a01b038216610a745760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016103cd565b610a7f600082610836565b6001600160a01b0383166000908152600360205260408120805460019290610aa8908490611318565b90915550506001600160a01b0382166000908152600360205260408120805460019290610ad690849061132f565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b816001600160a01b0316836001600160a01b031603610b985760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016103cd565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b610c1084848461099b565b610c1c84848484610d7a565b6106c05760405162461bcd60e51b81526004016103cd90611347565b6001600160a01b038216610c8e5760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f206164647265737360448201526064016103cd565b6000818152600260205260409020546001600160a01b031615610cf35760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016103cd565b6001600160a01b0382166000908152600360205260408120805460019290610d1c90849061132f565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b60006001600160a01b0384163b15610e7057604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610dbe903390899088908890600401611399565b6020604051808303816000875af1925050508015610df9575060408051601f3d908101601f19168201909252610df6918101906113d6565b60015b610e56573d808015610e27576040519150601f19603f3d011682016040523d82523d6000602084013e610e2c565b606091505b508051600003610e4e5760405162461bcd60e51b81526004016103cd90611347565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610993565b506001949350505050565b828054610e8790611277565b90600052602060002090601f016020900481019282610ea95760008555610eef565b82601f10610ec257805160ff1916838001178555610eef565b82800160010185558215610eef579182015b82811115610eef578251825591602001919060010190610ed4565b50610efb929150610eff565b5090565b5b80821115610efb5760008155600101610f00565b6001600160e01b03198116811461083357600080fd5b600060208284031215610f3c57600080fd5b8135610f4781610f14565b9392505050565b6000815180845260005b81811015610f7457602081850181015186830182015201610f58565b81811115610f86576000602083870101525b50601f01601f19169290920160200192915050565b602081526000610f476020830184610f4e565b600060208284031215610fc057600080fd5b5035919050565b80356001600160a01b0381168114610fde57600080fd5b919050565b60008060408385031215610ff657600080fd5b610fff83610fc7565b946020939093013593505050565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff8084111561103e5761103e61100d565b604051601f8501601f19908116603f011681019082821181831017156110665761106661100d565b8160405280935085815286868601111561107f57600080fd5b858560208301376000602087830101525050509392505050565b600082601f8301126110aa57600080fd5b610f4783833560208501611023565b600080604083850312156110cc57600080fd5b82359150602083013567ffffffffffffffff8111156110ea57600080fd5b6110f685828601611099565b9150509250929050565b60008060006060848603121561111557600080fd5b61111e84610fc7565b925061112c60208501610fc7565b9150604084013590509250925092565b60006020828403121561114e57600080fd5b610f4782610fc7565b6000806040838503121561116a57600080fd5b61117383610fc7565b91506020830135801515811461118857600080fd5b809150509250929050565b600080600080608085870312156111a957600080fd5b6111b285610fc7565b93506111c060208601610fc7565b925060408501359150606085013567ffffffffffffffff8111156111e357600080fd5b8501601f810187136111f457600080fd5b61120387823560208401611023565b91505092959194509250565b60006020828403121561122157600080fd5b813567ffffffffffffffff81111561123857600080fd5b61099384828501611099565b6000806040838503121561125757600080fd5b61126083610fc7565b915061126e60208401610fc7565b90509250929050565b600181811c9082168061128b57607f821691505b6020821081036112ab57634e487b7160e01b600052602260045260246000fd5b50919050565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b60008282101561132a5761132a611302565b500390565b6000821982111561134257611342611302565b500190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6001600160a01b03858116825284166020820152604081018390526080606082018190526000906113cc90830184610f4e565b9695505050505050565b6000602082840312156113e857600080fd5b8151610f4781610f1456fea264697066735822122035de8075ea2e610b61a737d770034bad4a37dcaf0bbbf75d9ec92410e45b69df64736f6c634300080d0033";

type ERC721InternalTestConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC721InternalTestConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC721InternalTest__factory extends ContractFactory {
  constructor(...args: ERC721InternalTestConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    name: string,
    symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC721InternalTest> {
    return super.deploy(
      name,
      symbol,
      overrides || {}
    ) as Promise<ERC721InternalTest>;
  }
  override getDeployTransaction(
    name: string,
    symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name, symbol, overrides || {});
  }
  override attach(address: string): ERC721InternalTest {
    return super.attach(address) as ERC721InternalTest;
  }
  override connect(signer: Signer): ERC721InternalTest__factory {
    return super.connect(signer) as ERC721InternalTest__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC721InternalTestInterface {
    return new utils.Interface(_abi) as ERC721InternalTestInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC721InternalTest {
    return new Contract(address, _abi, signerOrProvider) as ERC721InternalTest;
  }
}
