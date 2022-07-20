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
  PayableOverrides,
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

export interface WarperExtendingPresetInterface extends utils.Interface {
  functions: {
    "__assetClass()": FunctionFragment;
    "__availabilityPeriodEnd()": FunctionFragment;
    "__availabilityPeriodRange()": FunctionFragment;
    "__availabilityPeriodStart()": FunctionFragment;
    "__initialize(bytes)": FunctionFragment;
    "__maxRentalPeriod()": FunctionFragment;
    "__metahub()": FunctionFragment;
    "__minRentalPeriod()": FunctionFragment;
    "__original()": FunctionFragment;
    "__rentalPeriodRange()": FunctionFragment;
    "__setAvailabilityPeriodEnd(uint32)": FunctionFragment;
    "__setAvailabilityPeriodStart(uint32)": FunctionFragment;
    "__setMaxRentalPeriod(uint32)": FunctionFragment;
    "__setMinRentalPeriod(uint32)": FunctionFragment;
    "__supportedInterfaces(bytes4[])": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "getApproved(uint256)": FunctionFragment;
    "initValue()": FunctionFragment;
    "isApprovedForAll(address,address)": FunctionFragment;
    "mint(address,uint256,bytes)": FunctionFragment;
    "multicall(bytes[])": FunctionFragment;
    "owner()": FunctionFragment;
    "ownerOf(uint256)": FunctionFragment;
    "proxiableUUID()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "safeTransferFrom(address,address,uint256)": FunctionFragment;
    "safeTransferFrom(address,address,uint256,bytes)": FunctionFragment;
    "setApprovalForAll(address,bool)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "upgradeTo(address)": FunctionFragment;
    "upgradeToAndCall(address,bytes)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "__assetClass"
      | "__availabilityPeriodEnd"
      | "__availabilityPeriodRange"
      | "__availabilityPeriodStart"
      | "__initialize"
      | "__maxRentalPeriod"
      | "__metahub"
      | "__minRentalPeriod"
      | "__original"
      | "__rentalPeriodRange"
      | "__setAvailabilityPeriodEnd"
      | "__setAvailabilityPeriodStart"
      | "__setMaxRentalPeriod"
      | "__setMinRentalPeriod"
      | "__supportedInterfaces"
      | "approve"
      | "balanceOf"
      | "getApproved"
      | "initValue"
      | "isApprovedForAll"
      | "mint"
      | "multicall"
      | "owner"
      | "ownerOf"
      | "proxiableUUID"
      | "renounceOwnership"
      | "safeTransferFrom(address,address,uint256)"
      | "safeTransferFrom(address,address,uint256,bytes)"
      | "setApprovalForAll"
      | "supportsInterface"
      | "transferFrom"
      | "transferOwnership"
      | "upgradeTo"
      | "upgradeToAndCall"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "__assetClass",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "__availabilityPeriodEnd",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "__availabilityPeriodRange",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "__availabilityPeriodStart",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "__initialize",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "__maxRentalPeriod",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "__metahub", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "__minRentalPeriod",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "__original",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "__rentalPeriodRange",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "__setAvailabilityPeriodEnd",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "__setAvailabilityPeriodStart",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "__setMaxRentalPeriod",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "__setMinRentalPeriod",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "__supportedInterfaces",
    values: [BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "getApproved",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "initValue", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "isApprovedForAll",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "mint",
    values: [string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "multicall",
    values: [BytesLike[]]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "ownerOf",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "proxiableUUID",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "safeTransferFrom(address,address,uint256)",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "safeTransferFrom(address,address,uint256,bytes)",
    values: [string, string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setApprovalForAll",
    values: [string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "upgradeTo", values: [string]): string;
  encodeFunctionData(
    functionFragment: "upgradeToAndCall",
    values: [string, BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "__assetClass",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "__availabilityPeriodEnd",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "__availabilityPeriodRange",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "__availabilityPeriodStart",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "__initialize",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "__maxRentalPeriod",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "__metahub", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "__minRentalPeriod",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "__original", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "__rentalPeriodRange",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "__setAvailabilityPeriodEnd",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "__setAvailabilityPeriodStart",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "__setMaxRentalPeriod",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "__setMinRentalPeriod",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "__supportedInterfaces",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getApproved",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initValue", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isApprovedForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "multicall", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ownerOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "proxiableUUID",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "safeTransferFrom(address,address,uint256)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "safeTransferFrom(address,address,uint256,bytes)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setApprovalForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "upgradeTo", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "upgradeToAndCall",
    data: BytesLike
  ): Result;

  events: {
    "AdminChanged(address,address)": EventFragment;
    "Approval(address,address,uint256)": EventFragment;
    "ApprovalForAll(address,address,bool)": EventFragment;
    "BeaconUpgraded(address)": EventFragment;
    "Initialized(uint8)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
    "Upgraded(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ApprovalForAll"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BeaconUpgraded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Upgraded"): EventFragment;
}

export interface AdminChangedEventObject {
  previousAdmin: string;
  newAdmin: string;
}
export type AdminChangedEvent = TypedEvent<
  [string, string],
  AdminChangedEventObject
>;

export type AdminChangedEventFilter = TypedEventFilter<AdminChangedEvent>;

export interface ApprovalEventObject {
  owner: string;
  approved: string;
  tokenId: BigNumber;
}
export type ApprovalEvent = TypedEvent<
  [string, string, BigNumber],
  ApprovalEventObject
>;

export type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;

export interface ApprovalForAllEventObject {
  owner: string;
  operator: string;
  approved: boolean;
}
export type ApprovalForAllEvent = TypedEvent<
  [string, string, boolean],
  ApprovalForAllEventObject
>;

export type ApprovalForAllEventFilter = TypedEventFilter<ApprovalForAllEvent>;

export interface BeaconUpgradedEventObject {
  beacon: string;
}
export type BeaconUpgradedEvent = TypedEvent<
  [string],
  BeaconUpgradedEventObject
>;

export type BeaconUpgradedEventFilter = TypedEventFilter<BeaconUpgradedEvent>;

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface TransferEventObject {
  from: string;
  to: string;
  tokenId: BigNumber;
}
export type TransferEvent = TypedEvent<
  [string, string, BigNumber],
  TransferEventObject
>;

export type TransferEventFilter = TypedEventFilter<TransferEvent>;

export interface UpgradedEventObject {
  implementation: string;
}
export type UpgradedEvent = TypedEvent<[string], UpgradedEventObject>;

export type UpgradedEventFilter = TypedEventFilter<UpgradedEvent>;

export interface WarperExtendingPreset extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: WarperExtendingPresetInterface;

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
    __assetClass(overrides?: CallOverrides): Promise<[string]>;

    __availabilityPeriodEnd(overrides?: CallOverrides): Promise<[number]>;

    __availabilityPeriodRange(
      overrides?: CallOverrides
    ): Promise<
      [number, number] & {
        availabilityPeriodStart: number;
        availabilityPeriodEnd: number;
      }
    >;

    __availabilityPeriodStart(overrides?: CallOverrides): Promise<[number]>;

    __initialize(
      config: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    __maxRentalPeriod(overrides?: CallOverrides): Promise<[number]>;

    __metahub(overrides?: CallOverrides): Promise<[string]>;

    __minRentalPeriod(overrides?: CallOverrides): Promise<[number]>;

    __original(overrides?: CallOverrides): Promise<[string]>;

    __rentalPeriodRange(
      overrides?: CallOverrides
    ): Promise<
      [number, number] & { minRentalPeriod: number; maxRentalPeriod: number }
    >;

    __setAvailabilityPeriodEnd(
      availabilityPeriodEnd: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    __setAvailabilityPeriodStart(
      availabilityPeriodStart: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    __setMaxRentalPeriod(
      maxRentalPeriod: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    __setMinRentalPeriod(
      minRentalPeriod: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    __supportedInterfaces(
      interfaceIds: BytesLike[],
      overrides?: CallOverrides
    ): Promise<[boolean[]]>;

    approve(
      arg0: string,
      arg1: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    balanceOf(owner: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    initValue(overrides?: CallOverrides): Promise<[number]>;

    isApprovedForAll(
      arg0: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    mint(
      to: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    multicall(
      data: BytesLike[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    ownerOf(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    proxiableUUID(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setApprovalForAll(
      arg0: string,
      arg1: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    upgradeTo(
      newImplementation: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    upgradeToAndCall(
      newImplementation: string,
      data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  __assetClass(overrides?: CallOverrides): Promise<string>;

  __availabilityPeriodEnd(overrides?: CallOverrides): Promise<number>;

  __availabilityPeriodRange(
    overrides?: CallOverrides
  ): Promise<
    [number, number] & {
      availabilityPeriodStart: number;
      availabilityPeriodEnd: number;
    }
  >;

  __availabilityPeriodStart(overrides?: CallOverrides): Promise<number>;

  __initialize(
    config: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  __maxRentalPeriod(overrides?: CallOverrides): Promise<number>;

  __metahub(overrides?: CallOverrides): Promise<string>;

  __minRentalPeriod(overrides?: CallOverrides): Promise<number>;

  __original(overrides?: CallOverrides): Promise<string>;

  __rentalPeriodRange(
    overrides?: CallOverrides
  ): Promise<
    [number, number] & { minRentalPeriod: number; maxRentalPeriod: number }
  >;

  __setAvailabilityPeriodEnd(
    availabilityPeriodEnd: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  __setAvailabilityPeriodStart(
    availabilityPeriodStart: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  __setMaxRentalPeriod(
    maxRentalPeriod: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  __setMinRentalPeriod(
    minRentalPeriod: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  __supportedInterfaces(
    interfaceIds: BytesLike[],
    overrides?: CallOverrides
  ): Promise<boolean[]>;

  approve(
    arg0: string,
    arg1: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

  getApproved(
    tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  initValue(overrides?: CallOverrides): Promise<number>;

  isApprovedForAll(
    arg0: string,
    operator: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  mint(
    to: string,
    tokenId: BigNumberish,
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  multicall(
    data: BytesLike[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  proxiableUUID(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "safeTransferFrom(address,address,uint256)"(
    from: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "safeTransferFrom(address,address,uint256,bytes)"(
    from: string,
    to: string,
    tokenId: BigNumberish,
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setApprovalForAll(
    arg0: string,
    arg1: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  transferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  upgradeTo(
    newImplementation: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  upgradeToAndCall(
    newImplementation: string,
    data: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    __assetClass(overrides?: CallOverrides): Promise<string>;

    __availabilityPeriodEnd(overrides?: CallOverrides): Promise<number>;

    __availabilityPeriodRange(
      overrides?: CallOverrides
    ): Promise<
      [number, number] & {
        availabilityPeriodStart: number;
        availabilityPeriodEnd: number;
      }
    >;

    __availabilityPeriodStart(overrides?: CallOverrides): Promise<number>;

    __initialize(config: BytesLike, overrides?: CallOverrides): Promise<void>;

    __maxRentalPeriod(overrides?: CallOverrides): Promise<number>;

    __metahub(overrides?: CallOverrides): Promise<string>;

    __minRentalPeriod(overrides?: CallOverrides): Promise<number>;

    __original(overrides?: CallOverrides): Promise<string>;

    __rentalPeriodRange(
      overrides?: CallOverrides
    ): Promise<
      [number, number] & { minRentalPeriod: number; maxRentalPeriod: number }
    >;

    __setAvailabilityPeriodEnd(
      availabilityPeriodEnd: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    __setAvailabilityPeriodStart(
      availabilityPeriodStart: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    __setMaxRentalPeriod(
      maxRentalPeriod: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    __setMinRentalPeriod(
      minRentalPeriod: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    __supportedInterfaces(
      interfaceIds: BytesLike[],
      overrides?: CallOverrides
    ): Promise<boolean[]>;

    approve(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    initValue(overrides?: CallOverrides): Promise<number>;

    isApprovedForAll(
      arg0: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    mint(
      to: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    multicall(data: BytesLike[], overrides?: CallOverrides): Promise<string[]>;

    owner(overrides?: CallOverrides): Promise<string>;

    ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

    proxiableUUID(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    setApprovalForAll(
      arg0: string,
      arg1: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    upgradeTo(
      newImplementation: string,
      overrides?: CallOverrides
    ): Promise<void>;

    upgradeToAndCall(
      newImplementation: string,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "AdminChanged(address,address)"(
      previousAdmin?: null,
      newAdmin?: null
    ): AdminChangedEventFilter;
    AdminChanged(
      previousAdmin?: null,
      newAdmin?: null
    ): AdminChangedEventFilter;

    "Approval(address,address,uint256)"(
      owner?: string | null,
      approved?: string | null,
      tokenId?: BigNumberish | null
    ): ApprovalEventFilter;
    Approval(
      owner?: string | null,
      approved?: string | null,
      tokenId?: BigNumberish | null
    ): ApprovalEventFilter;

    "ApprovalForAll(address,address,bool)"(
      owner?: string | null,
      operator?: string | null,
      approved?: null
    ): ApprovalForAllEventFilter;
    ApprovalForAll(
      owner?: string | null,
      operator?: string | null,
      approved?: null
    ): ApprovalForAllEventFilter;

    "BeaconUpgraded(address)"(
      beacon?: string | null
    ): BeaconUpgradedEventFilter;
    BeaconUpgraded(beacon?: string | null): BeaconUpgradedEventFilter;

    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;

    "Transfer(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      tokenId?: BigNumberish | null
    ): TransferEventFilter;
    Transfer(
      from?: string | null,
      to?: string | null,
      tokenId?: BigNumberish | null
    ): TransferEventFilter;

    "Upgraded(address)"(implementation?: string | null): UpgradedEventFilter;
    Upgraded(implementation?: string | null): UpgradedEventFilter;
  };

  estimateGas: {
    __assetClass(overrides?: CallOverrides): Promise<BigNumber>;

    __availabilityPeriodEnd(overrides?: CallOverrides): Promise<BigNumber>;

    __availabilityPeriodRange(overrides?: CallOverrides): Promise<BigNumber>;

    __availabilityPeriodStart(overrides?: CallOverrides): Promise<BigNumber>;

    __initialize(
      config: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    __maxRentalPeriod(overrides?: CallOverrides): Promise<BigNumber>;

    __metahub(overrides?: CallOverrides): Promise<BigNumber>;

    __minRentalPeriod(overrides?: CallOverrides): Promise<BigNumber>;

    __original(overrides?: CallOverrides): Promise<BigNumber>;

    __rentalPeriodRange(overrides?: CallOverrides): Promise<BigNumber>;

    __setAvailabilityPeriodEnd(
      availabilityPeriodEnd: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    __setAvailabilityPeriodStart(
      availabilityPeriodStart: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    __setMaxRentalPeriod(
      maxRentalPeriod: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    __setMinRentalPeriod(
      minRentalPeriod: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    __supportedInterfaces(
      interfaceIds: BytesLike[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      arg0: string,
      arg1: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initValue(overrides?: CallOverrides): Promise<BigNumber>;

    isApprovedForAll(
      arg0: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    mint(
      to: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    multicall(
      data: BytesLike[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    ownerOf(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    proxiableUUID(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setApprovalForAll(
      arg0: string,
      arg1: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    upgradeTo(
      newImplementation: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    upgradeToAndCall(
      newImplementation: string,
      data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    __assetClass(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    __availabilityPeriodEnd(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    __availabilityPeriodRange(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    __availabilityPeriodStart(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    __initialize(
      config: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    __maxRentalPeriod(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    __metahub(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    __minRentalPeriod(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    __original(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    __rentalPeriodRange(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    __setAvailabilityPeriodEnd(
      availabilityPeriodEnd: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    __setAvailabilityPeriodStart(
      availabilityPeriodStart: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    __setMaxRentalPeriod(
      maxRentalPeriod: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    __setMinRentalPeriod(
      minRentalPeriod: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    __supportedInterfaces(
      interfaceIds: BytesLike[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approve(
      arg0: string,
      arg1: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    balanceOf(
      owner: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initValue(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isApprovedForAll(
      arg0: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    mint(
      to: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    multicall(
      data: BytesLike[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ownerOf(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    proxiableUUID(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setApprovalForAll(
      arg0: string,
      arg1: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    upgradeTo(
      newImplementation: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    upgradeToAndCall(
      newImplementation: string,
      data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
