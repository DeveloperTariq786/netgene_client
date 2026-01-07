import { apiClient } from '@/core/api/axios/client';
import { PRODUCT_ENDPOINTS } from '@/core/api/endpoint/endpoints';
import { ProductDetailResponse } from '../types/details';

export const ProductDetailService = {
    /**
     * Fetch single product details by ID
     */
    getProductDetails: async (productId: string): Promise<ProductDetailResponse> => {
        console.log(`Fetching product details for ID: ${productId}`);
        const response = await apiClient.get<ProductDetailResponse>(
            `${PRODUCT_ENDPOINTS.GET_DETAILS}?product_id=${productId}`
        );
        console.log('Product details response:', response.data);
        return response.data;
    },
};
