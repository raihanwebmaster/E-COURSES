/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';
import config from '../../config';
import sendResponse from '../../utils/sendResponse';

const createRegistrationUser = catchAsync(async (req, res, next) => {
  const result = await UserServices.registrationUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Please check your email: ${result.email} to activate your account!`,
    data: {
      activationToken: result.activationToken,
    },
  });
});

const createRegisterUserActivation = catchAsync(async (req, res, next) => {
  const result = await UserServices.registerUserActivation(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `User Successfully Activated`,
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await UserServices.loginUser(req.body);
  const { refreshToken, accessToken, needsPasswordChange, user } = result;
  const jwtAccessExpiresIn = config?.jwt_access_expires_in;
  const accessTokenExpire = jwtAccessExpiresIn
    ? parseInt(jwtAccessExpiresIn.match(/\d+/)?.[0] || '0', 10)
    : 0;
  const jwtRefreshExpiresIn = config?.jwt_refresh_expires_in;
  const refreshTokenExpire = jwtRefreshExpiresIn
    ? parseInt(jwtRefreshExpiresIn.match(/\d+/)?.[0] || '0', 10)
    : 0;

  res.cookie('accessToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    expires: new Date(Date.now() + accessTokenExpire * 1000),
    maxAge: accessTokenExpire * 1000,
    httpOnly: true,
    sameSite: 'lax',
  });

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    expires: new Date(Date.now() + refreshTokenExpire * 1000),
    maxAge: refreshTokenExpire * 1000,
    httpOnly: true,
    sameSite: 'lax',
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in succesfully!',
    data: {
      user,
      accessToken,
      needsPasswordChange,
    },
  });
});

const logout = catchAsync(async (req, res) => {
  const { refreshToken, accessToken } = req.cookies;
  await UserServices.logout(req.user, refreshToken, accessToken);
  res.cookie('accessToken', '', {
    maxAge: 1,
  });

  res.cookie('refreshToken', '', {
    maxAge: 1,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Logged out successfully',
    data: null,
  });
});

export const UserControllers = {
  createRegistrationUser,
  createRegisterUserActivation,
  loginUser,
  logout,
};
