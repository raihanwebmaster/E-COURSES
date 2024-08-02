import { Schema, model, } from 'mongoose';
import { IReview, ICourse, ICourseData, ILink, IQuestion, IReply } from './course.interface';



const ReplySchema: Schema<IReply> = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    answer: { type: String, required: true }
}, { timestamps: true });

const QuestionSchema: Schema<IQuestion> = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    question: { type: String, required: true },
    questionReplies: [ReplySchema]

}, { timestamps: true });

// Review Schema
const ReviewSchema = new Schema<IReview>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, default: 0, required: true },
    comment: { type: String, required: true },
    commentReplies: [ReplySchema]
},{ timestamps: true });

// Link Schema
const LinkSchema = new Schema<ILink>({
    title: { type: String, required: true },
    url: { type: String, required: true }
});

// Course Data Schema
const CourseDataSchema = new Schema<ICourseData>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    videoSection: { type: String, required: true },
    videoLength: { type: Number, required: false },
    videoPlayer: { type: String, required: false },
    links: [LinkSchema],
    suggestion: { type: String, required: false },
    questions: [QuestionSchema]
});

// Course Schema
const CourseSchema = new Schema<ICourse>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Layout', required: true }],
    price: { type: Number, required: true },
    estimatePrice: { type: Number },
    thumbnail: {
        public_id: { type: String, required: false },
        url: { type: String, required: false }
    },
    tags: { type: String, required: true },
    level: { type: String, required: true },
    demoUrl: { type: String, required: true },
    benefits: [{ title: { type: String, required: true } }],
    prerequisites: [{ title: { type: String, required: true } }],
    reviews: [ReviewSchema],
    courseData: [CourseDataSchema],
    ratings: { type: Number, default: 0 },
    purchased: { type: Number, default: 0 }
}, { timestamps: true });

export const Course = model<ICourse>('Course', CourseSchema);