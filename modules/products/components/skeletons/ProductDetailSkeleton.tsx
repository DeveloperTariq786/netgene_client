'use client';

import React from 'react';
import { Card } from '@/core/components/ui/card';
import { Skeleton } from '@/core/components/ui/skeleton';
import { cn } from '@/core/utils/utils';

interface ProductDetailSkeletonProps {
    isModal?: boolean;
}

const ProductDetailSkeleton: React.FC<ProductDetailSkeletonProps> = ({ isModal = false }) => {
    const Container = isModal ? React.Fragment : Card;
    const containerProps = isModal ? {} : { shadow: "lg", rounded: "lg" };

    return (
        <div className={isModal ? "p-4 md:p-6 lg:p-8" : "py-10 lg:py-14"}>
            <div className={isModal ? "" : "max-w-[1250px] mx-auto px-4 md:px-6 lg:px-14"}>
                <div className="flex flex-col md:flex-row gap-6 md:items-start justify-center">
                    {/* Left Column: Product Images Card Skeleton */}
                    <div className="w-full md:w-1/2 flex flex-col gap-4">
                        <Container {...(containerProps as any)} className={cn("p-6 md:p-8 flex flex-col justify-center", isModal ? "" : "md:h-[540px]")}>
                            <div className="relative w-full aspect-square bg-white rounded-lg flex items-center justify-center overflow-hidden">
                                <Skeleton className="w-full h-full" />
                            </div>
                        </Container>

                        {/* Thumbnails Skeleton */}
                        <div className="flex gap-3 overflow-x-auto pb-2 justify-center no-scrollbar">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className={`flex-shrink-0 border-2 border-gray-100 rounded-md overflow-hidden p-1 ${isModal ? 'w-16 h-16 md:w-20 md:h-20' : 'w-24 h-24'}`}>
                                    <Skeleton className="w-full h-full" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Product Details Card Skeleton */}
                    <Container {...(containerProps as any)} className={cn("w-full md:w-1/2 p-0 md:p-0 flex flex-col justify-start", isModal ? "" : "p-6 md:p-8 md:h-[540px]")}>
                        <div className={isModal ? "p-0" : "p-0"}>
                            <Skeleton className="h-8 md:h-10 w-3/4 mb-4" />

                            <div className="flex gap-4 mb-6">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-28" />
                            </div>

                            <Skeleton className="h-10 w-48 mb-6" />
                            <Skeleton className="h-12 w-40 mb-8" />

                            <div className="space-y-3 mb-8">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-4/5" />
                            </div>

                            <div className="flex items-center gap-2 mb-8">
                                <Skeleton className="h-4 w-12" />
                                <div className="flex gap-2">
                                    <Skeleton className="h-6 w-16" />
                                    <Skeleton className="h-6 w-16" />
                                </div>
                            </div>

                            <div className="mt-auto">
                                <Skeleton className="h-14 md:h-16 w-full rounded-md" />
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailSkeleton;
