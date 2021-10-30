import User from './models/User';
import { ErrorHandler } from '../error';

export default class UserDataAccess {
  createUser = async (userData) => {
    const { email } = userData;

    const existingUser = await User.findOne({ email });

    if (existingUser && existingUser.email === email) {
      throw new ErrorHandler(404, 'User with this email is already exists.');
    }

    return User.create(userData);
  };
};
