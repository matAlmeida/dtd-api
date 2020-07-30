import { UNAUTHORIZED } from 'http-status-codes';

export class UnauthorizedError extends Error {
  public readonly status = UNAUTHORIZED;
}
