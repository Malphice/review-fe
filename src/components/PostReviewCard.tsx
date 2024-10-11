import * as React from "react"
import useEmblaCarousel from "embla-carousel-react"
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Calendar, ChevronLeft, ChevronRight, Globe, Lock} from "lucide-react"
import {Button} from "@/components/ui/button"


interface PostReviewCardProps {
    id: string
    media: string[]
    createdBy: string
    caption: string
    isPublic: boolean
    createdAt: Date
    scheduledAt?: Date
    categories?: string[]
}


export default function PostReviewCard({
                                           media,
                                           createdBy,
                                           caption,
                                           isPublic,
                                           createdAt,
                                           scheduledAt,
                                           categories,
                                           children
                                       }: React.PropsWithChildren<PostReviewCardProps>
) {
    const [emblaRef, emblaApi] = useEmblaCarousel()

    const scrollPrev = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader className="relative pb-0">
                <div className="embla overflow-hidden" ref={emblaRef}>
                    <div className="embla__container flex">
                        {media.map((src, index) => (
                            <div key={index} className="embla__slide flex-[0_0_100%] min-w-0">
                                <img
                                    src={src}
                                    alt={`Media ${index + 1}`}
                                    className="w-full h-[300px] object-cover rounded-t-lg"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 p-0"
                    onClick={scrollPrev}
                >
                    <ChevronLeft className="h-4 w-4 text-black"/>

                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 flex items-center justify-center p-0"
                    onClick={scrollNext}
                >
                    <ChevronRight className="h-4 w-4 text-black"/>

                </Button>
            </CardHeader>
            <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{createdBy}</span>
                    {isPublic ? (
                        <Globe className="h-5 w-5 text-green-500"/>
                    ) : (
                        <Lock className="h-5 w-5 text-yellow-500"/>
                    )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{caption}</p>
                {categories &&
                    <div className="flex flex-wrap gap-1 mb-2">
                        {categories.map((category, index) => (
                            <Badge key={index} variant="secondary">
                                {category}
                            </Badge>
                        ))}
                    </div>
                }
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-4 text-sm text-gray-500">
                <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1"/>
                    Created: {new Date(createdAt).toLocaleString()}
                </div>
                {scheduledAt && (
                    <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1"/>
                        Scheduled: {new Date(scheduledAt).toLocaleString()}
                    </div>
                )}
                <div className="flex flex-row gap-2">
                    {children}
                </div>
            </CardFooter>
        </Card>
    )
}