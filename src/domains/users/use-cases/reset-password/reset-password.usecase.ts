import bcrypt from 'bcrypt';

import { BadRequestError, UnauthorizedError } from '@models/error';
import { IBaseUseCase } from '@models/usecase';

import { IUsersRepository } from '@domains/users/repositories/IUsersRepository';

import { IResetPasswordRequestDTO } from './reset-password.dto';

const SALT_ROUNDS = 10;

export class ResetPasswordUseCase
  implements IBaseUseCase<IResetPasswordRequestDTO, void> {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: IResetPasswordRequestDTO) {
    const user = await this.usersRepository.findByEmail(data.email);

    if (!user) {
      throw new BadRequestError('User does not exists');
    }

    if (data.reset_token !== user.password_reset_token) {
      throw new UnauthorizedError('Reset token invalid');
    }

    const now = new Date();
    if (now > user.password_reset_expire) {
      throw new UnauthorizedError('Reset token expired');
    }

    const passwordSalt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(data.password, passwordSalt);

    await this.usersRepository.save({
      ...user,
      password: hashedPassword,
      password_reset_token: null,
      password_reset_expire: null,
    });
  }
}
