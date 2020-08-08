import { getConnection, createConnection } from 'typeorm';

import { DatabaseUserRepository } from '@domains/users/repositories/implementations/DatabaseUserRepository';

import { createUserUseCase } from './index';

const userRepository = new DatabaseUserRepository();

const testUser = {
  name: 'Matheus',
  email: 'email@email.com',
  password: 'senha123'
};

const dropDatabase = async () => {
  const connection = getConnection();
  const entities = connection.entityMetadatas;

  await Promise.all(entities.map(async (entity) => {
    const repository = connection.getRepository(entity.name);
    await repository.query(`DELETE FROM "${entity.tableName}"`);
  }));
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
});
