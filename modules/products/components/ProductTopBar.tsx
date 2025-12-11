'use client';

import React, { useState } from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';

const ITEMS_PER_PAGE_OPTIONS = [12, 24, 36];

interface ProductTopBarProps {
    totalProducts: number;
    displayedCount: number;
    itemsPerPage: number;
    onItemsPerPageChange: (count: number) => void;
    onOpenFilters?: () => void;
}

const ProductTopBar: React.FC<ProductTopBarProps> = ({
    totalProducts,
    displayedCount,
    itemsPerPage,
    onItemsPerPageChange,
    onOpenFilters,
}) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleItemsPerPageChange = (count: number) => {
        onItemsPerPageChange(count);
        setShowDropdown(false);
    };

    return (
        <div className="flex items-center justify-between mb-6 bg-white rounded-lg px-4 py-3 shadow-sm">
            <div className="text-sm text-gray-600">
                Showing <span className="font-medium text-gray-800">{displayedCount}</span> of <span className="font-medium text-gray-800">{totalProducts}</span> products
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
                {/* Show Dropdown */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <span className="hidden sm:inline text-sm font-medium text-gray-700 uppercase tracking-wide">Show:</span>
                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center gap-2 bg-white border border-gray-200 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#119744]/30 min-w-[60px] sm:min-w-[70px] justify-between"
                        >
                            {itemsPerPage}
                            <ChevronDown size={16} className={`text-gray-500 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {showDropdown && (
                            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg py-1 min-w-[70px] z-20">
                                {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => handleItemsPerPageChange(option)}
                                        className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-50 ${option === itemsPerPage
                                            ? 'bg-[#119744] text-white hover:bg-[#0e7a35]'
                                            : 'text-gray-700'
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Filter Button - Only visible on mobile */}
                {onOpenFilters && (
                    <button
                        onClick={onOpenFilters}
                        className="lg:hidden flex items-center gap-2 bg-[#119744] text-white rounded-md px-3 py-2 text-sm font-medium hover:bg-[#0e7a35] transition-colors"
                    >
                        <SlidersHorizontal size={16} />
                        <span className="hidden sm:inline">Filters</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductTopBar;
