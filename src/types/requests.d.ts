import {Post} from "@/types/index";

export interface getPostsResponse {
    items: Post[],
    total: number,
    page: number,
    limit: number,
    totalPages: number
}