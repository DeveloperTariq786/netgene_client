'use client';

import React, { useState, useMemo } from 'react';
import { Tag, Star, BadgePercent } from 'lucide-react';
import ProductCard from '@/core/components/shared/ProductCard';
import { ProductBadge } from '@/core/components/shared/ProductBadge';
import { SAMPLE_PRODUCTS } from '@/core/constants/index';

type TabType = 'order' | 'rating' | 'discount';

export const NicheSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('order');

    // Filter and sort products based on active tab
    const filteredProducts = useMemo(() => {
        const products = [...SAMPLE_PRODUCTS];

        switch (activeTab) {
            case 'order':
                // Sort by review count (highest orders)
                return products.sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 5);
            case 'rating':
                // Sort by rating (highest rated)
                return products.sort((a, b) => b.rating - a.rating).slice(0, 5);
            case 'discount':
                // Sort by discount percentage (biggest discount)
                return products
                    .filter(p => p.onSale)
                    .sort((a, b) => {
                        const discountA = ((a.originalPrice - a.salePrice) / a.originalPrice) * 100;
                        const discountB = ((b.originalPrice - b.salePrice) / b.originalPrice) * 100;
                        return discountB - discountA;
                    })
                    .slice(0, 5);
            default:
                return products.slice(0, 5);
        }
    }, [activeTab]);

    // Function to get the appropriate badge based on active tab
    const getBadgeForProduct = (product: any) => {
        switch (activeTab) {
            case 'order':
                return product.topOrders ? <ProductBadge topOrders={product.topOrders} /> : null;
            case 'rating':
                return product.rating ? <ProductBadge topRated={`${product.rating} ★`} /> : null;
            case 'discount':
                return product.discountPercentage ? <ProductBadge topDiscount={`-${product.discountPercentage}%`} /> : null;
            default:
                return null;
        }
    };

    return (
        <section className="w-full pt-12 pb-8 md:pt-20 md:pb-12 bg-[#f7f7f7]">
            <div className="max-w-[1400px] mx-auto px-2 md:px-6 lg:px-14">
                {/* Section Title */}
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-[#2b2f33] mb-8 md:mb-12">
                    Browse By Top Niche
                </h2>

                {/* Filter Tabs Container */}
                <div className="w-full bg-white rounded-lg shadow-sm">
                    <div className="flex flex-col md:flex-row items-center justify-center">

                        {/* Top Order Tab */}
                        <button
                            onClick={() => setActiveTab('order')}
                            className={`w-full md:w-auto flex items-center justify-center gap-2 py-4 md:py-6 px-8 transition-colors duration-200 group relative
                ${activeTab === 'order' ? 'text-[#119744]' : 'text-[#39404a] hover:text-[#119744]'}
              `}
                        >
                            <Tag
                                className="w-5 h-5"
                                fill="currentColor"
                                strokeWidth={0}
                            />
                            <span className="font-bold text-sm md:text-base uppercase tracking-wide">Top Order</span>

                            {/* Vertical Divider (Desktop) */}
                            <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-8 bg-gray-200"></div>
                        </button>

                        {/* Top Rating Tab */}
                        <button
                            onClick={() => setActiveTab('rating')}
                            className={`w-full md:w-auto flex items-center justify-center gap-2 py-4 md:py-6 px-8 transition-colors duration-200 group relative
                ${activeTab === 'rating' ? 'text-[#119744]' : 'text-[#39404a] hover:text-[#119744]'}
              `}
                        >
                            <Star
                                className="w-5 h-5"
                                fill="currentColor"
                                strokeWidth={0}
                            />
                            <span className="font-bold text-sm md:text-base uppercase tracking-wide">Top Rating</span>

                            {/* Vertical Divider (Desktop) */}
                            <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-8 bg-gray-200"></div>
                        </button>

                        {/* Top Discount Tab */}
                        <button
                            onClick={() => setActiveTab('discount')}
                            className={`w-full md:w-auto flex items-center justify-center gap-2 py-4 md:py-6 px-8 transition-colors duration-200 group
                ${activeTab === 'discount' ? 'text-[#119744]' : 'text-[#39404a] hover:text-[#119744]'}
              `}
                        >
                            <BadgePercent
                                className="w-5 h-5"
                                fill="currentColor"
                                stroke="white"
                                strokeWidth={2}
                            />
                            <span className="font-bold text-sm md:text-base uppercase tracking-wide">Top Discount</span>
                        </button>

                    </div>
                </div>

                {/* Products Grid */}
                <div className="mt-8 md:mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 lg:gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            topLeftBadge={getBadgeForProduct(product)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NicheSection;
