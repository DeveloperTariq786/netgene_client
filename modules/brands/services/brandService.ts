import { apiClient } from '@/core/api/axios/client';
import { BRAND_ENDPOINTS } from '@/core/api/endpoint/endpoints';
import { BrandApiResponse, BrandData, Brand } from '../types';

/**
 * Brand Service
 * Handles all brand-related API operations
 */
class BrandService {
    /**
     * Fetch all brands from the API
     * @returns Promise with brand data
     */
    async getBrands(): Promise<Brand[]> {
        try {
            const response = await apiClient.get<BrandApiResponse>(
                BRAND_ENDPOINTS.GET_ALL
            );

            // Validate response structure
            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to fetch brands');
            }

            // Transform API data to normalized Brand interface
            return this.transformBrandsData(response.data.data);
        } catch (error) {
            console.error('Error fetching brands:', error);
            throw error;
        }
    }

    /**
     * Transform API brand data to normalized Brand interface
     * @param brandsData - Raw brand data from API
     * @returns Normalized brand array
     */
    private transformBrandsData(brandsData: BrandData[]): Brand[] {
        return brandsData.map((brand) => ({
            id: brand._id,
            name: brand.brand_name,
            logoUrl: brand.brand_logo,
            itemsCount: brand.no_of_products,
        }));
    }
}

// Export singleton instance
export const brandService = new BrandService();
