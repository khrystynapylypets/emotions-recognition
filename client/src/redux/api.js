import axios from 'axios';
import { envVariables } from '../configurations';
import { getAccessToken } from '../helpers';

export const API = axios.create({
  baseURL: `${envVariables.API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const AuthAPI = axios.create({
  baseURL: `${envVariables.API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

AuthAPI.interceptors.request.use((config) => {
  const token = getAccessToken();

  config.headers['access-token'] = token || '';
  return config;
});
