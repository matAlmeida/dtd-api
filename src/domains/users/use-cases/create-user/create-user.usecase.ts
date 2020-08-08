import bcrypt from 'bcrypt';

import { BadRequestError } from '@models/error';
import { IBaseUseCase } from '@models/usecase';

import { IUsersRepository } from '@domains/users/repositories/IUsersRepository';
import { User } from '@domains/users/entities/User';

import { ICreateUserRequestDTO } from './create-user.dto';

const SALT_ROUNDS = 10;

export class CreateUserUseCase implements
  IBaseUseCase<ICreateUserRequestDTO, void> {
  constructor(private usersRepository: IUsersRepository) { }

  async execute(data: ICreateUserRequestDTO) {
    const user = await this.usersRepository.findByEmail(data.email);

    if (user) {
      throw new BadRequestError('User already exists.');
    }

    const passwordSalt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(data.password, passwordSalt);

    const newUser = new User({
      ...data,
      password: hashedPassword,
      password_salt: passwordSalt
    });

    await this.usersRepository.save(newUser);
  }
}
