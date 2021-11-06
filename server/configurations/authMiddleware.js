import AuthService from '../services/authService';
import envConfig from './envConfig';
import { ErrorHandler } from '../error';

const withAuth = async (req, res, next) => {
  let token = req.get('access-token');

  if (!token) {
    next(new ErrorHandler(401, 'Unauthorized: No token provided'));
    return;
  }

  const AuthServiceInstance = new AuthService();
  const decoded = AuthServiceInstance.decodeJWTToken(token, envConfig.JWT_KEY);

  if (!decoded) {
    next(new ErrorHandler(401, 'Unauthorized: Invalid token'));
    return;
  }

  req.userId = decoded.id;
  next();
};

export default withAuth;
