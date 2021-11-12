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

interface IEnterpriseStorageInterface extends ethers.utils.Interface {
  functions: {
    "getAvailableReserve()": FunctionFragment;
    "getBaseUri()": FunctionFragment;
    "getBondingCurve()": FunctionFragment;
    "getConverter()": FunctionFragment;
    "getEnterpriseToken()": FunctionFragment;
    "getGCFeePercent()": FunctionFragment;
    "getPaymentToken(uint256)": FunctionFragment;
    "getRentalAgreement(uint256)": FunctionFragment;
    "getReserve()": FunctionFragment;
    "getUsedReserve()": FunctionFragment;
    "initialize(string,string,uint16,address,address,address)": FunctionFragment;
    "initializeTokens(address,address,address)": FunctionFragment;
    "isSupportedPaymentToken(address)": FunctionFragment;
    "owner()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "getAvailableReserve",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getBaseUri",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getBondingCurve",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getConverter",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getEnterpriseToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getGCFeePercent",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPaymentToken",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getRentalAgreement",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getReserve",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getUsedReserve",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [string, string, BigNumberish, string, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "initializeTokens",
    values: [string, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "isSupportedPaymentToken",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "getAvailableReserve",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getBaseUri", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getBondingCurve",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getConverter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEnterpriseToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getGCFeePercent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPaymentToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRentalAgreement",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getReserve", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getUsedReserve",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "initializeTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isSupportedPaymentToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;

  events: {};
}

export class IEnterpriseStorage extends BaseContract {
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

  interface: IEnterpriseStorageInterface;

  functions: {
    getAvailableReserve(overrides?: CallOverrides): Promise<[BigNumber]>;

    getBaseUri(overrides?: CallOverrides): Promise<[string]>;

    getBondingCurve(
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { pole: BigNumber; slope: BigNumber }>;

    getConverter(overrides?: CallOverrides): Promise<[string]>;

    getEnterpriseToken(overrides?: CallOverrides): Promise<[string]>;

    getGCFeePercent(overrides?: CallOverrides): Promise<[number]>;

    getPaymentToken(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getRentalAgreement(
      rentalTokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        [
          BigNumber,
          number,
          number,
          number,
          number,
          number,
          BigNumber,
          number
        ] & {
          rentalAmount: BigNumber;
          powerTokenIndex: number;
          startTime: number;
          endTime: number;
          renterOnlyReturnTime: number;
          enterpriseOnlyCollectionTime: number;
          gcRewardAmount: BigNumber;
          gcRewardTokenIndex: number;
        }
      ]
    >;

    getReserve(overrides?: CallOverrides): Promise<[BigNumber]>;

    getUsedReserve(overrides?: CallOverrides): Promise<[BigNumber]>;

    initialize(
      enterpriseName: string,
      baseUri: string,
      gcFeePercent: BigNumberish,
      converter: string,
      proxyAdmin: string,
      initialOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    initializeTokens(
      enterpriseToken: string,
      stakeToken: string,
      rentalToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    isSupportedPaymentToken(
      token: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    owner(overrides?: CallOverrides): Promise<[string]>;
  };

  getAvailableReserve(overrides?: CallOverrides): Promise<BigNumber>;

  getBaseUri(overrides?: CallOverrides): Promise<string>;

  getBondingCurve(
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber] & { pole: BigNumber; slope: BigNumber }>;

  getConverter(overrides?: CallOverrides): Promise<string>;

  getEnterpriseToken(overrides?: CallOverrides): Promise<string>;

  getGCFeePercent(overrides?: CallOverrides): Promise<number>;

  getPaymentToken(
    index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  getRentalAgreement(
    rentalTokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, number, number, number, number, number, BigNumber, number] & {
      rentalAmount: BigNumber;
      powerTokenIndex: number;
      startTime: number;
      endTime: number;
      renterOnlyReturnTime: number;
      enterpriseOnlyCollectionTime: number;
      gcRewardAmount: BigNumber;
      gcRewardTokenIndex: number;
    }
  >;

  getReserve(overrides?: CallOverrides): Promise<BigNumber>;

  getUsedReserve(overrides?: CallOverrides): Promise<BigNumber>;

  initialize(
    enterpriseName: string,
    baseUri: string,
    gcFeePercent: BigNumberish,
    converter: string,
    proxyAdmin: string,
    initialOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  initializeTokens(
    enterpriseToken: string,
    stakeToken: string,
    rentalToken: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  isSupportedPaymentToken(
    token: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  owner(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    getAvailableReserve(overrides?: CallOverrides): Promise<BigNumber>;

    getBaseUri(overrides?: CallOverrides): Promise<string>;

    getBondingCurve(
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { pole: BigNumber; slope: BigNumber }>;

    getConverter(overrides?: CallOverrides): Promise<string>;

    getEnterpriseToken(overrides?: CallOverrides): Promise<string>;

    getGCFeePercent(overrides?: CallOverrides): Promise<number>;

    getPaymentToken(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    getRentalAgreement(
      rentalTokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, number, number, number, number, number, BigNumber, number] & {
        rentalAmount: BigNumber;
        powerTokenIndex: number;
        startTime: number;
        endTime: number;
        renterOnlyReturnTime: number;
        enterpriseOnlyCollectionTime: number;
        gcRewardAmount: BigNumber;
        gcRewardTokenIndex: number;
      }
    >;

    getReserve(overrides?: CallOverrides): Promise<BigNumber>;

    getUsedReserve(overrides?: CallOverrides): Promise<BigNumber>;

    initialize(
      enterpriseName: string,
      baseUri: string,
      gcFeePercent: BigNumberish,
      converter: string,
      proxyAdmin: string,
      initialOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    initializeTokens(
      enterpriseToken: string,
      stakeToken: string,
      rentalToken: string,
      overrides?: CallOverrides
    ): Promise<void>;

    isSupportedPaymentToken(
      token: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    owner(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    getAvailableReserve(overrides?: CallOverrides): Promise<BigNumber>;

    getBaseUri(overrides?: CallOverrides): Promise<BigNumber>;

    getBondingCurve(overrides?: CallOverrides): Promise<BigNumber>;

    getConverter(overrides?: CallOverrides): Promise<BigNumber>;

    getEnterpriseToken(overrides?: CallOverrides): Promise<BigNumber>;

    getGCFeePercent(overrides?: CallOverrides): Promise<BigNumber>;

    getPaymentToken(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRentalAgreement(
      rentalTokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getReserve(overrides?: CallOverrides): Promise<BigNumber>;

    getUsedReserve(overrides?: CallOverrides): Promise<BigNumber>;

    initialize(
      enterpriseName: string,
      baseUri: string,
      gcFeePercent: BigNumberish,
      converter: string,
      proxyAdmin: string,
      initialOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    initializeTokens(
      enterpriseToken: string,
      stakeToken: string,
      rentalToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    isSupportedPaymentToken(
      token: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    getAvailableReserve(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getBaseUri(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getBondingCurve(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getConverter(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getEnterpriseToken(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getGCFeePercent(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPaymentToken(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRentalAgreement(
      rentalTokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getReserve(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getUsedReserve(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    initialize(
      enterpriseName: string,
      baseUri: string,
      gcFeePercent: BigNumberish,
      converter: string,
      proxyAdmin: string,
      initialOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    initializeTokens(
      enterpriseToken: string,
      stakeToken: string,
      rentalToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    isSupportedPaymentToken(
      token: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
