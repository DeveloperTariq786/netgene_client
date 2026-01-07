import { create } from 'zustand';
import { CarouselItem } from '../types';

interface CarouselState {
    carousels: CarouselItem[];
    loading: boolean;
    error: string | null;
    setCarousels: (carousels: CarouselItem[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useCarouselStore = create<CarouselState>((set) => ({
    carousels: [],
    loading: false,
    error: null,
    setCarousels: (carousels) => set({ carousels }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
}));
