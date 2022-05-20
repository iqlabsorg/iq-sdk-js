/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../common";

export interface WarperInterface extends utils.Interface {
  functions: {
    "__assetClass()": FunctionFragment;
    "__metahub()": FunctionFragment;
    "__original()": FunctionFragment;
    "__supportedInterfaces(bytes4[])": FunctionFragment;
    "multicall(bytes[])": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "__assetClass"
      | "__metahub"
      | "__original"
      | "__supportedInterfaces"
      | "multicall"
      | "supportsInterface"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "__assetClass",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "__metahub", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "__original",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "__supportedInterfaces",
    values: [BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "multicall",
    values: [BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "__assetClass",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "__metahub", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "__original", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "__supportedInterfaces",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "multicall", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;

  events: {};
}

export interface Warper extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: WarperInterface;

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

    __metahub(overrides?: CallOverrides): Promise<[string]>;

    __original(overrides?: CallOverrides): Promise<[string]>;

    __supportedInterfaces(
      interfaceIds: BytesLike[],
      overrides?: CallOverrides
    ): Promise<[boolean[]]>;

    multicall(
      data: BytesLike[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  __assetClass(overrides?: CallOverrides): Promise<string>;

  __metahub(overrides?: CallOverrides): Promise<string>;

  __original(overrides?: CallOverrides): Promise<string>;

  __supportedInterfaces(
    interfaceIds: BytesLike[],
    overrides?: CallOverrides
  ): Promise<boolean[]>;

  multicall(
    data: BytesLike[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    __assetClass(overrides?: CallOverrides): Promise<string>;

    __metahub(overrides?: CallOverrides): Promise<string>;

    __original(overrides?: CallOverrides): Promise<string>;

    __supportedInterfaces(
      interfaceIds: BytesLike[],
      overrides?: CallOverrides
    ): Promise<boolean[]>;

    multicall(data: BytesLike[], overrides?: CallOverrides): Promise<string[]>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    __assetClass(overrides?: CallOverrides): Promise<BigNumber>;

    __metahub(overrides?: CallOverrides): Promise<BigNumber>;

    __original(overrides?: CallOverrides): Promise<BigNumber>;

    __supportedInterfaces(
      interfaceIds: BytesLike[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    multicall(
      data: BytesLike[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    __assetClass(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    __metahub(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    __original(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    __supportedInterfaces(
      interfaceIds: BytesLike[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    multicall(
      data: BytesLike[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
