import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateUsers1596260164976 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'user',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true
        },
        {
          name: 'name',
          type: 'varchar'
        },
        {
          name: 'email',
          type: 'varchar',
          isUnique: true,
          isNullable: false
        },
        {
          name: 'password',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'password_salt',
          type: 'varchar',
          isNullable: false
        }
      ]
    }), true);

    await queryRunner.createIndex('user', new TableIndex({
      name: 'idx_user_email',
      columnNames: ['email']
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('user', 'idx_user_email');
    await queryRunner.dropTable('user', true);
  }
}
