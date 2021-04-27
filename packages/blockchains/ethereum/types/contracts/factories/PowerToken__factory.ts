/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";

import type { PowerToken } from "../PowerToken";

export class PowerToken__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<PowerToken> {
    return super.deploy(overrides || {}) as Promise<PowerToken>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): PowerToken {
    return super.attach(address) as PowerToken;
  }
  connect(signer: Signer): PowerToken__factory {
    return super.connect(signer) as PowerToken__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PowerToken {
    return new Contract(address, _abi, signerOrProvider) as PowerToken;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "_approved",
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
        name: "_operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "_ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "_values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "_value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
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
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "who",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "timestamp",
        type: "uint32",
      },
    ],
    name: "energyAt",
    outputs: [
      {
        internalType: "uint112",
        name: "",
        type: "uint112",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "halfLife",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        internalType: "string",
        name: "_baseUri",
        type: "string",
      },
      {
        internalType: "uint32",
        name: "_halfLife",
        type: "uint32",
      },
    ],
    name: "initialize",
    outputs: [],
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
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
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
    inputs: [],
    name: "owner",
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
        name: "_from",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "_ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "_values",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_value",
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
        name: "",
        type: "uint256",
      },
    ],
    name: "uri",
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
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50611e91806100206000396000f3fe608060405234801561001057600080fd5b50600436106100f45760003560e01c8063731133e911610097578063a22cb46511610066578063a22cb46514610790578063e985e9c5146107be578063f242432a14610800578063f5298aca14610895576100f4565b8063731133e9146106815780637bc90d1c146107435780638da5cb5b1461076457806395d89b4114610788576100f4565b80632eb2c2d6116100d35780632eb2c2d6146101d15780634e1273f4146103005780635370028e1461047757806359f0bee9146104c5576100f4565b8062fdd58e146100f957806306fdde03146101375780630e89341c146101b4575b600080fd5b6101256004803603604081101561010f57600080fd5b506001600160a01b0381351690602001356108c7565b60408051918252519081900360200190f35b61013f610939565b6040805160208082528351818301528351919283929083019185019080838360005b83811015610179578181015183820152602001610161565b50505050905090810190601f1680156101a65780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61013f600480360360208110156101ca57600080fd5b50356109c7565b6102fe600480360360a08110156101e757600080fd5b6001600160a01b03823581169260208101359091169181019060608101604082013564010000000081111561021b57600080fd5b82018360208201111561022d57600080fd5b8035906020019184602083028401116401000000008311171561024f57600080fd5b91939092909160208101903564010000000081111561026d57600080fd5b82018360208201111561027f57600080fd5b803590602001918460208302840111640100000000831117156102a157600080fd5b9193909290916020810190356401000000008111156102bf57600080fd5b8201836020820111156102d157600080fd5b803590602001918460018302840111640100000000831117156102f357600080fd5b509092509050610a5c565b005b6104276004803603604081101561031657600080fd5b81019060208101813564010000000081111561033157600080fd5b82018360208201111561034357600080fd5b8035906020019184602083028401116401000000008311171561036557600080fd5b91908080602002602001604051908101604052809392919081815260200183836020028082843760009201919091525092959493602081019350359150506401000000008111156103b557600080fd5b8201836020820111156103c757600080fd5b803590602001918460208302840111640100000000831117156103e957600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929550610cfc945050505050565b60408051602080825283518183015283519192839290830191858101910280838360005b8381101561046357818101518382015260200161044b565b505050509050019250505060405180910390f35b6104a96004803603604081101561048d57600080fd5b5080356001600160a01b0316906020013563ffffffff16610de8565b604080516001600160701b039092168252519081900360200190f35b6102fe600480360360808110156104db57600080fd5b8101906020810181356401000000008111156104f657600080fd5b82018360208201111561050857600080fd5b8035906020019184600183028401116401000000008311171561052a57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929594936020810193503591505064010000000081111561057d57600080fd5b82018360208201111561058f57600080fd5b803590602001918460018302840111640100000000831117156105b157600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929594936020810193503591505064010000000081111561060457600080fd5b82018360208201111561061657600080fd5b8035906020019184600183028401116401000000008311171561063857600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295505050903563ffffffff169150610e4d9050565b6102fe6004803603608081101561069757600080fd5b6001600160a01b0382351691602081013591604082013591908101906080810160608201356401000000008111156106ce57600080fd5b8201836020820111156106e057600080fd5b8035906020019184600183028401116401000000008311171561070257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610e73945050505050565b61074b610ed6565b6040805163ffffffff9092168252519081900360200190f35b61076c610ee2565b604080516001600160a01b039092168252519081900360200190f35b61013f610ef1565b6102fe600480360360408110156107a657600080fd5b506001600160a01b0381351690602001351515610f4b565b6107ec600480360360408110156107d457600080fd5b506001600160a01b0381358116916020013516611001565b604080519115158252519081900360200190f35b6102fe600480360360a081101561081657600080fd5b6001600160a01b03823581169260208101359091169160408201359160608101359181019060a08101608082013564010000000081111561085657600080fd5b82018360208201111561086857600080fd5b8035906020019184600183028401116401000000008311171561088a57600080fd5b50909250905061102f565b6102fe600480360360608110156108ab57600080fd5b506001600160a01b038135169060208101359060400135611214565b60006001600160a01b03831661090e5760405162461bcd60e51b815260040180806020018281038252602b815260200180611ceb602b913960400191505060405180910390fd5b5060008181526004602090815260408083206001600160a01b03861684529091529020545b92915050565b6000805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156109bf5780601f10610994576101008083540402835291602001916109bf565b820191906000526020600020905b8154815290600101906020018083116109a257829003601f168201915b505050505081565b60028054604080516020601f6000196101006001871615020190941685900493840181900481028201810190925282815260609390929091830182828015610a505780601f10610a2557610100808354040283529160200191610a50565b820191906000526020600020905b815481529060010190602001808311610a3357829003601f168201915b50505050509050919050565b6001600160a01b038716610aa15760405162461bcd60e51b8152600401808060200182810382526025815260200180611d166025913960400191505060405180910390fd5b848314610adf5760405162461bcd60e51b8152600401808060200182810382526029815260200180611da86029913960400191505060405180910390fd5b6001600160a01b038816331480610b1e57506001600160a01b038816600090815260056020908152604080832033845290915290205460ff1615156001145b610b595760405162461bcd60e51b815260040180806020018281038252602f815260200180611d3b602f913960400191505060405180910390fd5b60005b85811015610b9c57610b948989898985818110610b7557fe5b90506020020135888886818110610b8857fe5b90506020020135611272565b600101610b5c565b50866001600160a01b0316886001600160a01b0316336001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb898989896040518080602001806020018381038352878782818152602001925060200280828437600083820152601f01601f19169091018481038352858152602090810191508690860280828437600083820152604051601f909101601f19169092018290039850909650505050505050a4610cf233898989898080602002602001604051908101604052809392919081815260200183836020028082843760009201919091525050604080516020808d0282810182019093528c82529093508c92508b91829185019084908082843760009201919091525050604080516020601f8c018190048102820181019092528a815292508a91508990819084018382808284376000920191909152506112b992505050565b5050505050505050565b60608151835114610d3e5760405162461bcd60e51b8152600401808060200182810382526029815260200180611dfa6029913960400191505060405180910390fd5b6000835167ffffffffffffffff81118015610d5857600080fd5b50604051908082528060200260200182016040528015610d82578160200160208202803683370190505b50905060005b8451811015610de057610dc1858281518110610da057fe5b6020026020010151858381518110610db457fe5b60200260200101516108c7565b828281518110610dcd57fe5b6020908102919091010152600101610d88565b509392505050565b6001600160a01b0382166000908152600760209081526040808320815160608101835290546001600160701b038082168352600160701b82041693820193909352600160e01b90920463ffffffff1690820152610e4581846114c2565b949350505050565b6006805463ffffffff191663ffffffff8316179055610e6d848484611542565b50505050565b6003546001600160a01b03163314610ec1576040805162461bcd60e51b815260206004820152600c60248201526b2737ba1030b71037bbb732b960a11b604482015290519081900360640190fd5b610e6d8484846001600160701b031684611615565b60065463ffffffff1681565b6003546001600160a01b031681565b60018054604080516020600284861615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156109bf5780601f10610994576101008083540402835291602001916109bf565b336001600160a01b0383161415610f935760405162461bcd60e51b8152600401808060200182810382526029815260200180611dd16029913960400191505060405180910390fd5b3360008181526005602090815260408083206001600160a01b03871680855290835292819020805460ff1916861515908117909155815190815290519293927f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31929181900390910190a35050565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b6001600160701b03831061108a576040805162461bcd60e51b815260206004820152601360248201527f56616c7565206f7574206f6620626f756e647300000000000000000000000000604482015290519081900360640190fd5b6001600160a01b0385166110e5576040805162461bcd60e51b815260206004820152601560248201527f5f746f206d757374206265206e6f6e2d7a65726f2e0000000000000000000000604482015290519081900360640190fd5b6001600160a01b03861633148061112457506001600160a01b038616600090815260056020908152604080832033845290915290205460ff1615156001145b61115f5760405162461bcd60e51b815260040180806020018281038252602f815260200180611d3b602f913960400191505060405180910390fd5b61116b86868686611272565b846001600160a01b0316866001600160a01b0316336001600160a01b03167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f628787604051808381526020018281526020019250505060405180910390a461120c338787878787878080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061169292505050565b505050505050565b6003546001600160a01b03163314611262576040805162461bcd60e51b815260206004820152600c60248201526b2737ba1030b71037bbb732b960a11b604482015290519081900360640190fd5b61126d83838361181f565b505050565b61127e848484846118af565b60009182526004602090815260408084206001600160a01b039687168552909152808320805483900390559290931681522080549091019055565b6112cb846001600160a01b0316611aee565b1561120c5763bc197c8160e01b6001600160e01b031916846001600160a01b031663bc197c8188888787876040518663ffffffff1660e01b815260040180866001600160a01b03168152602001856001600160a01b03168152602001806020018060200180602001848103845287818151815260200191508051906020019060200280838360005b8381101561136b578181015183820152602001611353565b50505050905001848103835286818151815260200191508051906020019060200280838360005b838110156113aa578181015183820152602001611392565b50505050905001848103825285818151815260200191508051906020019080838360005b838110156113e65781810151838201526020016113ce565b50505050905090810190601f1680156114135780820380516001836020036101000a031916815260200191505b5098505050505050505050602060405180830381600087803b15801561143857600080fd5b505af115801561144c573d6000803e3d6000fd5b505050506040513d602081101561146257600080fd5b50517fffffffff00000000000000000000000000000000000000000000000000000000161461120c5760405162461bcd60e51b815260040180806020018281038252603e815260200180611d6a603e913960400191505060405180910390fd5b600082602001516001600160701b031683600001516001600160701b031611156115145760408301516020840151845160065461150a93929091039063ffffffff1685611af4565b8351039050610933565b60408301518351602085015160065461153893929091039063ffffffff1685611af4565b8351019050610933565b60005460026000196101006001841615020190911604156115aa576040805162461bcd60e51b815260206004820152601c60248201527f436f6e747261637420616c726561647920696e697469616c697a656400000000604482015290519081900360640190fd5b82516115bd906000906020860190611c49565b5081516115d1906001906020850190611c49565b5080516115e5906002906020840190611c49565b5050600380547fffffffffffffffffffffffff000000000000000000000000000000000000000016331790555050565b61162260008585856118af565b60008381526004602090815260408083206001600160a01b0388168085529083528184208054870190558151878152928301869052815190939233927fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f6292918290030190a4610e6d336000868686865b6116a4846001600160a01b0316611aee565b1561120c5763f23a6e6160e01b6001600160e01b031916846001600160a01b031663f23a6e6188888787876040518663ffffffff1660e01b815260040180866001600160a01b03168152602001856001600160a01b0316815260200184815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b8381101561174557818101518382015260200161172d565b50505050905090810190601f1680156117725780820380516001836020036101000a031916815260200191505b509650505050505050602060405180830381600087803b15801561179557600080fd5b505af11580156117a9573d6000803e3d6000fd5b505050506040513d60208110156117bf57600080fd5b50517fffffffff00000000000000000000000000000000000000000000000000000000161461120c5760405162461bcd60e51b8152600401808060200182810382526039815260200180611e236039913960400191505060405180910390fd5b61182c83600084846118af565b60008281526004602090815260408083206001600160a01b0387168085529083528184208054869003905581518681529283018590528151909233927fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f6292918290030190a461126d33846000858560405180602001604052806000815250611692565b426001600160a01b038516156119cc576001600160a01b038516600090815260076020908152604091829020825160608101845290546001600160701b038082168352600160701b82041692820192909252600160e01b90910463ffffffff169181019190915261192081836114c2565b6001600160701b03908116602083810191825263ffffffff85811660408087019182528651899003861687526001600160a01b038c166000908152600790945290922094518554935192516dffffffffffffffffffffffffffff19909416908516177fffffffff0000000000000000000000000000ffffffffffffffffffffffffffff16600160701b9290941691909102929092176001600160e01b0316600160e01b91909216021790555b6001600160a01b03841615611ae7576001600160a01b038416600090815260076020908152604091829020825160608101845290546001600160701b038082168352600160701b82041692820192909252600160e01b90910463ffffffff1691810191909152611a3c81836114c2565b6001600160701b03908116602083810191825263ffffffff858116604080870191825286518901861687526001600160a01b038b166000908152600790945290922094518554935192516dffffffffffffffffffffffffffff19909416908516177fffffffff0000000000000000000000000000ffffffffffffffffffffffffffff16600160701b9290941691909102929092176001600160e01b0316600160e01b91909216021790555b5050505050565b3b151590565b60008463ffffffff168263ffffffff161015611b57576040805162461bcd60e51b815260206004820152600e60248201527f496e76616c696420706572696f64000000000000000000000000000000000000604482015290519081900360640190fd5b84820391508263ffffffff168263ffffffff1681611b7157fe5b0463ffffffff16846001600160701b0316901c93508263ffffffff168263ffffffff1681611b9b57fe5b06915063ffffffff82161580611bb857506001600160701b038416155b15611bc4575082610e45565b60006001600160701b0385168163ffffffff86811690861671b17217f7d1cf79abc9e3b39803f2f6af40f30281611bf757fe5b049050600160901b5b8215611c3c57928201928082840281611c1557fe5b0493849003939250600160901b018082840281611c2e57fe5b049250600160901b01611c00565b5091979650505050505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282611c7f5760008555611cc5565b82601f10611c9857805160ff1916838001178555611cc5565b82800160010185558215611cc5579182015b82811115611cc5578251825591602001919060010190611caa565b50611cd1929150611cd5565b5090565b5b80821115611cd15760008155600101611cd656fe455243313135353a2062616c616e636520717565727920666f7220746865207a65726f206164647265737364657374696e6174696f6e2061646472657373206d757374206265206e6f6e2d7a65726f2e4e656564206f70657261746f7220617070726f76616c20666f7220337264207061727479207472616e73666572732e636f6e74726163742072657475726e656420616e20756e6b6e6f776e2076616c75652066726f6d206f6e45524331313535426174636852656365697665645f69647320616e64205f76616c756573206172726179206c656e677468206d757374206d617463682e455243313135353a2073657474696e6720617070726f76616c2073746174757320666f722073656c66455243313135353a206163636f756e747320616e6420696473206c656e677468206d69736d61746368636f6e74726163742072657475726e656420616e20756e6b6e6f776e2076616c75652066726f6d206f6e455243313135355265636569766564a2646970667358221220a95d2c98a428c5ece6ac15f839bc4280c73be1bc1e1266a0602b0d500fd6648964736f6c63430007060033";