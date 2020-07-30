import { InMemoryUserRepository } from '@domains/users/repositories/implementations/InMemoryUsersRepository';

import { AuthenticateUserUseCase } from './authenticate-user.usecase';
import { AuthenticateUserController } from './authenticate-user.controller';

const inMemoryUserRepository = new InMemoryUserRepository();

const authenticateUserUseCase = new AuthenticateUserUseCase(
  inMemoryUserRepository
);

const authenticateUserController = new AuthenticateUserController(
  authenticateUserUseCase
);

export { authenticateUserUseCase, authenticateUserController };
