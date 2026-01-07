import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { OrderService } from '../services/order.service';
import { CART_QUERY_KEY } from '@/modules/cart/hooks/useCart';
import { ORDERS_QUERY_CONFIG } from '@/core/api/queryClient';

export const ORDERS_QUERY_KEY = ['orders'];

export const useOrders = (page: number = 1, limit: number = 10) => {
    return useQuery({
        queryKey: [...ORDERS_QUERY_KEY, page, limit],
        queryFn: () => OrderService.getOrders(page, limit),
        ...ORDERS_QUERY_CONFIG,
    });
};

export const usePlaceOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ customerId, addressId }: { customerId: string; addressId: string }) =>
            OrderService.placeOrder(customerId, addressId),
        onSuccess: () => {
            // Invalidate cart after placing order
            queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
            // Invalidate orders list
            queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY });
        },
    });
};

export const useCancelOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ orderId, currentStatus }: { orderId: string; currentStatus: string }) =>
            OrderService.cancelOrder(orderId, currentStatus),
        onSuccess: () => {
            // Invalidate orders list to refresh the UI
            queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY });
        },
    });
};
