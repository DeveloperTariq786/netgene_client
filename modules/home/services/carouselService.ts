import { apiClient } from '@/core/api/axios/client';
import { CAROUSEL_ENDPOINTS } from '@/core/api/endpoint/endpoints';
import { CarouselApiResponse, CarouselItem, RawCarouselItem } from '../types';

/**
 * Carousel Service
 * Handles fetching carousel data for the Hero section
 */
class CarouselService {
    /**
     * Fetch carousel data from the API
     * @returns Promise with transformed carousel data
     */
    async getCarousels(): Promise<CarouselItem[]> {
        try {
            const response = await apiClient.get<CarouselApiResponse>(
                CAROUSEL_ENDPOINTS.GET_ALL
            );

            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to fetch carousel data');
            }

            return this.transformCarouselData(response.data.data);
        } catch (error) {
            console.error('Error fetching carousel data:', error);
            throw error;
        }
    }

    /**
     * Transform API carousel data to normalized CarouselItem interface
     * @param data - Raw carousel data from API
     * @returns Normalized carousel array
     */
    private transformCarouselData(data: RawCarouselItem[]): CarouselItem[] {
        return data.map((item) => ({
            id: item._id,
            title: item.carousel_title,
            description: item.carousel_description,
            image: item.carousel_url,
            brandId: item.carousel_brand,
            association: item.carousel_association
        }));
    }
}

export const carouselService = new CarouselService();
