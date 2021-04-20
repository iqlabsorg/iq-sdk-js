export interface BalanceChangeEvent {
  address: string;
  balanceDelta: bigint;
  timestamp: bigint;
}
