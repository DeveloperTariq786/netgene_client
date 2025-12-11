"use client";

import React, { useState } from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/core/components/ui/button';
import { Card } from '@/core/components/ui/card';
import { RatingStars } from '@/core/components/ui/rating-stars';
import { PriceDisplay } from '@/core/components/ui/price-display';
import { Product } from '@/modules/home/types';

interface ProductCardProps {
    product: Product;
    onQuickView?: (product: Product) => void;
    onClick?: (product: Product) => void;
    topLeftBadge?: React.ReactNode;
    topRightBadge?: React.ReactNode;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView, onClick, topLeftBadge, topRightBadge }) => {
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
            maxWidth="320px"
            rounded="lg"
            shadow="md"
            hover={true}
            className={`relative overflow-hidden mx-auto transition-all duration-300 ${onClick ? 'cursor-pointer' : ''} ${isHovered ? 'border-emerald-600 shadow-lg' : 'border-gray-200'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleCardClick}
        >
            {/* Top Left Badge Slot */}
            {topLeftBadge && (
                <div className="absolute top-1 md:top-2 left-1 md:left-2 z-10">
                    {topLeftBadge}
                </div>
            )}

            {/* Top Right Badge Slot */}
            {topRightBadge && (
                <div className="absolute top-1 md:top-2 right-1 md:right-2 z-10">
                    {topRightBadge}
                </div>
            )}

            {/* Product Image Container */}
            <div className="relative px-2 md:px-3 pt-3 md:pt-4 pb-3 md:pb-4">
                <div className="w-full aspect-square flex items-center justify-center bg-white">
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

            <div className="px-2 md:px-3 mb-2">
                <div className="border-b border-gray-200"></div>
            </div>

            {/* Product Info */}
            <div className="px-2 md:px-3 pb-2 md:pb-3 text-center">
                {/* Rating */}
                <RatingStars
                    rating={product.rating}
                    reviewCount={product.reviewCount}
                    starSize="lg"
                    className="justify-center mb-1"
                />

                {/* Product Name */}
                <h3 className="text-gray-900 font-semibold text-xs md:text-sm lg:text-base mb-1.5 md:mb-2 line-clamp-1">
                    {product.name}
                </h3>

                {/* Price */}
                <PriceDisplay
                    originalPrice={product.originalPrice}
                    salePrice={product.salePrice}
                    unit={product.unit}
                    size="md"
                    className="justify-center mb-2 md:mb-3 flex-wrap"
                />

                {/* Action Buttons */}
                <div className="flex gap-1.5 md:gap-2 mb-0">
                    <Button
                        variant={isHovered ? 'primary' : 'secondary'}
                        className={`flex-1 rounded-[4px] gap-1 md:gap-1.5 text-[10px] md:text-xs h-10 lg:h-10 ${!isHovered ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                    >
                        <ShoppingCart size={14} className="md:w-4 md:h-4" />
                        <span>Add</span>
                    </Button>
                    <Button
                        variant={isHovered ? 'primary' : 'secondary'}
                        className={`px-2 md:px-3 rounded-[4px] text-[10px] md:text-xs h-10 lg:h-10 ${!isHovered ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}
                        title="Quick View"
                        onClick={handleQuickView}
                    >
                        <Eye size={14} className="md:w-4 md:h-4" />
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default ProductCard;
