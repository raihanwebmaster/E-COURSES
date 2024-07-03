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
    data: {
      user,
      accessToken: req.cookies.accessToken,
    },
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

const getAllUsers = catchAsync(async (req, res) => {
  const users = await UserServices.getAllUsersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All users are retrieved successfully',
    data: users,
  });
});

const updateUserRole = catchAsync(async (req, res) => {
  const { id, role } = req.body;
  const result = await UserServices.updateUserRoleIntoDB(id, role);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User role is updated successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await UserServices.deleteUserFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is deleted successfully',
    data: user,
  });
});

export const UserControllers = {
  getUserById,
  updateUserInfo,
  updateProfilePicture,
  getAllUsers,
  updateUserRole,
  deleteUser
};
