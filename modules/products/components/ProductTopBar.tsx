'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, SlidersHorizontal, LayoutGrid } from 'lucide-react';

const ITEMS_PER_PAGE_OPTIONS = [1, 2, 3];

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
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleItemsPerPageChange = (count: number) => {
        onItemsPerPageChange(count);
        setShowDropdown(false);
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 bg-white/80 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 shadow-sm sticky top-[72px] z-30 transition-all duration-300">
            <div className="flex items-center gap-2 mb-3 sm:mb-0">
                <div className="p-2 bg-emerald-50 rounded-lg">
                    <LayoutGrid size={18} className="text-[#119744]" />
                </div>
                <div className="text-sm text-gray-600">
                    Showing <span className="font-bold text-gray-900">{displayedCount}</span> of <span className="font-bold text-gray-900">{totalProducts}</span> products
                </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                {/* Items Per Page Selector */}
                <div className="flex items-center gap-2" ref={dropdownRef}>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest hidden md:inline">Show:</span>
                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className={`flex items-center gap-3 bg-white border rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 min-w-[90px] justify-between shadow-sm hover:shadow-md ${showDropdown ? 'border-[#119744] ring-4 ring-emerald-50 text-[#119744]' : 'border-gray-200 text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {itemsPerPage}
                            <ChevronDown size={14} className={`transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Premium Dropdown Menu */}
                        <div className={`absolute right-0 top-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl py-2 min-w-[100px] z-50 transition-all duration-200 origin-top transform ${showDropdown ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                            }`}>
                            <div className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50 mb-1">
                                Per Page
                            </div>
                            {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => handleItemsPerPageChange(option)}
                                    className={`w-full px-4 py-2 text-sm text-left transition-colors flex items-center justify-between ${option === itemsPerPage
                                        ? 'text-[#119744] font-bold bg-emerald-50'
                                        : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    {option}
                                    {option === itemsPerPage && <div className="w-1.5 h-1.5 rounded-full bg-[#119744]" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Filter Trigger - Only visible on mobile/tablet */}
                {onOpenFilters && (
                    <button
                        onClick={onOpenFilters}
                        className="lg:hidden flex items-center gap-2 bg-[#119744] text-white rounded-lg px-4 py-2 text-sm font-bold shadow-lg shadow-emerald-700/20 hover:bg-[#0e7a35] transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <SlidersHorizontal size={16} />
                        <span>Filters</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductTopBar;
