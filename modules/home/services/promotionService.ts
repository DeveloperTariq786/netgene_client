import { apiClient } from '@/core/api/axios/client';
import { BANNER_ENDPOINTS } from '@/core/api/endpoint/endpoints';
import { PromotionApiResponse, PromotionItem, RawPromotionItem } from '../types';

/**
 * Promotion Service (Banners)
 * Handles fetching banner data for various sections
 */
class PromotionService {
    /**
     * Fetch banners from the API
     * @returns Promise with transformed banner data
     */
    async getPromotions(): Promise<PromotionItem[]> {
        try {
            const response = await apiClient.get<PromotionApiResponse>(
                BANNER_ENDPOINTS.GET_ALL
            );

            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to fetch banner data');
            }

            return this.transformPromotionData(response.data.data);
        } catch (error) {
            console.error('Error fetching banner data:', error);
            throw error;
        }
    }

    /**
     * Transform API banner data to normalized PromotionItem interface
     * @param data - Raw banner data from API
     * @returns Normalized banner array
     */
    private transformPromotionData(data: RawPromotionItem[]): PromotionItem[] {
        return data.map((item) => ({
            id: item._id,
            image: item.banner_url,
            category: item.banner_category,
            brandId: item.banner_brand,
            association: item.banner_association
        }));
    }
}

export const promotionService = new PromotionService();
