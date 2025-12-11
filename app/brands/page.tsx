'use client';

import React from 'react';
import { Header } from '@/core/components/layout/Header';
import { BottomNav } from '@/core/components/layout/BottomNav';
import Footer from '@/core/components/layout/Footer';
import { BrandCard } from '@/modules/brands/components/BrandCard';
import { PageBanner } from '@/core/components/shared/PageBanner';
import { BRANDS } from '@/core/constants';

const BrandsPage: React.FC = () => {
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
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
                            {BRANDS.map((brand) => (
                                <div key={brand.id}>
                                    <BrandCard brand={brand} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
            <BottomNav />
        </div>
    );
};

export default BrandsPage;
