import React from 'react';

export const OrderCardSkeleton: React.FC = () => {
    return (
        <div className="bg-white rounded-lg md:rounded-xl border border-gray-200 overflow-hidden animate-pulse">
            {/* Header Skeleton */}
            <div className="bg-gray-50/80 px-4 py-3 md:px-6 md:py-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4">
                <div className="flex flex-wrap gap-x-6 md:gap-x-12 gap-y-1.5 md:gap-y-2 w-full md:w-auto">
                    <div className="space-y-1">
                        <div className="h-2.5 bg-gray-200 rounded w-16 mb-1"></div>
                        <div className="h-3.5 bg-gray-200 rounded w-24"></div>
                    </div>
                    <div className="space-y-1">
                        <div className="h-2.5 bg-gray-200 rounded w-10 mb-1"></div>
                        <div className="h-3.5 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div className="space-y-1 max-w-[200px]">
                        <div className="h-2.5 bg-gray-200 rounded w-12 mb-1"></div>
                        <div className="h-3 bg-gray-200 rounded w-32"></div>
                        <div className="h-3 bg-gray-200 rounded w-20 mt-1"></div>
                    </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-2">
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
            </div>

            {/* Body Skeleton */}
            <div className="p-4 md:p-6">
                <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                    <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
                    <div className="h-5 bg-gray-200 rounded w-24"></div>
                </div>

                <div className="space-y-4 md:space-y-6">
                    {[1, 2].map((i) => (
                        <div key={i} className="flex gap-3 md:gap-6 items-center">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-md md:rounded-lg flex-shrink-0"></div>
                            <div className="flex-1 min-w-0 space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="flex items-center gap-2">
                                    <div className="h-3 bg-gray-200 rounded w-12"></div>
                                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                                    <div className="h-3 bg-gray-200 rounded w-10"></div>
                                </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                                <div className="h-4 bg-gray-200 rounded w-16"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
