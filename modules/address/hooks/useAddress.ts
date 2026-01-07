import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AddressService } from '../services/address.service';
import { AddAddressRequest } from '../types';

export const ADDRESS_QUERY_KEY = ['addresses'] as const;

export const useAddresses = () => {
    return useQuery({
        queryKey: ADDRESS_QUERY_KEY,
        queryFn: () => AddressService.getAddresses(),
        select: (response) => response.data,
        staleTime: 0, // Ensure fresh data on every access
    });
};

export const useAddAddress = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ customerId, data }: { customerId: string; data: AddAddressRequest }) =>
            AddressService.addAddress(customerId, data),
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({
                queryKey: ADDRESS_QUERY_KEY,
                exact: true,
                refetchType: 'all'
            });
        },
    });
};
