import { useQuery, UseQueryResult, UseQueryOptions } from '@tanstack/react-query';
import { CategoryItem } from '../types';
import { categoryService } from '../services/categoryService';

export const CATEGORIES_QUERY_KEY = ['categories'] as const;

export function useCategories(options?: Partial<UseQueryOptions<CategoryItem[], Error>>): UseQueryResult<CategoryItem[], Error> {
    return useQuery<CategoryItem[], Error>({
        queryKey: CATEGORIES_QUERY_KEY as any,
        queryFn: () => categoryService.getCategories(),
        staleTime: 2 * 60 * 1000, // 2 minutes
        gcTime: 2 * 60 * 1000, // 2 minutes
        ...options
    });
}
