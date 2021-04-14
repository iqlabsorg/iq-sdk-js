import { StorageProvider } from '@iqprotocol/abstract-storage';

export class PostgresStorage extends StorageProvider {
  init(): boolean {
    return true;
  }
}
