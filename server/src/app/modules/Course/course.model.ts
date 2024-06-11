import { Schema, model, } from 'mongoose';
import { IReview, ICourse, IComment, ICourseData, ILink } from './course.interface';

const CommentSchema: Schema<IComment> = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: String, required: true },
    // commentReplies: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

// Review Schema
const ReviewSchema = new Schema<IReview>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, default: 0, required: true },
    comments: { type: String, required: true },
    commentReplies: [CommentSchema]
});

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
    videoLength: { type: Number, required: true },
    videoPlayer: { type: String, required: true },
    links: [LinkSchema],
    suggestion: { type: String, required: true },
    questions: [CommentSchema]
});

// Course Schema
const CourseSchema = new Schema<ICourse>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    estimatePrice: { type: Number },
    thumbnail: {
        public_id: { type: String, required: true },
        url: { type: String, required: true }
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