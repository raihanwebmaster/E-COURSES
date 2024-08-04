/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { destroyImage } from '../../utils/deleteImageIntoCloudinary';
import { redis } from '../../utils/redis';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { Course } from './course.model';
import { JwtPayload } from 'jsonwebtoken';
import { IAddAnswerData, IAddQuestionData, IAddReplyReviewData, IAddReviewData } from './course.interface';
import { sendMail } from '../../utils/sendMail';
import { IUser } from '../User/user.interface';
import { Notification } from '../Notification/notification.model';
import mongoose from 'mongoose';
import axios from 'axios';
import config from '../../config';

const createCourseIntoDB = async (course: any) => {
    const thumbnail = course.thumbnail
    if (thumbnail) {
        const { secure_url, public_id } = (await sendImageToCloudinary(thumbnail, "courses",)) as {
            secure_url: string;
            public_id: string;
        };
        course.thumbnail = {
            public_id: public_id,
            url: secure_url,
        }
    }
    const createCourese = await Course.create(course)
    const courses = await Course.find().select("-courseData.videoUrl  -courseData.videoPlayer -courseData.links -courseData.suggestion -courseData.questions");
    await redis.set("courses", JSON.stringify(courses));
    return createCourese;
};
const updateCourseFromDB = async (couserId: string, course: any) => {
    const thumbnail = course.thumbnail
    const courseData = await Course.findById(couserId) as any;
    if (courseData && thumbnail && !thumbnail.startsWith("https")) {
        // await cloudinary.v2.uploader.destroy(courseData.thumbnail.public_id);
        await destroyImage(courseData.thumbnail.public_id);

        const { secure_url, public_id } = (await sendImageToCloudinary(thumbnail, "courses",)) as {
            secure_url: string;
            public_id: string;
        };
        course.thumbnail = {
            public_id: public_id,
            url: secure_url,
        };
    }

    if (courseData && thumbnail.startsWith("https")) {
        course.thumbnail = {
            public_id: courseData.thumbnail.public_id,
            url: courseData.thumbnail.url,
        };
    }

    const updatedCourse = await Course.findByIdAndUpdate(couserId, course, { new: true })
        .populate({
            path: 'reviews.user',
            select: '-password'
        })
        .populate({
            path: 'reviews.commentReplies.user',
            select: '-password'
        });

    await redis.set(couserId, JSON.stringify(updatedCourse), 'EX', 60 * 60 * 24 * 7);
    return updatedCourse;
};

const getCourseWithOutPurchaseingFromDB = async (courseId: string) => {
    const isCacheExist = await redis.get(courseId);
    if (isCacheExist) {
        return JSON.parse(isCacheExist);
    }
    const course = await Course.findById(courseId).select("-courseData.videoUrl  -courseData.videoPlayer -courseData.links -courseData.suggestion -courseData.questions")
        .populate({
            path: 'reviews.user',
            select: '-password'
        })
        .populate({
            path: 'reviews.commentReplies.user',
            select: '-password'
        });;
    await redis.set(courseId, JSON.stringify(course), 'EX', 60 * 60 * 24 * 7); // 7 days
    return course;
};

const getAllCoursesWithOutPurchaseingFromDB = async () => {
    const isCacheExist = await redis.get("courses");
    if (isCacheExist) {
        return JSON.parse(isCacheExist);
    }
    const courses = await Course.find().select("-courseData.videoUrl  -courseData.videoPlayer -courseData.links -courseData.suggestion -courseData.questions");
    await redis.set("courses", JSON.stringify(courses));
    return courses;
};

const getCourseByUserFromDB = async (courseId: string, userCourseList: string[], user: any) => {
    if (user.role !== 'admin') {
        const courseExist = userCourseList?.find((course: any) => course.courseId.toString() === courseId);
        if (!courseExist) {
            throw new AppError(httpStatus.NOT_FOUND, 'You are not eligible to access this course');
        }
    }
    const course = await Course.findById(courseId).populate({
        path: 'courseData.questions.user',
        model: 'User',
        select: '-password'
    }).populate({
        path: 'courseData.questions.questionReplies.user',
        model: 'User',
        select: '-password'
    });
    const content = course?.courseData;
    return content;
};

