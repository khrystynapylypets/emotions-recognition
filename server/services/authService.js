import jwt from 'jsonwebtoken';

export default class AuthService {
  encodeJWTToken = (id, secret, expTime) => {
    return jwt.sign({ id }, secret, { expiresIn: `${expTime}h` });
  };
}
