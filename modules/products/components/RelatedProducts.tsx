"use client";

import React, { useState } from 'react';
import SmartProductCard from './SmartProductCard';
import { useProducts } from '../hooks/useProducts';
import { ShowMoreButton } from '@/core/components/shared/ShowMoreButton';
import { Skeleton } from '@/core/components/ui/skeleton';

interface RelatedProductsProps {
    currentProductId: string;
    brandId?: string;
    categoryId?: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
    currentProductId,
    brandId,
    categoryId
}) => {
    const [limit, setLimit] = useState(8);
    const { data: products, isLoading, isFetching } = useProducts({
        categories: categoryId,
        limit: limit + 1
    });

    if (isLoading) {
        return (
            <div className="py-12 lg:py-16">
                <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-14">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 text-center">Related Products</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
                        {[...Array(5)].map((_, i) => (
                            <Skeleton key={i} className="aspect-[4/5] w-full rounded-xl" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Filter out the current product
    const filteredProducts = (products || [])
        .filter(p => String(p.id) !== String(currentProductId))
        .slice(0, limit);

    return (
        <div className="py-12 lg:py-16 bg-white/50">
            <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-14">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 text-center">Related Products</h2>

                {filteredProducts.length > 0 ? (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
                            {filteredProducts.map((product) => (
                                <div key={product.id}>
                                    <SmartProductCard product={product} />
                                </div>
                            ))}
                        </div>

                        {filteredProducts.length >= limit && (
                            <div className="flex justify-center mt-12">
                                <ShowMoreButton
                                    label={isFetching ? "Loading..." : "Show More"}
                                    onClick={() => setLimit(prev => prev + 4)}
                                />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <p className="text-gray-500 text-sm italic">No related products found in this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RelatedProducts;
