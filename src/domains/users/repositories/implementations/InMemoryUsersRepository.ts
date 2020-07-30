import { singleton } from '@keenondrums/singleton';

import { IUsersRepository } from '../IUsersRepository';
import { User } from '../../entities/User';

const InMemoryUers: User[] = [];

@singleton
export class InMemoryUserRepository implements IUsersRepository {
  async findByEmail(email: string) {
    const user = InMemoryUers.find((user) => user.email === email);

    return user || null;
  }

  async save(user: User) {
    InMemoryUers.push(user);
  }
}