const addQuestionIntoCourse = async (user: JwtPayload, questionData: IAddQuestionData) => {
    const { courseId, contentId, question } = questionData;
    const course = await Course.findById(courseId);
    if (!course) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Course not found');
    }
    const courseContent = course?.courseData?.find((content: any) => content._id.toString() === contentId);
    if (!courseContent) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Course content not found');
    }
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const newQuestion = {
            user: user.id,
            question,
            questionReplies: []
        };
        courseContent.questions.push(newQuestion);
        await course.save({ session });
        await Notification.create([{
            user: user.id,
            message: `You have a new queston from ${user.name} for ${courseContent.title} course content`,
            title: 'New Question Received',
        }], { session });
        await session.commitTransaction();
        const updatedCourse = await Course.findById(courseId)
            .populate({
                path: 'reviews.user',
                select: '-password'
            })
            .populate({
                path: 'reviews.commentReplies.user',
                select: '-password'
            });
        await redis.set(courseId, JSON.stringify(updatedCourse), 'EX', 60 * 60 * 24 * 7);
        return updatedCourse;
    } catch (error) {
        await session.abortTransaction();
        throw new AppError(httpStatus.BAD_REQUEST, 'Question failed');
    } finally {
        session.endSession();
    }

};

const addAnswerIntoCourse = async (user: JwtPayload, questionData: IAddAnswerData) => {
    const { courseId, contentId, questionId, answer } = questionData;
    const course = await Course.findById(courseId).populate({
        path: 'courseData.questions.user',
        model: 'User'
    }).exec();
    if (!course) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Course not found');
    }

    const courseContent = course?.courseData?.find((content: any) => content._id.toString() === contentId);
    if (!courseContent) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Course content not found');
    }
    const question = courseContent.questions.find((question: any) => question._id.toString() === questionId);
    if (!question) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Question not found');
    }
    const newAnswer = {
        user: user._id,
        answer,
    }

    question.questionReplies = question.questionReplies ?? [];
    question.questionReplies.push(newAnswer);

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        await course.save({ session });
        if (user.id !== question.user._id.toString()) {
            const questionUser = question.user as unknown as IUser;
            // Assuming sendMail does not interact with MongoDB and thus does not need to be part of the transaction
            // If it does interact with MongoDB, you would need to include those operations within the transaction as well
            const data = {
                name: questionUser?.name,
                title: question.question,
            };
            await sendMail({
                email: questionUser.email,
                subject: 'Question Reply',
                template: 'question-reply.ejs',
                data
            });
        } else {
            await Notification.create([{
                user: user.id,
                message: `You have a new answer from ${user.name} for ${courseContent.title} course content`,
                title: 'New Question Received',
            }], { session });
        }

        await session.commitTransaction();
        const updatedCourse = await Course.findById(courseId)
            .populate({
                path: 'reviews.user',
                select: '-password'
            })
            .populate({
                path: 'reviews.commentReplies.user',
                select: '-password'
            }); // Added population of reviews and commentReplies

        await redis.set(courseId, JSON.stringify(updatedCourse), 'EX', 60 * 60 * 24 * 7); // Added updating the specific course cache

        return updatedCourse;
    } catch (error) {
        await session.abortTransaction();
        throw new AppError(httpStatus.BAD_REQUEST, "answer failed");
    } finally {
        session.endSession();
    }

};


const addReviewIntoCourse = async (user: JwtPayload, courseId: string, reviewData: IAddReviewData) => {
    const userCourseList = user.courses;
    const courseExist = userCourseList?.find((course: any) => course.courseId.toString() === courseId);
    if (!courseExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'You are not eligible to access this course');
    }
    const course = await Course.findById(courseId);
    if (!course) {
        throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
    }
    const { rating, review } = reviewData;
    const newReview = {
        user: user.id,
        rating,
        comment: review,
    }

    course?.reviews.push(newReview);

    let avg = 0;
    course?.reviews.forEach((review: any) => {
        avg += review.rating;
    });
    course.ratings = avg / (course?.reviews.length ?? 0);

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        const updateCourse = await course?.save({ session });
        await redis.set(courseId, JSON.stringify(updateCourse), 'EX', 60 * 60 * 24 * 7); // 7 days

        await Notification.create([{
            user: user.id,
            message: `${user.name} has given a review in ${course.name} course`,
            title: 'New Review Received',
        }], { session });
        await session.commitTransaction();
        const updatedCourse = await Course.findById(courseId)
            .populate({
                path: 'reviews.user',
                select: '-password'
            })
            .populate({
                path: 'reviews.commentReplies.user',
                select: '-password'
            }); // Added population of reviews and commentReplies

        await redis.set(courseId, JSON.stringify(updatedCourse), 'EX', 60 * 60 * 24 * 7); // Added updating the specific course cache

        return updatedCourse;

    } catch (error) {
        await session.abortTransaction();
        throw new AppError(httpStatus.BAD_REQUEST, 'Review failed');
    } finally {
        session.endSession();
    }
}

