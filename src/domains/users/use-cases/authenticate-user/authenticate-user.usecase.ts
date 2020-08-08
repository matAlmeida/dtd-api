import bcrypt from 'bcrypt';

import { UnauthorizedError } from '@models/error';
import { IBaseUseCase } from '@models/usecase';
import { generateToken } from '@libs/jwt';
import { IUsersRepository } from '@domains/users/repositories/IUsersRepository';

import {
  IAuthenticateUserRequestDTO,
  IAuthenticateUserResponseDTO,
  ISessionParams
} from './authenticate-user.dto';

export class AuthenticateUserUseCase implements
  IBaseUseCase<IAuthenticateUserRequestDTO, IAuthenticateUserResponseDTO> {
  constructor(private userRepository: IUsersRepository) { }

  async execute(data: IAuthenticateUserRequestDTO) {
    const user = await this.userRepository.findByEmail(data.email);

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
