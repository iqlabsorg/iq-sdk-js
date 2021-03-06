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
} from "../../../../common";

export interface IRentalPeriodMechanicsInterface extends utils.Interface {
  functions: {
    "__maxRentalPeriod()": FunctionFragment;
    "__minRentalPeriod()": FunctionFragment;
    "__rentalPeriodRange()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "__maxRentalPeriod"
      | "__minRentalPeriod"
      | "__rentalPeriodRange"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "__maxRentalPeriod",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "__minRentalPeriod",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "__rentalPeriodRange",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "__maxRentalPeriod",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "__minRentalPeriod",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "__rentalPeriodRange",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IRentalPeriodMechanics extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IRentalPeriodMechanicsInterface;

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
    __maxRentalPeriod(overrides?: CallOverrides): Promise<[number]>;

    __minRentalPeriod(overrides?: CallOverrides): Promise<[number]>;

    __rentalPeriodRange(
      overrides?: CallOverrides
    ): Promise<
      [number, number] & { minRentalPeriod: number; maxRentalPeriod: number }
    >;
  };

  __maxRentalPeriod(overrides?: CallOverrides): Promise<number>;

  __minRentalPeriod(overrides?: CallOverrides): Promise<number>;

  __rentalPeriodRange(
    overrides?: CallOverrides
  ): Promise<
    [number, number] & { minRentalPeriod: number; maxRentalPeriod: number }
  >;

  callStatic: {
    __maxRentalPeriod(overrides?: CallOverrides): Promise<number>;

    __minRentalPeriod(overrides?: CallOverrides): Promise<number>;

    __rentalPeriodRange(
      overrides?: CallOverrides
    ): Promise<
      [number, number] & { minRentalPeriod: number; maxRentalPeriod: number }
    >;
  };

  filters: {};

  estimateGas: {
    __maxRentalPeriod(overrides?: CallOverrides): Promise<BigNumber>;

    __minRentalPeriod(overrides?: CallOverrides): Promise<BigNumber>;

    __rentalPeriodRange(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    __maxRentalPeriod(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    __minRentalPeriod(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    __rentalPeriodRange(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
