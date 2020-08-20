import { DatabaseUserRepository } from '@domains/users/repositories/implementations/DatabaseUserRepository';

import { AuthenticateUserController } from './authenticate-user.controller';
import { AuthenticateUserUseCase } from './authenticate-user.usecase';

const databaseUserRepository = new DatabaseUserRepository();

const authenticateUserUseCase = new AuthenticateUserUseCase(
  databaseUserRepository
);

const authenticateUserController = new AuthenticateUserController(
  authenticateUserUseCase
);

export { authenticateUserUseCase, authenticateUserController };
