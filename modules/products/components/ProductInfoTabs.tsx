'use client';

import React, { useState } from 'react';
import { FileText, MessageSquare } from 'lucide-react';
import { Product } from '@/modules/home/types';
import { ProductDescription } from './ProductDescription';
import { ProductReviews } from './ProductReviews';

type TabType = 'description' | 'reviews';

interface ProductInfoTabsProps {
    product: Product;
}

export const ProductInfoTabs: React.FC<ProductInfoTabsProps> = ({ product }) => {
    const [activeTab, setActiveTab] = useState<TabType>('description');

    return (
        <section className="w-full py-8 lg:py-12">
            <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-14">
                {/* Tabs Container */}
                <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Tab Buttons */}
                    <div className="flex items-center border-b border-gray-200">
                        {/* Description Tab */}
                        <button
                            onClick={() => setActiveTab('description')}
                            className={`flex-1 flex items-center justify-center gap-2 py-4 md:py-5 px-6 transition-all duration-200 relative
                                ${activeTab === 'description'
                                    ? 'text-[#119744] bg-[#f7fbf9]'
                                    : 'text-[#39404a] hover:text-[#119744] hover:bg-gray-50'
                                }
                            `}
                        >
                            <FileText className="w-5 h-5" />
                            <span className="font-bold text-sm md:text-base uppercase tracking-wide">
                                Description
                            </span>
                            {/* Active Indicator */}
                            {activeTab === 'description' && (
                                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#119744]"></div>
                            )}
                        </button>

                        {/* Reviews Tab */}
                        <button
                            onClick={() => setActiveTab('reviews')}
                            className={`flex-1 flex items-center justify-center gap-2 py-4 md:py-5 px-6 transition-all duration-200 relative
                                ${activeTab === 'reviews'
                                    ? 'text-[#119744] bg-[#f7fbf9]'
                                    : 'text-[#39404a] hover:text-[#119744] hover:bg-gray-50'
                                }
                            `}
                        >
                            <MessageSquare className="w-5 h-5" />
                            <span className="font-bold text-sm md:text-base uppercase tracking-wide">
                                Reviews
                            </span>
                            {/* Active Indicator */}
                            {activeTab === 'reviews' && (
                                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#119744]"></div>
                            )}
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6 md:p-8 lg:p-10">
                        {activeTab === 'description' && <ProductDescription product={product} />}
                        {activeTab === 'reviews' && <ProductReviews product={product} />}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductInfoTabs;
