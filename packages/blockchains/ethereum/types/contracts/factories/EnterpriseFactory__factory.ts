/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";

import type { EnterpriseFactory } from "../EnterpriseFactory";

export class EnterpriseFactory__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _powerTokenImpl: string,
    _interestTokenImpl: string,
    _enterpriseImpl: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<EnterpriseFactory> {
    return super.deploy(
      _powerTokenImpl,
      _interestTokenImpl,
      _enterpriseImpl,
      overrides || {}
    ) as Promise<EnterpriseFactory>;
  }
  getDeployTransaction(
    _powerTokenImpl: string,
    _interestTokenImpl: string,
    _enterpriseImpl: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _powerTokenImpl,
      _interestTokenImpl,
      _enterpriseImpl,
      overrides || {}
    );
  }
  attach(address: string): EnterpriseFactory {
    return super.attach(address) as EnterpriseFactory;
  }
  connect(signer: Signer): EnterpriseFactory__factory {
    return super.connect(signer) as EnterpriseFactory__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): EnterpriseFactory {
    return new Contract(address, _abi, signerOrProvider) as EnterpriseFactory;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_powerTokenImpl",
        type: "address",
      },
      {
        internalType: "address",
        name: "_interestTokenImpl",
        type: "address",
      },
      {
        internalType: "address",
        name: "_enterpriseImpl",
        type: "address",
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
        name: "liquidityToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "baseUrl",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "deployed",
        type: "address",
      },
    ],
    name: "EnterpriseDeployed",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "address",
        name: "liquidityToken",
        type: "address",
      },
      {
        internalType: "string",
        name: "baseUrl",
        type: "string",
      },
    ],
    name: "deploy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "enterpriseImpl",
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
    inputs: [],
    name: "interestTokenImpl",
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
    inputs: [],
    name: "powerTokenImpl",
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
];

const _bytecode =
  "0x60e060405234801561001057600080fd5b5060405161069b38038061069b8339818101604052606081101561003357600080fd5b50805160208201516040909201519091906001600160a01b03831661009f576040805162461bcd60e51b815260206004820152601a60248201527f496e76616c696420506f776572546f6b656e2061646472657373000000000000604482015290519081900360640190fd5b6001600160a01b0382166100fa576040805162461bcd60e51b815260206004820152601d60248201527f496e76616c696420496e746572657374546f6b656e2061646472657373000000604482015290519081900360640190fd5b6001600160a01b038116610155576040805162461bcd60e51b815260206004820152601a60248201527f496e76616c696420456e74657270726973652061646472657373000000000000604482015290519081900360640190fd5b6001600160601b0319606093841b811660805291831b821660a05290911b1660c05260805160601c60a05160601c60c05160601c6104e06101bb6000398061015852806101c95250806101a0528061020e52508061017c528061022f52506104e06000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c80639bf6742b14610051578063a17976c314610075578063c1ebf5e11461007d578063f0aa39a214610085575b600080fd5b610059610156565b604080516001600160a01b039092168252519081900360200190f35b61005961017a565b61005961019e565b6101546004803603606081101561009b57600080fd5b8101906020810181356401000000008111156100b657600080fd5b8201836020820111156100c857600080fd5b803590602001918460018302840111640100000000831117156100ea57600080fd5b919390926001600160a01b038335169260408101906020013564010000000081111561011557600080fd5b82018360208201111561012757600080fd5b8035906020019184600183028401116401000000008311171561014957600080fd5b5090925090506101c2565b005b7f000000000000000000000000000000000000000000000000000000000000000081565b7f000000000000000000000000000000000000000000000000000000000000000081565b7f000000000000000000000000000000000000000000000000000000000000000081565b60006101f67f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166103d0565b9050806001600160a01b031663dc3ff57587878787877f00000000000000000000000000000000000000000000000000000000000000007f00000000000000000000000000000000000000000000000000000000000000006040518863ffffffff1660e01b81526004018080602001876001600160a01b0316815260200180602001856001600160a01b03168152602001846001600160a01b0316815260200183810383528a8a82818152602001925080828437600083820152601f01601f191690910184810383528781526020019050878780828437600081840152601f19601f8201169050808301925050509950505050505050505050600060405180830381600087803b15801561030957600080fd5b505af115801561031d573d6000803e3d6000fd5b50505050836001600160a01b03167f82b20733eb6f4b1e4df5b0347f76b7acc9485809c847021f26e1c7af248028068787868686604051808060200180602001846001600160a01b031681526020018381038352888882818152602001925080828437600083820152601f01601f191690910184810383528681526020019050868680828437600083820152604051601f909101601f1916909201829003995090975050505050505050a2505050505050565b60006040517f3d602d80600a3d3981f3363d3d373d3d3d363d7300000000000000000000000081528260601b60148201527f5af43d82803e903d91602b57fd5bf3000000000000000000000000000000000060288201526037816000f09150506001600160a01b0381166104a557604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f455243313136373a20637265617465206661696c656400000000000000000000604482015290519081900360640190fd5b91905056fea264697066735822122018b5c5014012dc7ac3dcc57fefa4cce7e7517baeafb7cd0c418e099974ea8c1264736f6c63430007060033";
