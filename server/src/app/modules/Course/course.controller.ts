/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

const uploadCourse = catchAsync(async (req, res) => {
  const course  = await CourseServices.createCourseIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Course is uploaded succesfully',
    data: course,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const courseId = req.params.id;
  const course  = await CourseServices.updateCourseFromDB(courseId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is updated succesfully',
    data: course,
  });
});


export const CourseControllers = {
    uploadCourse,
    updateCourse
};
