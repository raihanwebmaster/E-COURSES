import { Schema, model } from "mongoose";
import { IBannerImage, ICategory, IFaqItem, ILayout,  } from "./layouts.interface";


const  faqSchema = new Schema<IFaqItem>({
    question: { type: String, required: true },
    answer: { type: String, required: true }
});

const categroySchema = new Schema<ICategory>({
    title: { type: String, required: true }
});

const bannerImageSchema = new Schema<IBannerImage>({
    public_id: { type: String, required: true },
    url: { type: String, required: true }
});

const bannerSchema = new Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    image: bannerImageSchema

});

const layoutSchema = new Schema<ILayout>({
    type: { type: String, required: true },
    faq: {
        type: [faqSchema],
        required: false,  
        default: undefined
    },
    categories: {
        type: [categroySchema],
        required: false,  
        default: undefined 
    },
    banner: {type: bannerSchema, required: false, default: undefined}
});

export const Layout = model<ILayout>('Layout', layoutSchema);

