import { apiClient } from '@/core/api/axios/client';
import { CART_ENDPOINTS } from '@/core/api/endpoint/endpoints';
import { GetCartResponse, AddToCartResponse } from '../types';

export const CartService = {
    getCart: async (): Promise<GetCartResponse> => {
        const response = await apiClient.get<GetCartResponse>(CART_ENDPOINTS.GET_CART);
        return response.data;
    },

    addToCart: async (productId: string, quantity: number = 1): Promise<AddToCartResponse> => {
        const response = await apiClient.post<AddToCartResponse>(
            `${CART_ENDPOINTS.ADD_TO_CART}?product_id=${productId}`,
            { no_of_products: quantity }
        );
        return response.data;
    },

    deleteCartItem: async (cartId: string): Promise<any> => {
        const response = await apiClient.delete(
            `${CART_ENDPOINTS.DELETE_CART_ITEM}?cart_id=${cartId}`
        );
        return response.data;
    },
};
