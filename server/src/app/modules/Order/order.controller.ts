/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OrderServices } from './order.service';

const createOder = catchAsync(async (req, res) => {
    const user = req.user;
    const oderData = req.body;
    const newOrder = await OrderServices.createOderIntoDB(user, oderData);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Order is created succesfully',
        data: newOrder,
    });
});

export const OderControllers = {
    createOder
};
