import { useQuery } from '@tanstack/react-query';
import { ProductDetailService } from '../services/product-detail.service';
import { transformProductDetail } from '../types/details';

export const PRODUCT_DETAIL_QUERY_KEY = 'product-detail';

export const useProductDetail = (productId: string | undefined) => {
    return useQuery({
        queryKey: [PRODUCT_DETAIL_QUERY_KEY, productId],
        queryFn: async () => {
            if (!productId) throw new Error('Product ID is required');

            try {
                const response = await ProductDetailService.getProductDetails(productId);

                if (response.success && response.product && response.product.length > 0) {
                    return transformProductDetail(response.product[0]);
                }

                throw new Error(response.message || 'Product details not found in database');
            } catch (err: any) {
                console.error('useProductDetail error:', err);
                throw err;
            }
        },
        enabled: !!productId,
        staleTime: 2 * 60 * 1000,
    });
};
