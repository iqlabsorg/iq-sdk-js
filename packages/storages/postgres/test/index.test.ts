import { PostgresStorage } from '../src';

describe('@iqprotocol/postgres', () => {
  it('works', () => {
    const storage = new PostgresStorage();
    expect(storage.isInitialized()).toBe(true);
    expect(storage.init()).toBe(true);
  });
});
