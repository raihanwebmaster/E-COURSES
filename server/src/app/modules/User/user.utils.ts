import config from '../../config';
import { IActivationToken, IRegistration } from './user.interface';
import jwt from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { activationCode: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const createActivationCode = (user: IRegistration): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  const jwtPayload = {
    name: user.name,
    email: user.email,
    password: user.password,
    activationCode: activationCode,
  };
  const activationToken = createToken(
    jwtPayload,
    config.jwt_code_secret as string,
    '5min',
  );
  return {
    token: activationToken,
    activationCode,
  };
};
