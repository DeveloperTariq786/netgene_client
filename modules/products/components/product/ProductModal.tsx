'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import Modal from '@/core/components/shared/Modal';
import { ProductBadge } from '@/core/components/shared/ProductBadge';
import { RatingStars } from '@/core/components/ui/rating-stars';
import { PriceDisplay } from '@/core/components/ui/price-display';
import LoginDialog from '@/modules/auth/components/LoginDialog';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { useProductDetail } from '@/modules/products/hooks/useProductDetail';
import { Product } from '@/modules/home/types';
import ProductDetailSkeleton from '../skeletons/ProductDetailSkeleton';

interface ProductModalProps {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [showLoginDialog, setShowLoginDialog] = useState(false);
    const { user } = useAuthStore();

    // Fetch full product details when modal is open
    const { data: fullProduct, isLoading } = useProductDetail(
        isOpen ? product?.id?.toString() : undefined
    );

    // Reset selected image when product changes or modal opens
    useEffect(() => {
        setSelectedImageIndex(0);
    }, [product?.id, isOpen]);

    // Use fullProduct data if available, otherwise fallback to initial product
    const displayProduct = fullProduct || product;

    // Use gallery from fullProduct or fallback to images/image from initial product
    const productImages = (fullProduct?.gallery && fullProduct.gallery.length > 0)
        ? fullProduct.gallery
        : (product as any).images && (product as any).images.length > 0
            ? (product as any).images
            : product.image && product.image.length > 0
                ? [product.image]
                : [];

    // Ensure selectedImageIndex is valid
    const currentImage = productImages[selectedImageIndex] || productImages[0];

    // Calculate discount percentage
    const discountPercentage = displayProduct.discountPercentage ||
        (displayProduct.originalPrice > 0
            ? Math.round(((displayProduct.originalPrice - displayProduct.salePrice) / displayProduct.originalPrice) * 100)
            : 0);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {/* Content Area */}
            <div className="flex-1 relative">
                {isLoading ? (
                    <ProductDetailSkeleton isModal={true} />
                ) : (
                    <div className="flex flex-col md:flex-row min-h-[400px]">
                        {/* Left Column: Images */}
                        <div className="w-full md:w-1/2 p-4 md:p-6 lg:p-8 flex flex-col">
                            <div className="relative w-full aspect-square bg-white rounded-lg mb-3 md:mb-4 flex items-center justify-center overflow-hidden border border-gray-100">
                                {/* Badges in Modal */}
                                <div className="absolute top-2 md:top-4 left-2 md:left-4 flex flex-col gap-2 z-10">
                                    {displayProduct.isNew && (
                                        <ProductBadge isNew={true} />
                                    )}
                                    {discountPercentage > 0 && (
                                        <ProductBadge topDiscount={`-${Math.abs(discountPercentage)}%`} />
                                    )}
                                </div>

                                {currentImage && (
                                    <Image
                                        src={currentImage}
                                        alt={displayProduct.name}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                )}
                            </div>

                            {/* Thumbnails */}
                            <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2 justify-center no-scrollbar">
                                {productImages.map((img: string, idx: number) => (
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
                        <div className="w-full md:w-1/2 p-4 md:p-6 lg:p-8 md:pl-0 flex flex-col justify-start relative">
                            <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 mb-1.5 md:mb-2">{displayProduct.name}</h2>

                            <div className="flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm text-gray-500 mb-2 md:mb-3">
                                {displayProduct.sku && (
                                    <span>
                                        SKU: <span className="text-gray-700">{displayProduct.sku}</span>
                                    </span>
                                )}
                                {displayProduct.brand && (
                                    <span>
                                        BRAND: <span className="text-gray-700 font-medium">{displayProduct.brand}</span>
                                    </span>
                                )}
                            </div>

                            {displayProduct.manufacturer && (
                                <div className="text-xs md:text-sm text-gray-500 mb-2 md:mb-3 uppercase font-medium">
                                    <span>
                                        MANUFACTURER: <span className="text-gray-700 font-medium">{displayProduct.manufacturer}</span>
                                    </span>
                                </div>
                            )}

                            <RatingStars
                                rating={displayProduct.rating}
                                reviewCount={displayProduct.reviewCount}
                                starSize="md"
                                className="mb-3 md:mb-4"
                            />

                            <PriceDisplay
                                originalPrice={displayProduct.originalPrice}
                                salePrice={displayProduct.salePrice}
                                unit={displayProduct.unit}
                                size="lg"
                                className="mb-4 md:mb-6"
                            />

                            {displayProduct.description && (
                                <div className="mb-6">
                                    <h3 className="text-sm font-semibold text-gray-800 mb-2 uppercase tracking-wider">Description:</h3>
                                    <div
                                        className="text-gray-600 leading-relaxed text-sm md:text-base line-clamp-10 overflow-hidden"
                                        dangerouslySetInnerHTML={{ __html: displayProduct.description }}
                                    />
                                </div>
                            )}

                            {displayProduct.tags && displayProduct.tags.length > 0 && (
                                <div className="flex items-center gap-2 mb-4 md:mb-6">
                                    <span className="font-semibold text-gray-800 text-sm md:text-base">Tags:</span>
                                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                                        {displayProduct.tags.map((tag: any) => {
                                            const tagName = typeof tag === 'string' ? tag : tag.tag_name;
                                            return (
                                                <span
                                                    key={tagName}
                                                    className="bg-gray-100 text-gray-600 text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded hover:bg-gray-200 transition-colors cursor-default"
                                                >
                                                    {tagName}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Login Dialog */}
            <LoginDialog
                open={showLoginDialog}
                onOpenChange={setShowLoginDialog}
                onSuccess={() => {
                    console.log('User logged in successfully');
                }}
            />
        </Modal>
    );
};

export default ProductModal;

