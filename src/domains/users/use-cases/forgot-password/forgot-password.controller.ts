import { Request, Response } from 'express';
import { OK, BAD_REQUEST } from 'http-status-codes';

import { ForgotPasswordUseCase } from './forgot-password.usecase';

export class ForgotPasswordController {
  constructor(private forgotPasswordUseCase: ForgotPasswordUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    try {
      await this.forgotPasswordUseCase.execute({
        email,
      });

      return response.status(OK).send();
    } catch (err) {
      return response.status(err.status || BAD_REQUEST).json({
        message: err.message || 'Unexpected error.',
      });
    }
  }
}
