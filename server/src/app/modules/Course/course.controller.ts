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


export const CourseControllers = {
  uploadCourse,
  updateCourse,
  getCourseWithOutPurchaseing,
  getAllCoursesWithOutPurchaseing
};
