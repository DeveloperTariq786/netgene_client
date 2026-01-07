import { create } from 'zustand';

/**
 * UI state interface for brands module
 */
interface BrandsUIState {
    // Selected brand ID for filtering/highlighting
    selectedBrandId: string | null;

    // Search/filter text for brand search
    filterText: string;

    // Drawer state for brands drawer
    isDrawerOpen: boolean;

    // View mode (grid or list)
    viewMode: 'grid' | 'list';
}

/**
 * Actions for brands UI state
 */
interface BrandsUIActions {
    setSelectedBrandId: (id: string | null) => void;
    setFilterText: (text: string) => void;
    setIsDrawerOpen: (isOpen: boolean) => void;
    setViewMode: (mode: 'grid' | 'list') => void;
    resetFilters: () => void;
}

/**
 * Zustand store for brands UI state
 * Handles client-side state like selections, filters, and drawer state
 */
export const useBrandsStore = create<BrandsUIState & BrandsUIActions>((set) => ({
    // Initial state
    selectedBrandId: null,
    filterText: '',
    isDrawerOpen: false,
    viewMode: 'grid',

    // Actions
    setSelectedBrandId: (id) => set({ selectedBrandId: id }),

    setFilterText: (text) => set({ filterText: text }),

    setIsDrawerOpen: (isOpen) => set({ isDrawerOpen: isOpen }),

    setViewMode: (mode) => set({ viewMode: mode }),

    resetFilters: () => set({
        selectedBrandId: null,
        filterText: '',
    }),
}));