const addReplyReviewIntoCourse = async (user: JwtPayload, replyData: IAddReplyReviewData) => {
    const { courseId, reviewId, comment } = replyData;
    const course = await Course.findById(courseId).populate({
        path: 'reviews.user',
        model: 'User'
    }).exec();
    if (!course) {
        throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
    }
    const review = course.reviews.find((review: any) => review._id.toString() === reviewId);
    if (!review) {
        throw new AppError(httpStatus.NOT_FOUND, 'Review not found');
    }
    const newReply = {
        user: user.id,
        answer: comment,
    }
    review.commentReplies = review.commentReplies ?? [];
    review.commentReplies.push(newReply);

    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        await course.save({ session });

        if (user.id !== review.user.toString()) {
            const reviewUser = review.user as unknown as IUser;
            const data = {
                name: reviewUser?.name,
                title: review.comment,
            };
            await sendMail({
                email: reviewUser.email,
                subject: 'Review Reply',
                template: 'review-reply.ejs',
                data
            });
        } else {
            await Notification.create([{
                user: user.id,
                message: `You have a new reply from ${user.name} for your review in ${course.name} course`,
                title: 'New Review Reply Received',
            }], { session });
        }

        await session.commitTransaction();
        
        const updatedCourse = await Course.findById(courseId)
            .populate({
                path: 'reviews.user',
                select: '-password'
            })
            .populate({
                path: 'reviews.commentReplies.user',
                select: '-password'
            }); // Added population of reviews and commentReplies

        await redis.set(courseId, JSON.stringify(updatedCourse), 'EX', 60 * 60 * 24 * 7); // Added updating the specific course cache

        return updatedCourse;
    } catch (error) {
        await session.abortTransaction();
        throw new AppError(httpStatus.BAD_REQUEST, "Reply failed");
    } finally {
        session.endSession();
    }
};



const getAllCoursesFromDB = async () => {
    // const isCacheExist = await redis.get("allCourses");
    // if (isCacheExist) {
    //     return JSON.parse(isCacheExist);
    // }
    const courses = await Course.find()
        .sort({ createdAt: -1 })

    // await redis.set("allCourses", JSON.stringify(courses));
    return courses;
};


const deleteCourseFromDB = async (courseId: string) => {
    const course = await Course.findById(courseId);
    if (!course) {
        throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
    }

    if (course.purchased !== 0) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Cannot delete a course that has been purchased');
    }

    await Course.findByIdAndDelete(courseId);
    await redis.del(courseId);

    return course;
};

const generateVideoUrlWithVdoCipher = async (videoId: string) => {
    try {
        const response = await axios.post(
            `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
            { ttl: 300 },
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Apisecret ${config.vdocipher_api_key}`,
                },
            }
        );
        return response.data;
    } catch (error: any) {
        throw new AppError(httpStatus.BAD_REQUEST, error.message);
    }


}


export const CourseServices = {
    createCourseIntoDB,
    updateCourseFromDB,
    getCourseWithOutPurchaseingFromDB,
    getAllCoursesWithOutPurchaseingFromDB,
    getCourseByUserFromDB,
    addQuestionIntoCourse,
    addAnswerIntoCourse,
    addReviewIntoCourse,
    addReplyReviewIntoCourse,
    getAllCoursesFromDB,
    deleteCourseFromDB,
    generateVideoUrlWithVdoCipher
};
