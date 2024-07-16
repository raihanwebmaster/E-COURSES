/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { redis } from '../../utils/redis';
import { v2 as cloudinary } from 'cloudinary';
import { JwtPayload } from 'jsonwebtoken';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';

const getUserByIdFromDB = async (id: string) => {
  const user = await User.findById(id);
  return {
    user,
  };
};

const updateUserInfoIntoDB = async (userId: string, updateUserData: IUser) => {
  const { email } = updateUserData;
  const isEmailExist = await User.isUserExistsByEmail(email);
  if (isEmailExist) {
    throw new AppError(httpStatus.FORBIDDEN, 'Email already Exist');
  }
  const result = await User.findByIdAndUpdate(userId, updateUserData, {
    new: true,
    runValidators: true,
  });
  await redis.set(userId, JSON.stringify(result));
  return result;
};

const updateProfilePictureIntoDB = async (user: JwtPayload, avatar: string) => {

  const {avatar: UserAvatar} = await User.isUserExistsByEmail(user.email);

  if (UserAvatar?.public_id) {
    await cloudinary.uploader.destroy(UserAvatar?.public_id);
  }
  const { secure_url, public_id } = (await sendImageToCloudinary(avatar,"avatars", 150 )) as {
    secure_url: string;
    public_id: string;
  };
  
  const result = await User.findByIdAndUpdate(
    user.id,
    {
      avatar: {
        public_id: public_id,
        url: secure_url,
      },
    },
    {
      new: true,
      runValidators: true,
    },
  );
  await redis.set(user.id, JSON.stringify(result));
  return result;
};


const getAllUsersFromDB = async () => {
  const users = await User.find().sort({ createdAt: -1 });
  return users;
};

const updateUserRoleIntoDB = async (email: string, role: string) => {
  const updateUser = await User.findOneAndUpdate({ email }, { role }, { new: true });
  return updateUser;
};

const deleteUserFromDB = async (userId: string) => {
   const user = await User.findByIdAndDelete(userId);
   if (!user) {
     throw new AppError(httpStatus.NOT_FOUND, 'User not found');
   }
   await redis.del(userId);
   return user;
}

export const UserServices = {
  getUserByIdFromDB,
  updateUserInfoIntoDB,
  updateProfilePictureIntoDB,
  getAllUsersFromDB,
  updateUserRoleIntoDB,
  deleteUserFromDB,
};
