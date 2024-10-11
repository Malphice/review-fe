import {ReviewStatus} from "@/types/enums.ts";
import {getPostsResponse} from "@/types/requests";

export async function getPosts(page: number) {
    const limit = 15;
    const res = await fetch(`http://localhost:3000/posts?page=${page}&limit=${limit}&status=${ReviewStatus.OPEN}`)
    const paginatedPostsData: getPostsResponse = await res.json()
    return paginatedPostsData
}

export async function updateReviewStatus(postId: string, status: ReviewStatus) {
    const res = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({reviewStatus: status})
    })
    return res
}
