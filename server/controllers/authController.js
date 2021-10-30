import AuthService from '../services/authService';
import envConfig from '../configurations/envConfig';
import UserService from '../services/userService';

export const signUp = async (req, res, next) => {
  try {
    const userData = req.body;
    const authServiceInstance = new AuthService();
    const userServiceInstance = new UserService();

    const newUser = await userServiceInstance.createUser(userData);
    const token = authServiceInstance.encodeJWTToken(newUser._id, envConfig.JWT_KEY, envConfig.TOKEN_TIME);

    return res
      .header('access-token', token)
      .status(201)
      .send({
        user: {
          id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
        },
      });
  } catch (error) {
    next(error);
  }
};
