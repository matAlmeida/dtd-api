const PGHOST = process.env.PGHOST;
const PGUSER = process.env.PGUSER;
const PGDATABASE = process.env.PGDATABASE;
const PGPASSWORD = process.env.PGPASSWORD;
const PGPORT = process.env.PGPORT;

const databaseConfig = {
  development: {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "password",
    database: "ilab_dev",
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
  },
  test: {
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "password",
    database: "ilab_test",
    logging: false,
    migrationsRun: true,
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
  },
  production: {
    type: "postgres",
    host: PGHOST,
    port: PGPORT,
    username: PGUSER,
    password: PGPASSWORD,
    database: PGDATABASE,
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
}

module.exports = databaseConfig[process.env.NODE_ENV || "development"]
