/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { destroyImage } from '../../utils/deleteImageIntoCloudinary';
import { redis } from '../../utils/redis';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { Course } from './course.model';

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



export const CourseServices = {
    createCourseIntoDB,
    updateCourseFromDB,
    getCourseWithOutPurchaseingFromDB,
    getAllCoursesWithOutPurchaseingFromDB,
    getCourseByUserFromDB
};
