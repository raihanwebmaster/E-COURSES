import config from '../../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUser } from '../User/user.interface';
import { IActivationToken, ITokenOption } from './auth.interface';

export const createToken = (
  jwtPayload: { id?: string; activationCode?: string; password?: string, name: string, email: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const createActivationCode = (user: IUser): IActivationToken => {
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
const calculateAccessTokenExpiration = (jwtAccessExpiresIn: string) => {
  return jwtAccessExpiresIn
    ? parseInt(jwtAccessExpiresIn.match(/\d+/)?.[0] || '0', 10)
    : 0;
};

const accessTokenExpire = calculateAccessTokenExpiration(config?.jwt_access_expires_in as string)

const refreshTokenExpire = calculateAccessTokenExpiration(config?.jwt_refresh_expires_in as string)

export const accessTokenOptions: ITokenOption = {
  expires: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000 * 24),
  maxAge: accessTokenExpire * 60 * 60 * 1000 * 24,
  httpOnly: true,
  sameSite: 'lax',
  secure: config.NODE_ENV === 'production',
}

export const refreshTokenOptions: ITokenOption = {
  expires: new Date(Date.now() + refreshTokenExpire * 60 * 60 * 1000 * 24),
  maxAge: refreshTokenExpire * 60 * 60 * 1000 * 24,
  httpOnly: true,
  sameSite: 'lax',
  secure: config.NODE_ENV === 'production',
}