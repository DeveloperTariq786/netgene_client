'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/core/api/queryClient';
import { ReactNode } from 'react';

interface QueryProviderProps {
    children: ReactNode;
}

/**
 * QueryProvider component to wrap the app with TanStack Query context
 */
export function QueryProvider({ children }: QueryProviderProps) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
