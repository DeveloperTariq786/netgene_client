'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingBasket } from 'lucide-react';
import { Product } from '../types';
import Modal from '@/core/components/shared/Modal';
import { SocialShareLinks } from '@/core/components/shared/SocialShareLinks';
import { ProductBadge } from '@/core/components/shared/ProductBadge';
import { RatingStars } from '@/core/components/ui/rating-stars';
import { PriceDisplay } from '@/core/components/ui/price-display';

interface ProductModalProps {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    // Use images array or fallback to single image
    const productImages = product.images && product.images.length > 0
        ? product.images
        : [product.image];

    // Ensure selectedImageIndex is valid
    const currentImage = productImages[selectedImageIndex] || productImages[0];

    // Calculate discount percentage if not provided
    const discountPercentage = product.discountPercentage ||
        Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col md:flex-row">
                {/* Left Column: Images */}
                <div className="w-full md:w-1/2 p-4 md:p-6 lg:p-8 flex flex-col">
                    <div className="relative w-full aspect-square bg-white rounded-lg mb-3 md:mb-4 flex items-center justify-center overflow-hidden border border-gray-100">
                        {/* Badges in Modal */}
                        <div className="absolute top-2 md:top-4 left-2 md:left-4 flex flex-col gap-2 z-10">
                            {product.isNew && (
                                <ProductBadge isNew={true} />
                            )}
                            {discountPercentage > 0 && (
                                <ProductBadge topDiscount={`-${Math.abs(discountPercentage)}%`} />
                            )}
                        </div>

                        <Image
                            src={currentImage}
                            alt={product.name}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>

                    {/* Thumbnails */}
                    <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2 justify-center no-scrollbar">
                        {productImages.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImageIndex(idx)}
                                className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 border-2 rounded-md overflow-hidden p-1 transition-all relative ${selectedImageIndex === idx ? 'border-emerald-600' : 'border-gray-200 hover:border-emerald-300'
                                    }`}
                            >
                                <Image
                                    src={img}
                                    alt={`Thumbnail ${idx}`}
                                    fill
                                    className="object-contain"
                                    sizes="80px"
                                />
                            </button>
                        ))}
                        {/* Add placeholder slots if less than 4 to match design */}
                        {productImages.length < 4 &&
                            Array.from({ length: 4 - productImages.length }).map((_, i) => (
                                <div key={`placeholder-${i}`} className="w-16 h-16 md:w-20 md:h-20" />
                            ))}
                    </div>
                </div>

                {/* Right Column: Details */}
                <div className="w-full md:w-1/2 p-4 md:p-6 lg:p-8 md:pl-0 flex flex-col justify-start">
                    <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 mb-1.5 md:mb-2">{product.name}</h2>

                    <div className="flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm text-gray-500 mb-2 md:mb-3">
                        {product.sku && (
                            <span>
                                SKU: <span className="text-gray-700">{product.sku}</span>
                            </span>
                        )}
                        {product.brand && (
                            <span>
                                BRAND: <span className="text-gray-700 font-medium">{product.brand}</span>
                            </span>
                        )}
                    </div>

                    <RatingStars
                        rating={product.rating}
                        reviewCount={product.reviewCount}
                        starSize="md"
                        className="mb-3 md:mb-4"
                    />

                    <PriceDisplay
                        originalPrice={product.originalPrice}
                        salePrice={product.salePrice}
                        unit={product.unit}
                        size="lg"
                        className="mb-4 md:mb-6"
                    />

                    {product.description && (
                        <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">{product.description}</p>
                    )}

                    {product.tags && product.tags.length > 0 && (
                        <div className="flex items-center gap-2 mb-4 md:mb-6">
                            <span className="font-semibold text-gray-800 text-sm md:text-base">Tags:</span>
                            <div className="flex flex-wrap gap-1.5 md:gap-2">
                                {product.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="bg-gray-100 text-gray-600 text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded hover:bg-gray-200 transition-colors cursor-default"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8">
                        <span className="font-semibold text-gray-800 text-sm md:text-base">Share:</span>
                        <SocialShareLinks size="sm" variant="brand" />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                        <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 md:py-3 px-4 md:px-6 rounded-md shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 uppercase tracking-wide text-sm md:text-base">
                            <ShoppingBasket size={18} className="md:w-5 md:h-5" />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ProductModal;
