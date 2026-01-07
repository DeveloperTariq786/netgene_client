import { apiClient } from '@/core/api/axios/client';
import { PRODUCT_ENDPOINTS } from '@/core/api/endpoint/endpoints';
import { AddReviewRequest, ReviewResponse } from '../types/reviews';

class ReviewService {
    async addReview(
        customerId: string,
        productId: string,
        reviewData: AddReviewRequest
    ): Promise<ReviewResponse> {
        try {
            // Note: JWT token is automatically attached by the apiClient request interceptor
            const response = await apiClient.post<ReviewResponse>(
                PRODUCT_ENDPOINTS.ADD_REVIEW,
                reviewData,
                {
                    params: {
                        customer_id: customerId,
                        product_id: productId
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error adding review:', error);
            throw error;
        }
    }
}

export const reviewService = new ReviewService();
