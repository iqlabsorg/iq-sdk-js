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
} from "../common";

export declare namespace IUniverseRegistry {
  export type UniverseParamsStruct = {
    name: string;
    rentalFeePercent: BigNumberish;
  };

  export type UniverseParamsStructOutput = [string, number] & {
    name: string;
    rentalFeePercent: number;
  };
}

export interface IUniverseRegistryInterface extends utils.Interface {
  functions: {
    "checkUniverseOwner(uint256,address)": FunctionFragment;
    "createUniverse((string,uint16))": FunctionFragment;
    "isUniverseOwner(uint256,address)": FunctionFragment;
    "setUniverseName(uint256,string)": FunctionFragment;
    "setUniverseRentalFeePercent(uint256,uint16)": FunctionFragment;
    "setUniverseTokenBaseURI(string)": FunctionFragment;
    "universe(uint256)": FunctionFragment;
    "universeName(uint256)": FunctionFragment;
    "universeOwner(uint256)": FunctionFragment;
    "universeRentalFeePercent(uint256)": FunctionFragment;
    "universeToken()": FunctionFragment;
    "universeTokenBaseURI()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "checkUniverseOwner"
      | "createUniverse"
      | "isUniverseOwner"
      | "setUniverseName"
      | "setUniverseRentalFeePercent"
      | "setUniverseTokenBaseURI"
      | "universe"
      | "universeName"
      | "universeOwner"
      | "universeRentalFeePercent"
      | "universeToken"
      | "universeTokenBaseURI"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "checkUniverseOwner",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "createUniverse",
    values: [IUniverseRegistry.UniverseParamsStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "isUniverseOwner",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "setUniverseName",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "setUniverseRentalFeePercent",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setUniverseTokenBaseURI",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "universe",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "universeName",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "universeOwner",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "universeRentalFeePercent",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "universeToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "universeTokenBaseURI",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "checkUniverseOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createUniverse",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isUniverseOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setUniverseName",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setUniverseRentalFeePercent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setUniverseTokenBaseURI",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "universe", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "universeName",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "universeOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "universeRentalFeePercent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "universeToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "universeTokenBaseURI",
    data: BytesLike
  ): Result;

  events: {
    "UniverseCreated(uint256,string)": EventFragment;
    "UniverseNameChanged(uint256,string)": EventFragment;
    "UniverseRentalFeeChanged(uint256,uint16)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "UniverseCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UniverseNameChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UniverseRentalFeeChanged"): EventFragment;
}

export interface UniverseCreatedEventObject {
  universeId: BigNumber;
  name: string;
}
export type UniverseCreatedEvent = TypedEvent<
  [BigNumber, string],
  UniverseCreatedEventObject
>;

export type UniverseCreatedEventFilter = TypedEventFilter<UniverseCreatedEvent>;

export interface UniverseNameChangedEventObject {
  universeId: BigNumber;
  name: string;
}
export type UniverseNameChangedEvent = TypedEvent<
  [BigNumber, string],
  UniverseNameChangedEventObject
>;

export type UniverseNameChangedEventFilter =
  TypedEventFilter<UniverseNameChangedEvent>;

export interface UniverseRentalFeeChangedEventObject {
  universeId: BigNumber;
  rentalFeePercent: number;
}
export type UniverseRentalFeeChangedEvent = TypedEvent<
  [BigNumber, number],
  UniverseRentalFeeChangedEventObject
>;

export type UniverseRentalFeeChangedEventFilter =
  TypedEventFilter<UniverseRentalFeeChangedEvent>;

export interface IUniverseRegistry extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IUniverseRegistryInterface;

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
    checkUniverseOwner(
      universeId: BigNumberish,
      account: string,
      overrides?: CallOverrides
    ): Promise<[void]>;

    createUniverse(
      params: IUniverseRegistry.UniverseParamsStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    isUniverseOwner(
      universeId: BigNumberish,
      account: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    setUniverseName(
      universeId: BigNumberish,
      universeName: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setUniverseRentalFeePercent(
      universeId: BigNumberish,
      rentalFeePercent: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setUniverseTokenBaseURI(
      baseURI: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    universe(
      universeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, number] & { name: string; rentalFeePercent: number }>;

    universeName(
      universeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    universeOwner(
      universeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    universeRentalFeePercent(
      universeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[number]>;

    universeToken(overrides?: CallOverrides): Promise<[string]>;

    universeTokenBaseURI(overrides?: CallOverrides): Promise<[string]>;
  };

  checkUniverseOwner(
    universeId: BigNumberish,
    account: string,
    overrides?: CallOverrides
  ): Promise<void>;

  createUniverse(
    params: IUniverseRegistry.UniverseParamsStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  isUniverseOwner(
    universeId: BigNumberish,
    account: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  setUniverseName(
    universeId: BigNumberish,
    universeName: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setUniverseRentalFeePercent(
    universeId: BigNumberish,
    rentalFeePercent: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setUniverseTokenBaseURI(
    baseURI: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  universe(
    universeId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[string, number] & { name: string; rentalFeePercent: number }>;

  universeName(
    universeId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  universeOwner(
    universeId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  universeRentalFeePercent(
    universeId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<number>;

  universeToken(overrides?: CallOverrides): Promise<string>;

  universeTokenBaseURI(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    checkUniverseOwner(
      universeId: BigNumberish,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    createUniverse(
      params: IUniverseRegistry.UniverseParamsStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isUniverseOwner(
      universeId: BigNumberish,
      account: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    setUniverseName(
      universeId: BigNumberish,
      universeName: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setUniverseRentalFeePercent(
      universeId: BigNumberish,
      rentalFeePercent: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setUniverseTokenBaseURI(
      baseURI: string,
      overrides?: CallOverrides
    ): Promise<void>;

    universe(
      universeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, number] & { name: string; rentalFeePercent: number }>;

    universeName(
      universeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    universeOwner(
      universeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    universeRentalFeePercent(
      universeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<number>;

    universeToken(overrides?: CallOverrides): Promise<string>;

    universeTokenBaseURI(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "UniverseCreated(uint256,string)"(
      universeId?: BigNumberish | null,
      name?: null
    ): UniverseCreatedEventFilter;
    UniverseCreated(
      universeId?: BigNumberish | null,
      name?: null
    ): UniverseCreatedEventFilter;

    "UniverseNameChanged(uint256,string)"(
      universeId?: BigNumberish | null,
      name?: null
    ): UniverseNameChangedEventFilter;
    UniverseNameChanged(
      universeId?: BigNumberish | null,
      name?: null
    ): UniverseNameChangedEventFilter;

    "UniverseRentalFeeChanged(uint256,uint16)"(
      universeId?: BigNumberish | null,
      rentalFeePercent?: null
    ): UniverseRentalFeeChangedEventFilter;
    UniverseRentalFeeChanged(
      universeId?: BigNumberish | null,
      rentalFeePercent?: null
    ): UniverseRentalFeeChangedEventFilter;
  };

  estimateGas: {
    checkUniverseOwner(
      universeId: BigNumberish,
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    createUniverse(
      params: IUniverseRegistry.UniverseParamsStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    isUniverseOwner(
      universeId: BigNumberish,
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setUniverseName(
      universeId: BigNumberish,
      universeName: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setUniverseRentalFeePercent(
      universeId: BigNumberish,
      rentalFeePercent: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setUniverseTokenBaseURI(
      baseURI: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    universe(
      universeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    universeName(
      universeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    universeOwner(
      universeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    universeRentalFeePercent(
      universeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    universeToken(overrides?: CallOverrides): Promise<BigNumber>;

    universeTokenBaseURI(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    checkUniverseOwner(
      universeId: BigNumberish,
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    createUniverse(
      params: IUniverseRegistry.UniverseParamsStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    isUniverseOwner(
      universeId: BigNumberish,
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setUniverseName(
      universeId: BigNumberish,
      universeName: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setUniverseRentalFeePercent(
      universeId: BigNumberish,
      rentalFeePercent: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setUniverseTokenBaseURI(
      baseURI: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    universe(
      universeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    universeName(
      universeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    universeOwner(
      universeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    universeRentalFeePercent(
      universeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    universeToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    universeTokenBaseURI(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
