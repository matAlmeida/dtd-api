import { getConnection, createConnection } from 'typeorm';

import { dropDatabase } from '@libs/test-utils';

import { UnauthorizedError } from '@models/error';

import { createUserUseCase } from '@domains/users/use-cases/create-user';

import { authenticateUserUseCase } from './index';

const testUser = {
  name: 'Matheus',
  email: 'authenticate-email@email.com',
  password: 'senha123'
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
});

describe('Authenticate User [Use Case]', () => {
  test('should fail if user email dont exists on database', async () => {
    expect.assertions(2);

    try {
      await authenticateUserUseCase.execute({
        email: `invalid-${testUser.email}`,
        password: testUser.password
      });
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedError);
      expect(error).toHaveProperty('message', 'Invalid credentials');
    }
  });

  test('should fail if invalid password', async () => {
    expect.assertions(2);

    try {
      await authenticateUserUseCase.execute({
        email: testUser.email,
        password: `invalid-${testUser.password}`
      });
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedError);
      expect(error).toHaveProperty('message', 'Invalid credentials');
    }
  });

  test('should return authenticated user if valid credentials', async () => {
    const authenticatedUser = await authenticateUserUseCase.execute({
      email: testUser.email,
      password: testUser.password
    });

    expect(authenticatedUser).toHaveProperty('id');
    expect(authenticatedUser).toHaveProperty('name', testUser.name);
    expect(authenticatedUser).toHaveProperty('email', testUser.email);
    expect(authenticatedUser).toHaveProperty('session_token');
    expect(authenticatedUser).not.toHaveProperty('password');
    expect(authenticatedUser).not.toHaveProperty('password_salt');
  });
});
