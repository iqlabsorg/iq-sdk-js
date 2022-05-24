/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ERC721Mock,
  ERC721MockInterface,
} from "../../../contracts/mocks/ERC721Mock";

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
  "0x60806040523480156200001157600080fd5b506040516200165e3803806200165e8339810160408190526200003491620001e1565b8151829082906200004d9060009060208501906200006e565b508051620000639060019060208401906200006e565b505050505062000287565b8280546200007c906200024b565b90600052602060002090601f016020900481019282620000a05760008555620000eb565b82601f10620000bb57805160ff1916838001178555620000eb565b82800160010185558215620000eb579182015b82811115620000eb578251825591602001919060010190620000ce565b50620000f9929150620000fd565b5090565b5b80821115620000f95760008155600101620000fe565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200013c57600080fd5b81516001600160401b038082111562000159576200015962000114565b604051601f8301601f19908116603f0116810190828211818310171562000184576200018462000114565b81604052838152602092508683858801011115620001a157600080fd5b600091505b83821015620001c55785820183015181830184015290820190620001a6565b83821115620001d75760008385830101525b9695505050505050565b60008060408385031215620001f557600080fd5b82516001600160401b03808211156200020d57600080fd5b6200021b868387016200012a565b935060208501519150808211156200023257600080fd5b5062000241858286016200012a565b9150509250929050565b600181811c908216806200026057607f821691505b6020821081036200028157634e487b7160e01b600052602260045260246000fd5b50919050565b6113c780620002976000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c80636352211e1161008c578063a22cb46511610066578063a22cb465146101e1578063b88d4fde146101f4578063c87b56dd14610207578063e985e9c51461021a57600080fd5b80636352211e146101a557806370a08231146101b857806395d89b41146101d957600080fd5b8063095ea7b3116100c8578063095ea7b31461015757806323b872dd1461016c57806340c10f191461017f57806342842e0e1461019257600080fd5b806301ffc9a7146100ef57806306fdde0314610117578063081812fc1461012c575b600080fd5b6101026100fd366004610eda565b610256565b60405190151581526020015b60405180910390f35b61011f6102a8565b60405161010e9190610f4f565b61013f61013a366004610f62565b61033a565b6040516001600160a01b03909116815260200161010e565b61016a610165366004610f97565b6103d4565b005b61016a61017a366004610fc1565b6104e9565b61016a61018d366004610f97565b61051a565b61016a6101a0366004610fc1565b610528565b61013f6101b3366004610f62565b610543565b6101cb6101c6366004610ffd565b6105ba565b60405190815260200161010e565b61011f610641565b61016a6101ef366004611018565b610650565b61016a61020236600461106a565b61065b565b61011f610215366004610f62565b610693565b610102610228366004611146565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b60006001600160e01b031982166380ac58cd60e01b148061028757506001600160e01b03198216635b5e139f60e01b145b806102a257506301ffc9a760e01b6001600160e01b03198316145b92915050565b6060600080546102b790611179565b80601f01602080910402602001604051908101604052809291908181526020018280546102e390611179565b80156103305780601f1061030557610100808354040283529160200191610330565b820191906000526020600020905b81548152906001019060200180831161031357829003601f168201915b5050505050905090565b6000818152600260205260408120546001600160a01b03166103b85760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b60006103df82610543565b9050806001600160a01b0316836001600160a01b03160361044c5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084016103af565b336001600160a01b038216148061046857506104688133610228565b6104da5760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c000000000000000060648201526084016103af565b6104e4838361077b565b505050565b6104f333826107e9565b61050f5760405162461bcd60e51b81526004016103af906111b3565b6104e48383836108e0565b6105248282610a7c565b5050565b6104e48383836040518060200160405280600081525061065b565b6000818152600260205260408120546001600160a01b0316806102a25760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b60648201526084016103af565b60006001600160a01b0382166106255760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b60648201526084016103af565b506001600160a01b031660009081526003602052604090205490565b6060600180546102b790611179565b610524338383610bbe565b61066533836107e9565b6106815760405162461bcd60e51b81526004016103af906111b3565b61068d84848484610c8c565b50505050565b6000818152600260205260409020546060906001600160a01b03166107125760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b60648201526084016103af565b600061072960408051602081019091526000815290565b905060008151116107495760405180602001604052806000815250610774565b8061075384610cbf565b604051602001610764929190611204565b6040516020818303038152906040525b9392505050565b600081815260046020526040902080546001600160a01b0319166001600160a01b03841690811790915581906107b082610543565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000818152600260205260408120546001600160a01b03166108625760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084016103af565b600061086d83610543565b9050806001600160a01b0316846001600160a01b031614806108a85750836001600160a01b031661089d8461033a565b6001600160a01b0316145b806108d857506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b949350505050565b826001600160a01b03166108f382610543565b6001600160a01b0316146109575760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b60648201526084016103af565b6001600160a01b0382166109b95760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016103af565b6109c460008261077b565b6001600160a01b03831660009081526003602052604081208054600192906109ed908490611249565b90915550506001600160a01b0382166000908152600360205260408120805460019290610a1b908490611260565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6001600160a01b038216610ad25760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f206164647265737360448201526064016103af565b6000818152600260205260409020546001600160a01b031615610b375760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016103af565b6001600160a01b0382166000908152600360205260408120805460019290610b60908490611260565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b816001600160a01b0316836001600160a01b031603610c1f5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016103af565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b610c978484846108e0565b610ca384848484610dc0565b61068d5760405162461bcd60e51b81526004016103af90611278565b606081600003610ce65750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610d105780610cfa816112ca565b9150610d099050600a836112f9565b9150610cea565b60008167ffffffffffffffff811115610d2b57610d2b611054565b6040519080825280601f01601f191660200182016040528015610d55576020820181803683370190505b5090505b84156108d857610d6a600183611249565b9150610d77600a8661130d565b610d82906030611260565b60f81b818381518110610d9757610d97611321565b60200101906001600160f81b031916908160001a905350610db9600a866112f9565b9450610d59565b60006001600160a01b0384163b15610eb657604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610e04903390899088908890600401611337565b6020604051808303816000875af1925050508015610e3f575060408051601f3d908101601f19168201909252610e3c91810190611374565b60015b610e9c573d808015610e6d576040519150601f19603f3d011682016040523d82523d6000602084013e610e72565b606091505b508051600003610e945760405162461bcd60e51b81526004016103af90611278565b805181602001fd5b6001600160e01b031916630a85bd0160e11b1490506108d8565b506001949350505050565b6001600160e01b031981168114610ed757600080fd5b50565b600060208284031215610eec57600080fd5b813561077481610ec1565b60005b83811015610f12578181015183820152602001610efa565b8381111561068d5750506000910152565b60008151808452610f3b816020860160208601610ef7565b601f01601f19169290920160200192915050565b6020815260006107746020830184610f23565b600060208284031215610f7457600080fd5b5035919050565b80356001600160a01b0381168114610f9257600080fd5b919050565b60008060408385031215610faa57600080fd5b610fb383610f7b565b946020939093013593505050565b600080600060608486031215610fd657600080fd5b610fdf84610f7b565b9250610fed60208501610f7b565b9150604084013590509250925092565b60006020828403121561100f57600080fd5b61077482610f7b565b6000806040838503121561102b57600080fd5b61103483610f7b565b91506020830135801515811461104957600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b6000806000806080858703121561108057600080fd5b61108985610f7b565b935061109760208601610f7b565b925060408501359150606085013567ffffffffffffffff808211156110bb57600080fd5b818701915087601f8301126110cf57600080fd5b8135818111156110e1576110e1611054565b604051601f8201601f19908116603f0116810190838211818310171561110957611109611054565b816040528281528a602084870101111561112257600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b6000806040838503121561115957600080fd5b61116283610f7b565b915061117060208401610f7b565b90509250929050565b600181811c9082168061118d57607f821691505b6020821081036111ad57634e487b7160e01b600052602260045260246000fd5b50919050565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b60008351611216818460208801610ef7565b83519083019061122a818360208801610ef7565b01949350505050565b634e487b7160e01b600052601160045260246000fd5b60008282101561125b5761125b611233565b500390565b6000821982111561127357611273611233565b500190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6000600182016112dc576112dc611233565b5060010190565b634e487b7160e01b600052601260045260246000fd5b600082611308576113086112e3565b500490565b60008261131c5761131c6112e3565b500690565b634e487b7160e01b600052603260045260246000fd5b6001600160a01b038581168252841660208201526040810183905260806060820181905260009061136a90830184610f23565b9695505050505050565b60006020828403121561138657600080fd5b815161077481610ec156fea264697066735822122012c634e7edea528d6ba8bcde6b5ad50c99a33464a8e0d485f59167f5825f9e5164736f6c634300080d0033";

type ERC721MockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC721MockConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC721Mock__factory extends ContractFactory {
  constructor(...args: ERC721MockConstructorParams) {
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
  ): Promise<ERC721Mock> {
    return super.deploy(name, symbol, overrides || {}) as Promise<ERC721Mock>;
  }
  override getDeployTransaction(
    name: string,
    symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name, symbol, overrides || {});
  }
  override attach(address: string): ERC721Mock {
    return super.attach(address) as ERC721Mock;
  }
  override connect(signer: Signer): ERC721Mock__factory {
    return super.connect(signer) as ERC721Mock__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC721MockInterface {
    return new utils.Interface(_abi) as ERC721MockInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC721Mock {
    return new Contract(address, _abi, signerOrProvider) as ERC721Mock;
  }
}
