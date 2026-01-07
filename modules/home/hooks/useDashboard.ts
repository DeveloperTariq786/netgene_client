import { useQuery, UseQueryResult, UseQueryOptions } from '@tanstack/react-query';
import { Product } from '../types';
import { dashboardService } from '../services/dashboardService';

export const DASHBOARD_QUERY_KEY = ['dashboard'] as const;

interface UseDashboardParams {
    limit?: number;
    isNew?: number;
    featured?: number;
    toporders?: number;
    topratings?: number;
    topdiscount?: number;
    enabled?: boolean;
    options?: Partial<UseQueryOptions<Product[], Error>>;
}

export function useDashboard({ limit = 10, isNew, featured, toporders, topratings, topdiscount, enabled = true, options }: UseDashboardParams = {}): UseQueryResult<Product[], Error> {
    return useQuery<Product[], Error>({
        queryKey: [...DASHBOARD_QUERY_KEY, { limit, isNew, featured, toporders, topratings, topdiscount }],
        queryFn: () => dashboardService.getDashboardData(limit, isNew, featured, toporders, topratings, topdiscount),


        staleTime: 2 * 60 * 1000, // 2 minutes
        gcTime: 2 * 60 * 1000, // 2 minutes
        enabled,
        placeholderData: (previousData) => previousData,
        ...options

    });
}

