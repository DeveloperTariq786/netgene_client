'use client';

import React, { useState } from 'react';
import { Header } from '@/core/components/layout/Header';
import { BottomNav } from '@/core/components/layout/BottomNav';
import Footer from '@/core/components/layout/Footer';
import ProductCard from '@/core/components/shared/ProductCard';
import { PageBanner } from '@/core/components/shared/PageBanner';
import ProductFilters from '@/modules/products/components/ProductFilters';
import ProductTopBar from '@/modules/products/components/ProductTopBar';
import FiltersDrawer from '@/modules/products/components/FiltersDrawer';
import { SAMPLE_PRODUCTS } from '@/core/constants';

interface AppliedFilters {
    priceRange: { min: number; max: number };
    ratings: number[];
    brands: string[];
    categories: string[];
}

const ProductsPage: React.FC = () => {
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [appliedFilters, setAppliedFilters] = useState<AppliedFilters | null>(null);

    const handleApplyFilters = (filters: AppliedFilters) => {
        console.log('Filters applied:', filters);
        setAppliedFilters(filters);
        // TODO: Implement actual product filtering based on filters
    };

    const handleClearFilters = () => {
        console.log('Filters cleared');
        setAppliedFilters(null);
    };

    // Get products to display based on itemsPerPage
    const displayedProducts = SAMPLE_PRODUCTS.slice(0, itemsPerPage);

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
                                    totalProducts={SAMPLE_PRODUCTS.length}
                                    displayedCount={displayedProducts.length}
                                    itemsPerPage={itemsPerPage}
                                    onItemsPerPageChange={setItemsPerPage}
                                    onOpenFilters={() => setIsFiltersOpen(true)}
                                />
                                {/* Products Grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-6">
                                    {displayedProducts.map((product) => (
                                        <div key={product.id}>
                                            <ProductCard product={product} />
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

export default ProductsPage;
