import { User } from '../User';

const uuidv4Regex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

const userData = {
  name: 'Matheus',
  email: 'email@email.com',
  password: 'senha123',
  password_salt: 'salt',
};

describe('User entity', () => {
  test('should create a user', () => {
    const user = new User(userData);

    expect(user.name).toEqual(userData.name);
    expect(user.email).toEqual(userData.email);
    expect(user.password).toEqual(userData.password);
    expect(user.password_salt).toEqual(userData.password_salt);
  });

  test('should initialize with and id if not suplied', () => {
    const user = new User(userData);

    expect(user.id).toBeTruthy();

    expect(user.id).toMatch(uuidv4Regex);
  });

  test('should has same id if suplied', () => {
    const fakeId = 'id';
    const user = new User(userData, fakeId);

    expect(user.id).toEqual(fakeId);
  });
});
