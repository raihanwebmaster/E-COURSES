import express from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middleware/validationRequest';
import { CourseValidation } from './course.validation';
import { CourseControllers } from './course.controller';

const router = express.Router();

router.post(
  '/create-course',
  auth(USER_ROLE.admin),
  validateRequest(CourseValidation.createCourseValidateionSchema),
  CourseControllers.uploadCourse,
);

router.put(
  '/update-course/:id',
  auth(USER_ROLE.admin),
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseControllers.updateCourse,
)

router.get(
  '/get-course-without-purchaseing/:id',
  // auth(USER_ROLE.user, USER_ROLE.admin),
  CourseControllers.getCourseWithOutPurchaseing,
)

router.get(
  '/get-all-courses-without-purchaseing',
  // auth(USER_ROLE.user, USER_ROLE.admin),
  CourseControllers.getAllCoursesWithOutPurchaseing,
)

router.get(
  '/get-course-by-user/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  CourseControllers.getCourseByUser,
)

router.put(
  '/add-question',
  auth(USER_ROLE.user),
  validateRequest(CourseValidation.addQuestionValidationSchema),
  CourseControllers.addQuestion,
)

router.put(
  '/add-answer',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(CourseValidation.addAnswerValidationSchema),
  CourseControllers.addAnswer,
)

router.put(
  '/add-review/:id',
  auth(USER_ROLE.user),
  validateRequest(CourseValidation.addReviewValidationSchema),
  CourseControllers.addReview,
)

router.put(
  '/add-reply-review',
  auth(USER_ROLE.admin),
  validateRequest(CourseValidation.addReplyReviewValidationSchema),
  CourseControllers.addReplyReview,
)

router.get(
  '/get-all-courses',
  auth(USER_ROLE.admin),
  CourseControllers.getAllCourses,
)

router.delete('/delete-course/:id', auth(USER_ROLE.admin), CourseControllers.deleteCourse);

router.post(
  '/getVdoCipherOTP',
  // auth(USER_ROLE.admin),
  validateRequest(CourseValidation.generateVideoUrlValidationSchema),
  CourseControllers.generateVideoUrl,
)


export const CourseRoutes = router;
