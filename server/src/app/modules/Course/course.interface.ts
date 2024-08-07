import { Types } from "mongoose"


export interface IReply {
    user: Types.ObjectId,
    answer: string
}

export interface IQuestion {
    user: Types.ObjectId,
    question: string,
    questionReplies?: IReply[]
}

export interface IReview {
    user: Types.ObjectId,
    rating: number,
    comment: string,
    commentReplies?: IReply[]
}

export interface ILink {
    title: string,
    url: string,
}

export interface ICourseData {
    title: string,
    description: string,
    videoUrl: string,
    videoSection: string,
    videoLength: number,
    videoPlayer: string,
    links: ILink[],
    suggestion: string,
    questions: IQuestion[]
}

export interface ICourse {
    name: string,
    description: string,
    categories: Types.ObjectId[],
    price: number,
    estimatePrice?: number,
    thumbnail: object,
    tags: string,
    level: string,
    demoUrl: string,
    benefits: { title: string }[],
    prerequisites: { title: string }[],
    reviews: IReview[],
    courseData: ICourseData[],
    ratings?: number,
    purchased?: number
}

export interface IAddQuestionData{
    question: string;
    courseId: string;
    contentId: string;
}

export interface IAddAnswerData{
    answer: string;
    questionId: string;
    contentId: string;
    courseId: string;
}

export interface IAddReviewData{
    review: string;
    rating: number;
}

export interface IAddReplyReviewData{
    comment: string;
    reviewId: string;
    courseId: string;
}