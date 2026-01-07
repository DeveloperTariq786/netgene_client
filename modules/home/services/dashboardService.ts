import { apiClient } from '@/core/api/axios/client';
import { DASHBOARD_ENDPOINTS } from '@/core/api/endpoint/endpoints';
import { DashboardApiResponse, DashboardProduct, Product } from '../types';

/**
 * Dashboard Service
 * Handles all dashboard-related API operations
 */
class DashboardService {
    /**
     * Fetch dashboard data from the API
     * @param limit - Number of items to fetch
     * @returns Promise with dashboard data
     */
    async getDashboardData(
        limit: number = 10,
        isNew?: number,
        featured?: number,
        toporders?: number,
        topratings?: number,
        topdiscount?: number
    ): Promise<Product[]> {
        try {
            const response = await apiClient.get<DashboardApiResponse>(
                DASHBOARD_ENDPOINTS.GET_DATA,
                {
                    params: { limit, isNew, featured, toporders, topratings, topdiscount }
                }
            );




            // Validate response structure
            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to fetch dashboard data');
            }

            // Transform API data to normalized Product interface
            return this.transformDashboardData(response.data.data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    }

    /**
     * Transform API dashboard data to normalized Product interface
     * @param data - Raw dashboard data from API
     * @returns Normalized product array
     */
    private transformDashboardData(data: DashboardProduct[]): Product[] {
        return data.map((item) => {
            // Requirement 1: final_price to one decimal place
            const salePrice = Number(item.final_price.toFixed(1));

            // Requirement 2: if total_reviews is 1 and rating is null, make reviewCount null
            const isNoRatingYet = item.total_reviews === 1 && !item.rating;
            const reviewCount = isNoRatingYet ? null : item.total_reviews;
            const rating = isNoRatingYet ? null : item.rating;

            return {
                id: item._id,
                name: item.product_name,
                image: item.avatar,
                originalPrice: item.product_price,
                salePrice,
                discountPrice: item.product_price - item.final_price,
                unit: item.dimension,
                rating,
                reviewCount,
                onSale: item.sales,
                isSale: item.sales,
                isNew: item.isNew,
                isFeatured: item.featured,
                description: item.product_description,
                brand: item.product_brand,
                discountPercentage: item.discount_precentage,
                quantity: item.product_stock,
                totalOrders: item.totalOrders
            };

        });
    }



}

// Export singleton instance
export const dashboardService = new DashboardService();
