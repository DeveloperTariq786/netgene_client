import React from 'react';

export const CategorySkeleton: React.FC = () => {
    return (
        <div className="w-full py-6">
            <div className="max-w-[1400px] mx-auto px-4 md:px-12 lg:px-20">
                <div className="flex gap-4 overflow-hidden">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-[45%] md:w-[23%] lg:w-[19%] aspect-[2/1.1] bg-white rounded-xl p-0 animate-pulse shadow-sm border border-gray-100 overflow-hidden"
                        >
                            <div className="w-full h-full bg-gray-200"></div>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    );
};
