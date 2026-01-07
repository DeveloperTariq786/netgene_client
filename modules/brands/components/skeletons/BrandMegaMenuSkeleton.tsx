import React from 'react';
import { Skeleton } from '@/core/components/ui/skeleton';

export const BrandMegaMenuSkeleton: React.FC = () => {
    return (
        <div className="w-full bg-white p-8 shadow-2xl rounded-b-2xl border-t border-gray-200 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-6">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-10 w-32 rounded-full" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-xl border border-gray-100">
                        <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
                        <div className="flex flex-col gap-2 w-full">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-3 w-1/2" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
