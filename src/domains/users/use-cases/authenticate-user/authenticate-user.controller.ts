import { Request, Response } from 'express';
import { OK, BAD_REQUEST } from 'http-status-codes';

import { AuthenticateUserUseCase } from './authenticate-user.usecase';

export class AuthenticateUserController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    try {
      const authenticatedUser = await this.authenticateUserUseCase.execute({
        email,
        password
      });

      return response.status(OK).send(authenticatedUser);
    } catch (err) {
      return response.status(err.status || BAD_REQUEST).json({
        message: err.message || 'Unexpected error.'
      });
    }
  }
}
