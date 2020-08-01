import { singleton } from '@keenondrums/singleton';

import { User } from '../../entities/User';

import { IUsersRepository } from '../IUsersRepository';

const InMemoryUers: User[] = [];

@singleton
export class InMemoryUserRepository implements IUsersRepository {
  async all() {
    return [...InMemoryUers];
  }

  async findById(id: string) {
    const user = InMemoryUers.find((user) => user.id === id);

    return user;
  }

  async findByEmail(email: string) {
    const user = InMemoryUers.find((user) => user.email === email);

    return user;
  }

  async save(user: User) {
    InMemoryUers.push(user);
  }
}
