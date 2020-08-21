import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableColumn } from 'typeorm';

export class CreateTeams1596324847090 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'team',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true
        },
        {
          name: 'name',
          type: 'varchar'
        },
        {
          name: 'thumbnail',
          type: 'varchar',
          isNullable: false
        }
      ]
    }), true);

    await queryRunner.addColumn('team', new TableColumn({
      name: 'userId',
      type: 'uuid'
    }));

    await queryRunner.createForeignKey('team', new TableForeignKey({
      columnNames: ['userId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'user',
      onDelete: 'CASCADE'
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('team');
    const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('userId') !== -1);
    await queryRunner.dropForeignKey('team', foreignKey);
    await queryRunner.dropColumn('team', 'userId');
    await queryRunner.dropTable('team', true);
  }
}
