/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { redis } from '../../utils/redis';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../User/user.model';
import { Course } from '../Course/course.model';
import { Order } from './order.model';
import { sendMail } from '../../utils/sendMail';
import { Notification } from '../Notification/notification.model';
import mongoose from 'mongoose';
import { IOrder } from './order.interface';

const createOderIntoDB = async (user: JwtPayload, orderData: IOrder) => {
    const isEmailExist = await User.isUserExistsByEmail(user.email);
    const courseExistInUser = isEmailExist?.courses?.find((course: any) => course.courseId.toString() === orderData.courseId);
    if (courseExistInUser) {
        throw new AppError(httpStatus.FORBIDDEN, 'Course already purchased');
    }
    const course = await Course.findById(orderData.courseId);
    if (!course) {
        throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
    }
    // Start a session
    const session = await mongoose.startSession();
    try {
        // Start a transaction
        session.startTransaction();

        const courseOrder = {
            courseId: course._id,
            user: user.id,
            paymentInfo: orderData.paymentInfo,
        };
        // Pass the session to the create operation
        const newOrder = await Order.create([courseOrder], { session });

        user.courses.push({ courseId: course._id });
        await User.findByIdAndUpdate(user.id, { courses: user.courses }, { session });

        // Pass the session to the create operation
        await Notification.create([{
            user: user.id,
            message: `You have a new order from ${user.email} for ${course.name} course`,
            title: 'New Order',
        }], { session });

        // Commit the transaction
        await session.commitTransaction();

        const mailData = {
            order: {
                _id: course._id.toString().slice(0, 6),
                name: course.name,
                price: course.price,
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            }
        };
        await sendMail({
            email: user.email,
            subject: 'Order Confirmation',
            template: 'order-confirmation.ejs',
            data: mailData
        });

        // End the session
        await session.endSession();

        return newOrder;
    } catch (error) {
        // Abort the transaction in case of error
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.BAD_REQUEST, 'Order failed');
    }
};

export const OrderServices = {
    createOderIntoDB
};
