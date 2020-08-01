import { DatabaseUserRepository } from '@domains/users/repositories/implementations/DatabaseUserRepository';

import { ResetPasswordUseCase } from './reset-password.usecase';
import { ResetPasswordController } from './reset-password.controller';

const databaseUserRepository = new DatabaseUserRepository();

const resetPasswordUseCase = new ResetPasswordUseCase(databaseUserRepository);

const resetPasswordController = new ResetPasswordController(resetPasswordUseCase);

export { resetPasswordUseCase, resetPasswordController };
