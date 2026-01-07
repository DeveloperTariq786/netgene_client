import React from 'react';
import { Skeleton } from '@/core/components/ui/skeleton';

export const BrandDrawerSkeleton: React.FC = () => {
    return (
        <div className="space-y-3 mt-4">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl bg-white">
                    <div className="flex items-center gap-3 w-full">
                        <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
                        <div className="flex flex-col gap-2 w-full">
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-3 w-1/3" />
                        </div>
                    </div>
                    <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
                </div>
            ))}
        </div>
    );
};
