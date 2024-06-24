/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { destroyImage } from '../../utils/deleteImageIntoCloudinary';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { Course } from './course.model';
import cloudinary from 'cloudinary';

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
    const courses = await Course.findById(courseId).select("-courseData.videoUrl  -courseData.videoPlayer -courseData.links -courseData.suggestion -courseData.questions");
    return courses;
};

const getAllCoursesWithOutPurchaseingFromDB = async () => {
    const courses = await Course.find().select("-courseData.videoUrl  -courseData.videoPlayer -courseData.links -courseData.suggestion -courseData.questions");
    return courses;
};



export const CourseServices = {
    createCourseIntoDB,
    updateCourseFromDB,
    getCourseWithOutPurchaseingFromDB,
    getAllCoursesWithOutPurchaseingFromDB
};
