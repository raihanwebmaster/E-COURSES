import express from 'express';
import validateRequest from '../../middleware/validationRequest';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controllers';

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

export const UserRoutes = router;
