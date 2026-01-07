import { apiClient } from '@/core/api/axios/client';
import { COUNTDOWN_ENDPOINTS } from '@/core/api/endpoint/endpoints';
import { CountdownApiResponse, CountdownItem, RawCountdownItem } from '../types';

/**
 * Countdown Service
 * Handles fetching countdown data for specials section
 */
class CountdownService {
    /**
     * Fetch countdown data from the API
     * @returns Promise with transformed countdown data
     */
    async getCountdowns(): Promise<CountdownItem[]> {
        try {
            const response = await apiClient.get<CountdownApiResponse>(
                COUNTDOWN_ENDPOINTS.GET_ALL
            );

            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to fetch countdown data');
            }

            return this.transformCountdownData(response.data.data);
        } catch (error) {
            console.error('Error fetching countdown data:', error);
            throw error;
        }
    }

    /**
     * Transform API countdown data to normalized CountdownItem interface
     * @param data - Raw countdown data from API
     * @returns Normalized countdown array
     */
    private transformCountdownData(data: RawCountdownItem[]): CountdownItem[] {
        return data.map((item) => ({
            id: item._id,
            title: item.countdown_title,
            description: item.countdown_description,
            discount: item.countdown_discount,
            endTime: item.countdown_end_time,
            image: item.countdown_url,
            association: item.countdown_association,
            associationId: item.countdown_association === 'brand' ? item.countdown_brand : item.countdown_category,
            remainingTimeStr: item.remainingTime
        }));
    }
}

export const countdownService = new CountdownService();
