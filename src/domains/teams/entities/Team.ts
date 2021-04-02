import { Entity, Column, ManyToOne } from 'typeorm';
import { uuid } from 'uuidv4';

import { User } from '../../users/entities/User';

@Entity('team')
export class Team {
  @Column({
    primary: true,
    nullable: false,
    type: 'uuid',
  })
  public readonly id: string;

  @Column()
  public name: string;

  @Column({ nullable: true })
  public thumbnail?: string;

  @ManyToOne((type) => User, (user) => user.teams, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  public user: User;

  constructor(props: Omit<Team, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
