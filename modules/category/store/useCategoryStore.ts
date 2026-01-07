import { create } from 'zustand';

/**
 * UI state interface for category module
 */
interface CategoryUIState {
    // Selected category ID for filtering/highlighting
    selectedCategoryId: string | null;

    // Search/filter text for category search
    filterText: string;

    // Drawer state for category drawer
    isDrawerOpen: boolean;
}

/**
 * Actions for category UI state
 */
interface CategoryUIActions {
    setSelectedCategoryId: (id: string | null) => void;
    setFilterText: (text: string) => void;
    setIsDrawerOpen: (isOpen: boolean) => void;
    resetFilters: () => void;
}

/**
 * Zustand store for category UI state
 * Handles client-side state like selections, filters, and drawer state
 */
export const useCategoryStore = create<CategoryUIState & CategoryUIActions>((set) => ({
    // Initial state
    selectedCategoryId: null,
    filterText: '',
    isDrawerOpen: false,

    // Actions
    setSelectedCategoryId: (id) => set({ selectedCategoryId: id }),

    setFilterText: (text) => set({ filterText: text }),

    setIsDrawerOpen: (isOpen) => set({ isDrawerOpen: isOpen }),

    resetFilters: () => set({
        selectedCategoryId: null,
        filterText: '',
    }),
}));
