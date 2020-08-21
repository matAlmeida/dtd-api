import jwt from 'jsonwebtoken';

import config from '../config';

export function generateToken(
  params: string | object | Buffer = {},
  expiration: string | number = '7 days'
) {
  return jwt.sign(params, config.env.API_JWT_KEY, {
    expiresIn: expiration
  });
}

export function decodeToken(token: string) {
  return new Promise((resolve) => {
    jwt.verify(token, config.env.API_JWT_KEY, (err, decoded) => {
      if (err) {
        resolve(null);
      }

      resolve(decoded);
    });
  });
}
