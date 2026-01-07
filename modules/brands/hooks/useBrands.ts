import { useQuery, UseQueryResult, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { Brand } from '../types';
import { brandService } from '../services/brandService';


export const BRANDS_QUERY_KEY = ['brands'] as const;

export function useBrands(options?: Partial<UseQueryOptions<Brand[], Error>>): UseQueryResult<Brand[], Error> {
    return useQuery<Brand[], Error>({
        queryKey: BRANDS_QUERY_KEY as any,
        queryFn: () => brandService.getBrands(),
        staleTime: 2 * 60 * 1000, // 2 minutes
        gcTime: 2 * 60 * 1000, // 2 minutes
        ...options
    });
}

/**
 * Hook to prefetch brands data
 * Useful for hover states on menus or links
 */
export function usePrefetchBrands() {
    const queryClient = useQueryClient();

    return () => {
        queryClient.prefetchQuery({
            queryKey: BRANDS_QUERY_KEY,
            queryFn: () => brandService.getBrands(),
            staleTime: 2 * 60 * 1000,
        });
    };
}

