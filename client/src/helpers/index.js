import { isNull, isEmpty, replace, toString, get } from 'lodash';
import { ACCESS_TOKEN } from '../utils/constants';
import messages from '../messages';

export const message = (messageKey, params) => {
  let message = get(messages, messageKey, null);

  if (isNull(message)) {
    return `[${messageKey}]`;
  }

  if (isEmpty(params)) {
    return message;
  }

  for (const [ key, value ] of Object.entries(params)) {
    message = replace(message, `{${key}}`, toString(value));
  }

  return message;
};

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);

export const removeAccessToken = () => localStorage.removeItem(ACCESS_TOKEN);

export const setAccessToken = (accessToken) => localStorage.setItem(ACCESS_TOKEN, accessToken);
