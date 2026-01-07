import { useQuery } from '@tanstack/react-query';
import { Product } from '../types';
import { productService } from '../services/productService';

export const SEARCH_PRODUCTS_QUERY_KEY = ['products', 'search'] as const;

export function useSearchProducts(query: string, limit: number = 10) {
    const trimmedQuery = query.trim();

    return useQuery<Product[], Error>({
        queryKey: [...SEARCH_PRODUCTS_QUERY_KEY, trimmedQuery, limit],
        queryFn: () => productService.searchProducts(trimmedQuery, limit),
        enabled: trimmedQuery.length >= 2,
        staleTime: 30 * 1000, // 30 seconds
    });
}
