import { useQuery, UseQueryResult, UseQueryOptions } from '@tanstack/react-query';
import { Product } from '../types';
import { productService } from '../services/productService';

export const PRODUCTS_QUERY_KEY = ['products'] as const;

export interface UseProductsParams {
    single_brand?: string;
    single_category?: string;
    brands?: string;
    categories?: string;
    from?: number;
    to?: number;
    limit?: number;
}

export function useProducts(
    params?: UseProductsParams,
    options?: Partial<UseQueryOptions<Product[], Error>>
): UseQueryResult<Product[], Error> {
    return useQuery<Product[], Error>({
        queryKey: [...PRODUCTS_QUERY_KEY, params] as any,
        queryFn: () => productService.getProducts(params),
        staleTime: 2 * 60 * 1000, // 2 minutes
        ...options
    });
}
