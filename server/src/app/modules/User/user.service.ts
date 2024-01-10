/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IActivationRequest, ILoginUser, IUser } from './user.interface';
import { User } from './user.model';
import { createActivationCode, createToken, verifyToken } from './user.utils';
import { sendMail } from '../../utils/sendMail';
import config from '../../config';
import { redis } from '../../utils/redis';
import { JwtPayload } from 'jsonwebtoken';

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
  const user = await User.create({
    name,
    email,
    password,
  });
  return user;
};

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
    needsPasswordChange: user?.needsPasswordChange,
    user,
  };
};

const logout = async (
  user: JwtPayload,
  refreshToken: string,
  accessToken: string,
) => {
  // verifyToken(refreshToken, config.jwt_refresh_secret as string);
  const userId = user.id;
  redis.del(userId)
  return null;
};

export const UserServices = {
  registrationUser,
  registerUserActivation,
  loginUser,
  logout,
};
