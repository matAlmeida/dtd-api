import { getConnection } from 'typeorm';

export const dropDatabase = async () => {
  const connection = getConnection();
  const entities = connection.entityMetadatas;

  await Promise.all(
    entities.map(async (entity) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM "${entity.tableName}"`);
    })
  );
};
