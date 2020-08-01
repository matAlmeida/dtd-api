import { singleton } from '@keenondrums/singleton';
import { createConnection, Repository } from 'typeorm';

import { Pagination } from '@domains/core/entities/Pagination';

import { User } from '../../entities/User';

import { IUsersRepository } from '../IUsersRepository';

@singleton
export class DatabaseUserRepository implements IUsersRepository {
  private userRepository: Repository<User>;

  constructor() {
    this.connectDatabase();
  }

  async all({ page, length }: Pagination) {
    const users = await this.userRepository.find({ skip: page * length, take: length });

    return users;
  }

  async findById(id: string) {
    const user = await this.userRepository.findOne({ id });

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ email });

    return user;
  }

  async save(user: User) {
    await this.userRepository.save(user);
  }

  private async connectDatabase() {
    try {
      const connection = await createConnection();
      this.userRepository = connection.getRepository(User);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
}
