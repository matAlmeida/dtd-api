const DATABASE = process.env.PGDATABASE;

module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: DATABASE || "ilab_dev",
  logging: [
    "error"
  ],
  entities: [
    "./src/domains/**/entities/*.ts"
  ],
  migrations: [
    "./src/database/migration/**/*.ts"
  ],
  cli: {
    "entitiesDir": "src/domains",
    "migrationsDir": "src/database/migration"
  }
}
