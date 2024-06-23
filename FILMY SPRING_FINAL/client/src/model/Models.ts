export interface Movie {
    id: string
    title: string
    description: string
    totalRating: number
    reviews: Review[]
}

export interface Review {
    id: string
    movieId: string
    description: string
    rating: number
    username: string
}