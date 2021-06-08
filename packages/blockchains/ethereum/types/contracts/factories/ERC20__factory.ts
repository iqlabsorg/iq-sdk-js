/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";

import type { ERC20 } from "../ERC20";

export class ERC20__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC20> {
    return super.deploy(overrides || {}) as Promise<ERC20>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ERC20 {
    return super.attach(address) as ERC20;
  }
  connect(signer: Signer): ERC20__factory {
    return super.connect(signer) as ERC20__factory;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): ERC20 {
    return new Contract(address, _abi, signerOrProvider) as ERC20;
  }
}

const _abi = [
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
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
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
        indexed: false,
        internalType: "uint256",
        name: "value",
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
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
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
    ],
    name: "initialize",
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
    inputs: [],
    name: "totalSupply",
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
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610a1d806100206000396000f3fe608060405234801561001057600080fd5b50600436106100a45760003560e01c806306fdde03146100a9578063095ea7b3146100c757806318160ddd146100ea57806323b872dd146100fc578063313ce5671461010f578063395093511461011e5780634cd88b761461013157806370a082311461014657806395d89b411461016f578063a457c2d714610177578063a9059cbb1461018a578063dd62ed3e1461019d575b600080fd5b6100b16101d6565b6040516100be91906108fe565b60405180910390f35b6100da6100d5366004610875565b610268565b60405190151581526020016100be565b6002545b6040519081526020016100be565b6100da61010a36600461083a565b61027e565b604051601281526020016100be565b6100da61012c366004610875565b610316565b61014461013f36600461089e565b61034d565b005b6100ee6101543660046107e7565b6001600160a01b031660009081526020819052604090205490565b6100b16103bf565b6100da610185366004610875565b6103ce565b6100da610198366004610875565b610446565b6100ee6101ab366004610808565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6060600380546101e590610980565b80601f016020809104026020016040519081016040528092919081815260200182805461021190610980565b801561025e5780601f106102335761010080835404028352916020019161025e565b820191906000526020600020905b81548152906001019060200180831161024157829003601f168201915b5050505050905090565b6000610275338484610455565b50600192915050565b600061028d8484846000610538565b6001600160a01b03841660009081526001602090815260408083203384528252918290205482518084019093526002835261031360f41b9183019190915290838210156102f65760405162461bcd60e51b81526004016102ed91906108fe565b60405180910390fd5b5061030b85336103068685610969565b610455565b506001949350505050565b3360008181526001602090815260408083206001600160a01b03871684529091528120549091610275918590610306908690610951565b6003805461035a90610980565b6040805180820190915260018152601960f91b60208201529150156103925760405162461bcd60e51b81526004016102ed91906108fe565b5081516103a69060039060208501906106ac565b5080516103ba9060049060208401906106ac565b505050565b6060600480546101e590610980565b3360009081526001602090815260408083206001600160a01b038616845282528083205481518083019092526002825261313160f01b928201929092528382101561042c5760405162461bcd60e51b81526004016102ed91906108fe565b5061043c33856103068685610969565b5060019392505050565b60006102753384846000610538565b604080518082019091526002815261062760f31b60208201526001600160a01b0384166104955760405162461bcd60e51b81526004016102ed91906108fe565b50604080518082019091526002815261313960f01b60208201526001600160a01b0383166104d65760405162461bcd60e51b81526004016102ed91906108fe565b506001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b604080518082019091526002815261189960f11b60208201526001600160a01b0385166105785760405162461bcd60e51b81526004016102ed91906108fe565b50604080518082019091526002815261313360f01b60208201526001600160a01b0384166105b95760405162461bcd60e51b81526004016102ed91906108fe565b506001600160a01b0384166000908152602081815260409182902054825180840190935260028352610c4d60f21b9183019190915290838210156106105760405162461bcd60e51b81526004016102ed91906108fe565b5061061b8382610969565b6001600160a01b038087166000908152602081905260408082209390935590861681529081208054859290610651908490610951565b92505081905550836001600160a01b0316856001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8560405161069d91815260200190565b60405180910390a35050505050565b8280546106b890610980565b90600052602060002090601f0160209004810192826106da5760008555610720565b82601f106106f357805160ff1916838001178555610720565b82800160010185558215610720579182015b82811115610720578251825591602001919060010190610705565b5061072c929150610730565b5090565b5b8082111561072c5760008155600101610731565b80356001600160a01b038116811461075c57600080fd5b919050565b600082601f830112610771578081fd5b81356001600160401b038082111561078b5761078b6109d1565b604051601f8301601f19908116603f011681019082821181831017156107b3576107b36109d1565b816040528381528660208588010111156107cb578485fd5b8360208701602083013792830160200193909352509392505050565b6000602082840312156107f8578081fd5b61080182610745565b9392505050565b6000806040838503121561081a578081fd5b61082383610745565b915061083160208401610745565b90509250929050565b60008060006060848603121561084e578081fd5b61085784610745565b925061086560208501610745565b9150604084013590509250925092565b60008060408385031215610887578182fd5b61089083610745565b946020939093013593505050565b600080604083850312156108b0578182fd5b82356001600160401b03808211156108c6578384fd5b6108d286838701610761565b935060208501359150808211156108e7578283fd5b506108f485828601610761565b9150509250929050565b6000602080835283518082850152825b8181101561092a5785810183015185820160400152820161090e565b8181111561093b5783604083870101525b50601f01601f1916929092016040019392505050565b60008219821115610964576109646109bb565b500190565b60008282101561097b5761097b6109bb565b500390565b600181811c9082168061099457607f821691505b602082108114156109b557634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea2646970667358221220631d21a9c20e8993b89d21a1dd2e9e3f04830c591f340ecf742a555bbddd7be364736f6c63430008040033";
