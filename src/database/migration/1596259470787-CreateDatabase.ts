import { MigrationInterface, QueryRunner } from 'typeorm';

import config from '../../config';

export class CreateDatabase1596259470787 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createDatabase(config.env.PGDATABASE, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropDatabase(config.env.PGDATABASE, true);
  }
}
