'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { Trash2, Check } from 'lucide-react';
import { Card } from '@/core/components/ui/card';
import { RatingStars } from '@/core/components/ui/rating-stars';
import { Button } from '@/core/components/ui/button';

interface PriceRange {
    min: number;
    max: number;
}

const MIN_PRICE = 0;
const MAX_PRICE = 5000;
const PRICE_STEP = 50;

interface RatingFilter {
    rating: number;
    count: number;
    checked: boolean;
}

interface FilterItem {
    id: string;
    name: string;
    count: number;
    checked: boolean;
}

// Initial filter states
const INITIAL_PRICE_RANGE: PriceRange = { min: MIN_PRICE, max: MAX_PRICE };

const INITIAL_RATINGS: RatingFilter[] = [
    { rating: 5, count: 13, checked: false },
    { rating: 4, count: 28, checked: false },
    { rating: 3, count: 35, checked: false },
    { rating: 2, count: 47, checked: false },
    { rating: 1, count: 59, checked: false },
];

const INITIAL_BRANDS: FilterItem[] = [
    { id: '1', name: 'Mari Gold', count: 13, checked: false },
    { id: '2', name: 'Tredar', count: 28, checked: false },
    { id: '3', name: 'Keya', count: 35, checked: false },
    { id: '4', name: 'Diamond', count: 47, checked: false },
    { id: '5', name: "Lilly's", count: 59, checked: false },
    { id: '6', name: 'Fremant', count: 64, checked: false },
    { id: '7', name: 'Avocads', count: 77, checked: false },
    { id: '8', name: 'Borcelas', count: 85, checked: false },
];

const INITIAL_CATEGORIES: FilterItem[] = [
    { id: '1', name: 'Vegetables', count: 13, checked: false },
    { id: '2', name: 'Groceries', count: 28, checked: false },
    { id: '3', name: 'Fruits', count: 35, checked: false },
    { id: '4', name: 'Dairy Farm', count: 47, checked: false },
    { id: '5', name: 'Sea Foods', count: 59, checked: false },
    { id: '6', name: 'Diet Foods', count: 64, checked: false },
    { id: '7', name: 'Dry Foods', count: 77, checked: false },
    { id: '8', name: 'Fast Foods', count: 85, checked: false },
];

interface AppliedFilters {
    priceRange: PriceRange;
    ratings: number[];
    brands: string[];
    categories: string[];
}

