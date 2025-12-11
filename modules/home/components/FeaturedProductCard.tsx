'use client';

import React, { useState } from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/core/components/ui/button';
import { Card } from '@/core/components/ui/card';
import { RatingStars } from '@/core/components/ui/rating-stars';
import { PriceDisplay } from '@/core/components/ui/price-display';
import { Product } from '@/modules/home/types';

interface FeaturedProductCardProps {
    product: Product;
    onQuickView?: (product: Product) => void;
    onClick?: (product: Product) => void;
    topLeftBadge?: React.ReactNode;
    topRightBadge?: React.ReactNode;
}

const FeaturedProductCard: React.FC<FeaturedProductCardProps> = ({
    product,
    onQuickView,
    onClick,
    topLeftBadge,
    topRightBadge
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleQuickView = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onQuickView) {
            onQuickView(product);
        }
    };

    const handleCardClick = () => {
        if (onClick) {
            onClick(product);
        }
    };

    return (
        <Card
            rounded="lg"
            shadow="md"
            hover={true}
            className={`relative overflow-hidden transition-all duration-300 ${onClick ? 'cursor-pointer' : ''} ${isHovered ? 'border-emerald-600 shadow-lg' : 'border-gray-200'
                }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleCardClick}
        >
            <div className="flex flex-row">
                {/* Image Section */}
                <div className="relative w-2/5 p-2 md:p-3 lg:p-4">
                    {/* Top Left Badge */}
                    {topLeftBadge && (
                        <div className="absolute top-2 md:top-3 left-2 md:left-3 z-10">
                            {topLeftBadge}
                        </div>
                    )}

                    {/* Top Right Badge */}
                    {topRightBadge && (
                        <div className="absolute top-2 md:top-3 right-2 md:right-3 z-10">
                            {topRightBadge}
                        </div>
                    )}

                    <div className="w-full aspect-square flex items-center justify-center bg-white rounded-lg overflow-hidden">
                        {imageError ? (
                            <div className="text-gray-400 text-xs md:text-sm">Image not available</div>
                        ) : (
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-300"
                                style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
                                onError={() => setImageError(true)}
                            />
                        )}
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-3 md:p-4 flex flex-col justify-center">
                    {/* Product Name */}
                    <h3 className="text-gray-900 font-bold text-sm md:text-base lg:text-lg mb-1.5 md:mb-2 line-clamp-2">
                        {product.name}
                    </h3>

                    {/* Rating */}
                    <RatingStars
                        rating={product.rating}
                        reviewCount={product.reviewCount}
                        starSize="lg"
                        className="mb-2 md:mb-3"
                    />

                    {/* Price */}
                    <PriceDisplay
                        originalPrice={product.originalPrice}
                        salePrice={product.salePrice}
                        unit={product.unit}
                        size="lg"
                        className="mb-3 md:mb-4"
                    />

                    {/* Description */}
                    {product.description && (
                        <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2">
                            {product.description}
                        </p>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <Button
                            variant={isHovered ? 'primary' : 'secondary'}
                            className={`flex-1 rounded-[4px] gap-1.5 text-xs md:text-sm h-10 lg:h-10 ${!isHovered ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' : 'bg-emerald-600 hover:bg-emerald-700'
                                }`}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                        >
                            <ShoppingCart size={16} className="md:w-4 md:h-4" />
                            Add to Cart
                        </Button>
                        <Button
                            variant={isHovered ? 'primary' : 'secondary'}
                            className={`px-3 rounded-md h-10 lg:h-10 ${!isHovered ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' : 'bg-emerald-600 hover:bg-emerald-700'
                                }`}
                            title="Quick View"
                            onClick={handleQuickView}
                        >
                            <Eye size={16} className="md:w-4 md:h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default FeaturedProductCard;
