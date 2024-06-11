/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { redis } from '../../utils/redis';
import { JwtPayload } from 'jsonwebtoken';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { ICourse } from './course.interface';
import { v2 as cloudinary } from 'cloudinary';
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
    const uploadCourse = await Course.create(course)
    return uploadCourse;
};
const updateCourseFromDB = async (course: any) => {
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
    const uploadCourse = await Course.create(course)
    return uploadCourse;
};

export const CourseServices = {
    createCourseIntoDB,
    updateCourseFromDB
};
