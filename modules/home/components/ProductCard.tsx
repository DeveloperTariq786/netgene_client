"use client";

import React, { useState } from 'react';
import { ShoppingCart, Heart, Shuffle, Play, Eye } from 'lucide-react';
import OutOfStockBadge from '@/core/components/shared/OutOfStockBadge';

interface Product {
    id: number;
    name: string;
    image: string;
    originalPrice: number;
    salePrice: number;
    unit: string;
    rating: number;
    reviewCount: number;
    onSale?: boolean;
    quantity?: number;
}

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < rating ? 'text-star-filled' : 'text-star-empty'}>
                ★
            </span>
        ));
    };

    return (
        <div
            className={`relative bg-card rounded-lg shadow-md transition-all duration-300 card-hover-border overflow-hidden ${isHovered ? 'border-primary shadow-lg' : ''
                }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Sale Badge */}
            {product.onSale && (
                <div className="absolute top-2 left-2 bg-secondary text-secondary-foreground px-2 py-0.5 rounded text-xs font-semibold z-10">
                    Sale
                </div>
            )}

            {/* Out of Stock Badge */}
            {product.quantity === 0 && (
                <div className="absolute top-2 left-2 z-10">
                    <OutOfStockBadge />
                </div>
            )}

            {/* Heart Icon */}
            <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`absolute top-2 right-2 transition-colors z-10 ${isFavorite ? 'text-destructive' : 'text-muted-foreground/40 hover:text-destructive'
                    }`}
            >
                <Heart size={18} fill={isFavorite ? 'currentColor' : 'currentColor'} />
            </button>

            {/* Product Image Container */}
            <div className="relative px-3 pt-4 pb-4">
                <div className="w-full h-40 sm:h-48 lg:h-52 flex items-center justify-center bg-card">
                    {imageError ? (
                        <div className="text-muted-foreground">Image not available</div>
                    ) : (
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain transition-transform duration-300"
                            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
                            onError={() => setImageError(true)}
                        />
                    )}
                </div>

                {/* Hover Action Buttons */}
                <div
                    className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-1.5 z-20 transition-all duration-300 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
                        }`}
                >
                    <button className="bg-primary hover:bg-primary-hover text-primary-foreground p-2 rounded-lg transition-all duration-200 hover:scale-110">
                        <Shuffle size={14} />
                    </button>
                    <button className="bg-primary hover:bg-primary-hover text-primary-foreground p-2 rounded-lg transition-all duration-200 hover:scale-110">
                        <Play size={14} fill="currentColor" />
                    </button>
                    <button className="bg-primary hover:bg-primary-hover text-primary-foreground p-2 rounded-lg transition-all duration-200 hover:scale-110">
                        <Eye size={14} />
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className="px-3 pb-3 text-center">
                {/* Rating */}
                <div className="flex items-center justify-center gap-0.5 mb-1">
                    {renderStars(product.rating)}
                    <span className="text-muted-foreground text-xs ml-1">({product.reviewCount})</span>
                </div>

                {/* Product Name */}
                <h3 className="text-card-foreground font-semibold text-sm sm:text-base mb-2 line-clamp-1">
                    {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-center justify-center gap-1 mb-3 flex-wrap">
                    <span className="text-muted-foreground line-through text-sm">${product.originalPrice}</span>
                    <span className="text-primary font-bold text-base sm:text-lg">${product.salePrice}</span>
                    <span className="text-muted-foreground text-xs">/{product.unit}</span>
                </div>

                {/* Add Button */}
                <button
                    disabled={product.quantity === 0}
                    className={`w-full py-2 rounded-lg font-medium text-sm transition-all duration-300 flex items-center justify-center gap-1.5 ${product.quantity === 0
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : isHovered
                            ? 'bg-primary hover:bg-primary-hover text-primary-foreground'
                            : 'bg-muted hover:bg-muted/80 text-foreground'
                        }`}
                >
                    <ShoppingCart size={16} />
                    {product.quantity === 0 ? 'Out of Stock' : 'Add'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
