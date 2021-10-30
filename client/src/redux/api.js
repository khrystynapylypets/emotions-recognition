import axios from 'axios';
import { envVariables } from '../configurations';

export const API = axios.create({
  baseURL: `${envVariables.API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});
