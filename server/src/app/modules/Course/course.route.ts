import express from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middleware/validationRequest';
import { CourseValidation } from './course.validation';
import { CourseControllers } from './course.controller';

const router = express.Router();

router.post(
  '/create-course',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(CourseValidation.createCourseValidateionSchema),
  CourseControllers.uploadCourse,
);

export const CourseRoutes = router;
