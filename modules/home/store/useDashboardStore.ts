import { create } from 'zustand';
import { Product } from '../types';

interface DashboardState {
    recentlySoldProducts: Product[];
    featuredProducts: Product[];
    newProducts: Product[];
    setRecentlySoldProducts: (products: Product[]) => void;
    setFeaturedProducts: (products: Product[]) => void;
    setNewProducts: (products: Product[]) => void;
    hasLoadedRecentlySold: boolean;
    setHasLoadedRecentlySold: (status: boolean) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
    recentlySoldProducts: [],
    featuredProducts: [],
    newProducts: [],
    setRecentlySoldProducts: (recentlySoldProducts) => set({ recentlySoldProducts }),
    setFeaturedProducts: (featuredProducts) => set({ featuredProducts }),
    setNewProducts: (newProducts) => set({ newProducts }),
    hasLoadedRecentlySold: false,
    setHasLoadedRecentlySold: (hasLoadedRecentlySold) => set({ hasLoadedRecentlySold }),
}));

