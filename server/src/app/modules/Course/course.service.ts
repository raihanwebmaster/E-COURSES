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
import { IAddAnswerData, IAddQuestionData } from './course.interface';
import { title } from 'process';
import { sendMail } from '../../utils/sendMail';
import { IUser } from '../User/user.interface';

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
    return createCourese;
};
const updateCourseFromDB = async (couserId: string, course: any) => {
    const thumbnail = course.thumbnail
    if (thumbnail) {
        await destroyImage(thumbnail.public_id);
        const { secure_url, public_id } = (await sendImageToCloudinary(thumbnail, "courses",)) as {
            secure_url: string;
            public_id: string;
        };
        course.thumbnail = {
            public_id: public_id,
            url: secure_url,
        }
    }
    const uploadCourse = await Course.findByIdAndUpdate(couserId, course, { new: true });
    return uploadCourse;
};

const getCourseWithOutPurchaseingFromDB = async (courseId: string) => {
    const isCacheExist = await redis.get(courseId);
    if (isCacheExist) {
        return JSON.parse(isCacheExist);
    }
    const courses = await Course.findById(courseId).select("-courseData.videoUrl  -courseData.videoPlayer -courseData.links -courseData.suggestion -courseData.questions");
    await redis.set(courseId, JSON.stringify(courses));
    return courses;
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

const getCourseByUserFromDB = async (courseId: string, userCourseList: string[]) => {
    const courseExist = userCourseList?.find((course: any) => course.courseId.toString() === courseId);
    if (!courseExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'You are not eligible to access this course');
    }
    const course = await Course.findById(courseId);
    const content = course?.courseData;
    return content;
};

const addQuestionIntoCourse = async (user: JwtPayload, questionData: IAddQuestionData) => {
    const { courseId, contentId, question } = questionData;
    const course = await Course.findById(courseId);
    const courseContent = course?.courseData?.find((content: any) => content._id.toString() === contentId);
    if (!courseContent) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Course content not found');
    }
    const newQuestion = {
        user: user.id,
        question,
        questionReplies: []
    }
    courseContent.questions.push(newQuestion);
    await course?.save();
    return course;

};

const addAnswerIntoCourse = async (user: JwtPayload, questionData: IAddAnswerData) => {
    const { courseId, contentId, questionId, answer } = questionData;
    const course = await Course.findById(courseId).populate({
        path: 'courseData.questions.user',
        model: 'User'
    }).exec();
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

    question.questionReplies ??= [];
    question.questionReplies.push(newAnswer);
    const questionUser = question.user as unknown as IUser;

    await course?.save();
    if (user.id === question.user._id.toString()) {
        // create a notification

    } else {
        const data = {
            name: questionUser?.name,
            title: question.question,
        }
        await sendMail({
            email: questionUser.email,
            subject: 'Question Reply',
            template: 'question-reply.ejs',
            data
        });
    }
    return course

};



export const CourseServices = {
    createCourseIntoDB,
    updateCourseFromDB,
    getCourseWithOutPurchaseingFromDB,
    getAllCoursesWithOutPurchaseingFromDB,
    getCourseByUserFromDB,
    addQuestionIntoCourse,
    addAnswerIntoCourse
};
