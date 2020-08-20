import { DatabaseUserRepository } from '@domains/users/repositories/implementations/DatabaseUserRepository';

import { CreateUserController } from './create-user.controller';
import { CreateUserUseCase } from './create-user.usecase';

const databaseUserRepository = new DatabaseUserRepository();

const createUserUseCase = new CreateUserUseCase(databaseUserRepository);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
