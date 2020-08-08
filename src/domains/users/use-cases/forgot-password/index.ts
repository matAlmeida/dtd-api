import { DatabaseUserRepository } from '@domains/users/repositories/implementations/DatabaseUserRepository';
import { SMTPMailProvider } from '@domains/core/providers/MailProvider/implementations/SMTPMailProvider';

import { ForgotPasswordUseCase } from './forgot-password.usecase';
import { ForgotPasswordController } from './forgot-password.controller';

const databaseUserRepository = new DatabaseUserRepository();
const smtpMailProvider = new SMTPMailProvider();

const forgotPasswordUseCase = new ForgotPasswordUseCase(databaseUserRepository, smtpMailProvider);

const forgotPasswordController = new ForgotPasswordController(forgotPasswordUseCase);

export { forgotPasswordUseCase, forgotPasswordController };
