import { Request, Response } from 'express';
import { CREATED, BAD_REQUEST } from 'http-status-codes';

import { CreateUserUseCase } from './create-user.usecase';

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, cpf } = request.body;

    try {
      await this.createUserUseCase.execute({
        name,
        email,
        password,
        cpf,
      });

      return response.status(CREATED).send();
    } catch (err) {
      return response.status(err.status || BAD_REQUEST).json({
        message: err.message || 'Unexpected error.',
      });
    }
  }
}
