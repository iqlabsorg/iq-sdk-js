/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  FixedPriceListingController,
  FixedPriceListingControllerInterface,
} from "../../../../../contracts/listing/strategies/fixed-price/FixedPriceListingController";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "provided",
        type: "bytes4",
      },
      {
        internalType: "bytes4",
        name: "required",
        type: "bytes4",
      },
    ],
    name: "ListingStrategyMismatch",
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
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes4",
            name: "strategy",
            type: "bytes4",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct Listings.Params",
        name: "strategyParams",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "listingId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "warper",
            type: "address",
          },
          {
            internalType: "address",
            name: "renter",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "rentalPeriod",
            type: "uint32",
          },
          {
            internalType: "address",
            name: "paymentToken",
            type: "address",
          },
        ],
        internalType: "struct Rentings.Params",
        name: "rentingParams",
        type: "tuple",
      },
    ],
    name: "calculateRentalFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes4",
            name: "strategy",
            type: "bytes4",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct Listings.Params",
        name: "params",
        type: "tuple",
      },
    ],
    name: "decodeStrategyParams",
    outputs: [
      {
        internalType: "uint256",
        name: "baseRate",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "acl",
        type: "address",
      },
    ],
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
    inputs: [],
    name: "strategyId",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
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
  "0x60a06040523060805234801561001457600080fd5b5060006100216001610085565b90508015610039576000805461ff0019166101001790555b801561007f576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b5061019e565b60008054610100900460ff1615610118578160ff1660011480156100b957506100b73061018f60201b61055d1760201c565b155b6101105760405162461bcd60e51b815260206004820152602e60248201526000805160206200114883398151915260448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b506000919050565b60005460ff8084169116106101755760405162461bcd60e51b815260206004820152602e60248201526000805160206200114883398151915260448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610107565b506000805460ff191660ff92909216919091179055600190565b6001600160a01b03163b151590565b608051610f72620001d6600039600081816101c40152818161020d015281816102e60152818161032601526103b90152610f726000f3fe60806040526004361061007b5760003560e01c80634f1ef2861161004e5780634f1ef2861461012757806352d1902d1461013a57806359aa1db31461014f578063c4d66de81461016f57600080fd5b806301ffc9a7146100805780633659cfe6146100b5578063492f4e18146100d75780634ad07626146100f9575b600080fd5b34801561008c57600080fd5b506100a061009b366004610ad4565b61018f565b60405190151581526020015b60405180910390f35b3480156100c157600080fd5b506100d56100d0366004610b06565b6101ba565b005b3480156100e357600080fd5b5060405163ce97773960e01b81526020016100ac565b34801561010557600080fd5b50610119610114366004610b21565b6102a2565b6040519081526020016100ac565b6100d5610135366004610c23565b6102dc565b34801561014657600080fd5b506101196103ac565b34801561015b57600080fd5b5061011961016a366004610ce7565b61045f565b34801561017b57600080fd5b506100d561018a366004610b06565b6104cd565b60006001600160e01b031982166359aa1db360e01b14806101b457506101b48261056c565b92915050565b6001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016300361020b5760405162461bcd60e51b815260040161020290610d1c565b60405180910390fd5b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316610254600080516020610ef6833981519152546001600160a01b031690565b6001600160a01b03161461027a5760405162461bcd60e51b815260040161020290610d68565b610283816105a1565b6040805160008082526020820190925261029f9183919061061e565b50565b6000806102b161016a85610db4565b9050806102c46080850160608601610dc0565b63ffffffff166102d49190610de6565b949350505050565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036103245760405162461bcd60e51b815260040161020290610d1c565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031661036d600080516020610ef6833981519152546001600160a01b031690565b6001600160a01b0316146103935760405162461bcd60e51b815260040161020290610d68565b61039c826105a1565b6103a88282600161061e565b5050565b6000306001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161461044c5760405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c60448201527f6c6564207468726f7567682064656c656761746563616c6c00000000000000006064820152608401610202565b50600080516020610ef683398151915290565b805160009063ce97773960e01b6001600160e01b03198216146104ae5760405163dc5b665760e01b81526001600160e01b03198216600482015263ce97773960e01b6024820152604401610202565b82602001518060200190518101906104c69190610e13565b9392505050565b60006104d9600161078e565b905080156104f1576000805461ff0019166101001790555b6104f961081b565b609780546001600160a01b0319166001600160a01b03841617905580156103a8576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15050565b6001600160a01b03163b151590565b60006001600160e01b031982166301ff9c1f60e11b14806101b457506301ffc9a760e01b6001600160e01b03198316146101b4565b6097546001600160a01b03166001600160a01b03166312d9a6ad6000336040516001600160e01b031960e085901b16815260048101929092526001600160a01b0316602482015260440160006040518083038186803b15801561060357600080fd5b505afa158015610617573d6000803e3d6000fd5b5050505050565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff16156106565761065183610888565b505050565b826001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa9250505080156106b0575060408051601f3d908101601f191682019092526106ad91810190610e13565b60015b6107135760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201526d6f6e206973206e6f74205555505360901b6064820152608401610202565b600080516020610ef683398151915281146107825760405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f786044820152681a58589b195555525160ba1b6064820152608401610202565b50610651838383610924565b60008054610100900460ff16156107d5578160ff1660011480156107b15750303b155b6107cd5760405162461bcd60e51b815260040161020290610e2c565b506000919050565b60005460ff8084169116106107fc5760405162461bcd60e51b815260040161020290610e2c565b506000805460ff191660ff92909216919091179055600190565b919050565b600054610100900460ff166108865760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b6064820152608401610202565b565b6001600160a01b0381163b6108f55760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b6064820152608401610202565b600080516020610ef683398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b61092d8361094f565b60008251118061093a5750805b1561065157610949838361098f565b50505050565b61095881610888565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b60606001600160a01b0383163b6109f75760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b6064820152608401610202565b600080846001600160a01b031684604051610a129190610ea6565b600060405180830381855af49150503d8060008114610a4d576040519150601f19603f3d011682016040523d82523d6000602084013e610a52565b606091505b5091509150610a7a8282604051806060016040528060278152602001610f1660279139610a83565b95945050505050565b60608315610a925750816104c6565b825115610aa25782518084602001fd5b8160405162461bcd60e51b81526004016102029190610ec2565b80356001600160e01b03198116811461081657600080fd5b600060208284031215610ae657600080fd5b6104c682610abc565b80356001600160a01b038116811461081657600080fd5b600060208284031215610b1857600080fd5b6104c682610aef565b60008082840360c0811215610b3557600080fd5b833567ffffffffffffffff811115610b4c57600080fd5b840160408187031215610b5e57600080fd5b925060a0601f1982011215610b7257600080fd5b506020830190509250929050565b634e487b7160e01b600052604160045260246000fd5b600082601f830112610ba757600080fd5b813567ffffffffffffffff80821115610bc257610bc2610b80565b604051601f8301601f19908116603f01168101908282118183101715610bea57610bea610b80565b81604052838152866020858801011115610c0357600080fd5b836020870160208301376000602085830101528094505050505092915050565b60008060408385031215610c3657600080fd5b610c3f83610aef565b9150602083013567ffffffffffffffff811115610c5b57600080fd5b610c6785828601610b96565b9150509250929050565b600060408284031215610c8357600080fd5b6040516040810167ffffffffffffffff8282108183111715610ca757610ca7610b80565b81604052829350610cb785610abc565b83526020850135915080821115610ccd57600080fd5b50610cda85828601610b96565b6020830152505092915050565b600060208284031215610cf957600080fd5b813567ffffffffffffffff811115610d1057600080fd5b6102d484828501610c71565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b19195b1959d85d1958d85b1b60a21b606082015260800190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b6163746976652070726f787960a01b606082015260800190565b60006101b43683610c71565b600060208284031215610dd257600080fd5b813563ffffffff811681146104c657600080fd5b6000816000190483118215151615610e0e57634e487b7160e01b600052601160045260246000fd5b500290565b600060208284031215610e2557600080fd5b5051919050565b6020808252602e908201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160408201526d191e481a5b9a5d1a585b1a5e995960921b606082015260800190565b60005b83811015610e95578181015183820152602001610e7d565b838111156109495750506000910152565b60008251610eb8818460208701610e7a565b9190910192915050565b6020815260008251806020840152610ee1816040850160208701610e7a565b601f01601f1916919091016040019291505056fe360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a2646970667358221220c2844bf0bbca47bc8bcfcb02daa1376faad11dfb6450155cd0bc355b1978d82364736f6c634300080d0033496e697469616c697a61626c653a20636f6e747261637420697320616c726561";

type FixedPriceListingControllerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FixedPriceListingControllerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class FixedPriceListingController__factory extends ContractFactory {
  constructor(...args: FixedPriceListingControllerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<FixedPriceListingController> {
    return super.deploy(
      overrides || {}
    ) as Promise<FixedPriceListingController>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): FixedPriceListingController {
    return super.attach(address) as FixedPriceListingController;
  }
  override connect(signer: Signer): FixedPriceListingController__factory {
    return super.connect(signer) as FixedPriceListingController__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FixedPriceListingControllerInterface {
    return new utils.Interface(_abi) as FixedPriceListingControllerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FixedPriceListingController {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as FixedPriceListingController;
  }
}
