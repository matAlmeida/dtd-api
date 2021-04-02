import { Request, Response } from 'express';
import { OK, BAD_REQUEST } from 'http-status-codes';

import { ResetPasswordUseCase } from './reset-password.usecase';

export class ResetPasswordController {
  constructor(private resetPasswordUseCase: ResetPasswordUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password, reset_token } = request.body;

    try {
      await this.resetPasswordUseCase.execute({
        email,
        password,
        reset_token,
      });

      return response.status(OK).send();
    } catch (err) {
      return response.status(err.status || BAD_REQUEST).json({
        message: err.message || 'Unexpected error.',
      });
    }
  }
}
