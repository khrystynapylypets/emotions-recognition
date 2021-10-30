import dotenv from 'dotenv';

dotenv.config();

export const envVariables = {
  API_URL: process.env.REACT_APP_API_URL,
};
