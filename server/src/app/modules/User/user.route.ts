import express from 'express';
import { UserControllers } from './user.controllers';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';
import validateRequest from '../../middleware/validationRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

router.get(
  '/me',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(UserValidation.getMeZodValidationSchema),
  UserControllers.getUserById,
);

router.put(
  '/update-info',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(UserValidation.userUpdateZodValidationSchema),
  UserControllers.updateUserInfo,
);

router.put(
  '/update-avatar',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(UserValidation.userAvatarUpdateZodValidationSchema),
  UserControllers.updateProfilePicture,
);

export const UserRoutes = router;
