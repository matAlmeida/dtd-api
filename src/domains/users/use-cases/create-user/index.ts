import { InMemoryUserRepository } from '@domains/users/repositories/implementations/InMemoryUsersRepository';

import { CreateUserUseCase } from './create-user.usecase';
import { CreateUserController } from './create-user.controller';

const inMemoryUserRepository = new InMemoryUserRepository();

const createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
