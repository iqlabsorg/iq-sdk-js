export interface BlockchainProvider {
  recoverAddress(digest: string, signature: string): string;
}
