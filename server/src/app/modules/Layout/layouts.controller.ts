import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { LayoutServices } from "./layouts.service";


const createLayout = catchAsync(async (req, res) => {
    const layout = req.body;
    const result = await LayoutServices.createLayoutIntoDB(layout);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Layout is created successfully',
        data: result,
    });
});

const editLayout = catchAsync(async (req, res) => {
    const layout = req.body;
    const result = await LayoutServices.editLayoutIntoDB(layout);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Layout is updated successfully',
        data: result,
    });
});


const getLayout = catchAsync(async (req, res) => {
    const { type } = req.params;
    const result = await LayoutServices.getLayoutFromDB(type);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Layout is fetched successfully',
        data: result,
    });
});

export const LayoutControllers = {
    createLayout,
    editLayout,
    getLayout
}