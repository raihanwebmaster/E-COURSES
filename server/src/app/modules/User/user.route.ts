import express from 'express';
import validateRequest from '../../middleware/validationRequest';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controllers';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post(
  '/registration',
  validateRequest(UserValidation.userZodValidationSchema),
  UserControllers.createRegistrationUser,
);

router.post(
  '/activation',
  validateRequest(UserValidation.registrationActiveZodValidationSchema),
  UserControllers.createRegisterUserActivation,
);

router.post(
  '/login',
  validateRequest(UserValidation.loginZodValidationSchema),
  UserControllers.loginUser,
);
router.get(
  '/logout',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(UserValidation.logoutZodValidationSchema),
  UserControllers.logout,
);

export const UserRoutes = router;
