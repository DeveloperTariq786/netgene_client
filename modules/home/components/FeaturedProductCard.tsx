'use client';

import React, { useState } from 'react';
import { ShoppingCart, Eye, Check } from 'lucide-react';
import { Button } from '@/core/components/ui/button';
import { Card } from '@/core/components/ui/card';
import { RatingStars } from '@/core/components/ui/rating-stars';
import { PriceDisplay } from '@/core/components/ui/price-display';
import { Product } from '@/modules/home/types';
import OutOfStockBadge from '@/core/components/shared/OutOfStockBadge';
import { useAddToCart } from '@/modules/cart/hooks/useCart';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import LoginDialog from '@/modules/auth/components/LoginDialog';

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
    const [showLoginDialog, setShowLoginDialog] = useState(false);
    const [justAdded, setJustAdded] = useState(false);
    const { user } = useAuthStore();
    const { addToCart } = useAddToCart();

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

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (product.quantity === 0) return;

        if (!user) {
            setShowLoginDialog(true);
            return;
        }

        addToCart(String(product.id));
        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 1500);
    };

    return (
        <>
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

                <div className="flex flex-row">
                    {/* Image Section */}
                    <div className="relative w-2/5 p-2 md:p-3 lg:p-4 flex items-center">
                        <div className="relative w-full aspect-square flex items-center justify-center bg-white rounded-lg overflow-hidden">
                            {product.quantity === 0 && <OutOfStockBadge />}
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
                        <h3 className="text-gray-900 font-bold text-sm md:text-base lg:text-lg mb-1.5 md:mb-2 line-clamp-2">
                            {product.name}
                        </h3>

                        <RatingStars
                            rating={product.rating}
                            reviewCount={product.reviewCount}
                            starSize="lg"
                            className="mb-2 md:mb-3"
                        />

                        <PriceDisplay
                            originalPrice={product.originalPrice}
                            salePrice={product.salePrice}
                            unit={product.unit}
                            size="lg"
                            className="mb-3"
                        />

                        {/* Product Description */}
                        {product.description && (
                            <p className="text-gray-500 text-xs md:text-sm mb-4 line-clamp-2 md:line-clamp-3 leading-relaxed">
                                {product.description.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ')}
                            </p>
                        )}


                        {/* Action Buttons */}
                        <div className="flex gap-2">
                            <Button
                                variant={isHovered && product.quantity !== 0 ? 'primary' : 'secondary'}
                                disabled={product.quantity === 0}
                                className={`flex-1 rounded-[4px] gap-1.5 text-xs md:text-sm h-10 lg:h-10 ${product.quantity === 0
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                                    : !isHovered
                                        ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                        : 'bg-emerald-600 hover:bg-emerald-700'
                                    }`}
                                onClick={handleAddToCart}
                            >
                                {justAdded ? <Check size={16} /> : <ShoppingCart size={16} className="md:w-4 md:h-4" />}
                                <span>{product.quantity === 0 ? 'Out of Stock' : justAdded ? 'Added' : 'Add to Cart'}</span>
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

            <LoginDialog
                open={showLoginDialog}
                onOpenChange={setShowLoginDialog}
                onSuccess={() => {
                    addToCart(String(product.id));
                    setJustAdded(true);
                    setTimeout(() => setJustAdded(false), 1500);
                }}
            />
        </>
    );
};

export default FeaturedProductCard;
