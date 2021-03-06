/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../../common";

export declare namespace Assets {
  export type AssetIdStruct = { class: BytesLike; data: BytesLike };

  export type AssetIdStructOutput = [string, string] & {
    class: string;
    data: string;
  };

  export type AssetStruct = { id: Assets.AssetIdStruct; value: BigNumberish };

  export type AssetStructOutput = [Assets.AssetIdStructOutput, BigNumber] & {
    id: Assets.AssetIdStructOutput;
    value: BigNumber;
  };
}

export declare namespace Rentings {
  export type ParamsStruct = {
    listingId: BigNumberish;
    warper: string;
    renter: string;
    rentalPeriod: BigNumberish;
    paymentToken: string;
  };

  export type ParamsStructOutput = [
    BigNumber,
    string,
    string,
    number,
    string
  ] & {
    listingId: BigNumber;
    warper: string;
    renter: string;
    rentalPeriod: number;
    paymentToken: string;
  };

  export type AgreementStruct = {
    warpedAsset: Assets.AssetStruct;
    collectionId: BytesLike;
    listingId: BigNumberish;
    renter: string;
    startTime: BigNumberish;
    endTime: BigNumberish;
    listingParams: Listings.ParamsStruct;
  };

  export type AgreementStructOutput = [
    Assets.AssetStructOutput,
    string,
    BigNumber,
    string,
    number,
    number,
    Listings.ParamsStructOutput
  ] & {
    warpedAsset: Assets.AssetStructOutput;
    collectionId: string;
    listingId: BigNumber;
    renter: string;
    startTime: number;
    endTime: number;
    listingParams: Listings.ParamsStructOutput;
  };
}

export declare namespace Listings {
  export type ParamsStruct = { strategy: BytesLike; data: BytesLike };

  export type ParamsStructOutput = [string, string] & {
    strategy: string;
    data: string;
  };
}

export declare namespace Accounts {
  export type UserEarningStruct = {
    earningType: BigNumberish;
    account: string;
    value: BigNumberish;
    token: string;
  };

  export type UserEarningStructOutput = [number, string, BigNumber, string] & {
    earningType: number;
    account: string;
    value: BigNumber;
    token: string;
  };

  export type RentalEarningsStruct = {
    userEarnings: Accounts.UserEarningStruct[];
    universeId: BigNumberish;
    universeEarningValue: BigNumberish;
    universeEarningToken: string;
    protocolEarningValue: BigNumberish;
    protocolEarningToken: string;
  };

  export type RentalEarningsStructOutput = [
    Accounts.UserEarningStructOutput[],
    BigNumber,
    BigNumber,
    string,
    BigNumber,
    string
  ] & {
    userEarnings: Accounts.UserEarningStructOutput[];
    universeId: BigNumber;
    universeEarningValue: BigNumber;
    universeEarningToken: string;
    protocolEarningValue: BigNumber;
    protocolEarningToken: string;
  };
}

