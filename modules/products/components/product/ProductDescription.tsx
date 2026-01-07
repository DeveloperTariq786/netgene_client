'use client';

import React, { useState, useRef, useEffect } from 'react';
import { DetailedProduct } from '@/modules/products/types/details';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ProductDescriptionProps {
    product: DetailedProduct;
}

export const ProductDescription: React.FC<ProductDescriptionProps> = ({ product }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    // Height threshold to show "Show More"
    const MAX_HEIGHT = 400;

    useEffect(() => {
        if (contentRef.current) {
            const contentHeight = contentRef.current.scrollHeight;
            setShowButton(contentHeight > MAX_HEIGHT);
        }
    }, [product.description]);

    return (
        <div className="animate-fade-in">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
                Product Information
            </h3>

            {/* Content Container */}
            <div className="relative">
                <div
                    ref={contentRef}
                    className={`text-gray-600 leading-relaxed text-sm md:text-base prose prose-sm md:prose-base max-w-none transition-all duration-500 overflow-hidden
                        ${!isExpanded && showButton ? 'max-h-[400px]' : 'max-h-full'}
                    `}
                    dangerouslySetInnerHTML={{ __html: product.description }}
                />

                {/* Fade effect when collapsed and long */}
                {!isExpanded && showButton && (
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                )}
            </div>

            {/* Toggle Button */}
            {showButton && (
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-700 transition-colors py-2 px-6 rounded-full border border-emerald-100 bg-emerald-50/50"
                    >
                        {isExpanded ? (
                            <>
                                <span>Show Less</span>
                                <ChevronUp size={20} />
                            </>
                        ) : (
                            <>
                                <span>Show More</span>
                                <ChevronDown size={20} />
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductDescription;
