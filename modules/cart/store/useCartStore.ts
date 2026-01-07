import { create } from 'zustand';
import { CartItem } from '../types';

interface CartStore {
    items: CartItem[];
    isCartOpen: boolean;
    totalItems: number;
    totalPrice: number;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;
    setCartData: (items: CartItem[], totalItems: number, totalPrice: number) => void;
    updateQuantity: (id: string, delta: number) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
    items: [],
    isCartOpen: false,
    totalItems: 0,
    totalPrice: 0,

    openCart: () => set({ isCartOpen: true }),
    closeCart: () => set({ isCartOpen: false }),
    toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

    setCartData: (items, totalItems, totalPrice) => set({ items, totalItems, totalPrice }),

    updateQuantity: (id, delta) => set((state) => ({
        items: state.items.map((item) => {
            if (item.id !== id) return item;
            const quantity = Math.max(1, item.quantity + delta);
            return { ...item, quantity, totalPrice: item.price * quantity };
        })
    })),

    // Temporarily disabled local clearing as per request
    removeItem: (id) => {
        console.log('Remove item requested for ID:', id, '(Local clear disabled)');
    },

    clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
}));
