import { DatabaseUserRepository } from '@domains/users/repositories/implementations/DatabaseUserRepository';

import { CreateUserUseCase } from './create-user.usecase';
import { CreateUserController } from './create-user.controller';

const databaseUserRepository = new DatabaseUserRepository();

const createUserUseCase = new CreateUserUseCase(databaseUserRepository);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
