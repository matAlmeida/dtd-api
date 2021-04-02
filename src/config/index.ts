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
  PGPORT: process.env.PGPORT,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
};

export default {
  env,
  ...defaultConfig,
};
