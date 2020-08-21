import Email from 'email-templates';
import { mocked } from 'ts-jest/utils';
import { getConnection, createConnection } from 'typeorm';

import { dropDatabase } from '@libs/test-utils';

import { BadRequestError } from '@models/error';

import { createUserUseCase } from '@domains/users/use-cases/create-user';

import { forgotPasswordUseCase } from './index';

jest.mock('nodemailer');
jest.mock('email-templates');

const MockedEmail = mocked(Email, true);

const testUser = {
  name: 'Matheus',
  email: 'forgot-email@email.com',
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
  MockedEmail.mockClear();
  await dropDatabase();
  await createUserUseCase.execute(testUser);
});

describe('Forgot Password [Use Case]', () => {
  test('should fail if user email dont exists on database', async () => {
    expect.assertions(2);

    try {
      await forgotPasswordUseCase.execute({
        email: `invalid-${testUser.email}`
      });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestError);
      expect(error).toHaveProperty('message', 'User does not exists.');
    }
  });

  test('should send mail to user if exists on database', async () => {
    await forgotPasswordUseCase.execute({
      email: testUser.email
    });

    const emailInstance = MockedEmail.mock.instances[0];
    expect(emailInstance.send).toBeCalledTimes(1);
  });
});
