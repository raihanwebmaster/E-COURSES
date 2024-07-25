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

const getAllOrders = catchAsync(async (req, res) => {
    const orders = await OrderServices.getAllOrdersFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All orders are retrieved successfully',
        data: orders,
    });
});

const sendStripePublishableKey = catchAsync(async (req, res) => {
    const stripePublishableKey = await OrderServices.getStripePublishableKey();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Stripe publishable key is retrieved successfully',
        data: stripePublishableKey,
    });
});

const newPayment = catchAsync(async (req, res) => {
    const paymentData = req.body;
    const payment = await OrderServices.createPayment(paymentData);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Payment is created succesfully',
        data: payment,
    });
});

export const OderControllers = {
    createOder,
    getAllOrders,
    sendStripePublishableKey,
    newPayment
};
