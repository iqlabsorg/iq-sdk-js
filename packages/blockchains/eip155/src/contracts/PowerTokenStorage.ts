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
} from "./common";

export declare namespace PowerTokenStorage {
  export type StateStruct = {
    lockedBalance: BigNumberish;
    energy: BigNumberish;
    timestamp: BigNumberish;
  };

  export type StateStructOutput = [BigNumber, BigNumber, number] & {
    lockedBalance: BigNumber;
    energy: BigNumber;
    timestamp: number;
  };
}

export interface PowerTokenStorageInterface extends utils.Interface {
  functions: {
    "enableSwappingForever()": FunctionFragment;
    "enableTransferForever()": FunctionFragment;
    "getBaseRate()": FunctionFragment;
    "getBaseToken()": FunctionFragment;
    "getEnergyGapHalvingPeriod()": FunctionFragment;
    "getEnterprise()": FunctionFragment;
    "getIndex()": FunctionFragment;
    "getMaxRentalPeriod()": FunctionFragment;
    "getMinGCFee()": FunctionFragment;
    "getMinRentalPeriod()": FunctionFragment;
    "getServiceFeePercent()": FunctionFragment;
    "getState(address)": FunctionFragment;
    "initialize(address,address,uint112,uint96,uint16,uint32,uint16,uint32,uint32,bool)": FunctionFragment;
    "initialize(address)": FunctionFragment;
    "isAllowedRentalPeriod(uint32)": FunctionFragment;
    "isSwappingEnabled()": FunctionFragment;
    "isTransferEnabled()": FunctionFragment;
    "setBaseRate(uint112,address,uint96)": FunctionFragment;
    "setRentalPeriodLimits(uint32,uint32)": FunctionFragment;
    "setServiceFeePercent(uint16)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "enableSwappingForever"
      | "enableTransferForever"
      | "getBaseRate"
      | "getBaseToken"
      | "getEnergyGapHalvingPeriod"
      | "getEnterprise"
      | "getIndex"
      | "getMaxRentalPeriod"
      | "getMinGCFee"
      | "getMinRentalPeriod"
      | "getServiceFeePercent"
      | "getState"
      | "initialize(address,address,uint112,uint96,uint16,uint32,uint16,uint32,uint32,bool)"
      | "initialize(address)"
      | "isAllowedRentalPeriod"
      | "isSwappingEnabled"
      | "isTransferEnabled"
      | "setBaseRate"
      | "setRentalPeriodLimits"
      | "setServiceFeePercent"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "enableSwappingForever",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "enableTransferForever",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getBaseRate",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getBaseToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getEnergyGapHalvingPeriod",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getEnterprise",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getIndex", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getMaxRentalPeriod",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getMinGCFee",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getMinRentalPeriod",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getServiceFeePercent",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getState", values: [string]): string;
  encodeFunctionData(
    functionFragment: "initialize(address,address,uint112,uint96,uint16,uint32,uint16,uint32,uint32,bool)",
    values: [
      string,
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      boolean
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize(address)",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "isAllowedRentalPeriod",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isSwappingEnabled",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isTransferEnabled",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setBaseRate",
    values: [BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setRentalPeriodLimits",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setServiceFeePercent",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "enableSwappingForever",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "enableTransferForever",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getBaseRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getBaseToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEnergyGapHalvingPeriod",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEnterprise",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getIndex", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getMaxRentalPeriod",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMinGCFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMinRentalPeriod",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getServiceFeePercent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getState", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "initialize(address,address,uint112,uint96,uint16,uint32,uint16,uint32,uint32,bool)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "initialize(address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isAllowedRentalPeriod",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isSwappingEnabled",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isTransferEnabled",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setBaseRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setRentalPeriodLimits",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setServiceFeePercent",
    data: BytesLike
  ): Result;

  events: {
    "BaseRateChanged(uint112,address,uint96)": EventFragment;
    "RentalPeriodLimitsChanged(uint32,uint32)": EventFragment;
    "ServiceFeePercentChanged(uint16)": EventFragment;
    "SwappingEnabled()": EventFragment;
    "TransferEnabled()": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "BaseRateChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RentalPeriodLimitsChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ServiceFeePercentChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SwappingEnabled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TransferEnabled"): EventFragment;
}

export interface BaseRateChangedEventObject {
  baseRate: BigNumber;
  baseToken: string;
  minGCFee: BigNumber;
}
export type BaseRateChangedEvent = TypedEvent<
  [BigNumber, string, BigNumber],
  BaseRateChangedEventObject
>;

export type BaseRateChangedEventFilter = TypedEventFilter<BaseRateChangedEvent>;

export interface RentalPeriodLimitsChangedEventObject {
  minRentalPeriod: number;
  maxRentalPeriod: number;
}
export type RentalPeriodLimitsChangedEvent = TypedEvent<
  [number, number],
  RentalPeriodLimitsChangedEventObject
>;

export type RentalPeriodLimitsChangedEventFilter =
  TypedEventFilter<RentalPeriodLimitsChangedEvent>;

export interface ServiceFeePercentChangedEventObject {
  percent: number;
}
export type ServiceFeePercentChangedEvent = TypedEvent<
  [number],
  ServiceFeePercentChangedEventObject
>;

export type ServiceFeePercentChangedEventFilter =
  TypedEventFilter<ServiceFeePercentChangedEvent>;

export interface SwappingEnabledEventObject {}
export type SwappingEnabledEvent = TypedEvent<[], SwappingEnabledEventObject>;

export type SwappingEnabledEventFilter = TypedEventFilter<SwappingEnabledEvent>;

export interface TransferEnabledEventObject {}
export type TransferEnabledEvent = TypedEvent<[], TransferEnabledEventObject>;

export type TransferEnabledEventFilter = TypedEventFilter<TransferEnabledEvent>;

export interface PowerTokenStorage extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: PowerTokenStorageInterface;

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
    enableSwappingForever(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    enableTransferForever(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getBaseRate(overrides?: CallOverrides): Promise<[BigNumber]>;

    getBaseToken(overrides?: CallOverrides): Promise<[string]>;

    getEnergyGapHalvingPeriod(overrides?: CallOverrides): Promise<[number]>;

    getEnterprise(overrides?: CallOverrides): Promise<[string]>;

    getIndex(overrides?: CallOverrides): Promise<[number]>;

    getMaxRentalPeriod(overrides?: CallOverrides): Promise<[number]>;

    getMinGCFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    getMinRentalPeriod(overrides?: CallOverrides): Promise<[number]>;

    getServiceFeePercent(overrides?: CallOverrides): Promise<[number]>;

    getState(
      account: string,
      overrides?: CallOverrides
    ): Promise<[PowerTokenStorage.StateStructOutput]>;

    "initialize(address,address,uint112,uint96,uint16,uint32,uint16,uint32,uint32,bool)"(
      enterprise: string,
      baseToken: string,
      baseRate: BigNumberish,
      minGCFee: BigNumberish,
      serviceFeePercent: BigNumberish,
      energyGapHalvingPeriod: BigNumberish,
      index: BigNumberish,
      minRentalPeriod: BigNumberish,
      maxRentalPeriod: BigNumberish,
      swappingEnabled: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "initialize(address)"(
      enterprise: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    isAllowedRentalPeriod(
      period: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isSwappingEnabled(overrides?: CallOverrides): Promise<[boolean]>;

    isTransferEnabled(overrides?: CallOverrides): Promise<[boolean]>;

    setBaseRate(
      baseRate: BigNumberish,
      baseToken: string,
      minGCFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setRentalPeriodLimits(
      minRentalPeriod: BigNumberish,
      maxRentalPeriod: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setServiceFeePercent(
      newServiceFeePercent: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  enableSwappingForever(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  enableTransferForever(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getBaseRate(overrides?: CallOverrides): Promise<BigNumber>;

  getBaseToken(overrides?: CallOverrides): Promise<string>;

  getEnergyGapHalvingPeriod(overrides?: CallOverrides): Promise<number>;

  getEnterprise(overrides?: CallOverrides): Promise<string>;

  getIndex(overrides?: CallOverrides): Promise<number>;

  getMaxRentalPeriod(overrides?: CallOverrides): Promise<number>;

  getMinGCFee(overrides?: CallOverrides): Promise<BigNumber>;

  getMinRentalPeriod(overrides?: CallOverrides): Promise<number>;

  getServiceFeePercent(overrides?: CallOverrides): Promise<number>;

  getState(
    account: string,
    overrides?: CallOverrides
  ): Promise<PowerTokenStorage.StateStructOutput>;

  "initialize(address,address,uint112,uint96,uint16,uint32,uint16,uint32,uint32,bool)"(
    enterprise: string,
    baseToken: string,
    baseRate: BigNumberish,
    minGCFee: BigNumberish,
    serviceFeePercent: BigNumberish,
    energyGapHalvingPeriod: BigNumberish,
    index: BigNumberish,
    minRentalPeriod: BigNumberish,
    maxRentalPeriod: BigNumberish,
    swappingEnabled: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "initialize(address)"(
    enterprise: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  isAllowedRentalPeriod(
    period: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isSwappingEnabled(overrides?: CallOverrides): Promise<boolean>;

  isTransferEnabled(overrides?: CallOverrides): Promise<boolean>;

  setBaseRate(
    baseRate: BigNumberish,
    baseToken: string,
    minGCFee: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setRentalPeriodLimits(
    minRentalPeriod: BigNumberish,
    maxRentalPeriod: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setServiceFeePercent(
    newServiceFeePercent: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    enableSwappingForever(overrides?: CallOverrides): Promise<void>;

    enableTransferForever(overrides?: CallOverrides): Promise<void>;

    getBaseRate(overrides?: CallOverrides): Promise<BigNumber>;

    getBaseToken(overrides?: CallOverrides): Promise<string>;

    getEnergyGapHalvingPeriod(overrides?: CallOverrides): Promise<number>;

    getEnterprise(overrides?: CallOverrides): Promise<string>;

    getIndex(overrides?: CallOverrides): Promise<number>;

    getMaxRentalPeriod(overrides?: CallOverrides): Promise<number>;

    getMinGCFee(overrides?: CallOverrides): Promise<BigNumber>;

    getMinRentalPeriod(overrides?: CallOverrides): Promise<number>;

    getServiceFeePercent(overrides?: CallOverrides): Promise<number>;

    getState(
      account: string,
      overrides?: CallOverrides
    ): Promise<PowerTokenStorage.StateStructOutput>;

    "initialize(address,address,uint112,uint96,uint16,uint32,uint16,uint32,uint32,bool)"(
      enterprise: string,
      baseToken: string,
      baseRate: BigNumberish,
      minGCFee: BigNumberish,
      serviceFeePercent: BigNumberish,
      energyGapHalvingPeriod: BigNumberish,
      index: BigNumberish,
      minRentalPeriod: BigNumberish,
      maxRentalPeriod: BigNumberish,
      swappingEnabled: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    "initialize(address)"(
      enterprise: string,
      overrides?: CallOverrides
    ): Promise<void>;

    isAllowedRentalPeriod(
      period: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isSwappingEnabled(overrides?: CallOverrides): Promise<boolean>;

    isTransferEnabled(overrides?: CallOverrides): Promise<boolean>;

    setBaseRate(
      baseRate: BigNumberish,
      baseToken: string,
      minGCFee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setRentalPeriodLimits(
      minRentalPeriod: BigNumberish,
      maxRentalPeriod: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setServiceFeePercent(
      newServiceFeePercent: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "BaseRateChanged(uint112,address,uint96)"(
      baseRate?: null,
      baseToken?: null,
      minGCFee?: null
    ): BaseRateChangedEventFilter;
    BaseRateChanged(
      baseRate?: null,
      baseToken?: null,
      minGCFee?: null
    ): BaseRateChangedEventFilter;

    "RentalPeriodLimitsChanged(uint32,uint32)"(
      minRentalPeriod?: null,
      maxRentalPeriod?: null
    ): RentalPeriodLimitsChangedEventFilter;
    RentalPeriodLimitsChanged(
      minRentalPeriod?: null,
      maxRentalPeriod?: null
    ): RentalPeriodLimitsChangedEventFilter;

    "ServiceFeePercentChanged(uint16)"(
      percent?: null
    ): ServiceFeePercentChangedEventFilter;
    ServiceFeePercentChanged(
      percent?: null
    ): ServiceFeePercentChangedEventFilter;

    "SwappingEnabled()"(): SwappingEnabledEventFilter;
    SwappingEnabled(): SwappingEnabledEventFilter;

    "TransferEnabled()"(): TransferEnabledEventFilter;
    TransferEnabled(): TransferEnabledEventFilter;
  };

  estimateGas: {
    enableSwappingForever(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    enableTransferForever(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getBaseRate(overrides?: CallOverrides): Promise<BigNumber>;

    getBaseToken(overrides?: CallOverrides): Promise<BigNumber>;

    getEnergyGapHalvingPeriod(overrides?: CallOverrides): Promise<BigNumber>;

    getEnterprise(overrides?: CallOverrides): Promise<BigNumber>;

    getIndex(overrides?: CallOverrides): Promise<BigNumber>;

    getMaxRentalPeriod(overrides?: CallOverrides): Promise<BigNumber>;

    getMinGCFee(overrides?: CallOverrides): Promise<BigNumber>;

    getMinRentalPeriod(overrides?: CallOverrides): Promise<BigNumber>;

    getServiceFeePercent(overrides?: CallOverrides): Promise<BigNumber>;

    getState(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    "initialize(address,address,uint112,uint96,uint16,uint32,uint16,uint32,uint32,bool)"(
      enterprise: string,
      baseToken: string,
      baseRate: BigNumberish,
      minGCFee: BigNumberish,
      serviceFeePercent: BigNumberish,
      energyGapHalvingPeriod: BigNumberish,
      index: BigNumberish,
      minRentalPeriod: BigNumberish,
      maxRentalPeriod: BigNumberish,
      swappingEnabled: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "initialize(address)"(
      enterprise: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    isAllowedRentalPeriod(
      period: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isSwappingEnabled(overrides?: CallOverrides): Promise<BigNumber>;

    isTransferEnabled(overrides?: CallOverrides): Promise<BigNumber>;

    setBaseRate(
      baseRate: BigNumberish,
      baseToken: string,
      minGCFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setRentalPeriodLimits(
      minRentalPeriod: BigNumberish,
      maxRentalPeriod: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setServiceFeePercent(
      newServiceFeePercent: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    enableSwappingForever(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    enableTransferForever(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getBaseRate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getBaseToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getEnergyGapHalvingPeriod(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getEnterprise(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getIndex(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getMaxRentalPeriod(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMinGCFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getMinRentalPeriod(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getServiceFeePercent(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getState(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "initialize(address,address,uint112,uint96,uint16,uint32,uint16,uint32,uint32,bool)"(
      enterprise: string,
      baseToken: string,
      baseRate: BigNumberish,
      minGCFee: BigNumberish,
      serviceFeePercent: BigNumberish,
      energyGapHalvingPeriod: BigNumberish,
      index: BigNumberish,
      minRentalPeriod: BigNumberish,
      maxRentalPeriod: BigNumberish,
      swappingEnabled: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "initialize(address)"(
      enterprise: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    isAllowedRentalPeriod(
      period: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isSwappingEnabled(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isTransferEnabled(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setBaseRate(
      baseRate: BigNumberish,
      baseToken: string,
      minGCFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setRentalPeriodLimits(
      minRentalPeriod: BigNumberish,
      maxRentalPeriod: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setServiceFeePercent(
      newServiceFeePercent: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
