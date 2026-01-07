import { apiClient } from '@/core/api/axios/client';
import { ORDER_ENDPOINTS } from '@/core/api/endpoint/endpoints';
import { PlaceOrderResponse, GetOrdersResponse } from '../types';

export const OrderService = {
    /**
     * Place a new order
     * @param customerId The ID of the customer
     * @param addressId The ID of the selected address
     */
    placeOrder: async (customerId: string, addressId: string): Promise<PlaceOrderResponse> => {
        const response = await apiClient.post<PlaceOrderResponse>(
            `${ORDER_ENDPOINTS.PLACE_ORDER}?customer_id=${customerId}&address_id=${addressId}`
        );
        return response.data;
    },

    /**
     * Fetch all orders for the current user
     * @param page Optional page number for pagination
     * @param limit Optional limit for pagination
     */
    getOrders: async (page: number = 1, limit: number = 10): Promise<GetOrdersResponse> => {
        const response = await apiClient.get<GetOrdersResponse>(
            `${ORDER_ENDPOINTS.GET_ORDERS}?page=${page}&limit=${limit}`
        );
        return response.data;
    },

    /**
     * Cancel an existing order
     * @param orderId The ID of the order to cancel
     * @param currentStatus The current status of the order
     */
    cancelOrder: async (orderId: string, currentStatus: string): Promise<{ success: boolean; message: string }> => {
        const response = await apiClient.post<{ success: boolean; message: string }>(
            `${ORDER_ENDPOINTS.CANCEL_ORDER}?order_id=${orderId}`,
            { order_status: currentStatus }
        );
        return response.data;
    },
};
