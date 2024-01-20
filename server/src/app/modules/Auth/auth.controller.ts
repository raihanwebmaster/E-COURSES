/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import { accessTokenOptions, refreshTokenOptions } from './auth.utils';

const createRegistrationUser = catchAsync(async (req, res, next) => {
  const result = await AuthServices.registrationUser(req.body);
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
  const result = await AuthServices.registerUserActivation(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `User Successfully Activated`,
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken, user } = result;

  res.cookie('accessToken', accessToken, accessTokenOptions);
  res.cookie('refreshToken', refreshToken, refreshTokenOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in succesfully!',
    data: {
      user,
      accessToken,
    },
  });
});

const logoutUser = catchAsync(async (req, res) => {
  await AuthServices.logoutUser(req.user);
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

const updateAccessToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.updateAccessToken(refreshToken);
  const { access_Token } = result;
  res.cookie('accessToken', access_Token, accessTokenOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update accessToken successfully',
    data: {
      accessToken: access_Token,
    },
  });
});

const socialAuth = catchAsync(async (req, res) => {
  const user = req.body;
  const result = await AuthServices.socialAuth(user);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: `User Created Successfully`,
    data: result,
  });
});

export const AuthControllers = {
  createRegistrationUser,
  createRegisterUserActivation,
  loginUser,
  logoutUser,
  updateAccessToken,
  socialAuth,
};
