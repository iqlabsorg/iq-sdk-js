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
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface MockConverterInterface extends ethers.utils.Interface {
  functions: {
    "convert(address,uint256,address)": FunctionFragment;
    "estimateConvert(address,uint256,address)": FunctionFragment;
    "setRate(address,address,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "convert",
    values: [string, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "estimateConvert",
    values: [string, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "setRate",
    values: [string, string, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "convert", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "estimateConvert",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setRate", data: BytesLike): Result;

  events: {};
}

export class MockConverter extends BaseContract {
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

  interface: MockConverterInterface;

  functions: {
    convert(
      source: string,
      amount: BigNumberish,
      target: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    estimateConvert(
      source: string,
      amount: BigNumberish,
      target: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    setRate(
      source: string,
      target: string,
      rate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  convert(
    source: string,
    amount: BigNumberish,
    target: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  estimateConvert(
    source: string,
    amount: BigNumberish,
    target: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  setRate(
    source: string,
    target: string,
    rate: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    convert(
      source: string,
      amount: BigNumberish,
      target: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    estimateConvert(
      source: string,
      amount: BigNumberish,
      target: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setRate(
      source: string,
      target: string,
      rate: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    convert(
      source: string,
      amount: BigNumberish,
      target: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    estimateConvert(
      source: string,
      amount: BigNumberish,
      target: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setRate(
      source: string,
      target: string,
      rate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    convert(
      source: string,
      amount: BigNumberish,
      target: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    estimateConvert(
      source: string,
      amount: BigNumberish,
      target: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setRate(
      source: string,
      target: string,
      rate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
