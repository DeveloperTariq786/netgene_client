'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Trash2, Check, Loader2 } from 'lucide-react';
import { Card } from '@/core/components/ui/card';
import { Button } from '@/core/components/ui/button';
import { useSearchParams } from 'next/navigation';
import { useCategories } from '@/modules/category/hooks/useCategories';
import { useBrands } from '@/modules/brands/hooks/useBrands';
import { INITIAL_PRICE_RANGE, PRICE_RANGE_LIMITS } from '@/core/constants';
import { PriceRange, FilterItem, AppliedFilters } from '../types';

interface ProductFiltersProps {
    onApplyFilters?: (filters: AppliedFilters) => void;
    onClearFilters?: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
    onApplyFilters,
    onClearFilters,
}) => {
    const searchParams = useSearchParams();
    const urlCategory = searchParams.get('category');
    const urlBrand = searchParams.get('brand');

    // API Data
    const { data: categoriesData, isLoading: isLoadingCategories } = useCategories();
    const { data: brandsData, isLoading: isLoadingBrands } = useBrands();

    // Current (pending) filter selections
    const [priceRange, setPriceRange] = useState<PriceRange>(INITIAL_PRICE_RANGE);
    const [brandFilters, setBrandFilters] = useState<FilterItem[]>([]);
    const [categoryFilters, setCategoryFilters] = useState<FilterItem[]>([]);

    // Search states
    const [brandSearch, setBrandSearch] = useState('');
    const [categorySearch, setCategorySearch] = useState('');

    // Applied filter state (what was last applied)
    const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({
        priceRange: INITIAL_PRICE_RANGE,
        brands: [],
        categories: [],
    });

    // Initialize/Sync brands from API
    useEffect(() => {
        if (brandsData) {
            setBrandFilters(prev => {
                const checkedIds = new Set(prev.filter(b => b.checked).map(b => b.id));
                if (urlBrand) checkedIds.add(urlBrand);

                return brandsData.map(brand => ({
                    id: brand.id,
                    name: brand.name,
                    count: brand.itemsCount,
                    checked: checkedIds.has(brand.id)
                }));
            });
        }
    }, [brandsData, urlBrand]);

    // Initialize/Sync categories from API
    useEffect(() => {
        if (categoriesData) {
            setCategoryFilters(prev => {
                const checkedIds = new Set(prev.filter(c => c.checked).map(c => c.id));
                if (urlCategory) checkedIds.add(urlCategory);

                return categoriesData.map(cat => ({
                    id: cat.id,
                    name: cat.title,
                    count: cat.count,
                    checked: checkedIds.has(cat.id)
                }));
            });
        }
    }, [categoriesData, urlCategory]);

    // Check if there are pending changes (filters changed but not applied)
    const hasChanges = useMemo(() => {
        const currentBrands = brandFilters.filter(f => f.checked).map(f => f.id);
        const currentCategories = categoryFilters.filter(f => f.checked).map(f => f.id);

        // Compare price
        const priceChanged = priceRange.min !== appliedFilters.priceRange.min ||
            priceRange.max !== appliedFilters.priceRange.max;

        // Compare brands
        const brandsChanged = JSON.stringify(currentBrands.sort()) !== JSON.stringify([...appliedFilters.brands].sort());

        // Compare categories
        const categoriesChanged = JSON.stringify(currentCategories.sort()) !== JSON.stringify([...appliedFilters.categories].sort());

        return priceChanged || brandsChanged || categoriesChanged;
    }, [priceRange, brandFilters, categoryFilters, appliedFilters]);

    // Count of active filters (currently applied)
    const activeFilterCount = useMemo(() => {
        let count = 0;
        if (appliedFilters.priceRange.min !== PRICE_RANGE_LIMITS.MIN || appliedFilters.priceRange.max !== PRICE_RANGE_LIMITS.MAX) count++;
        count += appliedFilters.brands.length;
        count += appliedFilters.categories.length;
        return count;
    }, [appliedFilters]);

    // Filtered brands based on search
    const filteredBrands = useMemo(() => {
        if (!brandSearch.trim()) return brandFilters;
        return brandFilters.filter((brand) =>
            brand.name.toLowerCase().includes(brandSearch.toLowerCase())
        );
    }, [brandFilters, brandSearch]);

    // Filtered categories based on search
    const filteredCategories = useMemo(() => {
        if (!categorySearch.trim()) return categoryFilters;
        return categoryFilters.filter((category) =>
            category.name.toLowerCase().includes(categorySearch.toLowerCase())
        );
    }, [categoryFilters, categorySearch]);

    const handleMinPriceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(e.target.value), priceRange.max - PRICE_RANGE_LIMITS.STEP);
        setPriceRange(prev => ({ ...prev, min: value }));
    }, [priceRange.max]);

    const handleMaxPriceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(e.target.value), priceRange.min + PRICE_RANGE_LIMITS.STEP);
        setPriceRange(prev => ({ ...prev, max: value }));
    }, [priceRange.min]);

    // Calculate the percentage position for the slider track
    const minPercent = ((priceRange.min - PRICE_RANGE_LIMITS.MIN) / (PRICE_RANGE_LIMITS.MAX - PRICE_RANGE_LIMITS.MIN)) * 100;
    const maxPercent = ((priceRange.max - PRICE_RANGE_LIMITS.MIN) / (PRICE_RANGE_LIMITS.MAX - PRICE_RANGE_LIMITS.MIN)) * 100;

    const handleBrandToggle = (id: string) => {
        setBrandFilters(prev => prev.map((brand) =>
            brand.id === id ? { ...brand, checked: !brand.checked } : brand
        ));
    };

    const handleCategoryToggle = (id: string) => {
        setCategoryFilters(prev => prev.map((category) =>
            category.id === id ? { ...category, checked: !category.checked } : category
        ));
    };

    // Apply all current filters
    const handleApplyFilters = () => {
        const newAppliedFilters: AppliedFilters = {
            priceRange: { ...priceRange },
            brands: brandFilters.filter(f => f.checked).map(f => f.id),
            categories: categoryFilters.filter(f => f.checked).map(f => f.id),
        };

        setAppliedFilters(newAppliedFilters);
        onApplyFilters?.(newAppliedFilters);
    };

    // Clear all filters
    const handleClearAllFilters = () => {
        setPriceRange(INITIAL_PRICE_RANGE);
        setBrandFilters(prev => prev.map(f => ({ ...f, checked: false })));
        setCategoryFilters(prev => prev.map(f => ({ ...f, checked: false })));
        setBrandSearch('');
        setCategorySearch('');

        const clearedFilters: AppliedFilters = {
            priceRange: INITIAL_PRICE_RANGE,
            brands: [],
            categories: [],
        };
        setAppliedFilters(clearedFilters);
        onClearFilters?.();
    };

    return (
        <div className="space-y-4">
            {/* Top Action Buttons - Styled to match ProductTopBar */}
            <div className="bg-white rounded-lg px-4 py-3 shadow-sm mb-4">
                <div className="flex gap-2">
                    {/* Apply Filters Button */}
                    <Button
                        variant="primary"
                        onClick={handleApplyFilters}
                        disabled={!hasChanges}
                        className={`flex-1 bg-[#119744] hover:bg-[#0e7a35] text-white font-medium py-2 rounded-md flex items-center justify-center gap-2 transition-all ${hasChanges ? 'opacity-100' : 'opacity-50'
                            }`}
                    >
                        <Check size={16} />
                        Apply
                        {hasChanges && (
                            <span className="bg-white/20 w-2 h-2 rounded-full animate-pulse"></span>
                        )}
                    </Button>

                    {/* Clear All Button */}
                    <Button
                        variant="secondary"
                        onClick={handleClearAllFilters}
                        disabled={activeFilterCount === 0 && !hasChanges}
                        className={`flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded-md flex items-center justify-center gap-2 transition-all ${activeFilterCount === 0 && !hasChanges ? 'opacity-50' : 'opacity-100'
                            }`}
                    >
                        <Trash2 size={16} />
                        Clear
                    </Button>
                </div>

                {/* Active Filters Count */}
                {activeFilterCount > 0 && (
                    <div className="mt-2 text-center text-sm font-medium text-[#119744]">
                        {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} applied
                    </div>
                )}
            </div>

            {/* Price Filter */}
            <Card rounded="lg" shadow="sm" className="p-5">
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-5">
                    Filter By Price
                </h3>

                {/* Price Display */}
                <div className="flex items-center justify-between mb-4">
                    <div className="bg-gray-100 px-3 py-2 rounded-md">
                        <span className="text-sm font-medium text-gray-700">${priceRange.min}</span>
                    </div>
                    <span className="text-gray-400">—</span>
                    <div className="bg-gray-100 px-3 py-2 rounded-md">
                        <span className="text-sm font-medium text-gray-700">${priceRange.max}</span>
                    </div>
                </div>

                {/* Dual Range Slider */}
                <div className="relative h-2 mb-6">
                    {/* Background Track */}
                    <div className="absolute w-full h-2 bg-gray-200 rounded-full"></div>

                    {/* Active Track (colored portion between handles) */}
                    <div
                        className="absolute h-2 bg-[#119744] rounded-full"
                        style={{
                            left: `${minPercent}%`,
                            width: `${maxPercent - minPercent}%`,
                        }}
                    ></div>

                    {/* Min Range Input */}
                    <input
                        type="range"
                        min={PRICE_RANGE_LIMITS.MIN}
                        max={PRICE_RANGE_LIMITS.MAX}
                        step={PRICE_RANGE_LIMITS.STEP}
                        value={priceRange.min}
                        onChange={handleMinPriceChange}
                        className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#119744] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#119744] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-md"
                        style={{ zIndex: priceRange.min > PRICE_RANGE_LIMITS.MAX - 100 ? 5 : 3 }}
                    />

                    {/* Max Range Input */}
                    <input
                        type="range"
                        min={PRICE_RANGE_LIMITS.MIN}
                        max={PRICE_RANGE_LIMITS.MAX}
                        step={PRICE_RANGE_LIMITS.STEP}
                        value={priceRange.max}
                        onChange={handleMaxPriceChange}
                        className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#119744] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#119744] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-md"
                        style={{ zIndex: 4 }}
                    />
                </div>

                {/* Price Range Labels */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>${PRICE_RANGE_LIMITS.MIN}</span>
                    <span>${PRICE_RANGE_LIMITS.MAX}</span>
                </div>
            </Card>

            {/* Brand Filter */}
            <Card rounded="lg" shadow="sm" className="p-5">
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-5">
                    Filter By Brand
                </h3>

                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search..."
                    value={brandSearch}
                    onChange={(e) => setBrandSearch(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm text-gray-600 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#119744]/30 focus:border-[#119744] placeholder:text-gray-400 mb-4"
                />

                {/* Scrollable Brand List */}
                <div className="max-h-[280px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                    {isLoadingBrands ? (
                        <div className="flex flex-col items-center justify-center py-6 gap-2">
                            <Loader2 className="w-5 h-5 text-emerald-500 animate-spin" />
                            <span className="text-xs text-gray-400">Loading Brands...</span>
                        </div>
                    ) : filteredBrands.length > 0 ? (
                        filteredBrands.map((brand) => (
                            <label
                                key={brand.id}
                                className="flex items-center justify-between cursor-pointer group"
                            >
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={brand.checked}
                                        onChange={() => handleBrandToggle(brand.id)}
                                        className="w-4 h-4 text-[#119744] accent-[#119744] border-gray-300 rounded focus:ring-[#119744]/30 cursor-pointer"
                                    />
                                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                                        {brand.name}
                                    </span>
                                </div>
                                <span className="text-sm text-gray-600 font-medium">
                                    ({brand.count})
                                </span>
                            </label>
                        ))
                    ) : (
                        <div className="text-center py-4">
                            <span className="text-xs text-gray-400 italic">No brands found</span>
                        </div>
                    )}
                </div>
            </Card>

            {/* Category Filter */}
            <Card rounded="lg" shadow="sm" className="p-5">
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-5">
                    Filter By Category
                </h3>

                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search..."
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm text-gray-600 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#119744]/30 focus:border-[#119744] placeholder:text-gray-400 mb-4"
                />

                {/* Scrollable Category List */}
                <div className="max-h-[280px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                    {isLoadingCategories ? (
                        <div className="flex flex-col items-center justify-center py-6 gap-2">
                            <Loader2 className="w-5 h-5 text-emerald-500 animate-spin" />
                            <span className="text-xs text-gray-400">Loading Categories...</span>
                        </div>
                    ) : filteredCategories.length > 0 ? (
                        filteredCategories.map((category) => (
                            <label
                                key={category.id}
                                className="flex items-center justify-between cursor-pointer group"
                            >
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={category.checked}
                                        onChange={() => handleCategoryToggle(category.id)}
                                        className="w-4 h-4 text-[#119744] accent-[#119744] border-gray-300 rounded focus:ring-[#119744]/30 cursor-pointer"
                                    />
                                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                                        {category.name}
                                    </span>
                                </div>
                                <span className="text-sm text-gray-600 font-medium">
                                    ({category.count})
                                </span>
                            </label>
                        ))
                    ) : (
                        <div className="text-center py-4">
                            <span className="text-xs text-gray-400 italic">No categories found</span>
                        </div>
                    )}
                </div>
            </Card>


        </div>
    );
};

export default ProductFilters;
