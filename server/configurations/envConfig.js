import dotenv from 'dotenv';

dotenv.config();

const envVariables = {
  PORT: process.env.PORT,
  FRONT_DOMAIN: process.env.FRONT_DOMAIN,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_KEY: process.env.JWT_KEY,
  TOKEN_TIME: process.env.TOKEN_TIME,
};

export default envVariables;
