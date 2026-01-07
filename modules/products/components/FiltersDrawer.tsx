'use client';

import React, { useEffect } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import ProductFilters from './ProductFilters';

interface AppliedFilters {
    priceRange: { min: number; max: number };
    brands: string[];
    categories: string[];
}

interface FiltersDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onApplyFilters?: (filters: AppliedFilters) => void;
    onClearFilters?: () => void;
}

const FiltersDrawer: React.FC<FiltersDrawerProps> = ({
    isOpen,
    onClose,
    onApplyFilters,
    onClearFilters,
}) => {
    // Lock body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleApplyFilters = (filters: AppliedFilters) => {
        onApplyFilters?.(filters);
        onClose(); // Close drawer after applying filters
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/60 z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Drawer Panel - slides from right */}
            <div
                className={`fixed top-0 right-0 h-full w-[320px] max-w-[85vw] bg-[#f5f6f7] z-[101] transform transition-transform duration-300 ease-out shadow-2xl flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
                    <div className="flex items-center gap-3">
                        <SlidersHorizontal className="text-[#119744]" size={22} strokeWidth={2.5} />
                        <h2 className="text-lg font-bold text-gray-800 tracking-tight">Filters</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                    >
                        <X size={20} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Filters Content */}
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    <ProductFilters
                        onApplyFilters={handleApplyFilters}
                        onClearFilters={onClearFilters}
                    />
                </div>
            </div>
        </>
    );
};

export default FiltersDrawer;
