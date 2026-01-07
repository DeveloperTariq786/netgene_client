import React from 'react';
import { Card } from '@/core/components/ui/card';
import { Skeleton } from '@/core/components/ui/skeleton';

const ProductCardSkeleton: React.FC = () => {
    return (
        <Card
            maxWidth="320px"
            rounded="lg"
            shadow="md"
            className="relative overflow-hidden mx-auto border-gray-200"
        >
            <div className="relative px-2 md:px-3 pt-3 md:pt-4 pb-3 md:pb-4">
                <div className="w-full aspect-square flex items-center justify-center bg-gray-50 relative rounded-md overflow-hidden">
                    <Skeleton className="w-full h-full" />
                </div>
            </div>

            <div className="px-2 md:px-3 mb-2">
                <div className="border-b border-gray-100"></div>
            </div>

            <div className="px-2 md:px-3 pb-2 md:pb-3 text-center">
                <div className="flex justify-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Skeleton key={i} className="h-4 w-4 rounded-full" />
                    ))}
                </div>

                <Skeleton className="h-4 w-3/4 mx-auto mb-2" />

                <div className="flex justify-center gap-2 mb-4">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-12" />
                </div>

                <div className="flex gap-1.5 md:gap-2">
                    <Skeleton className="h-10 flex-1 rounded-[4px]" />
                    <Skeleton className="h-10 w-10 rounded-[4px]" />
                </div>
            </div>
        </Card>
    );
};

export default ProductCardSkeleton;
