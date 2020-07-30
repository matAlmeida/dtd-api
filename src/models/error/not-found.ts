import { NOT_FOUND } from 'http-status-codes';

export class NotFoundError extends Error {
  public readonly status = NOT_FOUND;
}
