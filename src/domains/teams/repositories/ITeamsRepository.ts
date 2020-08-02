import { Pagination } from '@domains/core/entities/Pagination';

import { Team } from '../entities/Team';

export interface ITeamsRepository {
  all(userId: string, pagination: Pagination): Promise<Team[]>;
  findById(id: string): Promise<Team>;
  save(user: Team): Promise<void>;
}
