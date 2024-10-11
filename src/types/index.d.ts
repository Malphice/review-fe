import {ReviewStatus} from "@/types/enums.ts";


export interface Post {
    _id: string,
    public: boolean,
    caption: string,
    createdBy: string,
    createdAt: Date,
    scheduledAt?: Date,
    media: string[],
    categories?: string[],
    reviewStatus: ReviewStatus
}