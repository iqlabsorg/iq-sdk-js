/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ERC20, ERC20Interface } from "../ERC20";

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
      {
        internalType: "uint8",
        name: "decimals_",
        type: "uint8",
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
  "0x608060405234801561001057600080fd5b50610a50806100206000396000f3fe608060405234801561001057600080fd5b50600436106100a45760003560e01c806306fdde03146100a9578063095ea7b3146100c75780631624f6c6146100ea57806318160ddd146100ff57806323b872dd14610111578063313ce56714610124578063395093511461013957806370a082311461014c57806395d89b4114610175578063a457c2d71461017d578063a9059cbb14610190578063dd62ed3e146101a3575b600080fd5b6100b16101dc565b6040516100be9190610931565b60405180910390f35b6100da6100d536600461088f565b61026e565b60405190151581526020016100be565b6100fd6100f83660046108b8565b610284565b005b6002545b6040519081526020016100be565b6100da61011f366004610854565b610313565b60055460405160ff90911681526020016100be565b6100da61014736600461088f565b6103a2565b61010361015a366004610801565b6001600160a01b031660009081526020819052604090205490565b6100b16103d9565b6100da61018b36600461088f565b6103e8565b6100da61019e36600461088f565b610460565b6101036101b1366004610822565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6060600380546101eb906109b3565b80601f0160208091040260200160405190810160405280929190818152602001828054610217906109b3565b80156102645780601f1061023957610100808354040283529160200191610264565b820191906000526020600020905b81548152906001019060200180831161024757829003601f168201915b5050505050905090565b600061027b33848461046f565b50600192915050565b60038054610291906109b3565b6040805180820190915260018152601960f91b60208201529150156102d25760405162461bcd60e51b81526004016102c99190610931565b60405180910390fd5b5082516102e69060039060208601906106c6565b5081516102fa9060049060208501906106c6565b506005805460ff191660ff929092169190911790555050565b60006103228484846000610552565b6001600160a01b03841660009081526001602090815260408083203384528252918290205482518084019093526002835261031360f41b9183019190915290838210156103825760405162461bcd60e51b81526004016102c99190610931565b506103978533610392868561099c565b61046f565b506001949350505050565b3360008181526001602090815260408083206001600160a01b0387168452909152812054909161027b918590610392908690610984565b6060600480546101eb906109b3565b3360009081526001602090815260408083206001600160a01b038616845282528083205481518083019092526002825261313160f01b92820192909252838210156104465760405162461bcd60e51b81526004016102c99190610931565b506104563385610392868561099c565b5060019392505050565b600061027b3384846000610552565b604080518082019091526002815261062760f31b60208201526001600160a01b0384166104af5760405162461bcd60e51b81526004016102c99190610931565b50604080518082019091526002815261313960f01b60208201526001600160a01b0383166104f05760405162461bcd60e51b81526004016102c99190610931565b506001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b604080518082019091526002815261189960f11b60208201526001600160a01b0385166105925760405162461bcd60e51b81526004016102c99190610931565b50604080518082019091526002815261313360f01b60208201526001600160a01b0384166105d35760405162461bcd60e51b81526004016102c99190610931565b506001600160a01b0384166000908152602081815260409182902054825180840190935260028352610c4d60f21b91830191909152908382101561062a5760405162461bcd60e51b81526004016102c99190610931565b50610635838261099c565b6001600160a01b03808716600090815260208190526040808220939093559086168152908120805485929061066b908490610984565b92505081905550836001600160a01b0316856001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef856040516106b791815260200190565b60405180910390a35050505050565b8280546106d2906109b3565b90600052602060002090601f0160209004810192826106f4576000855561073a565b82601f1061070d57805160ff191683800117855561073a565b8280016001018555821561073a579182015b8281111561073a57825182559160200191906001019061071f565b5061074692915061074a565b5090565b5b80821115610746576000815560010161074b565b80356001600160a01b038116811461077657600080fd5b919050565b600082601f83011261078b578081fd5b81356001600160401b03808211156107a5576107a5610a04565b604051601f8301601f19908116603f011681019082821181831017156107cd576107cd610a04565b816040528381528660208588010111156107e5578485fd5b8360208701602083013792830160200193909352509392505050565b600060208284031215610812578081fd5b61081b8261075f565b9392505050565b60008060408385031215610834578081fd5b61083d8361075f565b915061084b6020840161075f565b90509250929050565b600080600060608486031215610868578081fd5b6108718461075f565b925061087f6020850161075f565b9150604084013590509250925092565b600080604083850312156108a1578182fd5b6108aa8361075f565b946020939093013593505050565b6000806000606084860312156108cc578283fd5b83356001600160401b03808211156108e2578485fd5b6108ee8783880161077b565b94506020860135915080821115610903578384fd5b506109108682870161077b565b925050604084013560ff81168114610926578182fd5b809150509250925092565b6000602080835283518082850152825b8181101561095d57858101830151858201604001528201610941565b8181111561096e5783604083870101525b50601f01601f1916929092016040019392505050565b60008219821115610997576109976109ee565b500190565b6000828210156109ae576109ae6109ee565b500390565b600181811c908216806109c757607f821691505b602082108114156109e857634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea26469706673582212204b7a5972d07e2d969d5aad98581f599b928ddd9bad9db3e922926a58cded045964736f6c63430008040033";

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
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC20Interface {
    return new utils.Interface(_abi) as ERC20Interface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): ERC20 {
    return new Contract(address, _abi, signerOrProvider) as ERC20;
  }
}
