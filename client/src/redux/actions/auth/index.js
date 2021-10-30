import { get } from 'lodash';
import { toaster as addMessage } from 'evergreen-ui';
import types from './types';
import api from './api';
import { message, setAccessToken } from '../../../helpers';
import { ERROR_MESSAGE_DISPLAYING_DURATION } from '../../../utils/constants';

const signUp = () => ({
  type: types.SIGN_UP,
});

const signUpFail = () => ({
  type: types.SIGN_UP_FAIL,
});

const signUpSuccess = () => ({
  type: types.SIGN_UP_SUCCESS,
});

const signIn = () => ({
  type: types.SIGN_IN,
});

const signInFail = () => ({
  type: types.SIGN_IN_FAIL,
});

const signInSuccess = () => ({
  type: types.SIGN_IN_SUCCESS,
});

const signUpAction = (userData) => (dispatch) =>
{
  dispatch(signUp());

  return api.signUp(userData)
    .then((result) => {
      const { firstName, lastName } = userData;

      dispatch(signUpSuccess());
      addMessage.success(message('auth.request.messages.creationSuccess', { firstName, lastName }));

      return result;
    })
    .catch((error) => {
      const errorMessage = get(error, 'response.data.message',
        message('auth.request.messages.generalError'));

      dispatch(signUpFail());
      addMessage.danger(errorMessage, { duration: ERROR_MESSAGE_DISPLAYING_DURATION });
      return Promise.reject(error);
    });
};

const signInAction = (userData) => (dispatch) =>
{
  dispatch(signIn());

  return api.signIn(userData)
    .then((result) => {
      const accessToken = get(result, 'data.accessToken');

      setAccessToken(accessToken);
      dispatch(signInSuccess());

      return result;
    })
    .catch((error) => {
      const errorMessage = get(error, 'response.data.message',
        message('auth.request.messages.generalError'));

      dispatch(signInFail());
      addMessage.danger(errorMessage, { duration: ERROR_MESSAGE_DISPLAYING_DURATION });

      return Promise.reject(error);
    });
};

export default {
  signUpAction,
  signInAction,
};
