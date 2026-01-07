import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useRef } from 'react';
import { CartService } from '../services/cart.service';
import { transformCartData, CartItem } from '../types';
import { useCartStore } from '../store/useCartStore';
import { useEffect } from 'react';

export const CART_QUERY_KEY = ['cart'] as const;
const STALE_TIME = 2 * 60 * 1000;
const DEBOUNCE_DELAY = 500; // Slightly longer for accumulation

export const useCart = (enabled: boolean = true) => {
    const { setCartData } = useCartStore();

    const query = useQuery({
        queryKey: CART_QUERY_KEY,
        queryFn: async () => {
            const response = await CartService.getCart();
            return {
                items: transformCartData(response.data),
                totalItems: response.totalItems ?? 0,
                finalPrice: response.final_price ?? 0,
            };
        },
        enabled,
        staleTime: STALE_TIME,
        gcTime: STALE_TIME * 2,
    });

    useEffect(() => {
        if (query.data) {
            setCartData(query.data.items, query.data.totalItems, query.data.finalPrice);
        }
    }, [query.data, setCartData]);

    return {
        ...query,
        items: query.data?.items ?? [],
        totalItems: query.data?.totalItems ?? 0,
        finalPrice: query.data?.finalPrice ?? 0,
    };
};

export const useAddToCart = () => {
    const queryClient = useQueryClient();
    const pendingRequests = useRef<Map<string, { timeout: NodeJS.Timeout; accumulation: number }>>(new Map());

    const mutation = useMutation({
        mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
            CartService.addToCart(productId, quantity),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
        },
    });

    const addToCart = useCallback((productId: string, delta: number = 1) => {
        const existing = pendingRequests.current.get(productId);

        if (existing) {
            clearTimeout(existing.timeout);
        }

        const newAccumulation = (existing?.accumulation ?? 0) + delta;

        // If accumulation reaches 0 (e.g., +1 then -1), we don't need to do anything
        if (newAccumulation === 0 && !existing) return;

        const timeout = setTimeout(() => {
            const finalAccumulation = pendingRequests.current.get(productId)?.accumulation ?? newAccumulation;
            if (finalAccumulation !== 0) {
                mutation.mutate({ productId, quantity: finalAccumulation });
            }
            pendingRequests.current.delete(productId);
        }, DEBOUNCE_DELAY);

        pendingRequests.current.set(productId, { timeout, accumulation: newAccumulation });
    }, [mutation]);

    return { addToCart, isAdding: mutation.isPending };
};

export const useCartActions = () => {
    const queryClient = useQueryClient();

    return {
        invalidateCart: () => queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY }),
        getCachedCart: () => queryClient.getQueryData<{
            items: CartItem[];
            totalItems: number;
            finalPrice: number;
        }>(CART_QUERY_KEY),
    };
};
export const useDeleteCartItem = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (cartId: string) => CartService.deleteCartItem(cartId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
        },
    });

    return {
        deleteItem: mutation.mutate,
        isDeleting: mutation.isPending,
        deletingId: mutation.variables
    };
};
