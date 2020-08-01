import { Pagination } from '@domains/core/entities/Pagination';

import { User } from '../entities/User';

export interface IUsersRepository {
  all(pagination: Pagination): Promise<User[]>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  save(user: User): Promise<void>;
}
