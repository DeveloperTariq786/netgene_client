import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { PromotionItem } from '../types';
import { promotionService } from '../services/promotionService';
import { usePromotionStore } from '../store/usePromotionStore';
import { useEffect } from 'react';

export const PROMOTION_QUERY_KEY = ['promotion'] as const;

export function usePromotion(enabled: boolean = true): UseQueryResult<PromotionItem[], Error> {
    const setPromotions = usePromotionStore((state) => state.setPromotions);

    const query = useQuery<PromotionItem[], Error>({
        queryKey: PROMOTION_QUERY_KEY as any,
        queryFn: () => promotionService.getPromotions(),
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
        enabled,
        placeholderData: (previousData) => previousData,
    });

    useEffect(() => {
        if (query.data) {
            setPromotions(query.data);
        }
    }, [query.data, setPromotions]);

    return query;
}
