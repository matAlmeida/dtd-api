import dotenv from 'dotenv';

import defaultConfig from './default.json';

dotenv.config();

const env = {
  PORT: process.env.PORT,
  API_JWT_KEY: process.env.API_JWT_KEY,
  PGHOST: process.env.PGHOST,
  PGUSER: process.env.PGUSER,
  PGDATABASE: process.env.PGDATABASE,
  PGPASSWORD: process.env.PGPASSWORD,
  PGPORT: process.env.PGPORT
};

export default {
  env,
  ...defaultConfig
};
