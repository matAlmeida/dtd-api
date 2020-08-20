import bcrypt from 'bcrypt';

import { generateToken } from '@libs/jwt';

import { UnauthorizedError } from '@models/error';
import { IBaseUseCase } from '@models/usecase';

import { IUsersRepository } from '@domains/users/repositories/IUsersRepository';

import {
  IAuthenticateUserRequestDTO,
  IAuthenticateUserResponseDTO,
  ISessionParams
} from './authenticate-user.dto';

export class AuthenticateUserUseCase implements
  IBaseUseCase<IAuthenticateUserRequestDTO, IAuthenticateUserResponseDTO> {
  constructor(private usersRepository: IUsersRepository) { }

  async execute(data: IAuthenticateUserRequestDTO) {
    const user = await this.usersRepository.findByEmail(data.email);

    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const correctPassword = await bcrypt.compare(data.password, user.password);

    if (!correctPassword) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const sessionParams: ISessionParams = { id: user.id };
    const sessionToken = generateToken(sessionParams);

    const publicUser: IAuthenticateUserResponseDTO = {
      id: user.id,
      name: user.name,
      email: user.email,
      session_token: sessionToken
    };

    return publicUser;
  }
}
