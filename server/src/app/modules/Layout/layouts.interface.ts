export interface IFaqItem {
    question: string;
    answer: string;
}

export interface ICategory {
    title: string;
}

export interface IBannerImage {
    public_id: string;
    url: string;
}

export interface ILayout{
    type: string;
    faq: IFaqItem[];
    categories: ICategory[];
    banner: {
        title: string;
        subtitle: string;
        image: IBannerImage;
    }
}