export class ApiError extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;

    if (!!Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}
