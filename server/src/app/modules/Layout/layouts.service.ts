/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { Layout } from "./layouts.model";


const createLayoutIntoDB = async (layout: any) => {
    const { type } = layout;
    const isTypeExist = await Layout.findOne({ type});
    if (isTypeExist) {
        throw new AppError(httpStatus.FORBIDDEN, 'Layout already Exist')
    }
    if (type === "Banner") {
        const { title, subtitle, image } = layout.banner;
        const { secure_url, public_id } = (await sendImageToCloudinary(image, "banner")) as {
            secure_url: string;
            public_id: string;
        };
        const banner = {
            title,
            subtitle,
            image: {
                public_id,
                url: secure_url
            }
        }
        await Layout.create({ type, banner });

    }
    else if (type === "Categories") {
        await Layout.create({ type, categories: layout.categories });

    } else if (type === "FAQ") {
        await Layout.create({ type, faq: layout.faq });

    }else{
        throw new AppError(httpStatus.BAD_REQUEST, 'Invalid Layout type')
    }

}

export const LayoutServices = {
    createLayoutIntoDB

}