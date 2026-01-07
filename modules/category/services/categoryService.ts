import { apiClient } from '@/core/api/axios/client';
import { CATEGORY_ENDPOINTS } from '@/core/api/endpoint/endpoints';
import { CategoryApiResponse, CategoryData, CategoryItem, SubCategory } from '../types';

/**
 * Category Service
 * Handles all category-related API operations
 */
class CategoryService {
    /**
     * Fetch all categories from the API
     * @returns Promise with normalized category data
     */
    async getCategories(): Promise<CategoryItem[]> {
        try {
            const response = await apiClient.get<CategoryApiResponse>(
                CATEGORY_ENDPOINTS.GET_ALL
            );

            // Validate response structure
            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to fetch categories');
            }

            // Transform API data to normalized Category interface
            return this.transformCategoryData(response.data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    }

    /**
     * Transform API category data to normalized CategoryItem interface
     * @param categoriesData - Raw category data from API
     * @returns Normalized category array
     */
    private transformCategoryData(categoriesData: CategoryData[]): CategoryItem[] {
        return categoriesData.map((category) => ({
            id: category._id,
            title: category.category_name,
            count: `${category.no_of_subcategories || 0} Items`,
            image: category.category_logo || '/assets/images/placeholder-category.png',
            subcategories: this.transformSubCategories(category.subcategories)
        }));
    }

    private transformSubCategories(subArgs: { subcategory_id: string; subcategory_name: string }[]): SubCategory[] {
        return subArgs?.map(sub => ({
            id: sub.subcategory_id,
            name: sub.subcategory_name
        })) || [];
    }
}

// Export singleton instance
export const categoryService = new CategoryService();
