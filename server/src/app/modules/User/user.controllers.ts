/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';

const getUserById = catchAsync(async (req, res) => {
  const { id } = req.user;
  const { user } = await UserServices.getUserByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved succesfully',
    data: user,
  });
});

const updateUserInfo = catchAsync(async (req, res) => {
  const { id } = req.user;
  const user = req.body;
  const result = await UserServices.updateUserInfoIntoDB(id, user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is update succesfully',
    data: result,
  });
});

const updateProfilePicture = catchAsync(async (req, res) => {
  const {avatar} = req.body;
  const result = await UserServices.updateProfilePictureIntoDB(req.user, avatar);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Avatar update succesfully',
    data: result,
  });
});

export const UserControllers = {
  getUserById,
  updateUserInfo,
  updateProfilePicture
};
