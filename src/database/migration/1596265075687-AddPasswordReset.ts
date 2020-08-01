import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddPasswordReset1596265075687 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('user', [
      new TableColumn(
        {
          name: 'password_reset_token',
          type: 'varchar',
          isNullable: true
        }
      ),
      new TableColumn(
        {
          name: 'password_reset_expire',
          type: 'date',
          isNullable: true
        }
      )
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('users', [
      new TableColumn(
        {
          name: 'password_reset_token',
          type: 'varchar',
          isNullable: true
        }
      ),
      new TableColumn(
        {
          name: 'password_reset_expire',
          type: 'date',
          isNullable: true
        }
      )
    ]);
  }
}
