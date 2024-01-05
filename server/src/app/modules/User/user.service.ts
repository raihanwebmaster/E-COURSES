import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IRegistration } from './user.interface';
import { User } from './user.model';
import { createActivationCode } from './user.utils';
import { sendMail } from '../../utils/sendMail';

const registrationUser = async (payload: IRegistration) => {
  // checking if the user is exist
  const { email} = payload;
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
    activationToken: activationToken.token
  };
};

export const UserServices = {
  registrationUser,
};
