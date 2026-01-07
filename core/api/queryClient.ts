import { QueryClient } from '@tanstack/react-query';

/**
 * Global QueryClient instance for TanStack Query
 * Configured with optimized defaults for performance and UX
 */
// Export default query options for reuse
export const QUERY_DEFAULTS = {
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
};

export const ORDERS_QUERY_CONFIG = {
    staleTime: 2 * 60 * 1000,
    gcTime: 2 * 60 * 1000,
};

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Cache data for 5 minutes before marking as stale
            staleTime: QUERY_DEFAULTS.staleTime,

            // Keep unused data in cache for 10 minutes
            gcTime: QUERY_DEFAULTS.gcTime,

            // Retry failed requests up to 1 time
            retry: 1,

            // Refetch on window focus for fresh data
            refetchOnWindowFocus: true,

            // Refetch on reconnect
            refetchOnReconnect: true,

            // Don't refetch on mount if data is fresh
            refetchOnMount: false,
        },
        mutations: {
            // Retry failed mutations once
            retry: 1,
        },
    },
});
