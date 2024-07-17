import { ZodSchema, z } from 'zod';
import { Types } from 'mongoose';

// Utility to convert a Mongoose ObjectId to a Zod validation schema
const objectId = () => z.instanceof(Types.ObjectId).transform((val) => val.toString());


const IReplySchema: ZodSchema = z.object({
  user: objectId(),
  answer: z.string(),
});

const IQuestionSchema: ZodSchema = z.object({
  user: objectId(),
  question: z.string(),
  questionReplies: z.array(IReplySchema).optional(),
});

const IReviewSchema = z.object({
  user: objectId(),
  rating: z.number().min(1).max(5),
  comment: z.string(),
  commentReplies: z.array(IReplySchema).optional(),
});

const ILinkSchema = z.object({
  title: z.string(),
  url: z.string().url(),
});

const ICourseDataSchema = z.object({
  title: z.string(),
  description: z.string(),
  videoUrl: z.string(),
  videoSection: z.string(),
  videoLength: z.number().positive().optional(),
  videoPlayer: z.string().optional(),
  links: z.array(ILinkSchema),
  suggestion: z.string().optional(),
  questions: z.array(IQuestionSchema).optional(),
});


const createCourseValidateionSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    categories: z.array(z.string()),
    price: z.number().positive(),
    estimatePrice: z.number().positive().optional(),
    thumbnail: z.string(),
    tags: z.string(),
    level: z.string(),
    demoUrl: z.string(),
    benefits: z.array(z.object({ title: z.string() })),
    prerequisites: z.array(z.object({ title: z.string() })),
    reviews: z.array(IReviewSchema).optional(),
    courseData: z.array(ICourseDataSchema),
    ratings: z.number().min(0).max(5).optional(),
    purchased: z.number().nonnegative().optional(),
  }),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    categories: z.array(z.string()).optional(),
    price: z.number().positive().optional(),
    estimatePrice: z.number().positive().optional(),
    thumbnail: z.string().optional(),
    tags: z.string().optional(),
    level: z.string().optional(),
    demoUrl: z.string().optional(),
    benefits: z.array(z.object({ title: z.string() })).optional(),
    prerequisites: z.array(z.object({ title: z.string() })).optional(),
    reviews: z.array(IReviewSchema).optional(),
    courseData: z.array(ICourseDataSchema).optional(),
    ratings: z.number().min(0).max(5).optional(),
    purchased: z.number().nonnegative().optional(),
  }),
});

const addQuestionValidationSchema = z.object({
  body: z.object({
    courseId: z.string(),
    contentId: z.string(),
    question: z.string(),
  }),
});

const addAnswerValidationSchema = z.object({
  body: z.object({
    courseId: z.string(),
    contentId: z.string(),
    questionId: z.string(),
    answer: z.string(),
  }),
});

const addReviewValidationSchema = z.object({
  body: z.object({
    rating: z.number().min(1).max(5),
    review: z.string(),
  }),
});

const addReplyReviewValidationSchema = z.object({
  body: z.object({
    reviewId: z.string(),
    comment: z.string(),
    courseId: z.string(),
  }),
 });

 const generateVideoUrlValidationSchema = z.object({
  body: z.object({
    videoId: z.string(),
  }),
 });



export const CourseValidation = {
  createCourseValidateionSchema,
  updateCourseValidationSchema,
  addQuestionValidationSchema,
  addAnswerValidationSchema,
  addReviewValidationSchema,
  addReplyReviewValidationSchema,
  generateVideoUrlValidationSchema
};
