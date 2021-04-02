import { DatabaseUserRepository } from '@domains/users/repositories/implementations/DatabaseUserRepository';

import { ResetPasswordController } from './reset-password.controller';
import { ResetPasswordUseCase } from './reset-password.usecase';

const databaseUserRepository = new DatabaseUserRepository();

const resetPasswordUseCase = new ResetPasswordUseCase(databaseUserRepository);

const resetPasswordController = new ResetPasswordController(
  resetPasswordUseCase
);

export { resetPasswordUseCase, resetPasswordController };
