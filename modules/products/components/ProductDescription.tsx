'use client';

import React from 'react';
import { Product } from '@/modules/home/types';

interface ProductDescriptionProps {
    product: Product;
}

export const ProductDescription: React.FC<ProductDescriptionProps> = ({ product }) => {
    return (
        <div className="animate-fade-in">
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-4">
                Product Description
            </h3>
            <div className="text-gray-600 leading-relaxed space-y-4">
                <p className="text-sm md:text-base">{product.description}</p>

                {/* Additional product details */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-800 mb-3 text-sm md:text-base">Product Details:</h4>
                    <ul className="space-y-2 text-xs md:text-sm">
                        {product.sku && (
                            <li className="flex">
                                <span className="font-medium text-gray-700 w-32">SKU:</span>
                                <span className="text-gray-600">{product.sku}</span>
                            </li>
                        )}
                        {product.brand && (
                            <li className="flex">
                                <span className="font-medium text-gray-700 w-32">Brand:</span>
                                <span className="text-gray-600">{product.brand}</span>
                            </li>
                        )}
                        <li className="flex">
                            <span className="font-medium text-gray-700 w-32">Unit:</span>
                            <span className="text-gray-600">{product.unit}</span>
                        </li>
                        {product.tags && product.tags.length > 0 && (
                            <li className="flex">
                                <span className="font-medium text-gray-700 w-32">Tags:</span>
                                <div className="flex flex-wrap gap-2">
                                    {product.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProductDescription;
