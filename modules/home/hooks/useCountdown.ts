import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { CountdownItem } from '../types';
import { countdownService } from '../services/countdownService';
import { useCountdownStore } from '../store/useCountdownStore';
import { useEffect } from 'react';

export const COUNTDOWN_QUERY_KEY = ['countdown'] as const;

export function useCountdown(enabled: boolean = true): UseQueryResult<CountdownItem[], Error> {
    const setCountdowns = useCountdownStore((state) => state.setCountdowns);

    const query = useQuery<CountdownItem[], Error>({
        queryKey: COUNTDOWN_QUERY_KEY as any,
        queryFn: () => countdownService.getCountdowns(),
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000,
        enabled,
        placeholderData: (previousData) => previousData,
    });

    useEffect(() => {
        if (query.data) {
            setCountdowns(query.data);
        }
    }, [query.data, setCountdowns]);

    return query;
}
