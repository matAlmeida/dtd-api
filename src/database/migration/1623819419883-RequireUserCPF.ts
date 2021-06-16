import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RequireUserCPF1623819419883 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('user', [
      new TableColumn({
        name: 'cpf',
        type: 'varchar',
        isNullable: false,
        isUnique: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('user', [
      new TableColumn({
        name: 'cpf',
        type: 'varchar',
        isNullable: false,
        isUnique: true,
      }),
    ]);
  }
}
