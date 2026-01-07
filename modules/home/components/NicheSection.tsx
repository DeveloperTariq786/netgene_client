'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Tag, Star, BadgePercent } from 'lucide-react';
import SmartProductCard from '@/modules/products/components/SmartProductCard';
import { Product } from '@/modules/home/types';
import { useDashboard } from '../hooks/useDashboard';
import { ShowMoreButton } from '@/core/components/shared/ShowMoreButton';

type TabType = 'order' | 'rating' | 'discount';

interface NicheSectionProps {
    onProductClick?: (product: Product) => void;
    onQuickView?: (product: Product) => void;
}

export const NicheSection: React.FC<NicheSectionProps> = ({ onProductClick, onQuickView }) => {
    const [activeTab, setActiveTab] = useState<TabType>('order');
    const [nicheLimit, setNicheLimit] = useState(10);
    const [inView, setInView] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    // Reset limit when tab changes
    const handleTabChange = (tab: TabType) => {
        setActiveTab(tab);
        setNicheLimit(10);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: '100px' }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const { data: nicheProducts, isLoading: nicheLoading, isFetching: nicheFetching } = useDashboard({
        limit: nicheLimit,
        toporders: activeTab === 'order' ? 1 : undefined,
        topratings: activeTab === 'rating' ? 1 : undefined,
        topdiscount: activeTab === 'discount' ? 1 : undefined,
        enabled: inView
    });

    const handleShowMore = () => {
        setNicheLimit(prev => prev + 5);
    };




    return (
        <section ref={sectionRef as any} className="w-full pt-12 pb-8 md:pt-20 md:pb-12 bg-[#f7f7f7]">
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
                            onClick={() => handleTabChange('order')}
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
                            onClick={() => handleTabChange('rating')}
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
                            onClick={() => handleTabChange('discount')}
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
                    {nicheLoading && !nicheProducts ? (
                        Array.from({ length: 10 }).map((_, index) => (
                            <div key={`niche-pulse-${index}`} className="bg-white rounded-lg p-4 animate-pulse h-64">
                                <div className="bg-gray-200 rounded-md h-40 mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        ))
                    ) : (
                        <>
                            {nicheProducts?.map((product: Product) => (
                                <SmartProductCard
                                    key={`${activeTab}-${product.id}`}
                                    product={product}
                                    onClick={onProductClick}
                                    onQuickView={onQuickView}
                                    showNicheType={activeTab}
                                />
                            ))}
                            {/* Incremental loading skeletons */}
                            {nicheFetching && (
                                Array.from({ length: 5 }).map((_, index) => (
                                    <div key={`niche-more-pulse-${index}`} className="bg-white rounded-lg p-4 animate-pulse h-64">
                                        <div className="bg-gray-200 rounded-md h-40 mb-4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                ))
                            )}

                            {!nicheFetching && nicheProducts?.length === 0 && (
                                <div className="col-span-full text-center py-10">
                                    <p className="text-gray-500">No products found in this category.</p>
                                </div>
                            )}
                        </>
                    )}

                </div>

                {/* Show More Button - Simplified visibility for testing/interaction */}
                {nicheProducts && nicheProducts.length > 0 && (
                    <div className="flex justify-center mt-8 lg:mt-12">
                        <ShowMoreButton
                            onClick={handleShowMore}
                            disabled={nicheFetching}
                            label={nicheFetching ? "Loading..." : "Show More"}
                        />
                    </div>
                )}

            </div>
        </section>


    );
};

export default NicheSection;
