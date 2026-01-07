'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingBasket, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Card } from '@/core/components/ui/card';
import { Button } from '@/core/components/ui/button';
import { SocialShareLinks } from '@/core/components/shared/SocialShareLinks';
import { ProductBadge } from '@/core/components/shared/ProductBadge';
import { RatingStars } from '@/core/components/ui/rating-stars';
import { PriceDisplay } from '@/core/components/ui/price-display';
import { DetailedProduct } from '@/modules/products/types/details';
import OutOfStockBadge from '@/core/components/shared/OutOfStockBadge';
import LoginDialog from '@/modules/auth/components/LoginDialog';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { useAddToCart } from '@/modules/cart/hooks/useCart';

interface ProductDetailProps {
    product: DetailedProduct;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [showLoginDialog, setShowLoginDialog] = useState(false);
    const [justAdded, setJustAdded] = useState(false);
    const { user } = useAuthStore();
    const { addToCart } = useAddToCart();
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

    // Use gallery array or fallback to single image
    const productImages = product.gallery && product.gallery.length > 0
        ? product.gallery
        : [product.image];

    // Ensure selectedImageIndex is valid
    const currentImage = productImages[selectedImageIndex] || productImages[0];

    // Calculate discount percentage
    const discountPercentage = product.originalPrice > 0
        ? Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100)
        : 0;

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

    const handleAddToCart = () => {
        if (!user) {
            setShowLoginDialog(true);
            return;
        }
        addToCart(product.id, 1);
        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 1500);
    };

    // Helper to strip HTML and truncate for snippet
    const getSnippet = (html: string) => {
        const text = html.replace(/<[^>]*>/g, '');
        return text.length > 180 ? text.substring(0, 180) + '...' : text;
    };

    return (
        <div className="py-10 lg:py-14">
            <div className="max-w-[1250px] mx-auto px-4 md:px-6 lg:px-14">
                <div className="flex flex-col md:flex-row gap-6 md:items-start justify-center">
                    {/* Left Column: Product Images Card */}
                    <div className="w-full md:w-1/2 flex flex-col gap-4">
                        <Card className="p-6 md:p-8 flex flex-col md:h-[540px] justify-center" shadow="lg" rounded="lg">
                            <div
                                className="relative w-full aspect-square max-h-[450px] bg-white rounded-lg flex items-center justify-center overflow-hidden group cursor-pointer"
                                onTouchStart={onTouchStart}
                                onTouchMove={onTouchMove}
                                onTouchEnd={onTouchEnd}
                            >
                                {/* Badges */}
                                <div className="absolute top-1 left-1 flex flex-col gap-2 z-10">
                                    {product.quantity > 0 && (
                                        <>
                                            {product.isNew && (
                                                <ProductBadge isNew={true} />
                                            )}
                                            {discountPercentage > 0 && (
                                                <ProductBadge topDiscount={`-${Math.abs(discountPercentage)}%`} />
                                            )}
                                        </>
                                    )}
                                </div>

                                {product.quantity === 0 && (
                                    <OutOfStockBadge />
                                )}

                                {/* Navigation Arrows - Only show if multiple images */}
                                {productImages.length > 1 && product.quantity > 0 && (
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
                                    className={`object-contain ${product.quantity === 0 ? 'opacity-40 grayscale-[0.5]' : ''}`}
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
                        </div>
                    </div>

                    {/* Right Column: Product Details Card */}
                    <Card className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-start md:h-[540px]" shadow="lg" rounded="lg">
                        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                            {product.name}
                        </h1>

                        {/* Restored Metadata Section (SKU, Brand) */}
                        <div className="flex gap-2 md:gap-4 text-xs md:text-sm text-gray-500 mb-3 uppercase font-medium">
                            {product.sku && (
                                <span className="whitespace-nowrap">
                                    SKU: <span className="text-gray-900">{product.sku}</span>
                                </span>
                            )}
                            {product.brand && (
                                <span className="whitespace-nowrap">
                                    BRAND: <span className="text-gray-900">{product.brand}</span>
                                </span>
                            )}
                        </div>

                        {product.manufacturer && (
                            <div className="text-xs md:text-sm text-gray-500 mb-3 uppercase font-medium">
                                <span className="whitespace-nowrap">
                                    MANUFACTURER: <span className="text-gray-900">{product.manufacturer}</span>
                                </span>
                            </div>
                        )}

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
                            <div className="text-gray-600 mb-6 leading-relaxed text-sm">
                                {getSnippet(product.description)}
                            </div>
                        )}

                        {/* Restored Tags Section */}
                        {product.tags && product.tags.length > 0 && (
                            <div className="flex items-center gap-2 mb-6">
                                <span className="font-semibold text-gray-800 text-sm">Tags:</span>
                                <div className="flex flex-wrap gap-2">
                                    {product.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="bg-gray-100 text-gray-600 text-[10px] md:text-xs px-2 py-1 rounded hover:bg-gray-200 transition-colors cursor-default border border-gray-200 uppercase font-medium"
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

                        <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                            <Button
                                variant={product.quantity === 0 ? "secondary" : "primary"}
                                size="default"
                                disabled={product.quantity === 0}
                                className={`flex-1 uppercase tracking-wide shadow-lg py-5 md:py-7 text-sm md:text-base font-bold transition-all ${product.quantity === 0 ? 'opacity-60 grayscale' : ''} ${justAdded ? 'bg-green-600 hover:bg-green-700' : ''}`}
                                onClick={handleAddToCart}
                            >
                                {justAdded ? (
                                    <>
                                        <Check size={20} className="w-5 h-5 md:w-6 md:h-6" />
                                        Added
                                    </>
                                ) : (
                                    <>
                                        <ShoppingBasket size={20} className="w-5 h-5 md:w-6 md:h-6" />
                                        {product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                                    </>
                                )}
                            </Button>
                        </div>

                        {/* Login Dialog */}
                        <LoginDialog
                            open={showLoginDialog}
                            onOpenChange={setShowLoginDialog}
                            onSuccess={() => {
                                addToCart(product.id, 1);
                                setJustAdded(true);
                                setTimeout(() => setJustAdded(false), 1500);
                            }}
                        />

                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
