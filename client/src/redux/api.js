import axios from 'axios';
import { envVariables } from '../configurations';
import { getAccessToken, removeAccessToken } from '../helpers';
import { statusCodes, path } from '../utils/constants';

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

AuthAPI.interceptors.response.use((response) => response, (error) => {
  const { config: originalRequest, response } = error;

  if (response.status === statusCodes.UNAUTHORIZED ) {
    removeAccessToken();
    history.push(path.SIGN_OUT);

    return;
  }

  return axios(originalRequest);
});


