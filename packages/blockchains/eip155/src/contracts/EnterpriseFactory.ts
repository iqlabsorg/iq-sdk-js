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
} from "./common";

export interface EnterpriseFactoryInterface extends utils.Interface {
  functions: {
    "deploy(string,address,string,uint16,address)": FunctionFragment;
    "deployService(address)": FunctionFragment;
    "getEnterpriseImpl()": FunctionFragment;
    "getPowerTokenImpl()": FunctionFragment;
    "getRentalTokenImpl()": FunctionFragment;
    "getStakeTokenImpl()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "deploy"
      | "deployService"
      | "getEnterpriseImpl"
      | "getPowerTokenImpl"
      | "getRentalTokenImpl"
      | "getStakeTokenImpl"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "deploy",
    values: [string, string, string, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "deployService",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getEnterpriseImpl",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPowerTokenImpl",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getRentalTokenImpl",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getStakeTokenImpl",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "deploy", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "deployService",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEnterpriseImpl",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPowerTokenImpl",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRentalTokenImpl",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getStakeTokenImpl",
    data: BytesLike
  ): Result;

  events: {
    "EnterpriseDeployed(address,address,string,string,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "EnterpriseDeployed"): EventFragment;
}

export interface EnterpriseDeployedEventObject {
  creator: string;
  enterpriseToken: string;
  name: string;
  baseUri: string;
  deployed: string;
}
export type EnterpriseDeployedEvent = TypedEvent<
  [string, string, string, string, string],
  EnterpriseDeployedEventObject
>;

export type EnterpriseDeployedEventFilter =
  TypedEventFilter<EnterpriseDeployedEvent>;

export interface EnterpriseFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: EnterpriseFactoryInterface;

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
    deploy(
      name: string,
      enterpriseToken: string,
      baseUri: string,
      gcFeePercent: BigNumberish,
      converter: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    deployService(
      admin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getEnterpriseImpl(overrides?: CallOverrides): Promise<[string]>;

    getPowerTokenImpl(overrides?: CallOverrides): Promise<[string]>;

    getRentalTokenImpl(overrides?: CallOverrides): Promise<[string]>;

    getStakeTokenImpl(overrides?: CallOverrides): Promise<[string]>;
  };

  deploy(
    name: string,
    enterpriseToken: string,
    baseUri: string,
    gcFeePercent: BigNumberish,
    converter: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  deployService(
    admin: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getEnterpriseImpl(overrides?: CallOverrides): Promise<string>;

  getPowerTokenImpl(overrides?: CallOverrides): Promise<string>;

  getRentalTokenImpl(overrides?: CallOverrides): Promise<string>;

  getStakeTokenImpl(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    deploy(
      name: string,
      enterpriseToken: string,
      baseUri: string,
      gcFeePercent: BigNumberish,
      converter: string,
      overrides?: CallOverrides
    ): Promise<string>;

    deployService(admin: string, overrides?: CallOverrides): Promise<string>;

    getEnterpriseImpl(overrides?: CallOverrides): Promise<string>;

    getPowerTokenImpl(overrides?: CallOverrides): Promise<string>;

    getRentalTokenImpl(overrides?: CallOverrides): Promise<string>;

    getStakeTokenImpl(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "EnterpriseDeployed(address,address,string,string,address)"(
      creator?: string | null,
      enterpriseToken?: string | null,
      name?: null,
      baseUri?: null,
      deployed?: null
    ): EnterpriseDeployedEventFilter;
    EnterpriseDeployed(
      creator?: string | null,
      enterpriseToken?: string | null,
      name?: null,
      baseUri?: null,
      deployed?: null
    ): EnterpriseDeployedEventFilter;
  };

  estimateGas: {
    deploy(
      name: string,
      enterpriseToken: string,
      baseUri: string,
      gcFeePercent: BigNumberish,
      converter: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    deployService(
      admin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getEnterpriseImpl(overrides?: CallOverrides): Promise<BigNumber>;

    getPowerTokenImpl(overrides?: CallOverrides): Promise<BigNumber>;

    getRentalTokenImpl(overrides?: CallOverrides): Promise<BigNumber>;

    getStakeTokenImpl(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    deploy(
      name: string,
      enterpriseToken: string,
      baseUri: string,
      gcFeePercent: BigNumberish,
      converter: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    deployService(
      admin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getEnterpriseImpl(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPowerTokenImpl(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getRentalTokenImpl(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getStakeTokenImpl(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}