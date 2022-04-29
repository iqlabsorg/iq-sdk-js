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

export interface AssetControllerInterface extends utils.Interface {
  functions: {
    "assetClass()": FunctionFragment;
    "collectionId((bytes4,bytes))": FunctionFragment;
    "returnAssetFromVault(((bytes4,bytes),uint256),address)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "transfer(((bytes4,bytes),uint256),address,address,bytes)": FunctionFragment;
    "transferAssetToVault(((bytes4,bytes),uint256),address,address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "assetClass"
      | "collectionId"
      | "returnAssetFromVault"
      | "supportsInterface"
      | "transfer"
      | "transferAssetToVault"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "assetClass",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "collectionId",
    values: [Assets.AssetIdStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "returnAssetFromVault",
    values: [Assets.AssetStruct, string]
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

  decodeFunctionResult(functionFragment: "assetClass", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "collectionId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "returnAssetFromVault",
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

export interface AssetController extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: AssetControllerInterface;

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

    collectionId(
      assetId: Assets.AssetIdStruct,
      overrides?: CallOverrides
    ): Promise<[string]>;

    returnAssetFromVault(
      asset: Assets.AssetStruct,
      vault: string,
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
  };

  assetClass(overrides?: CallOverrides): Promise<string>;

  collectionId(
    assetId: Assets.AssetIdStruct,
    overrides?: CallOverrides
  ): Promise<string>;

  returnAssetFromVault(
    asset: Assets.AssetStruct,
    vault: string,
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

  callStatic: {
    assetClass(overrides?: CallOverrides): Promise<string>;

    collectionId(
      assetId: Assets.AssetIdStruct,
      overrides?: CallOverrides
    ): Promise<string>;

    returnAssetFromVault(
      asset: Assets.AssetStruct,
      vault: string,
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

    collectionId(
      assetId: Assets.AssetIdStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    returnAssetFromVault(
      asset: Assets.AssetStruct,
      vault: string,
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
  };

  populateTransaction: {
    assetClass(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    collectionId(
      assetId: Assets.AssetIdStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    returnAssetFromVault(
      asset: Assets.AssetStruct,
      vault: string,
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
  };
}
