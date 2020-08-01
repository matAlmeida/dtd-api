import { DatabaseUserRepository } from '@domains/users/repositories/implementations/DatabaseUserRepository';

import { AuthenticateUserUseCase } from './authenticate-user.usecase';
import { AuthenticateUserController } from './authenticate-user.controller';

const databaseUserRepository = new DatabaseUserRepository();

const authenticateUserUseCase = new AuthenticateUserUseCase(
  databaseUserRepository
);

const authenticateUserController = new AuthenticateUserController(
  authenticateUserUseCase
);

export { authenticateUserUseCase, authenticateUserController };
