/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Listings, ListingsInterface } from "../../listing/Listings";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint32",
        name: "period",
        type: "uint32",
      },
    ],
    name: "InvalidLockPeriod",
    type: "error",
  },
  {
    inputs: [],
    name: "ListingIsNotPaused",
    type: "error",
  },
  {
    inputs: [],
    name: "ListingIsPaused",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "listingId",
        type: "uint256",
      },
    ],
    name: "NotListed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "strategyId",
        type: "bytes4",
      },
    ],
    name: "UnsupportedListingStrategy",
    type: "error",
  },
  {
    inputs: [],
    name: "FIXED_PRICE",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x61107861003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100615760003560e01c80637608f874146100665780637bc13e0114610090578063869cdfc3146100be578063d6628cd4146100fe578063f7596f9914610120575b600080fd5b610079610074366004610a73565b610133565b604051610087929190610b0a565b60405180910390f35b81801561009c57600080fd5b506100b06100ab366004610e1d565b610151565b604051908152602001610087565b6100e57fce9777391fa247355879fc92b08060840e80f62fb5e0475cfb28c8a89bfff98381565b6040516001600160e01b03199091168152602001610087565b81801561010a57600080fd5b5061011e610119366004610f21565b6102e3565b005b61007961012e366004610f43565b6103a4565b606080610145856002810186866103dd565b91509150935093915050565b8154600190810180845560008181526004850160209081526040909120845180518051835463ffffffff191660e09190911c1783558084015180519596889694959394869485936101a793850192910190610910565b5050506020918201516002919091015582810151805160038401805463ffffffff191660e09290921c919091178155818301518051929391926101f09260048701920190610910565b505050604082015160059190910180546060840151608085015160a086015160c087015160e0909701516001600160a01b039096166001600160c01b031990941693909317600160a01b63ffffffff938416021764ffffffffff60c01b1916600160c01b9183169190910260ff60e01b191617600160e01b921515929092029190911761ffff60e81b1916600160e81b9415159490940260ff60f01b191693909317600160f01b921515929092029190911790556102b5906002850190839061076d16565b506040808301516001600160a01b0316600090815260058501602052206102dc908261076d565b5092915050565b60008181526004830160205260409020600501546001600160a01b031661030d6002840183610782565b506001600160a01b038116600090815260058401602052604090206103329083610782565b5060008281526004840160205260408120805463ffffffff1916815590818181816103606001830182610994565b505060006002929092018290555060038301805463ffffffff191681559061038b6004850182610994565b50505060050180546001600160f81b0319169055505050565b6001600160a01b0383166000908152600585016020526040902060609081906103d090879086866103dd565b9150915094509492505050565b60608060006103eb8661078e565b90506103f78582610f94565b84111561040b576104088582610f94565b93505b60008467ffffffffffffffff81111561042657610426610c39565b60405190808252806020026020018201604052801561045f57816020015b61044c6109d1565b8152602001906001900390816104445790505b50905060008567ffffffffffffffff81111561047d5761047d610c39565b6040519080825280602002602001820160405280156104a6578160200160208202803683370190505b50905060005b8681101561075f576104c86104c1828a610fab565b8a90610798565b8282815181106104da576104da610fc3565b6020026020010181815250508960040160008383815181106104fe576104fe610fc3565b6020908102919091018101518252810191909152604090810160002081516101808101909252805460e01b6001600160e01b03191661014083019081526001820180548492610100840192859284929184916101608801919061056090610fd9565b80601f016020809104026020016040519081016040528092919081815260200182805461058c90610fd9565b80156105d95780601f106105ae576101008083540402835291602001916105d9565b820191906000526020600020905b8154815290600101906020018083116105bc57829003601f168201915b50505050508152505081526020016002820154815250508152602001600382016040518060400160405290816000820160009054906101000a900460e01b6001600160e01b0319166001600160e01b031916815260200160018201805461063f90610fd9565b80601f016020809104026020016040519081016040528092919081815260200182805461066b90610fd9565b80156106b85780601f1061068d576101008083540402835291602001916106b8565b820191906000526020600020905b81548152906001019060200180831161069b57829003601f168201915b505050919092525050508152600591909101546001600160a01b038116602083015263ffffffff600160a01b820481166040840152600160c01b820416606083015260ff600160e01b8204811615156080840152600160e81b82048116151560a0840152600160f01b90910416151560c090910152835184908390811061074157610741610fc3565b6020026020010181905250808061075790611013565b9150506104ac565b509890975095505050505050565b600061077983836107a4565b90505b92915050565b600061077983836107f3565b600061077c825490565b600061077983836108e6565b60008181526001830160205260408120546107eb5750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915561077c565b50600061077c565b600081815260018301602052604081205480156108dc576000610817600183610f94565b855490915060009061082b90600190610f94565b905081811461089057600086600001828154811061084b5761084b610fc3565b906000526020600020015490508087600001848154811061086e5761086e610fc3565b6000918252602080832090910192909255918252600188019052604090208390555b85548690806108a1576108a161102c565b60019003818190600052602060002001600090559055856001016000868152602001908152602001600020600090556001935050505061077c565b600091505061077c565b60008260000182815481106108fd576108fd610fc3565b9060005260206000200154905092915050565b82805461091c90610fd9565b90600052602060002090601f01602090048101928261093e5760008555610984565b82601f1061095757805160ff1916838001178555610984565b82800160010185558215610984579182015b82811115610984578251825591602001919060010190610969565b50610990929150610a5e565b5090565b5080546109a090610fd9565b6000825580601f106109b0575050565b601f0160209004906000526020600020908101906109ce9190610a5e565b50565b604080516101808101909152600061014082018181526060610160840152610100830190815261012083019190915281908152602001610a2e604051806040016040528060006001600160e01b0319168152602001606081525090565b815260006020820181905260408201819052606082018190526080820181905260a0820181905260c09091015290565b5b808211156109905760008155600101610a5f565b600080600060608486031215610a8857600080fd5b505081359360208301359350604090920135919050565b63ffffffff60e01b81511682526000602080830151604082860152805180604087015260005b81811015610ae157828101840151878201606001528301610ac5565b81811115610af3576000606083890101525b50601f01601f191694909401606001949350505050565b6040808252835182820181905260009190606090818501906020808901865b83811015610b4557815185529382019390820190600101610b29565b50508683038188015287518084528184019250600581901b8401820189830160005b83811015610c2857601f198784030186528151610100815181865280518c83880152610b97610140880182610a9f565b92505087810151610120870152508682015185820388870152610bba8282610a9f565b9150508a820151610bd58c8701826001600160a01b03169052565b508982015163ffffffff908116868c01526080808401519091169086015260a08083015115159086015260c08083015115159086015260e091820151151591909401529484019490840190600101610b67565b50909b9a5050505050505050505050565b634e487b7160e01b600052604160045260246000fd5b6040805190810167ffffffffffffffff81118282101715610c7257610c72610c39565b60405290565b604051610100810167ffffffffffffffff81118282101715610c7257610c72610c39565b604051601f8201601f1916810167ffffffffffffffff81118282101715610cc557610cc5610c39565b604052919050565b600060408284031215610cdf57600080fd5b610ce7610c4f565b905081356001600160e01b031981168114610d0157600080fd5b815260208281013567ffffffffffffffff80821115610d1f57600080fd5b818501915085601f830112610d3357600080fd5b813581811115610d4557610d45610c39565b610d57601f8201601f19168501610c9c565b91508082528684828501011115610d6d57600080fd5b80848401858401376000908201840152918301919091525092915050565b600060408284031215610d9d57600080fd5b610da5610c4f565b9050813567ffffffffffffffff811115610dbe57600080fd5b610dca84828501610ccd565b8252506020820135602082015292915050565b80356001600160a01b0381168114610df457600080fd5b919050565b803563ffffffff81168114610df457600080fd5b80358015158114610df457600080fd5b60008060408385031215610e3057600080fd5b82359150602083013567ffffffffffffffff80821115610e4f57600080fd5b908401906101008287031215610e6457600080fd5b610e6c610c78565b823582811115610e7b57600080fd5b610e8788828601610d8b565b825250602083013582811115610e9c57600080fd5b610ea888828601610ccd565b602083015250610eba60408401610ddd565b6040820152610ecb60608401610df9565b6060820152610edc60808401610df9565b6080820152610eed60a08401610e0d565b60a0820152610efe60c08401610e0d565b60c0820152610f0f60e08401610e0d565b60e08201528093505050509250929050565b60008060408385031215610f3457600080fd5b50508035926020909101359150565b60008060008060808587031215610f5957600080fd5b84359350610f6960208601610ddd565b93969395505050506040820135916060013590565b634e487b7160e01b600052601160045260246000fd5b600082821015610fa657610fa6610f7e565b500390565b60008219821115610fbe57610fbe610f7e565b500190565b634e487b7160e01b600052603260045260246000fd5b600181811c90821680610fed57607f821691505b60208210810361100d57634e487b7160e01b600052602260045260246000fd5b50919050565b60006001820161102557611025610f7e565b5060010190565b634e487b7160e01b600052603160045260246000fdfea2646970667358221220001a41d8cac7042ae4221e3d08e8fc58944d1cf153bca3cf90c52ba3f2028cdc64736f6c634300080d0033";

type ListingsConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ListingsConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Listings__factory extends ContractFactory {
  constructor(...args: ListingsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Listings> {
    return super.deploy(overrides || {}) as Promise<Listings>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Listings {
    return super.attach(address) as Listings;
  }
  override connect(signer: Signer): Listings__factory {
    return super.connect(signer) as Listings__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ListingsInterface {
    return new utils.Interface(_abi) as ListingsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Listings {
    return new Contract(address, _abi, signerOrProvider) as Listings;
  }
}
