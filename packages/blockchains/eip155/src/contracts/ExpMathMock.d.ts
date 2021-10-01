/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface ExpMathMockInterface extends ethers.utils.Interface {
  functions: {
    "gas()": FunctionFragment;
    "halfLife(uint32,uint112,uint32,uint32)": FunctionFragment;
    "measure(uint32,uint112,uint32,uint32)": FunctionFragment;
    "result()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "gas", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "halfLife",
    values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "measure",
    values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "result", values?: undefined): string;

  decodeFunctionResult(functionFragment: "gas", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "halfLife", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "measure", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "result", data: BytesLike): Result;

  events: {};
}

export class ExpMathMock extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: ExpMathMockInterface;

  functions: {
    gas(overrides?: CallOverrides): Promise<[BigNumber]>;

    halfLife(
      t0: BigNumberish,
      c0: BigNumberish,
      t12: BigNumberish,
      t: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    measure(
      t0: BigNumberish,
      c0: BigNumberish,
      t12: BigNumberish,
      t: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    result(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  gas(overrides?: CallOverrides): Promise<BigNumber>;

  halfLife(
    t0: BigNumberish,
    c0: BigNumberish,
    t12: BigNumberish,
    t: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  measure(
    t0: BigNumberish,
    c0: BigNumberish,
    t12: BigNumberish,
    t: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  result(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    gas(overrides?: CallOverrides): Promise<BigNumber>;

    halfLife(
      t0: BigNumberish,
      c0: BigNumberish,
      t12: BigNumberish,
      t: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    measure(
      t0: BigNumberish,
      c0: BigNumberish,
      t12: BigNumberish,
      t: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    result(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    gas(overrides?: CallOverrides): Promise<BigNumber>;

    halfLife(
      t0: BigNumberish,
      c0: BigNumberish,
      t12: BigNumberish,
      t: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    measure(
      t0: BigNumberish,
      c0: BigNumberish,
      t12: BigNumberish,
      t: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    result(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    gas(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    halfLife(
      t0: BigNumberish,
      c0: BigNumberish,
      t12: BigNumberish,
      t: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    measure(
      t0: BigNumberish,
      c0: BigNumberish,
      t12: BigNumberish,
      t: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    result(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
