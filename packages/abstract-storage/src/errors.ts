export class AccountStateError extends Error {
  constructor(msg: string) {
    super(msg);
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AccountStateError);
    }

    this.name = 'AccountStateError';
  }
}
