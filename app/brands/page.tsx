'use client';

import React from 'react';
import { Header } from '@/core/components/layout/Header';
import { BottomNav } from '@/core/components/layout/BottomNav';
import Footer from '@/core/components/layout/Footer';
import { BrandCard } from '@/modules/brands/components/BrandCard';
import { PageBanner } from '@/core/components/shared/PageBanner';
import { useBrands } from '@/modules/brands/hooks/useBrands';
import { Loader2 } from 'lucide-react';
import { BrandCardSkeleton } from '@/modules/brands/components/skeletons/BrandCardSkeleton';

const BrandsPage: React.FC = () => {
    const { data: brands, isLoading, error } = useBrands();

    return (
        <div className="min-h-screen bg-[#f5f6f7] flex flex-col pb-16 lg:pb-0">
            <Header />

            {/* Main Content */}
            <main className="flex-1">
                {/* Page Banner */}
                <PageBanner
                    title="Our Brands"
                    breadcrumbs={[
                        { label: 'Home', href: '/' },
                        { label: 'Brands' }
                    ]}
                />

                {/* Brands Grid */}
                <div className="py-12 lg:py-16">
                    <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-14">
                        {isLoading ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
                                {[...Array(10)].map((_, i) => (
                                    <div key={i}>
                                        <BrandCardSkeleton />
                                    </div>
                                ))}
                            </div>
                        ) : error ? (
                            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                                <p className="text-lg font-medium text-red-500 mb-2">Oops! Something went wrong.</p>
                                <p className="text-gray-600">We couldn't load the brands. Please try again later.</p>
                            </div>
                        ) : brands && brands.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
                                {brands.map((brand) => (
                                    <div key={brand.id}>
                                        <BrandCard brand={brand} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                                <p className="text-lg font-medium text-gray-500">No brands found at the moment.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
            <BottomNav />
        </div>
    );
};

export default BrandsPage;

