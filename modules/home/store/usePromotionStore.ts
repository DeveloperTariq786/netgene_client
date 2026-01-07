import { create } from 'zustand';
import { PromotionItem } from '../types';

interface PromotionState {
    promotions: PromotionItem[];
    loading: boolean;
    error: string | null;
    setPromotions: (promotions: PromotionItem[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export const usePromotionStore = create<PromotionState>((set) => ({
    promotions: [],
    loading: false,
    error: null,
    setPromotions: (promotions) => set({ promotions }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
}));
