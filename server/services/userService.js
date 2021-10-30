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

  comparePassword = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);

  isEmpty = (value) => !value || !trim(value);

  isEmailValid = (value) => !this.isEmpty(value) && regex['email'].test(value);

  isPasswordValid = (value) => !this.isEmpty(value) && value.length >= MIN_PASSWORD;

  validateEmailAndPassword = (email, password) => {
    if (!this.isEmailValid(email)) {
      throw new ErrorHandler(404, 'Email is invalid.');
    }

    if (!this.isPasswordValid(password)) {
      throw new ErrorHandler(404, `Password should have at least ${MIN_PASSWORD} characters.`);
    }
  };

  validateUserData = ({ firstName, lastName, email, password }) => {
    if (this.isEmpty(firstName) || this.isEmpty(lastName)) {
      throw new ErrorHandler(404, 'First name and last name are required.');
    }

    this.validateEmailAndPassword(email, password);
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

  findUser = async (userData) => {
    const { email, password } = userData;

    this.validateEmailAndPassword(email, password);

    const existingUser = await this.userDataAccessInstance.findUserByEmail(email);

    if (!existingUser) {
      throw new ErrorHandler(404, 'User with this email does not exist.');
    }

    const isPasswordMatched = this.comparePassword(password, existingUser.password);

    if (!isPasswordMatched) {
      throw new ErrorHandler(404, 'Password is not valid.');
    }

    return existingUser;
  }
}
