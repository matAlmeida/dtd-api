import dotenv from 'dotenv';

import defaultConfig from './default.json';

dotenv.config();

const env = {
  PORT: process.env.PORT,
  API_JWT_KEY: process.env.API_JWT_KEY,
  API_MASTER_KEY: process.env.API_MASTER_KEY,
  API_MASTER_EMAIL: process.env.API_MASTER_EMAIL,
  API_MASTER_NAME: process.env.API_MASTER_NAME,
  SMTP_URL: process.env.SMTP_URL
};

export default {
  env,
  ...defaultConfig
};