interface ProductFiltersProps {
    onApplyFilters?: (filters: AppliedFilters) => void;
    onClearFilters?: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
    onApplyFilters,
    onClearFilters,
}) => {
    // Current (pending) filter selections
    const [priceRange, setPriceRange] = useState<PriceRange>(INITIAL_PRICE_RANGE);
    const [ratingFilters, setRatingFilters] = useState<RatingFilter[]>(INITIAL_RATINGS);
    const [brandFilters, setBrandFilters] = useState<FilterItem[]>(INITIAL_BRANDS);
    const [categoryFilters, setCategoryFilters] = useState<FilterItem[]>(INITIAL_CATEGORIES);

    // Search states
    const [brandSearch, setBrandSearch] = useState('');
    const [categorySearch, setCategorySearch] = useState('');

    // Applied filter state (what was last applied)
    const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({
        priceRange: INITIAL_PRICE_RANGE,
        ratings: [],
        brands: [],
        categories: [],
    });

    // Check if there are pending changes (filters changed but not applied)
    const hasChanges = useMemo(() => {
        const currentRatings = ratingFilters.filter(f => f.checked).map(f => f.rating);
        const currentBrands = brandFilters.filter(f => f.checked).map(f => f.name);
        const currentCategories = categoryFilters.filter(f => f.checked).map(f => f.name);

        // Compare price
        const priceChanged = priceRange.min !== appliedFilters.priceRange.min ||
            priceRange.max !== appliedFilters.priceRange.max;

        // Compare ratings
        const ratingsChanged = JSON.stringify(currentRatings.sort()) !== JSON.stringify([...appliedFilters.ratings].sort());

        // Compare brands
        const brandsChanged = JSON.stringify(currentBrands.sort()) !== JSON.stringify([...appliedFilters.brands].sort());

        // Compare categories
        const categoriesChanged = JSON.stringify(currentCategories.sort()) !== JSON.stringify([...appliedFilters.categories].sort());

        return priceChanged || ratingsChanged || brandsChanged || categoriesChanged;
    }, [priceRange, ratingFilters, brandFilters, categoryFilters, appliedFilters]);

    // Count of active filters (currently applied)
    const activeFilterCount = useMemo(() => {
        let count = 0;
        if (appliedFilters.priceRange.min !== MIN_PRICE || appliedFilters.priceRange.max !== MAX_PRICE) count++;
        count += appliedFilters.ratings.length;
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
        const value = Math.min(Number(e.target.value), priceRange.max - PRICE_STEP);
        setPriceRange(prev => ({ ...prev, min: value }));
    }, [priceRange.max]);

    const handleMaxPriceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(e.target.value), priceRange.min + PRICE_STEP);
        setPriceRange(prev => ({ ...prev, max: value }));
    }, [priceRange.min]);

    // Calculate the percentage position for the slider track
    const minPercent = ((priceRange.min - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;
    const maxPercent = ((priceRange.max - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;

    const handleRatingToggle = (index: number) => {
        const newFilters = [...ratingFilters];
        newFilters[index] = { ...newFilters[index], checked: !newFilters[index].checked };
        setRatingFilters(newFilters);
    };

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
            ratings: ratingFilters.filter(f => f.checked).map(f => f.rating),
            brands: brandFilters.filter(f => f.checked).map(f => f.name),
            categories: categoryFilters.filter(f => f.checked).map(f => f.name),
        };

        setAppliedFilters(newAppliedFilters);
        onApplyFilters?.(newAppliedFilters);
    };

    // Clear all filters
    const handleClearAllFilters = () => {
        setPriceRange(INITIAL_PRICE_RANGE);
        setRatingFilters(INITIAL_RATINGS.map(f => ({ ...f, checked: false })));
        setBrandFilters(INITIAL_BRANDS.map(f => ({ ...f, checked: false })));
        setCategoryFilters(INITIAL_CATEGORIES.map(f => ({ ...f, checked: false })));
        setBrandSearch('');
        setCategorySearch('');

        const clearedFilters: AppliedFilters = {
            priceRange: INITIAL_PRICE_RANGE,
            ratings: [],
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
                        min={MIN_PRICE}
                        max={MAX_PRICE}
                        step={PRICE_STEP}
                        value={priceRange.min}
                        onChange={handleMinPriceChange}
                        className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#119744] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#119744] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-md"
                        style={{ zIndex: priceRange.min > MAX_PRICE - 100 ? 5 : 3 }}
                    />

                    {/* Max Range Input */}
                    <input
                        type="range"
                        min={MIN_PRICE}
                        max={MAX_PRICE}
                        step={PRICE_STEP}
                        value={priceRange.max}
                        onChange={handleMaxPriceChange}
                        className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#119744] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#119744] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-md"
                        style={{ zIndex: 4 }}
                    />
                </div>

                {/* Price Range Labels */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>${MIN_PRICE}</span>
                    <span>${MAX_PRICE}</span>
                </div>
            </Card>

            {/* Rating Filter */}
            <Card rounded="lg" shadow="sm" className="p-5">
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-5">
                    Filter By Rating
                </h3>

                <div className="space-y-3">
                    {ratingFilters.map((filter, index) => (
                        <label
                            key={filter.rating}
                            className="flex items-center justify-between cursor-pointer group"
                        >
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={filter.checked}
                                    onChange={() => handleRatingToggle(index)}
                                    className="w-4 h-4 text-[#119744] accent-[#119744] border-gray-300 rounded focus:ring-[#119744]/30 cursor-pointer"
                                />
                                <RatingStars
                                    rating={filter.rating}
                                    showReviewCount={false}
                                    starSize="md"
                                />
                            </div>
                            <span className="text-sm text-gray-600 font-medium">
                                ({filter.count})
                            </span>
                        </label>
                    ))}
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
                    {filteredBrands.map((brand) => (
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
                    ))}
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
                    {filteredCategories.map((category) => (
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
                    ))}
                </div>
            </Card>


        </div>
    );
};

export default ProductFilters;
