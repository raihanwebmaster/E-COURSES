/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { redis } from '../../utils/redis';
import { v2 as cloudinary } from 'cloudinary';
import { JwtPayload } from 'jsonwebtoken';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { User } from '../User/user.model';
import { Course } from '../Course/course.model';
import { Order } from './order.model';

const createOderIntoDB = async (user: JwtPayload, oderData: any) => {
    const isEmailExist = await User.isUserExistsByEmail(user.email);
    const courseExistInUser = isEmailExist?.courses?.find((course: any) => course.courseId === oderData.courseId);
    if (courseExistInUser) {
        throw new AppError(httpStatus.FORBIDDEN, 'Course already purchased');
    }
    const course = await Course.findById(oderData.courseId);
    if (!course) {
        throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
    }
    const courseOrder = {
        courseId: course._id,
        user: user.id,
    }
    const newOrder = await Order.create(courseOrder);
    return newOrder;


};

export const OrderServices = {
    createOderIntoDB
};
