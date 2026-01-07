import React from 'react';
import { Skeleton } from '@/core/components/ui/skeleton';

export const BrandSliderSkeleton: React.FC = () => {
    return (
        <div className="flex gap-4 lg:gap-6 overflow-hidden py-4">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="flex-shrink-0 w-[140px] md:w-[160px] lg:w-[180px]">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center h-full">
                        <Skeleton className="w-16 h-16 rounded-full mb-4" />
                        <Skeleton className="h-4 w-3/4 mb-2" />
                        <Skeleton className="h-3 w-1/2" />
                    </div>
                </div>
            ))}
        </div>
    );
};
