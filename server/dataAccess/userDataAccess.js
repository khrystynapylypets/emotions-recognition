import User from './models/User';
import { ErrorHandler } from '../error';

class UserDataAccess {
  findUserByEmail = (email) => User.findOne({ email });

  createUser = async (userData) => {
    const { email } = userData;

    const existingUser = await this.findUserByEmail(email);

    if (existingUser) {
      throw new ErrorHandler(404, 'User with this email already exists.');
    }

    return User.create(userData);
  };
}

export default UserDataAccess;
