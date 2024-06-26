import { z } from "zod";

const CreateOrderValidationSchema = z.object({
    body: z.object({
        courseId: z.string()
    })
})


export const OrderValidation = {
  CreateOrderValidationSchema
}