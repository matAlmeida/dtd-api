import { SMTPMailProvider } from '@domains/core/providers/MailProvider/implementations/SMTPMailProvider';
import { DatabaseUserRepository } from '@domains/users/repositories/implementations/DatabaseUserRepository';

import { ForgotPasswordController } from './forgot-password.controller';
import { ForgotPasswordUseCase } from './forgot-password.usecase';

const databaseUserRepository = new DatabaseUserRepository();
const smtpMailProvider = new SMTPMailProvider();

const forgotPasswordUseCase = new ForgotPasswordUseCase(
  databaseUserRepository,
  smtpMailProvider
);

const forgotPasswordController = new ForgotPasswordController(
  forgotPasswordUseCase
);

export { forgotPasswordUseCase, forgotPasswordController };
