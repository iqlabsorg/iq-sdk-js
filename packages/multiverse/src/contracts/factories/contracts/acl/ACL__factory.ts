/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ACL, ACLInterface } from "../../../contracts/acl/ACL";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "CannotRemoveLastAdmin",
    type: "error",
  },
  {
    inputs: [],
    name: "RolesContractIncorrectlyConfigured",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
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
    name: "adminRole",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "checkRole",
    outputs: [],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
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
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getRoleMember",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleMemberCount",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
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
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "proxiableUUID",
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
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "supervisorRole",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
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
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const _bytecode =
  "0x60a0604052306080523480156200001557600080fd5b5060006200002460016200008b565b905080156200003d576000805461ff0019166101001790555b801562000084576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b50620001ac565b60008054610100900460ff161562000124578160ff166001148015620000c45750620000c2306200019d60201b620007901760201c565b155b6200011c5760405162461bcd60e51b815260206004820152602e60248201526000805160206200188183398151915260448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b506000919050565b60005460ff808416911610620001835760405162461bcd60e51b815260206004820152602e60248201526000805160206200188183398151915260448201526d191e481a5b9a5d1a585b1a5e995960921b606482015260840162000113565b506000805460ff191660ff92909216919091179055600190565b6001600160a01b03163b151590565b60805161169d620001e46000396000818161040501528181610445015281816104e40152818161052401526105b3015261169d6000f3fe6080604052600436106100f25760003560e01c806352d1902d1161008a578063a217fddf11610059578063a217fddf14610291578063bc26ddf2146102a6578063ca15c873146102d9578063d547741f146102f957600080fd5b806352d1902d1461020f5780638129fc1c146102245780639010d07c1461023957806391d148541461027157600080fd5b80632f2ff15d116100c65780632f2ff15d1461019c57806336568abe146101bc5780633659cfe6146101dc5780634f1ef286146101fc57600080fd5b80629f2f3c146100f757806301ffc9a71461011a57806312d9a6ad1461014a578063248a9ca31461016c575b600080fd5b34801561010357600080fd5b5060005b6040519081526020015b60405180910390f35b34801561012657600080fd5b5061013a6101353660046111ef565b610319565b6040519015158152602001610111565b34801561015657600080fd5b5061016a610165366004611230565b610344565b005b34801561017857600080fd5b5061010761018736600461125c565b60009081526065602052604090206001015490565b3480156101a857600080fd5b5061016a6101b7366004611230565b610352565b3480156101c857600080fd5b5061016a6101d7366004611230565b61037c565b3480156101e857600080fd5b5061016a6101f7366004611275565b6103fb565b61016a61020a3660046112a6565b6104da565b34801561021b57600080fd5b506101076105a6565b34801561023057600080fd5b5061016a610659565b34801561024557600080fd5b50610259610254366004611368565b61070a565b6040516001600160a01b039091168152602001610111565b34801561027d57600080fd5b5061013a61028c366004611230565b610729565b34801561029d57600080fd5b50610107600081565b3480156102b257600080fd5b507f060c8eced3c6b422fe5573c862b67b9f6e25a3fc7d9543b14f7aee77b138e70d610107565b3480156102e557600080fd5b506101076102f436600461125c565b610754565b34801561030557600080fd5b5061016a610314366004611230565b61076b565b60006001600160e01b03198216635a05180f60e01b148061033e575061033e8261079f565b92915050565b61034e82826107d4565b5050565b60008281526065602052604090206001015461036d81610838565b6103778383610842565b505050565b6001600160a01b03811633146103f15760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084015b60405180910390fd5b61034e8282610864565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036104435760405162461bcd60e51b81526004016103e89061138a565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031661048c600080516020611621833981519152546001600160a01b031690565b6001600160a01b0316146104b25760405162461bcd60e51b81526004016103e8906113d6565b6104bb816108a2565b604080516000808252602082019092526104d7918391906108ff565b50565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036105225760405162461bcd60e51b81526004016103e89061138a565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031661056b600080516020611621833981519152546001600160a01b031690565b6001600160a01b0316146105915760405162461bcd60e51b81526004016103e8906113d6565b61059a826108a2565b61034e828260016108ff565b6000306001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146106465760405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c60448201527f6c6564207468726f7567682064656c656761746563616c6c000000000000000060648201526084016103e8565b5060008051602061162183398151915290565b60006106656001610a6a565b9050801561067d576000805461ff0019166101001790555b610685610af7565b61068d610af7565b610698600033610842565b6106c27f060c8eced3c6b422fe5573c862b67b9f6e25a3fc7d9543b14f7aee77b138e70d33610842565b80156104d7576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a150565b60008281526097602052604081206107229083610b64565b9392505050565b60009182526065602090815260408084206001600160a01b0393909316845291905290205460ff1690565b600081815260976020526040812061033e90610b70565b60008281526065602052604090206001015461078681610838565b6103778383610864565b6001600160a01b03163b151590565b60006001600160e01b03198216637965db0b60e01b148061033e57506301ffc9a760e01b6001600160e01b031983161461033e565b6107de8282610729565b61034e576107f6816001600160a01b03166014610b7a565b610801836020610b7a565b60405160200161081292919061144e565b60408051601f198184030181529082905262461bcd60e51b82526103e8916004016114c3565b6104d781336107d4565b61084c8282610d16565b60008281526097602052604090206103779082610d9c565b8115801561087a575061087682610754565b6001145b156108985760405163c13a62ad60e01b815260040160405180910390fd5b61034e8282610db1565b604080516312d9a6ad60e01b8152600060048201819052336024830152915130926312d9a6ad9260448082019391829003018186803b1580156108e457600080fd5b505afa1580156108f8573d6000803e3d6000fd5b5050505050565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff16156109325761037783610dd3565b826001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa92505050801561098c575060408051601f3d908101601f19168201909252610989918101906114f6565b60015b6109ef5760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201526d6f6e206973206e6f74205555505360901b60648201526084016103e8565b6000805160206116218339815191528114610a5e5760405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f786044820152681a58589b195555525160ba1b60648201526084016103e8565b50610377838383610e6f565b60008054610100900460ff1615610ab1578160ff166001148015610a8d5750303b155b610aa95760405162461bcd60e51b81526004016103e89061150f565b506000919050565b60005460ff808416911610610ad85760405162461bcd60e51b81526004016103e89061150f565b506000805460ff191660ff92909216919091179055600190565b919050565b600054610100900460ff16610b625760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b60648201526084016103e8565b565b60006107228383610e9a565b600061033e825490565b60606000610b89836002611573565b610b94906002611592565b67ffffffffffffffff811115610bac57610bac611290565b6040519080825280601f01601f191660200182016040528015610bd6576020820181803683370190505b509050600360fc1b81600081518110610bf157610bf16115aa565b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110610c2057610c206115aa565b60200101906001600160f81b031916908160001a9053506000610c44846002611573565b610c4f906001611592565b90505b6001811115610cc7576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110610c8357610c836115aa565b1a60f81b828281518110610c9957610c996115aa565b60200101906001600160f81b031916908160001a90535060049490941c93610cc0816115c0565b9050610c52565b5083156107225760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016103e8565b610d208282610729565b61034e5760008281526065602090815260408083206001600160a01b03851684529091529020805460ff19166001179055610d583390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000610722836001600160a01b038416610ec4565b610dbb8282610f13565b60008281526097602052604090206103779082610f7a565b6001600160a01b0381163b610e405760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b60648201526084016103e8565b60008051602061162183398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b610e7883610f8f565b600082511180610e855750805b1561037757610e948383610fcf565b50505050565b6000826000018281548110610eb157610eb16115aa565b9060005260206000200154905092915050565b6000818152600183016020526040812054610f0b5750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915561033e565b50600061033e565b610f1d8282610729565b1561034e5760008281526065602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b6000610722836001600160a01b0384166110c3565b610f9881610dd3565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b60606001600160a01b0383163b6110375760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b60648201526084016103e8565b600080846001600160a01b03168460405161105291906115d7565b600060405180830381855af49150503d806000811461108d576040519150601f19603f3d011682016040523d82523d6000602084013e611092565b606091505b50915091506110ba8282604051806060016040528060278152602001611641602791396111b6565b95945050505050565b600081815260018301602052604081205480156111ac5760006110e76001836115f3565b85549091506000906110fb906001906115f3565b905081811461116057600086600001828154811061111b5761111b6115aa565b906000526020600020015490508087600001848154811061113e5761113e6115aa565b6000918252602080832090910192909255918252600188019052604090208390555b85548690806111715761117161160a565b60019003818190600052602060002001600090559055856001016000868152602001908152602001600020600090556001935050505061033e565b600091505061033e565b606083156111c5575081610722565b8251156111d55782518084602001fd5b8160405162461bcd60e51b81526004016103e891906114c3565b60006020828403121561120157600080fd5b81356001600160e01b03198116811461072257600080fd5b80356001600160a01b0381168114610af257600080fd5b6000806040838503121561124357600080fd5b8235915061125360208401611219565b90509250929050565b60006020828403121561126e57600080fd5b5035919050565b60006020828403121561128757600080fd5b61072282611219565b634e487b7160e01b600052604160045260246000fd5b600080604083850312156112b957600080fd5b6112c283611219565b9150602083013567ffffffffffffffff808211156112df57600080fd5b818501915085601f8301126112f357600080fd5b81358181111561130557611305611290565b604051601f8201601f19908116603f0116810190838211818310171561132d5761132d611290565b8160405282815288602084870101111561134657600080fd5b8260208601602083013760006020848301015280955050505050509250929050565b6000806040838503121561137b57600080fd5b50508035926020909101359150565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b19195b1959d85d1958d85b1b60a21b606082015260800190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b6163746976652070726f787960a01b606082015260800190565b60005b8381101561143d578181015183820152602001611425565b83811115610e945750506000910152565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351611486816017850160208801611422565b7001034b99036b4b9b9b4b733903937b6329607d1b60179184019182015283516114b7816028840160208801611422565b01602801949350505050565b60208152600082518060208401526114e2816040850160208701611422565b601f01601f19169190910160400192915050565b60006020828403121561150857600080fd5b5051919050565b6020808252602e908201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160408201526d191e481a5b9a5d1a585b1a5e995960921b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b600081600019048311821515161561158d5761158d61155d565b500290565b600082198211156115a5576115a561155d565b500190565b634e487b7160e01b600052603260045260246000fd5b6000816115cf576115cf61155d565b506000190190565b600082516115e9818460208701611422565b9190910192915050565b6000828210156116055761160561155d565b500390565b634e487b7160e01b600052603160045260246000fdfe360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a2646970667358221220d481eff5725683ac37b7ec6c10a148da2ecd82d070f005656a246a7c668c831564736f6c634300080d0033496e697469616c697a61626c653a20636f6e747261637420697320616c726561";

type ACLConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ACLConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ACL__factory extends ContractFactory {
  constructor(...args: ACLConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ACL> {
    return super.deploy(overrides || {}) as Promise<ACL>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ACL {
    return super.attach(address) as ACL;
  }
  override connect(signer: Signer): ACL__factory {
    return super.connect(signer) as ACL__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ACLInterface {
    return new utils.Interface(_abi) as ACLInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): ACL {
    return new Contract(address, _abi, signerOrProvider) as ACL;
  }
}
