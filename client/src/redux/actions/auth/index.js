import { get } from 'lodash';
import { toaster as addMessage } from 'evergreen-ui';
import types from './types';
import api from './api';
import { message, removeAccessToken, setAccessToken } from '../../../helpers';
import { ERROR_MESSAGE_DISPLAYING_DURATION, statusCodes } from '../../../utils/constants';

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

const signOut = () => ({
  type: types.SIGN_OUT,
});

const signOutAction = () => (dispatch) =>
{
  dispatch(signOut());
  removeAccessToken();
};

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
      dispatch(signUpFail());
      const errorMessage = get(error, 'response.data.message',
        message('generalErrors.unexpected'));

      if (error.response.status === statusCodes.UNAUTHORIZED ) {
        dispatch(signOutAction());
        addMessage.danger(errorMessage, { duration: ERROR_MESSAGE_DISPLAYING_DURATION });

        return Promise.reject(error);
      }

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
      dispatch(signInFail());
      const errorMessage = get(error, 'response.data.message',
        message('generalErrors.unexpected'));

      if (error.response.status === statusCodes.UNAUTHORIZED ) {
        dispatch(signOutAction());
        addMessage.danger(errorMessage, { duration: ERROR_MESSAGE_DISPLAYING_DURATION });

        return Promise.reject(error);
      }

      addMessage.danger(errorMessage, { duration: ERROR_MESSAGE_DISPLAYING_DURATION });

      return Promise.reject(error);
    });
};

export default {
  signUpAction,
  signInAction,
  signOutAction,
};
