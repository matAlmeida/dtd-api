import { getConnection, createConnection } from 'typeorm';

import { dropDatabase } from '@libs/test-utils';

import { BadRequestError } from '@models/error';

import { DatabaseUserRepository } from '@domains/users/repositories/implementations/DatabaseUserRepository';

import { createUserUseCase } from './index';

const userRepository = new DatabaseUserRepository();

const testUser = {
  name: 'Matheus',
  email: 'email@email.com',
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
});

describe('Create User [Use Case]', () => {
  test('should persist on database', async () => {
    await createUserUseCase.execute(testUser);

    const createdUser = await userRepository.findByEmail(testUser.email);

    expect(createdUser.id).toBeTruthy();
    expect(createdUser.name).toEqual(testUser.name);
    expect(createdUser.email).toEqual(testUser.email);
  });

  test('should hash user password and save the salt', async () => {
    await createUserUseCase.execute(testUser);

    const createdUser = await userRepository.findByEmail(testUser.email);

    expect(createdUser.id).toBeTruthy();
    expect(createdUser.name).toEqual(testUser.name);
    expect(createdUser.email).toEqual(testUser.email);
    expect(createdUser.password).not.toEqual(testUser.password);
    expect(createdUser.password_salt).toBeTruthy();
  });

  test('should fail when user with same email already exists', async () => {
    expect.assertions(2);

    try {
      await createUserUseCase.execute(testUser);
      await createUserUseCase.execute(testUser);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestError);
      expect(error).toHaveProperty('message', 'User already exists.');
    }
  });
});
