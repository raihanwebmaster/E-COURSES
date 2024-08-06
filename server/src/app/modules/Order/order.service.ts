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
import config from '../../config';
const stripe = require("stripe")(config.stripe_secret_key);

const createOderIntoDB = async (user: JwtPayload, orderData: any) => {
    if (orderData.paymentInfo) {
        if ("id" in orderData.paymentInfo) {
            const paymentIntentId = orderData.paymentInfo.id;
            const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

            if (paymentIntent.status !== "succeeded") {
                throw new AppError(httpStatus.BAD_REQUEST, 'Payment not authorized');
            }
        }
    }

    const isExistUser = await User.isUserExistsByEmail(user.email);
    if (!isExistUser) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    const courseExistInUser = isExistUser?.courses?.find((course: any) => course.courseId.toString() === orderData.courseId);
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

        // Create a new order within the session
        const newOrder = await Order.create([courseOrder], { session });

        // Update user's courses
        isExistUser.courses.push({ courseId: course._id });
        const updateUser = await User.findByIdAndUpdate(user.id, { courses: isExistUser.courses }, {
            new: true,
            runValidators: true,
            session
        });
        await redis.set(user.id, JSON.stringify(updateUser));

        // Create a notification within the session
        await Notification.create([{
            user: user.id,
            message: `You have a new order from ${user.email} for ${course.name} course`,
            title: 'New Order',
        }], { session });

        // Update course purchased count
        await Course.findByIdAndUpdate(course._id, { $inc: { purchased: 1 } }, { session });

        // Commit the transaction
        await session.commitTransaction();
        await session.endSession();

        // Fetch the updated course and populate necessary fields
        const updatedCourse = await Course.findById(course._id)
            .populate({
                path: 'reviews.user',
                select: '-password'
            })
            .populate({
                path: 'reviews.commentReplies.user',
                select: '-password'
            });

        if (!updatedCourse) {
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to fetch updated course');
        }

        // Cache the populated course
        await redis.set(course._id.toString(), JSON.stringify(updatedCourse), 'EX', 60 * 60 * 24 * 7); // Cache expires in 7 days

        const courses = await Course.find().select("-courseData.videoUrl  -courseData.videoPlayer -courseData.links -courseData.suggestion -courseData.questions");
        await redis.set("courses", JSON.stringify(courses));

        // Send order confirmation email
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

        return newOrder;
    } catch (error) {
        // Abort the transaction in case of error
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.BAD_REQUEST, 'Order failed');
    }
};


const getAllOrdersFromDB = async () => {
    const orders = await Order.aggregate([
        {
            $lookup: {
                from: 'courses',
                localField: 'courseId',
                foreignField: '_id',
                as: 'course'
            }
        },
        {
            $unwind: '$course'
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $unwind: '$user'
        },
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $project: {
                _id: 1,
                course: 1,
                user: 1,
                createdAt: 1,
                updatedAt: 1
            }
        }
    ]);
    return orders;

}

// send stripe pubnlisheable key
const getStripePublishableKey = async () => {
    const stripePublishableKey = config.stripe_publishable_key;
    return stripePublishableKey;
};

const createPayment = async (paymentInfo: any) => {
    const myPayment = await stripe.paymentIntents.create({
        amount: paymentInfo.amount,
        currency: "USD",
        description: "E-Courses course services",
        metadata: {
            company: "E-Courses"
        },
        automatic_payment_methods: {
            enabled: true,
        },
    });

    return {
        clientSecret: myPayment.client_secret
    };

}

export const OrderServices = {
    createOderIntoDB,
    getAllOrdersFromDB,
    getStripePublishableKey,
    createPayment
};
