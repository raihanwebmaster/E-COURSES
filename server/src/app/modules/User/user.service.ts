/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from './user.model';

const getUserById = async (id: string) => {
  const user = await User.findById(id);
  return {
    user,
  };
};


export const UserServices = {
  getUserById,
};
