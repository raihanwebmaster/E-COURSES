import { Types } from "mongoose"

export interface IComment {
    user: Types.ObjectId,
    comment: string,
}

export interface IReview {
    user: Types.ObjectId,
    rating: number,
    comments: string,
    commentReplies: IComment[]
}

export interface ILink {
    title: string,
    url: string,
}

export interface ICourseData {
    title: string,
    description: string,
    videoUrl: string,
    videoThumbnail: string,
    videoSection: string,
    videoPlayer: string,
    links: ILink[],
    suggestion: string,
    questions: IComment[]
}

export interface ICourse {
    name: string,
    description: string,
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