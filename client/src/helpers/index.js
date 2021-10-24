import { isNull, isEmpty, replace, toString, get } from 'lodash';
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

export const getAccessToken = () => null;
