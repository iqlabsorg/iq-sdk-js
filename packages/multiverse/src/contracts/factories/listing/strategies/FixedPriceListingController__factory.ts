/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  FixedPriceListingController,
  FixedPriceListingControllerInterface,
} from "../../../listing/strategies/FixedPriceListingController";

const _abi = [
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
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506103ef806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806301ffc9a714610046578063492f4e181461006e5780634ad0762614610083575b600080fd5b6100596100543660046101b0565b6100a4565b60405190151581526020015b60405180910390f35b60405163ce97773960e01b8152602001610065565b6100966100913660046101d2565b6100db565b604051908152602001610065565b60006001600160e01b031982166301ff9c1f60e11b14806100d557506301ffc9a760e01b6001600160e01b03198316145b92915050565b6000806100ef6100ea856102a1565b61011a565b905080610102608085016060860161034d565b63ffffffff166101129190610373565b949350505050565b60006101298260000151610141565b81602001518060200190518101906100d591906103a0565b63ce97773960e01b6001600160e01b0319821614610190576040805163dc5b665760e01b81526001600160e01b03198316600482015263ce97773960e01b602482015290519081900360440190fd5b50565b80356001600160e01b0319811681146101ab57600080fd5b919050565b6000602082840312156101c257600080fd5b6101cb82610193565b9392505050565b60008082840360c08112156101e657600080fd5b833567ffffffffffffffff8111156101fd57600080fd5b84016040818703121561020f57600080fd5b925060a0601f198201121561022357600080fd5b506020830190509250929050565b634e487b7160e01b600052604160045260246000fd5b6040805190810167ffffffffffffffff8111828210171561026a5761026a610231565b60405290565b604051601f8201601f1916810167ffffffffffffffff8111828210171561029957610299610231565b604052919050565b6000604082360312156102b357600080fd5b6102bb610247565b6102c483610193565b815260208084013567ffffffffffffffff808211156102e257600080fd5b9085019036601f8301126102f557600080fd5b81358181111561030757610307610231565b610319601f8201601f19168501610270565b9150808252368482850101111561032f57600080fd5b80848401858401376000908201840152918301919091525092915050565b60006020828403121561035f57600080fd5b813563ffffffff811681146101cb57600080fd5b600081600019048311821515161561039b57634e487b7160e01b600052601160045260246000fd5b500290565b6000602082840312156103b257600080fd5b505191905056fea2646970667358221220d3173b08ee41047fecc6c1919254d8908bd3ee0346a7cf993c38499335d19bb864736f6c634300080d0033";

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
