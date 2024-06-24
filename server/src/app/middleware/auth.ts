import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../config';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';
import { redis } from '../utils/redis';
import { User } from '../modules/User/user.model';
import { TUserRole } from '../modules/Auth/auth.interface';
import { verifyToken } from '../modules/Auth/auth.utils';

// authenticated user
const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken;

    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // checking if the given token is valid
    const decoded = verifyToken(token, config.jwt_access_secret as string)

    const { role, iat, id } = decoded;

    // checking if the user is exist
    const user = await redis.get(id);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    const parsedUser = JSON.parse(user);
    // checking if the user is already deleted

    const isDeleted = parsedUser?.isDeleted;

    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }

    // checking if the user is blocked
    const userStatus = parsedUser?.status;

    if (userStatus === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }

    if (
      parsedUser.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        parsedUser.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized  hi!',
      );
    }

    // Combine decoded and parsedUser into one object and attach to req.user
    req.user = {
      ...decoded,
      ...parsedUser,
    };
    next();
  });
};

export default auth;
