import { trim } from 'lodash';
import { message } from '../helpers';
import { regex, MIN_PASSWORD } from './constants';

const checkIfValueIsEmpty = (value) => {
  if (value && trim(value)) {
    return null;
  }

  return message('auth.errors.required');
};

export const authValidator = {
  'name': checkIfValueIsEmpty,
  'email': (value) => {
    const errorMessage = checkIfValueIsEmpty(value);

    if (errorMessage) {
      return errorMessage;
    }

    if (!(regex['email'].test(value))) {
      return message('auth.errors.emailError');
    }
  },
  'password': (value) => {
    const errorMessage = checkIfValueIsEmpty(value);

    if (errorMessage) {
      return errorMessage;
    }

    if (value.length < MIN_PASSWORD) {
      return message('auth.errors.passwordError');
    }
  },
};
