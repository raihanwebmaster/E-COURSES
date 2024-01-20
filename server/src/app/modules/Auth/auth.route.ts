import express from 'express';
import validateRequest from '../../middleware/validationRequest';
import { AuthControllers } from './auth.controller';
import { UserValidation } from '../User/user.validation';
import { AuthValidation } from './auth.validation';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../middleware/auth';

const router = express.Router();

router.post(
  '/registration',
  validateRequest(UserValidation.userZodValidationSchema),
  AuthControllers.createRegistrationUser,
);

router.post(
  '/activation',
  validateRequest(AuthValidation.registrationActiveZodValidationSchema),
  AuthControllers.createRegisterUserActivation,
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/logout',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(AuthValidation.logoutZodValidationSchema),
  AuthControllers.logoutUser,
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.accessTokenValidationSchema),
  AuthControllers.updateAccessToken,
);

router.post(
  '/social',
  validateRequest(AuthValidation.socialAuthZodValidationSchema),
  AuthControllers.socialAuth,
);

router.put(
  '/change-password',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(AuthValidation.changePasswordZodValidationSchema),
  AuthControllers.changePassword,
);
export const AuthRoutes = router;
