/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import sendReponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';

const createRegistrationUser = catchAsync(async (req, res, next) => {
  const result = await UserServices.registrationUser(req.body);
  sendReponse(res, {
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
sendReponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: `User Successfully Activated`,
  data: result,
});
})

export const UserControllers = {
  createRegistrationUser,
  createRegisterUserActivation,
};
