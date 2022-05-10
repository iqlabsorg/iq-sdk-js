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

export declare namespace IAssetClassRegistry {
  export type ClassConfigStruct = { vault: string; controller: string };

  export type ClassConfigStructOutput = [string, string] & {
    vault: string;
    controller: string;
  };
}

export interface IAssetClassRegistryInterface extends utils.Interface {
  functions: {
    "assetClassConfig(bytes4)": FunctionFragment;
    "checkRegisteredAssetClass(bytes4)": FunctionFragment;
    "isRegisteredAssetClass(bytes4)": FunctionFragment;
    "registerAssetClass(bytes4,(address,address))": FunctionFragment;
    "setAssetClassController(bytes4,address)": FunctionFragment;
    "setAssetClassVault(bytes4,address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "assetClassConfig"
      | "checkRegisteredAssetClass"
      | "isRegisteredAssetClass"
      | "registerAssetClass"
      | "setAssetClassController"
      | "setAssetClassVault"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "assetClassConfig",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "checkRegisteredAssetClass",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isRegisteredAssetClass",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "registerAssetClass",
    values: [BytesLike, IAssetClassRegistry.ClassConfigStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "setAssetClassController",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "setAssetClassVault",
    values: [BytesLike, string]
  ): string;

  decodeFunctionResult(
    functionFragment: "assetClassConfig",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "checkRegisteredAssetClass",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isRegisteredAssetClass",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerAssetClass",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setAssetClassController",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setAssetClassVault",
    data: BytesLike
  ): Result;

  events: {
    "AssetClassControllerChanged(bytes4,address)": EventFragment;
    "AssetClassRegistered(bytes4,address,address)": EventFragment;
    "AssetClassVaultChanged(bytes4,address)": EventFragment;
  };

  getEvent(
    nameOrSignatureOrTopic: "AssetClassControllerChanged"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AssetClassRegistered"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AssetClassVaultChanged"): EventFragment;
}

export interface AssetClassControllerChangedEventObject {
  assetClass: string;
  newController: string;
}
export type AssetClassControllerChangedEvent = TypedEvent<
  [string, string],
  AssetClassControllerChangedEventObject
>;

export type AssetClassControllerChangedEventFilter =
  TypedEventFilter<AssetClassControllerChangedEvent>;

export interface AssetClassRegisteredEventObject {
  assetClass: string;
  controller: string;
  vault: string;
}
export type AssetClassRegisteredEvent = TypedEvent<
  [string, string, string],
  AssetClassRegisteredEventObject
>;

export type AssetClassRegisteredEventFilter =
  TypedEventFilter<AssetClassRegisteredEvent>;

export interface AssetClassVaultChangedEventObject {
  assetClass: string;
  newVault: string;
}
export type AssetClassVaultChangedEvent = TypedEvent<
  [string, string],
  AssetClassVaultChangedEventObject
>;

export type AssetClassVaultChangedEventFilter =
  TypedEventFilter<AssetClassVaultChangedEvent>;

export interface IAssetClassRegistry extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IAssetClassRegistryInterface;

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
    assetClassConfig(
      assetClass: BytesLike,
      overrides?: CallOverrides
    ): Promise<[IAssetClassRegistry.ClassConfigStructOutput]>;

    checkRegisteredAssetClass(
      assetClass: BytesLike,
      overrides?: CallOverrides
    ): Promise<[void]>;

    isRegisteredAssetClass(
      assetClass: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    registerAssetClass(
      assetClass: BytesLike,
      config: IAssetClassRegistry.ClassConfigStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setAssetClassController(
      assetClass: BytesLike,
      controller: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setAssetClassVault(
      assetClass: BytesLike,
      vault: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  assetClassConfig(
    assetClass: BytesLike,
    overrides?: CallOverrides
  ): Promise<IAssetClassRegistry.ClassConfigStructOutput>;

  checkRegisteredAssetClass(
    assetClass: BytesLike,
    overrides?: CallOverrides
  ): Promise<void>;

  isRegisteredAssetClass(
    assetClass: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  registerAssetClass(
    assetClass: BytesLike,
    config: IAssetClassRegistry.ClassConfigStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setAssetClassController(
    assetClass: BytesLike,
    controller: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setAssetClassVault(
    assetClass: BytesLike,
    vault: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    assetClassConfig(
      assetClass: BytesLike,
      overrides?: CallOverrides
    ): Promise<IAssetClassRegistry.ClassConfigStructOutput>;

    checkRegisteredAssetClass(
      assetClass: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    isRegisteredAssetClass(
      assetClass: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    registerAssetClass(
      assetClass: BytesLike,
      config: IAssetClassRegistry.ClassConfigStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    setAssetClassController(
      assetClass: BytesLike,
      controller: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setAssetClassVault(
      assetClass: BytesLike,
      vault: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "AssetClassControllerChanged(bytes4,address)"(
      assetClass?: BytesLike | null,
      newController?: string | null
    ): AssetClassControllerChangedEventFilter;
    AssetClassControllerChanged(
      assetClass?: BytesLike | null,
      newController?: string | null
    ): AssetClassControllerChangedEventFilter;

    "AssetClassRegistered(bytes4,address,address)"(
      assetClass?: BytesLike | null,
      controller?: string | null,
      vault?: string | null
    ): AssetClassRegisteredEventFilter;
    AssetClassRegistered(
      assetClass?: BytesLike | null,
      controller?: string | null,
      vault?: string | null
    ): AssetClassRegisteredEventFilter;

    "AssetClassVaultChanged(bytes4,address)"(
      assetClass?: BytesLike | null,
      newVault?: string | null
    ): AssetClassVaultChangedEventFilter;
    AssetClassVaultChanged(
      assetClass?: BytesLike | null,
      newVault?: string | null
    ): AssetClassVaultChangedEventFilter;
  };

  estimateGas: {
    assetClassConfig(
      assetClass: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    checkRegisteredAssetClass(
      assetClass: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isRegisteredAssetClass(
      assetClass: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    registerAssetClass(
      assetClass: BytesLike,
      config: IAssetClassRegistry.ClassConfigStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setAssetClassController(
      assetClass: BytesLike,
      controller: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setAssetClassVault(
      assetClass: BytesLike,
      vault: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    assetClassConfig(
      assetClass: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    checkRegisteredAssetClass(
      assetClass: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isRegisteredAssetClass(
      assetClass: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    registerAssetClass(
      assetClass: BytesLike,
      config: IAssetClassRegistry.ClassConfigStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setAssetClassController(
      assetClass: BytesLike,
      controller: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setAssetClassVault(
      assetClass: BytesLike,
      vault: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}