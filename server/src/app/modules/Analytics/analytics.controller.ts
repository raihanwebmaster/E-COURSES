import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AnalyticsService } from "./analytics.service";


const getUsersAnalytics = catchAsync(async (req, res) => {
    const users = await AnalyticsService.getUsersAnalyticsFromDB();
    sendResponse(res, { 
        statusCode: httpStatus.OK, 
        success: true, 
        message: 'Users analytics are retrieved successfully', 
        data: users 
    });

});

const getCoursesAnalytics = catchAsync(async (req, res) => {
    const courses = await AnalyticsService.getCousesAnalyticsFromDB();
    sendResponse(res, { 
        statusCode: httpStatus.OK, 
        success: true, 
        message: 'Courses analytics are retrieved successfully', 
        data: courses 
    });
});

const getOrdersAnalytics = catchAsync(async (req, res) => {
    const orders = await AnalyticsService.getOrdersAnalyticsFromDB();
    sendResponse(res, { 
        statusCode: httpStatus.OK, 
        success: true, 
        message: 'Orders analytics are retrieved successfully', 
        data: orders 
    });
});


export const AnalyticsControllers = {
    getUsersAnalytics,
    getCoursesAnalytics,
    getOrdersAnalytics

}