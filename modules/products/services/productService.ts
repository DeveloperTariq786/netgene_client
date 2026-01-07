import { apiClient } from '@/core/api/axios/client';
import { PRODUCT_ENDPOINTS } from '@/core/api/endpoint/endpoints';
import { ProductApiResponse, ProductData, Product } from '../types';

/**
 * Product Service
 * Handles all product-related API operations
 */
class ProductService {
    /**
     * Fetch all products from the API with optional filters
     * @param params - Filter parameters
     * @returns Promise with product data
     */
    async getProducts(params?: {
        single_brand?: string;
        single_category?: string;
        brands?: string;
        categories?: string;
        from?: number;
        to?: number;
        limit?: number;
    }): Promise<Product[]> {
        try {
            const response = await apiClient.get<ProductApiResponse>(
                PRODUCT_ENDPOINTS.GET_ALL,
                {
                    params,
                    skipAuth: true
                }
            );

            // Validate response structure
            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to fetch products');
            }

            // Transform API data to normalized Product interface
            return this.transformProductsData(response.data.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }

    /**
     * Search products by query
     * @param query - Search term
     * @returns Promise with product data
     */
    async searchProducts(query: string, limit: number = 10): Promise<Product[]> {
        const trimmedQuery = query.trim();
        try {
            const response = await apiClient.get<ProductApiResponse>(
                PRODUCT_ENDPOINTS.SEARCH,
                {
                    params: { query: trimmedQuery, limit },
                    skipAuth: true
                }
            );

            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to search products');
            }

            return this.transformProductsData(response.data.data);
        } catch (error) {
            console.error('Error searching products:', error);
            throw error;
        }
    }

    /**
     * Transform API product data to normalized Product interface
     * @param productsData - Raw product data from API
     * @returns Normalized product array
     */
    private transformProductsData(productsData: any[]): Product[] {
        return productsData.map((product) => ({
            id: product._id,
            name: product.product_name,
            originalPrice: product.product_price,
            salePrice: Math.round(product.final_price),
            discountPrice: product.discount_price || 0,
            discountPercentage: product.discount_precentage || product.discount_percentage,
            image: product.avatar,
            unit: product.dimension || 'Unit',
            quantity: product.product_quantity,
            rating: product.avg_rating || 0,
            reviewCount: product.total_reviews || product.reviews || 0,
            isNew: product.is_new || false,
            isSale: product.is_sale || false,
            isFeatured: product.is_featured || false,
        }));
    }
}

// Export singleton instance
export const productService = new ProductService();
