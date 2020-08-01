import crypto from 'crypto';
import path from 'path';

import { BadRequestError } from '@models/error';
import { IBaseUseCase } from '@models/usecase';

import { IMailProvider } from '@domains/core/providers/IMailProvider';
import { IUsersRepository } from '@domains/users/repositories/IUsersRepository';

import { IForgotPasswordRequestDTO } from './forgot-password.dto';
import { ForgotPasswordContext } from '../../mail/forgot_password/forgot_password.context';

export class ForgotPasswordUseCase
  implements IBaseUseCase<IForgotPasswordRequestDTO, void> {
  constructor(private usersRepository: IUsersRepository, private mailProvider: IMailProvider<ForgotPasswordContext>) { }

  async execute(data: IForgotPasswordRequestDTO) {
    const user = await this.usersRepository.findByEmail(data.email);

    if (!user) {
      throw new BadRequestError('User does not exists.');
    }

    const token = crypto.randomBytes(20).toString('hex');
    const now = new Date();
    now.setHours(now.getHours() + 1); // 1 hour to reset the password

    await this.usersRepository.save({ ...user, password_reset_token: token, password_reset_expire: now });

    const tempaltesPath = path.join(__dirname, '..', '..', 'mail');
    await this.mailProvider.sendMail({
      to: {
        email: user.email,
        name: user.name
      },
      from: {
        email: 'mat.almeida@live.com',
        name: 'Matheus do iLab'
      },
      template: 'forgot_password',
      context: {
        token
      }
    }, tempaltesPath);
  }
}
