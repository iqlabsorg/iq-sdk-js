export interface BlockchainProvider {
  recoverAddress(message: unknown, signature: string): string;
}
