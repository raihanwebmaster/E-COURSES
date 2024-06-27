import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { NotificationServices } from "./notification.service";


const getNotifications = catchAsync(async (req, res) => {
    const notifications = await NotificationServices.getNotificationsIntoDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Notification fetched successfully',
        data: notifications,
    });
});

export const NotificationControllers = {
    getNotifications
};