export interface ERC721WarperControllerMockInterface extends utils.Interface {
  functions: {
    "assetClass()": FunctionFragment;
    "calculatePremiums(((bytes4,bytes),uint256),(uint256,address,address,uint32,address),uint256,uint256)": FunctionFragment;
    "checkCompatibleWarper(address)": FunctionFragment;
    "collectionId((bytes4,bytes))": FunctionFragment;
    "executeRentingHooks(uint256,(((bytes4,bytes),uint256),bytes32,uint256,address,uint32,uint32,(bytes4,bytes)),((uint8,address,uint256,address)[],uint256,uint256,address,uint256,address))": FunctionFragment;
    "isCompatibleWarper(address)": FunctionFragment;
    "rentalBalance(address,address,address)": FunctionFragment;
    "rentalStatus(address,address,uint256)": FunctionFragment;
    "returnAssetFromVault(((bytes4,bytes),uint256),address)": FunctionFragment;
    "setPremiums(uint256,uint256)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "transfer(((bytes4,bytes),uint256),address,address,bytes)": FunctionFragment;
    "transferAssetToVault(((bytes4,bytes),uint256),address,address)": FunctionFragment;
    "validateRentingParams(((bytes4,bytes),uint256),(uint256,address,address,uint32,address))": FunctionFragment;
    "warp(((bytes4,bytes),uint256),address,address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "assetClass"
      | "calculatePremiums"
      | "checkCompatibleWarper"
      | "collectionId"
      | "executeRentingHooks"
      | "isCompatibleWarper"
      | "rentalBalance"
      | "rentalStatus"
      | "returnAssetFromVault"
      | "setPremiums"
      | "supportsInterface"
      | "transfer"
      | "transferAssetToVault"
      | "validateRentingParams"
      | "warp"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "assetClass",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "calculatePremiums",
    values: [
      Assets.AssetStruct,
      Rentings.ParamsStruct,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "checkCompatibleWarper",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "collectionId",
    values: [Assets.AssetIdStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "executeRentingHooks",
    values: [
      BigNumberish,
      Rentings.AgreementStruct,
      Accounts.RentalEarningsStruct
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "isCompatibleWarper",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "rentalBalance",
    values: [string, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "rentalStatus",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "returnAssetFromVault",
    values: [Assets.AssetStruct, string]
  ): string;
  encodeFunctionData(
    functionFragment: "setPremiums",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [Assets.AssetStruct, string, string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "transferAssetToVault",
    values: [Assets.AssetStruct, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "validateRentingParams",
    values: [Assets.AssetStruct, Rentings.ParamsStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "warp",
    values: [Assets.AssetStruct, string, string]
  ): string;

  decodeFunctionResult(functionFragment: "assetClass", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "calculatePremiums",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "checkCompatibleWarper",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "collectionId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "executeRentingHooks",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isCompatibleWarper",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rentalBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rentalStatus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "returnAssetFromVault",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setPremiums",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferAssetToVault",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "validateRentingParams",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "warp", data: BytesLike): Result;

  events: {
    "AssetTransfer(tuple,address,address,bytes)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AssetTransfer"): EventFragment;
}

export interface AssetTransferEventObject {
  asset: Assets.AssetStructOutput;
  from: string;
  to: string;
  data: string;
}
export type AssetTransferEvent = TypedEvent<
  [Assets.AssetStructOutput, string, string, string],
  AssetTransferEventObject
>;

export type AssetTransferEventFilter = TypedEventFilter<AssetTransferEvent>;

export interface ERC721WarperControllerMock extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ERC721WarperControllerMockInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    assetClass(overrides?: CallOverrides): Promise<[string]>;

    calculatePremiums(
      arg0: Assets.AssetStruct,
      arg1: Rentings.ParamsStruct,
      arg2: BigNumberish,
      arg3: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber]>;

    checkCompatibleWarper(
      warper: string,
      overrides?: CallOverrides
    ): Promise<[void]>;

    collectionId(
      assetId: Assets.AssetIdStruct,
      overrides?: CallOverrides
    ): Promise<[string]>;

    executeRentingHooks(
      rentalId: BigNumberish,
      rentalAgreement: Rentings.AgreementStruct,
      rentalEarnings: Accounts.RentalEarningsStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    isCompatibleWarper(
      warper: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    rentalBalance(
      metahub: string,
      warper: string,
      renter: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    rentalStatus(
      metahub: string,
      warper: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[number]>;

    returnAssetFromVault(
      asset: Assets.AssetStruct,
      vault: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setPremiums(
      universePremium: BigNumberish,
      listerPremium: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    transfer(
      asset: Assets.AssetStruct,
      from: string,
      to: string,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferAssetToVault(
      asset: Assets.AssetStruct,
      assetOwner: string,
      vault: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    validateRentingParams(
      asset: Assets.AssetStruct,
      rentingParams: Rentings.ParamsStruct,
      overrides?: CallOverrides
    ): Promise<[void]>;

    warp(
      asset: Assets.AssetStruct,
      warper: string,
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  assetClass(overrides?: CallOverrides): Promise<string>;

  calculatePremiums(
    arg0: Assets.AssetStruct,
    arg1: Rentings.ParamsStruct,
    arg2: BigNumberish,
    arg3: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber]>;

  checkCompatibleWarper(
    warper: string,
    overrides?: CallOverrides
  ): Promise<void>;

  collectionId(
    assetId: Assets.AssetIdStruct,
    overrides?: CallOverrides
  ): Promise<string>;

  executeRentingHooks(
    rentalId: BigNumberish,
    rentalAgreement: Rentings.AgreementStruct,
    rentalEarnings: Accounts.RentalEarningsStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  isCompatibleWarper(
    warper: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  rentalBalance(
    metahub: string,
    warper: string,
    renter: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  rentalStatus(
    metahub: string,
    warper: string,
    tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<number>;

  returnAssetFromVault(
    asset: Assets.AssetStruct,
    vault: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setPremiums(
    universePremium: BigNumberish,
    listerPremium: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  transfer(
    asset: Assets.AssetStruct,
    from: string,
    to: string,
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferAssetToVault(
    asset: Assets.AssetStruct,
    assetOwner: string,
    vault: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  validateRentingParams(
    asset: Assets.AssetStruct,
    rentingParams: Rentings.ParamsStruct,
    overrides?: CallOverrides
  ): Promise<void>;

  warp(
    asset: Assets.AssetStruct,
    warper: string,
    to: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    assetClass(overrides?: CallOverrides): Promise<string>;

    calculatePremiums(
      arg0: Assets.AssetStruct,
      arg1: Rentings.ParamsStruct,
      arg2: BigNumberish,
      arg3: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber]>;

    checkCompatibleWarper(
      warper: string,
      overrides?: CallOverrides
    ): Promise<void>;

    collectionId(
      assetId: Assets.AssetIdStruct,
      overrides?: CallOverrides
    ): Promise<string>;

    executeRentingHooks(
      rentalId: BigNumberish,
      rentalAgreement: Rentings.AgreementStruct,
      rentalEarnings: Accounts.RentalEarningsStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    isCompatibleWarper(
      warper: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    rentalBalance(
      metahub: string,
      warper: string,
      renter: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    rentalStatus(
      metahub: string,
      warper: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<number>;

    returnAssetFromVault(
      asset: Assets.AssetStruct,
      vault: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setPremiums(
      universePremium: BigNumberish,
      listerPremium: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transfer(
      asset: Assets.AssetStruct,
      from: string,
      to: string,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    transferAssetToVault(
      asset: Assets.AssetStruct,
      assetOwner: string,
      vault: string,
      overrides?: CallOverrides
    ): Promise<void>;

    validateRentingParams(
      asset: Assets.AssetStruct,
      rentingParams: Rentings.ParamsStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    warp(
      asset: Assets.AssetStruct,
      warper: string,
      to: string,
      overrides?: CallOverrides
    ): Promise<
      [string, Assets.AssetStructOutput] & {
        warpedCollectionId: string;
        warpedAsset: Assets.AssetStructOutput;
      }
    >;
  };

  filters: {
    "AssetTransfer(tuple,address,address,bytes)"(
      asset?: null,
      from?: string | null,
      to?: string | null,
      data?: null
    ): AssetTransferEventFilter;
    AssetTransfer(
      asset?: null,
      from?: string | null,
      to?: string | null,
      data?: null
    ): AssetTransferEventFilter;
  };

  estimateGas: {
    assetClass(overrides?: CallOverrides): Promise<BigNumber>;

    calculatePremiums(
      arg0: Assets.AssetStruct,
      arg1: Rentings.ParamsStruct,
      arg2: BigNumberish,
      arg3: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    checkCompatibleWarper(
      warper: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    collectionId(
      assetId: Assets.AssetIdStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    executeRentingHooks(
      rentalId: BigNumberish,
      rentalAgreement: Rentings.AgreementStruct,
      rentalEarnings: Accounts.RentalEarningsStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    isCompatibleWarper(
      warper: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    rentalBalance(
      metahub: string,
      warper: string,
      renter: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    rentalStatus(
      metahub: string,
      warper: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    returnAssetFromVault(
      asset: Assets.AssetStruct,
      vault: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setPremiums(
      universePremium: BigNumberish,
      listerPremium: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transfer(
      asset: Assets.AssetStruct,
      from: string,
      to: string,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferAssetToVault(
      asset: Assets.AssetStruct,
      assetOwner: string,
      vault: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    validateRentingParams(
      asset: Assets.AssetStruct,
      rentingParams: Rentings.ParamsStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    warp(
      asset: Assets.AssetStruct,
      warper: string,
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    assetClass(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    calculatePremiums(
      arg0: Assets.AssetStruct,
      arg1: Rentings.ParamsStruct,
      arg2: BigNumberish,
      arg3: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    checkCompatibleWarper(
      warper: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    collectionId(
      assetId: Assets.AssetIdStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    executeRentingHooks(
      rentalId: BigNumberish,
      rentalAgreement: Rentings.AgreementStruct,
      rentalEarnings: Accounts.RentalEarningsStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    isCompatibleWarper(
      warper: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    rentalBalance(
      metahub: string,
      warper: string,
      renter: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    rentalStatus(
      metahub: string,
      warper: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    returnAssetFromVault(
      asset: Assets.AssetStruct,
      vault: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setPremiums(
      universePremium: BigNumberish,
      listerPremium: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transfer(
      asset: Assets.AssetStruct,
      from: string,
      to: string,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferAssetToVault(
      asset: Assets.AssetStruct,
      assetOwner: string,
      vault: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    validateRentingParams(
      asset: Assets.AssetStruct,
      rentingParams: Rentings.ParamsStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    warp(
      asset: Assets.AssetStruct,
      warper: string,
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
