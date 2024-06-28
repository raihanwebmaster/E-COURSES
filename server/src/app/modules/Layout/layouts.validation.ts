import { z } from "zod";


const faqZodSchema = z.object({
    question: z.string(),
    answer: z.string()
});

const categoryZodSchema = z.object({
    title: z.string()
});


const createLayoutZodSchema = z.object({
    body: z.object({
        type: z.string(),
        faq: z.array(faqZodSchema).optional(),
        categories: z.array(categoryZodSchema).optional(),
        banner: z.object({
            title: z.string(),
            subtitle: z.string(),
            image: z.string()
        }).optional()
    })
});


export const layoutsValidation = {
    createLayoutZodSchema,
    updateLayoutZodSchema: createLayoutZodSchema

}