import { BAD_REQUEST } from 'http-status-codes';

export class BadRequestError extends Error {
  public readonly status = BAD_REQUEST;
}
