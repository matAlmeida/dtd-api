import { getConnection, createConnection } from 'typeorm';

import { dropDatabase } from '@libs/test-utils';

import { BadRequestError, UnauthorizedError } from '@models/error';

import { DatabaseUserRepository } from '@domains/users/repositories/implementations/DatabaseUserRepository';
import { authenticateUserUseCase } from '@domains/users/use-cases/authenticate-user';
import { createUserUseCase } from '@domains/users/use-cases/create-user';
import { forgotPasswordUseCase } from '@domains/users/use-cases/forgot-password';

import { resetPasswordUseCase } from './index';

jest.mock('nodemailer');
jest.mock('email-templates');

const userRepository = new DatabaseUserRepository();

const testUser = {
  name: 'Matheus',
  email: 'reset-email@email.com',
  password: 'senha123',
};

beforeAll(async () => {
  await createConnection();
});

afterAll(async () => {
  await dropDatabase();

  await getConnection().close();
});

beforeEach(async () => {
  await dropDatabase();
  await createUserUseCase.execute(testUser);
  await forgotPasswordUseCase.execute({ email: testUser.email });
});

describe('Reset Password [Use Case]', () => {
  test('should fail if user email dont exists on database', async () => {
    expect.assertions(2);

    try {
      await resetPasswordUseCase.execute({
        email: `invalid-${testUser.email}`,
        password: testUser.password,
        reset_token: 'reset_token',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestError);
      expect(error).toHaveProperty('message', 'User does not exists');
    }
  });

  test('should fail if reset token different from the one on database', async () => {
    expect.assertions(2);

    try {
      await resetPasswordUseCase.execute({
        email: testUser.email,
        password: testUser.password,
        reset_token: 'reset_token',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedError);
      expect(error).toHaveProperty('message', 'Reset token invalid');
    }
  });

  test('should fail if reset token expired', async () => {
    expect.assertions(2);

    const createdUser = await userRepository.findByEmail(testUser.email);

    const now = new Date();
    now.setHours(now.getHours() - 1); // expired 1 hour ago
    await userRepository.save({ ...createdUser, password_reset_expire: now });

    try {
      await resetPasswordUseCase.execute({
        email: testUser.email,
        password: testUser.password,
        reset_token: createdUser.password_reset_token,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedError);
      expect(error).toHaveProperty('message', 'Reset token expired');
    }
  });

  test('should updated password if all data correct', async () => {
    const createdUser = await userRepository.findByEmail(testUser.email);

    const oldPasswordHash = createdUser.password;

    const newPassword = 'newPassword';

    await resetPasswordUseCase.execute({
      email: testUser.email,
      password: newPassword,
      reset_token: createdUser.password_reset_token,
    });

    const updatedUser = await userRepository.findByEmail(testUser.email);

    const newPasswordHash = updatedUser.password;

    expect(newPasswordHash).not.toBe(oldPasswordHash);
  });

  test('should be able to authenticate with new password', async () => {
    const createdUser = await userRepository.findByEmail(testUser.email);

    const newPassword = 'newPassword';

    await resetPasswordUseCase.execute({
      email: testUser.email,
      password: newPassword,
      reset_token: createdUser.password_reset_token,
    });

    const authenticatedUser = await authenticateUserUseCase.execute({
      email: testUser.email,
      password: newPassword,
    });

    expect(authenticatedUser).toBeTruthy();
  });
});
