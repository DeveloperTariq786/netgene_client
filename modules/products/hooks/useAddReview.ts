import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewService } from '../services/review.service';
import { AddReviewRequest } from '../types/reviews';
import { PRODUCT_DETAIL_QUERY_KEY } from './useProductDetail';

export const useAddReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            customerId,
            productId,
            reviewData
        }: {
            customerId: string;
            productId: string;
            reviewData: AddReviewRequest
        }) => reviewService.addReview(customerId, productId, reviewData),
        onSuccess: (_, variables) => {
            // Invalidate product detail query to show new review/rating
            queryClient.invalidateQueries({
                queryKey: [PRODUCT_DETAIL_QUERY_KEY, variables.productId]
            });
        },
    });
};
