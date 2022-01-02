import User from '../models/User';
import { ErrorHandler } from '../error';

class UserDataAccess {
  findUserByEmail = (email) => User.findOne({ email });

  createUser = async (userData) => {
    const { email } = userData;

    const existingRecord = await this.findUserByEmail(email);

    if (existingRecord) {
      throw new ErrorHandler(404, 'User with this email already exists.');
    }

    await User.create(userData);
  };
}

export default UserDataAccess;


