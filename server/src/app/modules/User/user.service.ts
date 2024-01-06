import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IActivationRequest, IUser } from './user.interface';
import { User } from './user.model';
import { createActivationCode, verifyToken } from './user.utils';
import { sendMail } from '../../utils/sendMail';
import config from '../../config';

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
      payload,
      activationToken,
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

export const UserServices = {
  registrationUser,
  registerUserActivation,
};
