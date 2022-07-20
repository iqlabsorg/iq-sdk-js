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
} from "../../common";

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

export declare namespace Listings {
  export type ParamsStruct = { strategy: BytesLike; data: BytesLike };

  export type ParamsStructOutput = [string, string] & {
    strategy: string;
    data: string;
  };

  export type ListingStruct = {
    asset: Assets.AssetStruct;
    params: Listings.ParamsStruct;
    lister: string;
    maxLockPeriod: BigNumberish;
    lockedTill: BigNumberish;
    immediatePayout: boolean;
    delisted: boolean;
    paused: boolean;
    groupId: BigNumberish;
  };

  export type ListingStructOutput = [
    Assets.AssetStructOutput,
    Listings.ParamsStructOutput,
    string,
    number,
    number,
    boolean,
    boolean,
    boolean,
    BigNumber
  ] & {
    asset: Assets.AssetStructOutput;
    params: Listings.ParamsStructOutput;
    lister: string;
    maxLockPeriod: number;
    lockedTill: number;
    immediatePayout: boolean;
    delisted: boolean;
    paused: boolean;
    groupId: BigNumber;
  };
}

export interface IListingManagerInterface extends utils.Interface {
  functions: {
    "assetListingCount(address)": FunctionFragment;
    "assetListings(address,uint256,uint256)": FunctionFragment;
    "delistAsset(uint256)": FunctionFragment;
    "listAsset(((bytes4,bytes),uint256),(bytes4,bytes),uint32,bool)": FunctionFragment;
    "listingController(bytes4)": FunctionFragment;
    "listingCount()": FunctionFragment;
    "listingInfo(uint256)": FunctionFragment;
    "listings(uint256,uint256)": FunctionFragment;
    "pauseListing(uint256)": FunctionFragment;
    "unpauseListing(uint256)": FunctionFragment;
    "userListingCount(address)": FunctionFragment;
    "userListings(address,uint256,uint256)": FunctionFragment;
    "withdrawAsset(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "assetListingCount"
      | "assetListings"
      | "delistAsset"
      | "listAsset"
      | "listingController"
      | "listingCount"
      | "listingInfo"
      | "listings"
      | "pauseListing"
      | "unpauseListing"
      | "userListingCount"
      | "userListings"
      | "withdrawAsset"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "assetListingCount",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "assetListings",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "delistAsset",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "listAsset",
    values: [Assets.AssetStruct, Listings.ParamsStruct, BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "listingController",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "listingCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "listingInfo",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "listings",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "pauseListing",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "unpauseListing",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "userListingCount",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "userListings",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawAsset",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "assetListingCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "assetListings",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "delistAsset",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "listAsset", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "listingController",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "listingCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "listingInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "listings", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pauseListing",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "unpauseListing",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "userListingCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "userListings",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawAsset",
    data: BytesLike
  ): Result;

  events: {
    "AssetDelisted(uint256,address,uint32)": EventFragment;
    "AssetListed(uint256,uint256,address,tuple,tuple,uint32)": EventFragment;
    "AssetWithdrawn(uint256,address,tuple)": EventFragment;
    "ListingPaused(uint256)": EventFragment;
    "ListingUnpaused(uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AssetDelisted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AssetListed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AssetWithdrawn"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ListingPaused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ListingUnpaused"): EventFragment;
}

export interface AssetDelistedEventObject {
  listingId: BigNumber;
  lister: string;
  unlocksAt: number;
}
export type AssetDelistedEvent = TypedEvent<
  [BigNumber, string, number],
  AssetDelistedEventObject
>;

export type AssetDelistedEventFilter = TypedEventFilter<AssetDelistedEvent>;

export interface AssetListedEventObject {
  listingId: BigNumber;
  listingGroupId: BigNumber;
  lister: string;
  asset: Assets.AssetStructOutput;
  params: Listings.ParamsStructOutput;
  maxLockPeriod: number;
}
export type AssetListedEvent = TypedEvent<
  [
    BigNumber,
    BigNumber,
    string,
    Assets.AssetStructOutput,
    Listings.ParamsStructOutput,
    number
  ],
  AssetListedEventObject
>;

export type AssetListedEventFilter = TypedEventFilter<AssetListedEvent>;

export interface AssetWithdrawnEventObject {
  listingId: BigNumber;
  lister: string;
  asset: Assets.AssetStructOutput;
}
export type AssetWithdrawnEvent = TypedEvent<
  [BigNumber, string, Assets.AssetStructOutput],
  AssetWithdrawnEventObject
>;

export type AssetWithdrawnEventFilter = TypedEventFilter<AssetWithdrawnEvent>;

export interface ListingPausedEventObject {
  listingId: BigNumber;
}
export type ListingPausedEvent = TypedEvent<
  [BigNumber],
  ListingPausedEventObject
>;

export type ListingPausedEventFilter = TypedEventFilter<ListingPausedEvent>;

export interface ListingUnpausedEventObject {
  listingId: BigNumber;
}
export type ListingUnpausedEvent = TypedEvent<
  [BigNumber],
  ListingUnpausedEventObject
>;

export type ListingUnpausedEventFilter = TypedEventFilter<ListingUnpausedEvent>;

export interface IListingManager extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IListingManagerInterface;

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
    assetListingCount(
      original: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    assetListings(
      original: string,
      offset: BigNumberish,
      limit: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[], Listings.ListingStructOutput[]]>;

    delistAsset(
      listingId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    listAsset(
      asset: Assets.AssetStruct,
      params: Listings.ParamsStruct,
      maxLockPeriod: BigNumberish,
      immediatePayout: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    listingController(
      strategyId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;

    listingCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    listingInfo(
      listingId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[Listings.ListingStructOutput]>;

    listings(
      offset: BigNumberish,
      limit: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[], Listings.ListingStructOutput[]]>;

    pauseListing(
      listingId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    unpauseListing(
      listingId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    userListingCount(
      lister: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    userListings(
      lister: string,
      offset: BigNumberish,
      limit: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[], Listings.ListingStructOutput[]]>;

    withdrawAsset(
      listingId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  assetListingCount(
    original: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  assetListings(
    original: string,
    offset: BigNumberish,
    limit: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[BigNumber[], Listings.ListingStructOutput[]]>;

  delistAsset(
    listingId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  listAsset(
    asset: Assets.AssetStruct,
    params: Listings.ParamsStruct,
    maxLockPeriod: BigNumberish,
    immediatePayout: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  listingController(
    strategyId: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  listingCount(overrides?: CallOverrides): Promise<BigNumber>;

  listingInfo(
    listingId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<Listings.ListingStructOutput>;

  listings(
    offset: BigNumberish,
    limit: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[BigNumber[], Listings.ListingStructOutput[]]>;

  pauseListing(
    listingId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  unpauseListing(
    listingId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  userListingCount(
    lister: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  userListings(
    lister: string,
    offset: BigNumberish,
    limit: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[BigNumber[], Listings.ListingStructOutput[]]>;

  withdrawAsset(
    listingId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    assetListingCount(
      original: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    assetListings(
      original: string,
      offset: BigNumberish,
      limit: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[], Listings.ListingStructOutput[]]>;

    delistAsset(
      listingId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    listAsset(
      asset: Assets.AssetStruct,
      params: Listings.ParamsStruct,
      maxLockPeriod: BigNumberish,
      immediatePayout: boolean,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        listingId: BigNumber;
        listingGroupId: BigNumber;
      }
    >;

    listingController(
      strategyId: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    listingCount(overrides?: CallOverrides): Promise<BigNumber>;

    listingInfo(
      listingId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<Listings.ListingStructOutput>;

    listings(
      offset: BigNumberish,
      limit: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[], Listings.ListingStructOutput[]]>;

    pauseListing(
      listingId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    unpauseListing(
      listingId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    userListingCount(
      lister: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    userListings(
      lister: string,
      offset: BigNumberish,
      limit: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[], Listings.ListingStructOutput[]]>;

    withdrawAsset(
      listingId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "AssetDelisted(uint256,address,uint32)"(
      listingId?: BigNumberish | null,
      lister?: string | null,
      unlocksAt?: null
    ): AssetDelistedEventFilter;
    AssetDelisted(
      listingId?: BigNumberish | null,
      lister?: string | null,
      unlocksAt?: null
    ): AssetDelistedEventFilter;

    "AssetListed(uint256,uint256,address,tuple,tuple,uint32)"(
      listingId?: BigNumberish | null,
      listingGroupId?: BigNumberish | null,
      lister?: string | null,
      asset?: null,
      params?: null,
      maxLockPeriod?: null
    ): AssetListedEventFilter;
    AssetListed(
      listingId?: BigNumberish | null,
      listingGroupId?: BigNumberish | null,
      lister?: string | null,
      asset?: null,
      params?: null,
      maxLockPeriod?: null
    ): AssetListedEventFilter;

    "AssetWithdrawn(uint256,address,tuple)"(
      listingId?: BigNumberish | null,
      lister?: string | null,
      asset?: null
    ): AssetWithdrawnEventFilter;
    AssetWithdrawn(
      listingId?: BigNumberish | null,
      lister?: string | null,
      asset?: null
    ): AssetWithdrawnEventFilter;

    "ListingPaused(uint256)"(
      listingId?: BigNumberish | null
    ): ListingPausedEventFilter;
    ListingPaused(listingId?: BigNumberish | null): ListingPausedEventFilter;

    "ListingUnpaused(uint256)"(
      listingId?: BigNumberish | null
    ): ListingUnpausedEventFilter;
    ListingUnpaused(
      listingId?: BigNumberish | null
    ): ListingUnpausedEventFilter;
  };

  estimateGas: {
    assetListingCount(
      original: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    assetListings(
      original: string,
      offset: BigNumberish,
      limit: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    delistAsset(
      listingId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    listAsset(
      asset: Assets.AssetStruct,
      params: Listings.ParamsStruct,
      maxLockPeriod: BigNumberish,
      immediatePayout: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    listingController(
      strategyId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    listingCount(overrides?: CallOverrides): Promise<BigNumber>;

    listingInfo(
      listingId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    listings(
      offset: BigNumberish,
      limit: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    pauseListing(
      listingId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    unpauseListing(
      listingId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    userListingCount(
      lister: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    userListings(
      lister: string,
      offset: BigNumberish,
      limit: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdrawAsset(
      listingId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    assetListingCount(
      original: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    assetListings(
      original: string,
      offset: BigNumberish,
      limit: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    delistAsset(
      listingId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    listAsset(
      asset: Assets.AssetStruct,
      params: Listings.ParamsStruct,
      maxLockPeriod: BigNumberish,
      immediatePayout: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    listingController(
      strategyId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    listingCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    listingInfo(
      listingId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    listings(
      offset: BigNumberish,
      limit: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    pauseListing(
      listingId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    unpauseListing(
      listingId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    userListingCount(
      lister: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    userListings(
      lister: string,
      offset: BigNumberish,
      limit: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdrawAsset(
      listingId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
