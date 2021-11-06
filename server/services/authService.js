import jwt from 'jsonwebtoken';

class AuthService {
  encodeJWTToken = (id, secret, expTime) => {
    return jwt.sign({ id }, secret, { expiresIn: `${expTime}h` });
  };

  decodeJWTToken = (token, secret) => {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      return null;
    }
  };
}

export default AuthService;
