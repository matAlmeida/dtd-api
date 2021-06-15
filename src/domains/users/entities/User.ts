import { Entity, Column, Index } from 'typeorm';
import { uuid } from 'uuidv4';

@Entity('user')
@Index('idx_user_email', ['email'], { unique: true })
export class User {
  @Column({
    primary: true,
    nullable: false,
    type: 'uuid',
  })
  public readonly id: string;

  @Column()
  public name: string;

  @Column({
    nullable: false,
    unique: true,
  })
  public email: string;

  @Column({ nullable: false })
  public password: string;

  @Column({ nullable: false })
  public password_salt: string;

  @Column({ nullable: true })
  public password_reset_token?: string;

  @Column({ nullable: true })
  public password_reset_expire?: Date;

  constructor(props: Omit<User, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    } else {
      this.id = id;
    }
  }
}
