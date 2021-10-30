import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_KEY: process.env.JWT_KEY,
  TOKEN_TIME: process.env.TOKEN_TIME,
};
