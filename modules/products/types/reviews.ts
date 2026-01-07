export interface Review {
    customer_id?: string;
    customer_name?: string;
    customer_reviews: string;
}

export interface AddReviewRequest {
    ratings: number;
    reviews: Review[];
}

export interface ReviewResponse {
    success: boolean;
    message: string;
}
