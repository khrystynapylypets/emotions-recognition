import jwt from 'jsonwebtoken';

class AuthService {
  encodeJWTToken = (id, secret, expTime) => {
    return jwt.sign({ id }, secret, { expiresIn: `${expTime}h` });
  };
}

export default AuthService;
