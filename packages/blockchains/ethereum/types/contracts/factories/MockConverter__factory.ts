/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";

import type { MockConverter } from "../MockConverter";

export class MockConverter__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<MockConverter> {
    return super.deploy(overrides || {}) as Promise<MockConverter>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): MockConverter {
    return super.attach(address) as MockConverter;
  }
  connect(signer: Signer): MockConverter__factory {
    return super.connect(signer) as MockConverter__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockConverter {
    return new Contract(address, _abi, signerOrProvider) as MockConverter;
  }
}

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
    stateMutability: "nonpayable",
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
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20Metadata",
        name: "source",
        type: "address",
      },
      {
        internalType: "contract IERC20Metadata",
        name: "target",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "rate",
        type: "uint256",
      },
    ],
    name: "setRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610a9c806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063029b465d1461004657806329fb92ce1461006b5780635911fb9a1461007e575b600080fd5b610059610054366004610884565b610093565b60405190815260200160405180910390f35b610059610079366004610884565b6101d8565b61009161008c366004610844565b61020e565b005b6000816001600160a01b0316846001600160a01b031614156100b65750816101d1565b60006100c385858561037a565b6040516323b872dd60e01b8152336004820152306024820152604481018690529091506001600160a01b038616906323b872dd90606401602060405180830381600087803b15801561011457600080fd5b505af1158015610128573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061014c9190610824565b5060405163a9059cbb60e01b8152336004820152602481018290526001600160a01b0384169063a9059cbb90604401602060405180830381600087803b15801561019557600080fd5b505af11580156101a9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101cd9190610824565b5090505b9392505050565b6000816001600160a01b0316846001600160a01b031614156101fb5750816101d1565b61020684848461037a565b949350505050565b6001600160a01b038084166000818152602081815260408083209487168352938152838220859055835163313ce56760e01b81529351919363313ce5679260048083019392829003018186803b15801561026757600080fd5b505afa15801561027b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061029f91906108c5565b6102aa90600a610949565b90506000610349858585886001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b1580156102ed57600080fd5b505afa158015610301573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061032591906108c5565b61033090600a610949565b61033a90876109f6565b61034491906108e6565b610436565b6001600160a01b03948516600090815260208181526040808320989097168252969096529390942092909255505050565b6001600160a01b03808416600081815260208181526040808320948616835293815283822054845163313ce56760e01b81529451929490938593909263313ce5679260048082019391829003018186803b1580156103d757600080fd5b505afa1580156103eb573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061040f91906108c5565b61041a90600a610949565b905061042c86858461033a858a6109f6565b9695505050505050565b6000826001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b15801561047157600080fd5b505afa158015610485573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104a991906108c5565b60ff16846001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b1580156104e557600080fd5b505afa1580156104f9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061051d91906108c5565b60ff16111561062e57826001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b15801561055f57600080fd5b505afa158015610573573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061059791906108c5565b846001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b1580156105d057600080fd5b505afa1580156105e4573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061060891906108c5565b6106129190610a15565b61061d90600a610949565b61062790836108e6565b90506101d1565b826001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b15801561066757600080fd5b505afa15801561067b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061069f91906108c5565b60ff16846001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b1580156106db57600080fd5b505afa1580156106ef573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061071391906108c5565b60ff16101561081d57836001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b15801561075557600080fd5b505afa158015610769573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061078d91906108c5565b836001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b1580156107c657600080fd5b505afa1580156107da573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107fe91906108c5565b6108089190610a15565b61081390600a610949565b61062790836109f6565b5092915050565b600060208284031215610835578081fd5b815180151581146101d1578182fd5b600080600060608486031215610858578182fd5b833561086381610a4e565b9250602084013561087381610a4e565b929592945050506040919091013590565b600080600060608486031215610898578283fd5b83356108a381610a4e565b92506020840135915060408401356108ba81610a4e565b809150509250925092565b6000602082840312156108d6578081fd5b815160ff811681146101d1578182fd5b60008261090157634e487b7160e01b81526012600452602481fd5b500490565b600181815b8085111561094157816000190482111561092757610927610a38565b8085161561093457918102915b93841c939080029061090b565b509250929050565b60006101d160ff841683600082610962575060016109f0565b8161096f575060006109f0565b8160018114610985576002811461098f576109ab565b60019150506109f0565b60ff8411156109a0576109a0610a38565b50506001821b6109f0565b5060208310610133831016604e8410600b84101617156109ce575081810a6109f0565b6109d88383610906565b80600019048211156109ec576109ec610a38565b0290505b92915050565b6000816000190483118215151615610a1057610a10610a38565b500290565b600060ff821660ff841680821015610a2f57610a2f610a38565b90039392505050565b634e487b7160e01b600052601160045260246000fd5b6001600160a01b0381168114610a6357600080fd5b5056fea2646970667358221220af25b3757bdb5acaa73693940d705f102fdcb921c62d74ad15d12a6814acf9a364736f6c63430008040033";