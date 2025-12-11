'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingBasket, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/core/components/ui/card';
import { Button } from '@/core/components/ui/button';
import { SocialShareLinks } from '@/core/components/shared/SocialShareLinks';
import { ProductBadge } from '@/core/components/shared/ProductBadge';
import { RatingStars } from '@/core/components/ui/rating-stars';
import { PriceDisplay } from '@/core/components/ui/price-display';
import { Product } from '@/modules/home/types';

interface ProductDetailProps {
    product: Product;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const thumbnailsRef = React.useRef<HTMLDivElement>(null);

    // Scroll active thumbnail into view
    React.useEffect(() => {
        if (thumbnailsRef.current) {
            const selectedThumbnail = thumbnailsRef.current.children[selectedImageIndex] as HTMLElement;
            if (selectedThumbnail) {
                selectedThumbnail.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        }
    }, [selectedImageIndex]);

    // Use images array or fallback to single image
    const productImages = product.images && product.images.length > 0
        ? product.images
        : [product.image];

    // Ensure selectedImageIndex is valid
    const currentImage = productImages[selectedImageIndex] || productImages[0];

    // Calculate discount percentage if not provided
    const discountPercentage = product.discountPercentage ||
        Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100);

    // Minimum swipe distance (in px)
    const minSwipeDistance = 50;

    const handlePrevImage = () => {
        setSelectedImageIndex((prev) =>
            prev === 0 ? productImages.length - 1 : prev - 1
        );
    };

    const handleNextImage = () => {
        setSelectedImageIndex((prev) =>
            prev === productImages.length - 1 ? 0 : prev + 1
        );
    };

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            handleNextImage();
        } else if (isRightSwipe) {
            handlePrevImage();
        }
    };

    return (
        <div className="py-12 lg:py-16">
            <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-14">
                <div className="flex flex-col md:flex-row gap-6 md:items-start">
                    {/* Left Column: Product Images Card */}
                    <div className="w-full md:w-1/2 flex flex-col gap-4">
                        <Card className="p-6 md:p-8 flex flex-col md:h-[580px]" shadow="lg" rounded="lg">
                            <div
                                className="relative w-full aspect-square max-h-[500px] bg-white rounded-lg flex items-center justify-center overflow-hidden group cursor-pointer"
                                onTouchStart={onTouchStart}
                                onTouchMove={onTouchMove}
                                onTouchEnd={onTouchEnd}
                            >
                                {/* Badges */}
                                <div className="absolute top-1 left-1 flex flex-col gap-2 z-10">
                                    {product.isNew && (
                                        <ProductBadge isNew={true} />
                                    )}
                                    {discountPercentage > 0 && (
                                        <ProductBadge topDiscount={`-${Math.abs(discountPercentage)}%`} />
                                    )}
                                </div>

                                {/* Navigation Arrows - Only show if multiple images */}
                                {productImages.length > 1 && (
                                    <>
                                        <button
                                            onClick={handlePrevImage}
                                            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            aria-label="Previous image"
                                        >
                                            <ChevronLeft size={24} />
                                        </button>
                                        <button
                                            onClick={handleNextImage}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            aria-label="Next image"
                                        >
                                            <ChevronRight size={24} />
                                        </button>
                                    </>
                                )}

                                <Image
                                    src={currentImage}
                                    alt={product.name}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </Card>

                        {/* Thumbnails - Outside Card */}
                        <div
                            ref={thumbnailsRef}
                            className="flex gap-3 overflow-x-auto pb-2 justify-center scroll-smooth no-scrollbar"
                        >
                            {productImages.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImageIndex(idx)}
                                    className={`flex-shrink-0 w-24 h-24 border-2 rounded-md overflow-hidden p-1 transition-all relative ${selectedImageIndex === idx
                                        ? 'border-green-500'
                                        : 'border-gray-200 hover:border-green-300'
                                        }`}
                                >
                                    <Image
                                        src={img}
                                        alt={`Thumbnail ${idx}`}
                                        fill
                                        className="object-contain"
                                        sizes="96px"
                                    />
                                </button>
                            ))}
                            {/* Add placeholder slots if less than 4 to match design */}
                            {productImages.length < 4 &&
                                Array.from({ length: 4 - productImages.length }).map((_, i) => (
                                    <div key={`placeholder-${i}`} className="w-24 h-24" />
                                ))}
                        </div>
                    </div>

                    {/* Right Column: Product Details Card */}
                    <Card className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-start md:h-[580px]" shadow="lg" rounded="lg">
                        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                            {product.name}
                        </h1>

                        <div className="flex gap-2 md:gap-4 text-xs md:text-sm text-gray-500 mb-3">
                            {product.sku && (
                                <span className="whitespace-nowrap">
                                    SKU: <span className="text-gray-700">{product.sku}</span>
                                </span>
                            )}
                            {product.brand && (
                                <span className="whitespace-nowrap">
                                    BRAND: <span className="text-gray-700 font-medium">{product.brand}</span>
                                </span>
                            )}
                        </div>

                        <RatingStars
                            rating={product.rating}
                            reviewCount={product.reviewCount}
                            starSize="lg"
                            showReviewLabel={true}
                            className="mb-2 lg:mb-4"
                        />

                        <PriceDisplay
                            originalPrice={product.originalPrice}
                            salePrice={product.salePrice}
                            unit={product.unit}
                            size="lg"
                            className="mb-4 lg:mb-6"
                        />

                        {product.description && (
                            <p className="text-gray-600 mb-4 lg:mb-6 leading-relaxed text-sm">
                                {product.description}
                            </p>
                        )}

                        {product.tags && product.tags.length > 0 && (
                            <div className="flex items-center gap-2 mb-6">
                                <span className="font-semibold text-gray-800">Tags:</span>
                                <div className="flex flex-wrap gap-2">
                                    {product.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded hover:bg-gray-200 transition-colors cursor-default"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex items-center gap-3 mb-8">
                            <span className="font-semibold text-gray-800">Share:</span>
                            <SocialShareLinks size="sm" variant="brand" />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                variant="primary"
                                size="default"
                                className="flex-1 uppercase tracking-wide shadow-lg"
                            >
                                <ShoppingBasket size={20} />
                                Add to Cart
                            </Button>
                        </div>

                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
