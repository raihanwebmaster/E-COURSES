/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

const uploadCourse = catchAsync(async (req, res) => {
  const course = await CourseServices.createCourseIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Course is uploaded succesfully',
    data: course,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const courseId = req.params.id;
  const course = await CourseServices.updateCourseFromDB(courseId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is updated succesfully',
    data: course,
  });
});

const getCourseWithOutPurchaseing = catchAsync(async (req, res) => {
  const courseId = req.params.id;
  const courses = await CourseServices.getCourseWithOutPurchaseingFromDB(courseId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is fetched succesfully',
    data: courses,
  });
});


const getAllCoursesWithOutPurchaseing = catchAsync(async (req, res) => {
  const courses = await CourseServices.getAllCoursesWithOutPurchaseingFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courses are fetched succesfully',
    data: courses,

  });
});


const getCourseByUser = catchAsync(async (req, res) => {
  const userCourseList = req.user?.courses;
  const courseId = req.params.id;
  const courses = await CourseServices.getCourseByUserFromDB(courseId, userCourseList);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courses are fetched succesfully',
    data: courses,
  });
});

const addQuestion = catchAsync(async (req, res) => {
  const user = req.user;
  const questionData = req.body;
  const course = await CourseServices.addQuestionIntoCourse(user, questionData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Question is added succesfully',
    data: course,
  });
});

const addAnswer = catchAsync(async (req, res) => {
  const user = req.user;
  const answerData = req.body;
  const course = await CourseServices.addAnswerIntoCourse(user, answerData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Answer is added succesfully',
    data: course,
  });
});

const addReview = catchAsync(async (req, res) => {
  const user = req.user;
  const reviewData = req.body;
  const courseId = req.params.id;
  const course = await CourseServices.addReviewIntoCourse(user, courseId, reviewData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review is added succesfully',
    data: course,
  });
});

const addReplyReview = catchAsync(async (req, res) => {
  const user = req.user;
  const replyData = req.body;
  const course = await CourseServices.addReplyReviewIntoCourse(user,replyData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reply is added succesfully',
    data: course,
  });
});


export const CourseControllers = {
  uploadCourse,
  updateCourse,
  getCourseWithOutPurchaseing,
  getAllCoursesWithOutPurchaseing,
  getCourseByUser,
  addQuestion,
  addAnswer,
  addReview,
  addReplyReview
};
