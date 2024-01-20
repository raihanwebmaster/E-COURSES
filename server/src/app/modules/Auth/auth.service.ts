/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { sendMail } from '../../utils/sendMail';
import { User } from '../User/user.model';
import { createActivationCode, createToken, verifyToken } from './auth.utils';
import { IUser } from '../User/user.interface';
import { IActivationRequest, ILoginUser, TSocialAuth } from './auth.interface';
import config from '../../config';
import { redis } from '../../utils/redis';
import { JwtPayload } from 'jsonwebtoken';

// registration user
const registrationUser = async (payload: IUser) => {
  // checking if the user is exist
  const { email } = payload;
  const isEmailExist = await User.findOne({ email });
  if (isEmailExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Email  already exist !');
  }

  const activationToken = createActivationCode(payload);
  await sendMail({
    email,
    subject: 'Activate your account',
    template: 'activation-mail.ejs',
    data: {
      user: payload,
      activationCode: activationToken.activationCode,
    },
  });

  return {
    email,
    activationToken: activationToken.token,
  };
};

// active user
const registerUserActivation = async (payload: IActivationRequest) => {
  const { activation_token, activation_code } = payload;
  const decoded = verifyToken(
    activation_token,
    config.jwt_code_secret as string,
  );
  if (decoded.activationCode !== activation_code) {
    throw new AppError(httpStatus.FORBIDDEN, 'Invalid activation code');
  }
  const { name, email, password } = decoded;

  const isEmailExist = await User.findOne({ email });
  if (isEmailExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Email  already exist !');
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  return user;
};

//login user
const loginUser = async (payload: ILoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //create token and sent to the  client

  const jwtPayload = {
    id: user._id.toString(),
    password: user.password,
    email: user.email,
    name: user.name,
    role: user.role,
  };

  //upload session to redis
  redis.set(user._id.toString(), JSON.stringify(user) as string);

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    user,
  };
};

// logout user
const logoutUser = async (user: JwtPayload) => {
  const userId = user.id;
  redis.del(userId);
  return null;
};

// update access token
const updateAccessToken = async (refreshToken: string) => {
  const decoded = verifyToken(
    refreshToken,
    config.jwt_refresh_secret as string,
  );
  const session = await redis.get(decoded.id as string);
  if (!session) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Could not refresh token');
  }
  const user = JSON.parse(session);
  const jwtPayload = {
    id: user._id.toString(),
    password: user.password,
    email: user.email,
    name: user.name,
    role: user.role,
  };
  const access_Token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  return {
    access_Token,
  };
};

//social auth
const socialAuth = async (userDetails: TSocialAuth) => {
  const { email, name, avatar, password } = userDetails;
  const user = await User.isUserExistsByEmail(email);
  if (user) {
    throw new AppError(httpStatus.FORBIDDEN, 'This Email  already exist !');
  }
  const newUser = await User.create({
    email,
    name,
    avatar,
    password,
  });

  return {
    newUser,
  };
};

export const AuthServices = {
  registrationUser,
  registerUserActivation,
  loginUser,
  logoutUser,
  updateAccessToken,
  socialAuth
};
