'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Header } from '@/core/components/layout/Header';
import { BottomNav } from '@/core/components/layout/BottomNav';
import Footer from '@/core/components/layout/Footer';
import { PageBanner } from '@/core/components/shared/PageBanner';
import ProductFilters from '@/modules/products/components/ProductFilters';
import ProductTopBar from '@/modules/products/components/ProductTopBar';
import FiltersDrawer from '@/modules/products/components/FiltersDrawer';
import SmartProductCard from '@/modules/products/components/SmartProductCard';
import ProductCardSkeleton from '@/modules/products/components/skeletons/ProductCardSkeleton';
import { Skeleton } from '@/core/components/ui/skeleton';

interface AppliedFilters {
    priceRange: { min: number; max: number };
    brands: string[];
    categories: string[];
}

import { useProducts, UseProductsParams } from '@/modules/products/hooks/useProducts';

import { useSearchParams } from 'next/navigation';

import { INITIAL_PRICE_RANGE } from '@/core/constants';

const ProductsContent: React.FC = () => {
    const searchParams = useSearchParams();
    const urlCategory = searchParams.get('category');
    const urlBrand = searchParams.get('brand');

    const [itemsPerPage, setItemsPerPage] = useState(4);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    // Initialize appliedFilters with URL params if present
    const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>(() => ({
        priceRange: INITIAL_PRICE_RANGE,
        brands: urlBrand ? [urlBrand] : [],
        categories: urlCategory ? [urlCategory] : []
    }));

    // Sync URL params to state when they change (e.g. user navigates to a new category)
    useEffect(() => {
        setAppliedFilters(prev => ({
            ...prev,
            brands: urlBrand ? [urlBrand] : prev.brands,
            categories: urlCategory ? [urlCategory] : prev.categories
        }));
    }, [urlCategory, urlBrand]);

    // Map applied filters to API params
    const getProductParams = (): UseProductsParams => {
        const params: UseProductsParams = {
            from: appliedFilters.priceRange.min,
            to: appliedFilters.priceRange.max,
        };

        if (appliedFilters.brands.length > 0) {
            params.brands = appliedFilters.brands.join(',');
        }

        if (appliedFilters.categories.length > 0) {
            params.categories = appliedFilters.categories.join(',');
        }

        params.limit = itemsPerPage;

        return params;
    };

    const { data: products = [], isLoading } = useProducts(getProductParams());

    const handleApplyFilters = (filters: AppliedFilters) => {
        setAppliedFilters(filters);
    };

    const handleClearFilters = () => {
        setAppliedFilters({
            priceRange: INITIAL_PRICE_RANGE,
            brands: [],
            categories: [],
        });
    };

    // Get products to display based on itemsPerPage
    const displayedProducts = products.slice(0, itemsPerPage);

    return (
        <div className="min-h-screen bg-[#f5f6f7] flex flex-col pb-16 lg:pb-0">
            <Header />

            {/* Main Content */}
            <main className="flex-1">
                {/* Page Banner */}
                <PageBanner
                    title="Our Products"
                    breadcrumbs={[
                        { label: 'Home', href: '/' },
                        { label: 'Products' }
                    ]}
                />

                {/* Products Section with Filters */}
                <div className="py-12 lg:py-16">
                    <div className="max-w-[1400px] mx-auto px-2 md:px-6 lg:px-14">
                        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                            {/* Sidebar Filters - Hidden on mobile */}
                            <aside className="hidden lg:block w-[280px] flex-shrink-0">
                                <div className="sticky top-4">
                                    <ProductFilters
                                        onApplyFilters={handleApplyFilters}
                                        onClearFilters={handleClearFilters}
                                    />
                                </div>
                            </aside>

                            {/* Products Grid */}
                            <div className="flex-1">
                                {/* Top Filter Bar */}
                                <ProductTopBar
                                    totalProducts={products.length}
                                    displayedCount={displayedProducts.length}
                                    itemsPerPage={itemsPerPage}
                                    onItemsPerPageChange={setItemsPerPage}
                                    onOpenFilters={() => setIsFiltersOpen(true)}
                                />

                                {isLoading ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-6">
                                        {[...Array(itemsPerPage || 8)].map((_, i) => (
                                            <div key={i}>
                                                <ProductCardSkeleton />
                                            </div>
                                        ))}
                                    </div>
                                ) : products.length === 0 ? (
                                    <div className="text-center py-20 bg-white rounded-lg shadow-sm">
                                        <p className="text-gray-500 text-lg">No products found matching your filters.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-6">
                                        {displayedProducts.map((product) => (
                                            <div key={product.id}>
                                                <SmartProductCard product={product} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
            <BottomNav />

            {/* Mobile Filters Drawer */}
            <FiltersDrawer
                isOpen={isFiltersOpen}
                onClose={() => setIsFiltersOpen(false)}
                onApplyFilters={handleApplyFilters}
                onClearFilters={handleClearFilters}
            />
        </div>
    );
};

const ProductsPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#f5f6f7] flex flex-col pb-16 lg:pb-0">
            <Header />
            <main className="flex-1">
                <div className="bg-emerald-900/10 py-10 lg:py-16">
                    <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-14">
                        <Skeleton className="h-10 w-64 mb-4" />
                        <div className="flex gap-2">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-4" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                    </div>
                </div>

                <div className="py-12 lg:py-16">
                    <div className="max-w-[1400px] mx-auto px-2 md:px-6 lg:px-14">
                        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                            <aside className="hidden lg:block w-[280px] flex-shrink-0">
                                <div className="space-y-6">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="space-y-3">
                                            <Skeleton className="h-6 w-32" />
                                            <div className="space-y-2">
                                                <Skeleton className="h-4 w-full" />
                                                <Skeleton className="h-4 w-full" />
                                                <Skeleton className="h-4 w-2/3" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </aside>
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-6">
                                    <Skeleton className="h-6 w-40" />
                                    <Skeleton className="h-8 w-32" />
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-6">
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                        <div key={i}>
                                            <ProductCardSkeleton />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
            <BottomNav />
        </div>
    );
};

const ProductsPageWrapper: React.FC = () => {
    return (
        <Suspense fallback={<ProductsPage />}>
            <ProductsContent />
        </Suspense>
    );
};

export default ProductsPageWrapper;
