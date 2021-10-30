import bcrypt from 'bcryptjs';
import { trim } from 'lodash';
import UserDataAccess from '../dataAccess/userDataAccess';
import { ErrorHandler } from '../error';
import { saltRounds, MIN_PASSWORD, regex } from '../utils/constants';

export default class UserService {
  constructor() {
    this.userDataAccessInstance = new UserDataAccess();
  }

  hashPassword = (originalPassword) => {
    const salt = bcrypt.genSaltSync(saltRounds);

    return bcrypt.hashSync(originalPassword, salt);
  };

  isEmpty = (value) => !value || !trim(value);

  validateUserData = (userData) => {
    const { firstName, lastName, email, password } = userData;

    if (this.isEmpty(firstName) || this.isEmpty(lastName) || this.isEmpty(email) || this.isEmpty(password)) {
      throw new ErrorHandler(404, 'All values are required.');
    }

    if (password.length < MIN_PASSWORD) {
      throw new ErrorHandler(404, `Password should have at least ${MIN_PASSWORD} characters.`);
    }

    if (!(regex['email'].test(email))) {
      throw new ErrorHandler(404, 'Email is invalid.');
    }
  };

  createUser = (userData) => {
    const { password } = userData;

    this.validateUserData(userData);
    const hashedPassword = this.hashPassword(password);

    return this.userDataAccessInstance.createUser({
      ...userData,
      password: hashedPassword,
    });
  };
}
