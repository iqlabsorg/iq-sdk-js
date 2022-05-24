/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  Warpers,
  WarpersInterface,
} from "../../../contracts/warper/Warpers";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
    ],
    name: "IncompatibleAsset",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
    ],
    name: "UnsupportedAsset",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "warper",
        type: "address",
      },
    ],
    name: "WarperIsAlreadyRegistered",
    type: "error",
  },
  {
    inputs: [],
    name: "WarperIsNotPaused",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "warper",
        type: "address",
      },
    ],
    name: "WarperIsNotRegistered",
    type: "error",
  },
  {
    inputs: [],
    name: "WarperIsPaused",
    type: "error",
  },
];

const _bytecode =
  "0x610d5d61003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100565760003560e01c806344ef51261461005b5780635e327ed514610085578063c73a080a146100a7578063ef6c202d146100c7575b600080fd5b61006e6100693660046108fd565b6100da565b60405161007c92919061093a565b60405180910390f35b81801561009157600080fd5b506100a56100a0366004610a5f565b610114565b005b8180156100b357600080fd5b506100a56100c2366004610b14565b6101db565b61006e6100d5366004610c31565b610347565b6001600160a01b0383166000908152600485016020526040902060609081906101069087908686610365565b915091505b94509492505050565b6001600160a01b038116600090815260058301602090815260408083206003808201548552860190925290912061014b908361061a565b5080546001600160a01b031660009081526004840160205260409020610171908361061a565b5061017f600184018361061a565b506001600160a01b0382166000908152600584016020526040812080546001600160a01b031990811682556001820180549091169055906101c360028301826107cf565b5060006003820155600401805460ff19169055505050565b6101e86001840183610638565b61021457604051632ccbd64f60e01b81526001600160a01b038316600482015260240160405180910390fd5b6020810151604051637aa9c1d760e11b81526001600160a01b0384811660048301529091169063f55383ae9060240160006040518083038186803b15801561025b57600080fd5b505afa15801561026f573d6000803e3d6000fd5b5050506001600160a01b038084166000908152600586016020908152604091829020855181549085166001600160a01b031991821617825582870151600183018054919096169116179093559084015180518594506102d4926002850192019061080c565b506060828101516003838101919091556080909301516004909201805460ff19169215159290921790915582015160009081529084016020526040902061031b9083610638565b5080516001600160a01b0316600090815260048401602052604090206103419083610638565b50505050565b60008381526003850160205260409020606090819061010690879086865b60608060006103738661064d565b90508085106103c057604080516000808252602082018181528284019093529091906103b5565b6103a2610890565b81526020019060019003908161039a5790505b50925092505061010b565b6103ca8582610c79565b8411156103de576103db8582610c79565b93505b60008467ffffffffffffffff8111156103f9576103f9610a8f565b60405190808252806020026020018201604052801561043257816020015b61041f610890565b8152602001906001900390816104175790505b50905060008567ffffffffffffffff81111561045057610450610a8f565b604051908082528060200260200182016040528015610479578160200160208202803683370190505b50905060005b8681101561060c5761049b610494828a610c90565b8a90610657565b8282815181106104ad576104ad610ca8565b60200260200101906001600160a01b031690816001600160a01b0316815250508960050160008383815181106104e5576104e5610ca8565b6020908102919091018101516001600160a01b039081168352828201939093526040918201600020825160a081018452815485168152600182015490941691840191909152600281018054919284019161053e90610cbe565b80601f016020809104026020016040519081016040528092919081815260200182805461056a90610cbe565b80156105b75780601f1061058c576101008083540402835291602001916105b7565b820191906000526020600020905b81548152906001019060200180831161059a57829003601f168201915b50505091835250506003820154602082015260049091015460ff16151560409091015283518490839081106105ee576105ee610ca8565b6020026020010181905250808061060490610cf8565b91505061047f565b509890975095505050505050565b600061062f836001600160a01b038416610663565b90505b92915050565b600061062f836001600160a01b038416610756565b6000610632825490565b600061062f83836107a5565b6000818152600183016020526040812054801561074c576000610687600183610c79565b855490915060009061069b90600190610c79565b90508181146107005760008660000182815481106106bb576106bb610ca8565b90600052602060002001549050808760000184815481106106de576106de610ca8565b6000918252602080832090910192909255918252600188019052604090208390555b855486908061071157610711610d11565b600190038181906000526020600020016000905590558560010160008681526020019081526020016000206000905560019350505050610632565b6000915050610632565b600081815260018301602052604081205461079d57508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610632565b506000610632565b60008260000182815481106107bc576107bc610ca8565b9060005260206000200154905092915050565b5080546107db90610cbe565b6000825580601f106107eb575050565b601f01602090049060005260206000209081019061080991906108d3565b50565b82805461081890610cbe565b90600052602060002090601f01602090048101928261083a5760008555610880565b82601f1061085357805160ff1916838001178555610880565b82800160010185558215610880579182015b82811115610880578251825591602001919060010190610865565b5061088c9291506108d3565b5090565b6040518060a0016040528060006001600160a01b0316815260200160006001600160a01b0316815260200160608152602001600081526020016000151581525090565b5b8082111561088c57600081556001016108d4565b6001600160a01b038116811461080957600080fd5b6000806000806080858703121561091357600080fd5b843593506020850135610925816108e8565b93969395505050506040820135916060013590565b6040808252835182820181905260009190606090818501906020808901865b8381101561097e5781516001600160a01b031685529382019390820190600101610959565b50508683038188015287518084528184019250600581901b8401820189830160005b83811015610a4e57601f1987840381018752825180516001600160a01b0390811686528782015116878601528a81015160a08c87018190528151908701819052600091905b80831015610a03578183018a015188840160c00152918901916109e5565b80831115610a1557600060c0828a0101525b8c840151888e0152608093840151801515858a015293925099890199601f019093169590950160c00194505050908401906001016109a0565b50909b9a5050505050505050505050565b60008060408385031215610a7257600080fd5b823591506020830135610a84816108e8565b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b60405160a0810167ffffffffffffffff81118282101715610ac857610ac8610a8f565b60405290565b604051601f8201601f1916810167ffffffffffffffff81118282101715610af757610af7610a8f565b604052919050565b80358015158114610b0f57600080fd5b919050565b600080600060608486031215610b2957600080fd5b83359250602080850135610b3c816108e8565b9250604085013567ffffffffffffffff80821115610b5957600080fd5b9086019060a08289031215610b6d57600080fd5b610b75610aa5565b8235610b80816108e8565b815282840135610b8f816108e8565b81850152604083013582811115610ba557600080fd5b8301601f81018a13610bb657600080fd5b803583811115610bc857610bc8610a8f565b610bda601f8201601f19168701610ace565b93508084528a86828401011115610bf057600080fd5b80868301878601376000868286010152505081604082015260608301356060820152610c1e60808401610aff565b6080820152809450505050509250925092565b60008060008060808587031215610c4757600080fd5b5050823594602084013594506040840135936060013592509050565b634e487b7160e01b600052601160045260246000fd5b600082821015610c8b57610c8b610c63565b500390565b60008219821115610ca357610ca3610c63565b500190565b634e487b7160e01b600052603260045260246000fd5b600181811c90821680610cd257607f821691505b602082108103610cf257634e487b7160e01b600052602260045260246000fd5b50919050565b600060018201610d0a57610d0a610c63565b5060010190565b634e487b7160e01b600052603160045260246000fdfea2646970667358221220d20c9d4c10f072ea0080f9070cd6c1f5640f98b796a52ef8bdf783031f888af164736f6c634300080d0033";

type WarpersConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: WarpersConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Warpers__factory extends ContractFactory {
  constructor(...args: WarpersConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Warpers> {
    return super.deploy(overrides || {}) as Promise<Warpers>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Warpers {
    return super.attach(address) as Warpers;
  }
  override connect(signer: Signer): Warpers__factory {
    return super.connect(signer) as Warpers__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WarpersInterface {
    return new utils.Interface(_abi) as WarpersInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Warpers {
    return new Contract(address, _abi, signerOrProvider) as Warpers;
  }
}
