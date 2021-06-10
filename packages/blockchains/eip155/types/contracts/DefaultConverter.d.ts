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
  Contract,
  ContractTransaction,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface DefaultConverterInterface extends ethers.utils.Interface {
  functions: {
    "convert(address,uint256,address)": FunctionFragment;
    "estimateConvert(address,uint256,address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "convert",
    values: [string, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "estimateConvert",
    values: [string, BigNumberish, string]
  ): string;

  decodeFunctionResult(functionFragment: "convert", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "estimateConvert",
    data: BytesLike
  ): Result;

  events: {};
}

export class DefaultConverter extends Contract {
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

  interface: DefaultConverterInterface;

  functions: {
    convert(
      source: string,
      amount: BigNumberish,
      target: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "convert(address,uint256,address)"(
      source: string,
      amount: BigNumberish,
      target: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    estimateConvert(
      source: string,
      amount: BigNumberish,
      target: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "estimateConvert(address,uint256,address)"(
      source: string,
      amount: BigNumberish,
      target: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;
  };

  convert(
    source: string,
    amount: BigNumberish,
    target: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "convert(address,uint256,address)"(
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

  "estimateConvert(address,uint256,address)"(
    source: string,
    amount: BigNumberish,
    target: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    convert(
      source: string,
      amount: BigNumberish,
      target: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "convert(address,uint256,address)"(
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

    "estimateConvert(address,uint256,address)"(
      source: string,
      amount: BigNumberish,
      target: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    convert(
      source: string,
      amount: BigNumberish,
      target: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "convert(address,uint256,address)"(
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

    "estimateConvert(address,uint256,address)"(
      source: string,
      amount: BigNumberish,
      target: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    convert(
      source: string,
      amount: BigNumberish,
      target: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "convert(address,uint256,address)"(
      source: string,
      amount: BigNumberish,
      target: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    estimateConvert(
      source: string,
      amount: BigNumberish,
      target: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "estimateConvert(address,uint256,address)"(
      source: string,
      amount: BigNumberish,
      target: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}