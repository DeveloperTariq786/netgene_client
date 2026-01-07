import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { CarouselItem } from '../types';
import { carouselService } from '../services/carouselService';

export const CAROUSEL_QUERY_KEY = ['carousel'] as const;

export function useCarousel(): UseQueryResult<CarouselItem[], Error> {
    return useQuery<CarouselItem[], Error>({
        queryKey: CAROUSEL_QUERY_KEY as any,
        queryFn: () => carouselService.getCarousels(),
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
        placeholderData: (previousData) => previousData,
    });
}
