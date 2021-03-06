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

export interface RentingsInterface extends utils.Interface {
  functions: {
    "HUNDRED_PERCENT()": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "HUNDRED_PERCENT"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "HUNDRED_PERCENT",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "HUNDRED_PERCENT",
    data: BytesLike
  ): Result;

  events: {};
}

export interface Rentings extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: RentingsInterface;

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
    HUNDRED_PERCENT(overrides?: CallOverrides): Promise<[number]>;
  };

  HUNDRED_PERCENT(overrides?: CallOverrides): Promise<number>;

  callStatic: {
    HUNDRED_PERCENT(overrides?: CallOverrides): Promise<number>;
  };

  filters: {};

  estimateGas: {
    HUNDRED_PERCENT(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    HUNDRED_PERCENT(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
