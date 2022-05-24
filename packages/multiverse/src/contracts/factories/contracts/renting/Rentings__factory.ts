/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  Rentings,
  RentingsInterface,
} from "../../../contracts/renting/Rentings";

const _abi = [
  {
    inputs: [],
    name: "BaseTokenMismatch",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "rentalId",
        type: "uint256",
      },
    ],
    name: "CannotDeleteEffectiveRentalAgreement",
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
    name: "IncompatibleAsset",
    type: "error",
  },
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
        internalType: "uint256",
        name: "conflictingRentalId",
        type: "uint256",
      },
    ],
    name: "RentalAgreementConflict",
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
  "0x611e9a61003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100925760003560e01c8063a3f3af0711610065578063a3f3af0714610155578063a4a6c1d614610183578063ab5d3993146101a3578063c0171402146101b657600080fd5b80630199f139146100975780630a7610a4146100ac5780634cf7b3fb146100d55780639dd6945b146100f6575b600080fd5b6100aa6100a536600461155a565b6101d6565b005b6100bf6100ba3660046116e6565b6103d2565b6040516100cc919061172d565b60405180910390f35b6100e86100e336600461177a565b61043b565b6040516100cc929190611804565b61010961010436600461191f565b610746565b6040516100cc9190600060c082019050825182526020830151602083015260408301516040830152606083015160608301526080830151608083015260a083015160a083015292915050565b81801561016157600080fd5b5061017561017036600461198a565b610b04565b6040519081526020016100cc565b81801561018f57600080fd5b506100aa61019e366004611a7d565b610cbd565b6101756101b1366004611a9f565b610d05565b8180156101c257600080fd5b506100aa6101d136600461177a565b610da2565b6101f06101e960a0860160808701611ad7565b8490610e8a565b6101fb828535610eb7565b83356000908152600483016020526040902061021681610ef0565b6102306102296080870160608801611af4565b8290610f20565b61024a6102436040870160208801611ad7565b8390610f4f565b600060058301816102616040890160208a01611ad7565b6001600160a01b03168152602081019190915260409081016000208151608081018352845460e01b6001600160e01b03191692810192835260018501805492945061035d939192869284929091849160608501916102be90611b0f565b80601f01602080910402602001604051908101604052809291908181526020018280546102ea90611b0f565b80156103375780601f1061030c57610100808354040283529160200191610337565b820191906000526020600020905b81548152906001019060200180831161031a57829003601f168201915b505050505081525050815260200160028201548152505082610f8190919063ffffffff16565b61036681610fcc565b60018101546040516361f8064760e01b81526001600160a01b03909116906361f806479061039a9085908a90600401611c83565b60006040518083038186803b1580156103b257600080fd5b505afa1580156103c6573d6000803e3d6000fd5b50505050505050505050565b6000808360030160006103e485610ff2565b81526020019081526020016000206000015490508060000361040a576000915050610435565b600081815260018501602052604090206104239061106c565b61042e576001610431565b60025b9150505b92915050565b6001600160a01b0383166000908152600285016020526040812060609182919061046482611085565b90508086106104b257604080516000808252602082018181528284019093529091906104a6565b61049361141b565b81526020019060019003908161048b5790505b5093509350505061073d565b6104bc8682611cbb565b8511156104d0576104cd8682611cbb565b94505b60008567ffffffffffffffff8111156104eb576104eb611595565b60405190808252806020026020018201604052801561052457816020015b61051161141b565b8152602001906001900390816105095790505b50905060008667ffffffffffffffff81111561054257610542611595565b60405190808252806020026020018201604052801561056b578160200160208202803683370190505b50905060005b878110156107355761058d610586828b611cd2565b869061108f565b82828151811061059f5761059f611cea565b6020026020010181815250508a60010160008383815181106105c3576105c3611cea565b6020908102919091018101518252810191909152604090810160002081516101408101909252805460e01b6001600160e01b0319166101008301908152600182018054849260c0840192859284929184916101208801919061062490611b0f565b80601f016020809104026020016040519081016040528092919081815260200182805461065090611b0f565b801561069d5780601f106106725761010080835404028352916020019161069d565b820191906000526020600020905b81548152906001019060200180831161068057829003601f168201915b50505091909252505050815260029190910154602091820152908252600383015490820152600482015460408201526005909101546001600160a01b038116606083015263ffffffff600160a01b820481166080840152600160c01b9091041660a090910152835184908390811061071757610717611cea565b6020026020010181905250808061072d90611d00565b915050610571565b509450925050505b94509492505050565b61077f6040518060c001604052806000815260200160008152602001600081526020016000815260200160008152602001600081525090565b85356000908152600485810160209081526040808420815180830190925260038101805460e01b6001600160e01b0319168352938101805491959492938401916107c890611b0f565b80601f01602080910402602001604051908101604052809291908181526020018280546107f490611b0f565b80156108415780601f1061081657610100808354040283529160200191610841565b820191906000526020600020905b81548152906001019060200180831161082457829003601f168201915b505050505081525050905060006108658260000151886110a290919063ffffffff16565b6040516325683b1360e11b81529091506001600160a01b03821690634ad07626906108969085908d90600401611d19565b602060405180830381865afa1580156108b3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108d79190611d59565b84604001818152505060008660050160008b60200160208101906108fb9190611ad7565b6001600160a01b03166001600160a01b0316815260200190815260200160002090506000866001600160a01b03166323c96ba383600301546040518263ffffffff1660e01b815260040161095191815260200190565b602060405180830381865afa15801561096e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109929190611d72565b90506127108161ffff1687604001516109ab9190611d96565b6109b59190611db5565b608087015289546040870151612710916109db91600160a01b90910461ffff1690611d96565b6109e59190611db5565b8660200181815250506000808360010160009054906101000a90046001600160a01b03166001600160a01b031663f19e254e886000018f8b608001518c604001516040518563ffffffff1660e01b8152600401610a459493929190611dd7565b6040805180830381865afa158015610a61573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a859190611e0d565b60608a0181905260a08a0182905260408a01519193509150610aa8908290611cd2565b88518990610ab7908390611cd2565b9052506080880151610aca908390611cd2565b88518990610ad9908390611cd2565b905250602088015188518990610af0908390611cd2565b905250969c9b505050505050505050505050565b8051516000908190610b1590610ff2565b60008181526003860160205260409020549091508015801590610b4c575060008181526001860160205260409020610b4c9061106c565b15610b7257604051633e650ecb60e01b8152600481018290526024015b60405180910390fd5b8454600101855584546000818152600187810160209081526040909220875180518051835463ffffffff191660e09190911c1783558085015180519699508a9693959294869492938593610bcd939285019290910190611473565b50505060209182015160029182015583820151600380850191909155604080860151600486015560608087015160059096018054608089015160a09099015163ffffffff908116600160c01b0263ffffffff60c01b199a8216600160a01b026001600160c01b03199093166001600160a01b039a8b161792909217999099161790556000898152928c0185528183208a90558a0151909416815290890190915220610c7a91859061111b16565b5060608401516001600160a01b0316600090815260028087016020908152604080842082890151855290920190529020610cb4908461111b565b50505092915050565b60008181526001830160205260409020610cd69061106c565b15610cf7576040516317c68aed60e31b815260048101829052602401610b69565b610d018282611127565b5050565b6001600160a01b03821660009081526002808501602090815260408084208585529092019052812081610d3782611085565b905060005b81811015610d985760006001880181610d55868561108f565b81526020019081526020016000209050610d6e8161106c565b15610d85576002810154610d829086611cd2565b94505b5080610d9081611d00565b915050610d3c565b5050509392505050565b6001600160a01b03831660009081526002808601602090815260408084208685529092019052812090610dd482611085565b9050801580610de1575082155b15610ded575050610e84565b600060148210610dfe576014610e00565b815b90506000805b82811015610e7e576000610e1a868361108f565b600081815260018c0160205260409020909150610e369061106c565b610e6b57610e448a82611127565b610e4f600184611cd2565b9250610e5c600185611cbb565b9350868303610e6b5750610e7e565b5080610e7681611d00565b915050610e06565b50505050505b50505050565b81546001600160a01b03828116911614610d015760405163f8412bb760e01b815260040160405180910390fd5b60008181526004830160205260409020610ed090611201565b610d015760405163068bb67560e51b815260048101829052602401610b69565b6005810154600160f01b900460ff1615610f1d57604051637892dcf360e01b815260040160405180910390fd5b50565b610f2a828261122e565b610d0157604051634d1c756160e11b815263ffffffff82166004820152602401610b69565b610f59828261125e565b610d0157604051634f59bc1f60e11b81526001600160a01b0382166004820152602401610b69565b6000610f8c8261128a565b83549091506001600160a01b03808316911614610fc7576040516323b390eb60e21b81526001600160a01b0382166004820152602401610b69565b505050565b600481015460ff1615610f1d5760405163651c69e160e01b815260040160405180910390fd5b805160208083015180519082012060405160009361104f937fe572bf63c99d807e749180ef2e095adf03b28545e8b411e85f0b71d2fcf65f86939192019283526001600160e01b0319919091166020830152604082015260600190565b604051602081830303815290604052805190602001209050919050565b6005015463ffffffff428116600160c01b909204161190565b6000610435825490565b600061109b83836112a8565b9392505050565b6001820154604051636b19230360e11b81526001600160e01b0319831660048201526000916001600160a01b03169063d632460690602401602060405180830381865afa1580156110f7573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061109b9190611e31565b600061109b83836112d2565b6000818152600183016020908152604080832060058101546003909101546001600160a01b039091168085526002870190935292209091906111699084611321565b506001600160a01b03821660009081526002808601602090815260408084208585529092019052902061119c9084611321565b506000838152600180860160205260408220805463ffffffff19168155919082908290829082906111cf908301826114f7565b50506000600292909201829055506003830181905560048301555060050180546001600160e01b031916905550505050565b60058101546000906001600160a01b03161580159061043557505060050154600160e81b900460ff161590565b6000808263ffffffff1611801561109b57505060059190910154600160a01b900463ffffffff9081169116111590565b600061109b60018401836001600160a01b0381166000908152600183016020526040812054151561109b565b60008160000151602001518060200190518101906104359190611e31565b60008260000182815481106112bf576112bf611cea565b9060005260206000200154905092915050565b600081815260018301602052604081205461131957508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610435565b506000610435565b600061109b83836000818152600183016020526040812054801561141157600061134c600183611cbb565b855490915060009061136090600190611cbb565b90508181146113c557600086600001828154811061138057611380611cea565b90600052602060002001549050808760000184815481106113a3576113a3611cea565b6000918252602080832090910192909255918252600188019052604090208390555b85548690806113d6576113d6611e4e565b600190038181906000526020600020016000905590558560010160008681526020019081526020016000206000905560019350505050610435565b6000915050610435565b60408051610140810190915260006101008201818152606061012084015260c0830190815260e08301919091528190815260006020820181905260408201819052606082018190526080820181905260a09091015290565b82805461147f90611b0f565b90600052602060002090601f0160209004810192826114a157600085556114e7565b82601f106114ba57805160ff19168380011785556114e7565b828001600101855582156114e7579182015b828111156114e75782518255916020019190600101906114cc565b506114f392915061152d565b5090565b50805461150390611b0f565b6000825580601f10611513575050565b601f016020900490600052602060002090810190610f1d91905b5b808211156114f3576000815560010161152e565b600060a0828403121561155457600080fd5b50919050565b600080600080610100858703121561157157600080fd5b61157b8686611542565b9660a0860135965060c08601359560e00135945092505050565b634e487b7160e01b600052604160045260246000fd5b6040805190810167ffffffffffffffff811182821017156115ce576115ce611595565b60405290565b60405160c0810167ffffffffffffffff811182821017156115ce576115ce611595565b604051601f8201601f1916810167ffffffffffffffff8111828210171561162057611620611595565b604052919050565b60006040828403121561163a57600080fd5b6116426115ab565b905081356001600160e01b03198116811461165c57600080fd5b815260208281013567ffffffffffffffff8082111561167a57600080fd5b818501915085601f83011261168e57600080fd5b8135818111156116a0576116a0611595565b6116b2601f8201601f191685016115f7565b915080825286848285010111156116c857600080fd5b80848401858401376000908201840152918301919091525092915050565b600080604083850312156116f957600080fd5b82359150602083013567ffffffffffffffff81111561171757600080fd5b61172385828601611628565b9150509250929050565b602081016003831061174f57634e487b7160e01b600052602160045260246000fd5b91905290565b6001600160a01b0381168114610f1d57600080fd5b803561177581611755565b919050565b6000806000806080858703121561179057600080fd5b8435935060208501356117a281611755565b93969395505050506040820135916060013590565b6000815180845260005b818110156117dd576020818501810151868301820152016117c1565b818111156117ef576000602083870101525b50601f01601f19169290920160200192915050565b6040808252835182820181905260009190606090818501906020808901865b8381101561183f57815185529382019390820190600101611823565b50508683038188015287518084528184019250600581901b8401820189830160005b8381101561190e57868303601f190186528151805160c080865281519086018c905280516001600160e01b03191661010087015287015161012086018c9052906118af6101408701836117b7565b9088015160e087015282880151868901528b8301518c8701528a8301516001600160a01b03168b87015260808084015163ffffffff9081169188019190915260a093840151169290950191909152509484019490840190600101611861565b50909b9a5050505050505050505050565b6000806000806000610120868803121561193857600080fd5b6119428787611542565b945060a0860135935060c0860135925060e0860135915061010086013561196881611755565b809150509295509295909350565b803563ffffffff8116811461177557600080fd5b6000806040838503121561199d57600080fd5b82359150602083013567ffffffffffffffff808211156119bc57600080fd5b9084019060c082870312156119d057600080fd5b6119d86115d4565b8235828111156119e757600080fd5b8301604081890312156119f957600080fd5b611a016115ab565b813584811115611a1057600080fd5b611a1c8a828501611628565b825250602091820135828201528252838101359082015260408084013590820152611a496060840161176a565b6060820152611a5a60808401611976565b6080820152611a6b60a08401611976565b60a08201528093505050509250929050565b60008060408385031215611a9057600080fd5b50508035926020909101359150565b600080600060608486031215611ab457600080fd5b833592506020840135611ac681611755565b929592945050506040919091013590565b600060208284031215611ae957600080fd5b813561109b81611755565b600060208284031215611b0657600080fd5b61109b82611976565b600181811c90821680611b2357607f821691505b60208210810361155457634e487b7160e01b600052602260045260246000fd5b6040808352815460e01b6001600160e01b031916838201526060830152600180820180546000929190839080841c81851680611b8057607f821691505b60208083108203611b9f57634e487b7160e01b85526022600452602485fd5b60808a0183905260a08a01828015611bbe5760018114611bcf57611bfa565b60ff19861682528282019650611bfa565b60008881526020902060005b86811015611bf457815484820152908a01908401611bdb565b83019750505b50506002890154818b01525050505080935050505092915050565b803582526020810135611c2781611755565b6001600160a01b039081166020840152604082013590611c4682611755565b808216604085015263ffffffff611c5f60608501611976565b16606085015260808301359150611c7582611755565b808216608085015250505050565b60c081526000611c9660c0830185611b43565b905061109b6020830184611c15565b634e487b7160e01b600052601160045260246000fd5b600082821015611ccd57611ccd611ca5565b500390565b60008219821115611ce557611ce5611ca5565b500190565b634e487b7160e01b600052603260045260246000fd5b600060018201611d1257611d12611ca5565b5060010190565b60c0815263ffffffff60e01b83511660c082015260006020840151604060e0840152611d496101008401826117b7565b91505061109b6020830184611c15565b600060208284031215611d6b57600080fd5b5051919050565b600060208284031215611d8457600080fd5b815161ffff8116811461109b57600080fd5b6000816000190483118215151615611db057611db0611ca5565b500290565b600082611dd257634e487b7160e01b600052601260045260246000fd5b500490565b6000610100808352611deb81840188611b43565b915050611dfb6020830186611c15565b60c082019390935260e0015292915050565b60008060408385031215611e2057600080fd5b505080516020909101519092909150565b600060208284031215611e4357600080fd5b815161109b81611755565b634e487b7160e01b600052603160045260246000fdfea2646970667358221220c6bfc224bb7955eff031cf4fae0106685dfb85255ca5fe84ff3c5e62936a923164736f6c634300080d0033";

type RentingsConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RentingsConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Rentings__factory extends ContractFactory {
  constructor(...args: RentingsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Rentings> {
    return super.deploy(overrides || {}) as Promise<Rentings>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Rentings {
    return super.attach(address) as Rentings;
  }
  override connect(signer: Signer): Rentings__factory {
    return super.connect(signer) as Rentings__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RentingsInterface {
    return new utils.Interface(_abi) as RentingsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Rentings {
    return new Contract(address, _abi, signerOrProvider) as Rentings;
  }
}
