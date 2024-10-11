import {useCallback, useEffect, useRef, useState} from "react";
import PostReviewCard from "@/components/PostReviewCard.tsx";
import {Post} from "@/types";
import {debounce} from "lodash"
import {getPosts, updateReviewStatus} from "@/requests/requests.ts";
import {Button} from "@/components/ui/button.tsx";
import {ReviewStatus} from "@/types/enums.ts";


export default function ReviewCards() {
    const [posts, setPosts] = useState<Post[]>([])
    const [page, setPage] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        async function loadPosts() {
            if (!hasMore) return
            setLoading(true)

            const paginatedPostsData = await getPosts(page)
            const {items: newPosts, totalPages} = paginatedPostsData

            setPosts([...posts, ...newPosts])
            setLoading(false)
            setHasMore(page < totalPages)
        }

        loadPosts()

    }, [page]);

    const handleScroll = useCallback(debounce(() => {
        const container = containerRef.current
        if (container) {
            if (container.scrollTop + container.clientHeight >= container.scrollHeight - 100 && !loading) {
                setPage((prevPage) => prevPage + 1)
            }
        }
    }, 200), [loading])

    const filterPosts = (postId: string) => {
        setPosts(posts.filter(post => post._id !== postId))
    }

    return (
        <>
            <div className="border border-slate rounded-2xl h-full max-h-full flex flex-col gap-4 p-4 overflow-auto"
                 onScroll={handleScroll} ref={containerRef}>
                {posts?.map((post) => <PostReviewCard {...post} key={post._id} isPublic={post.public} id={post._id}>
                    <Button onClick={
                        async () => {
                            await updateReviewStatus(post._id, ReviewStatus.APPROVED)
                            filterPosts(post._id)
                        }
                    } className="bg-green-500 hover:bg-green-400">
                        Approve
                    </Button>
                    <Button onClick={
                        async () => {
                            await updateReviewStatus(post._id, ReviewStatus.REJECTED)
                            filterPosts(post._id)
                        }
                    } className="bg-red-500 hover:bg-red-400">
                        Reject
                    </Button>
                </PostReviewCard>)}
                {loading && <div className="text-center">Loading...</div>}
                {!hasMore && <div className="text-center">No more posts to load</div>}
            </div>
        </>
    )
}
