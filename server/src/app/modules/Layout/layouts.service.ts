/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { Layout } from "./layouts.model";
import { destroyImage } from "../../utils/deleteImageIntoCloudinary";


const createLayoutIntoDB = async (layout: any) => {
    const { type } = layout;
    const isTypeExist = await Layout.findOne({ type });
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

    } else {
        throw new AppError(httpStatus.BAD_REQUEST, 'Invalid Layout type')
    }

}

const editLayoutIntoDB = async (layout: any) => {
    const { type } = layout;
    if (type === "Banner") {
        const bannerData = await Layout.findOne({ type: "Banner" });
        if (!bannerData) {
            throw new AppError(httpStatus.NOT_FOUND, 'Banner not found')
        }
        const { title, subtitle, image } = layout.banner;
        let updateImage = { public_id: bannerData.banner.image.public_id, url: bannerData.banner.image.url };

        if (!image.startsWith("https")) {
            await destroyImage(bannerData.banner.image.public_id);
            const { secure_url, public_id } = (await sendImageToCloudinary(image, "banner")) as {
                secure_url: string;
                public_id: string;
            };
            updateImage = { public_id, url: secure_url };
        }

        const banner = {
            title,
            subtitle,
            image: updateImage
        };
        await Layout.findOneAndUpdate({ type: "Banner" }, { banner });
    }
    else if (type === "Categories") {
        await Layout.findOneAndUpdate({ type: "Categories" }, { categories: layout.categories });
    } else if (type === "FAQ") {
        await Layout.findOneAndUpdate({ type: "FAQ" }, { faq: layout.faq });

    } else {
        throw new AppError(httpStatus.BAD_REQUEST, 'Invalid Layout type')
    }
}


const getLayoutFromDB = async (type: string) => {
    const layout = await Layout.findOne({ type });
    if (!layout) {
        throw new AppError(httpStatus.NOT_FOUND, 'Layout not found')
    }
    return layout;
}

export const LayoutServices = {
    createLayoutIntoDB,
    editLayoutIntoDB,
    getLayoutFromDB

}