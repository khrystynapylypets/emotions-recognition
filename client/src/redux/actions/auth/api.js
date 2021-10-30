import { API } from '../../api';

const signUp = (userData) => {
  const requestBody = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    password: userData.password,
  };

  return API.post('/auth/sign-up', requestBody);
};

const signIn = (userData) => {
  const requestBody = {
    email: userData.email,
    password: userData.password,
  };

  return API.post('/auth/sign-in', requestBody);
};

export default {
  signUp,
  signIn,
};
