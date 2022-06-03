/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
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
} from "../../common";

export interface AssetsInterface extends utils.Interface {
  functions: {
    "ASSET_ID_TYPEHASH()": FunctionFragment;
    "ASSET_TYPEHASH()": FunctionFragment;
    "ERC1155()": FunctionFragment;
    "ERC721()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "ASSET_ID_TYPEHASH"
      | "ASSET_TYPEHASH"
      | "ERC1155"
      | "ERC721"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "ASSET_ID_TYPEHASH",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "ASSET_TYPEHASH",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "ERC1155", values?: undefined): string;
  encodeFunctionData(functionFragment: "ERC721", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "ASSET_ID_TYPEHASH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ASSET_TYPEHASH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "ERC1155", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ERC721", data: BytesLike): Result;

  events: {};
}

export interface Assets extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: AssetsInterface;

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
    ASSET_ID_TYPEHASH(overrides?: CallOverrides): Promise<[string]>;

    ASSET_TYPEHASH(overrides?: CallOverrides): Promise<[string]>;

    ERC1155(overrides?: CallOverrides): Promise<[string]>;

    ERC721(overrides?: CallOverrides): Promise<[string]>;
  };

  ASSET_ID_TYPEHASH(overrides?: CallOverrides): Promise<string>;

  ASSET_TYPEHASH(overrides?: CallOverrides): Promise<string>;

  ERC1155(overrides?: CallOverrides): Promise<string>;

  ERC721(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    ASSET_ID_TYPEHASH(overrides?: CallOverrides): Promise<string>;

    ASSET_TYPEHASH(overrides?: CallOverrides): Promise<string>;

    ERC1155(overrides?: CallOverrides): Promise<string>;

    ERC721(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    ASSET_ID_TYPEHASH(overrides?: CallOverrides): Promise<BigNumber>;

    ASSET_TYPEHASH(overrides?: CallOverrides): Promise<BigNumber>;

    ERC1155(overrides?: CallOverrides): Promise<BigNumber>;

    ERC721(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    ASSET_ID_TYPEHASH(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ASSET_TYPEHASH(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ERC1155(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ERC721(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
