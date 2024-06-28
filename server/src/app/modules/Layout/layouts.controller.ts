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

export const LayoutControllers = {
    createLayout
}