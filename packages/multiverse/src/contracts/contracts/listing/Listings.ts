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

export interface ListingsInterface extends utils.Interface {
  functions: {
    "FIXED_PRICE()": FunctionFragment;
    "FIXED_PRICE_WITH_REWARD()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "FIXED_PRICE" | "FIXED_PRICE_WITH_REWARD"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "FIXED_PRICE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "FIXED_PRICE_WITH_REWARD",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "FIXED_PRICE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "FIXED_PRICE_WITH_REWARD",
    data: BytesLike
  ): Result;

  events: {};
}

export interface Listings extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ListingsInterface;

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
    FIXED_PRICE(overrides?: CallOverrides): Promise<[string]>;

    FIXED_PRICE_WITH_REWARD(overrides?: CallOverrides): Promise<[string]>;
  };

  FIXED_PRICE(overrides?: CallOverrides): Promise<string>;

  FIXED_PRICE_WITH_REWARD(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    FIXED_PRICE(overrides?: CallOverrides): Promise<string>;

    FIXED_PRICE_WITH_REWARD(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    FIXED_PRICE(overrides?: CallOverrides): Promise<BigNumber>;

    FIXED_PRICE_WITH_REWARD(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    FIXED_PRICE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    FIXED_PRICE_WITH_REWARD(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
