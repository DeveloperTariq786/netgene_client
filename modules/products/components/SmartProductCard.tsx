"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Check } from 'lucide-react';
import ProductCard from '@/core/components/shared/ProductCard';
import { ProductBadge } from '@/core/components/shared/ProductBadge';
import { Product } from '@/modules/products/types';
import { useAddToCart } from '@/modules/cart/hooks/useCart';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import LoginDialog from '@/modules/auth/components/LoginDialog';
import ProductModal from './product/ProductModal';


interface SmartProductCardProps {
    product: Product;
    onQuickView?: (product: Product) => void;
    onClick?: (product: Product) => void;
    showNewOnly?: boolean;
    showNewAndSaleOnly?: boolean;
    showNicheType?: 'order' | 'rating' | 'discount';
}


const SmartProductCard: React.FC<SmartProductCardProps> = ({
    product,
    onQuickView,
    onClick,
    showNewOnly = false,
    showNewAndSaleOnly = false,
    showNicheType
}) => {
    const router = useRouter();
    const [showLoginDialog, setShowLoginDialog] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [justAdded, setJustAdded] = useState(false);
    const { user } = useAuthStore();
    const { addToCart } = useAddToCart();

    const handleCardClick = () => {
        if (onClick) {
            onClick(product);
        } else {
            router.push(`/products/${product.id}`);
        }
    };

    const handleQuickViewClick = (p: Product) => {
        if (onQuickView) {
            onQuickView(p);
        } else {
            setIsModalOpen(true);
        }
    };

    const getBadges = () => {
        const badges: React.ReactNode[] = [];

        // REQUIREMENT: In niche section, handle specific badges
        if (showNicheType) {
            if (showNicheType === 'order' && product.totalOrders !== undefined) {
                badges.push(<ProductBadge key="orders" topOrders={`${product.totalOrders} ${product.totalOrders <= 1 ? 'Order' : 'Orders'}`} />);
            } else if (showNicheType === 'rating' && product.rating) {
                badges.push(<ProductBadge key="rating" topRated={`${product.rating} ★`} />);
            } else if (showNicheType === 'discount' && product.discountPercentage) {
                // Show only discount badge for the discount tab
                badges.push(<ProductBadge key="discount" topDiscount={`${Math.round(product.discountPercentage)}% OFF`} />);
            } else {
                // Return empty for other cases
                return { topLeft: null, topRight: null };
            }
            return { topLeft: badges[0], topRight: null };
        }


        // Special Requirement for Recently Sold: Show New and Sale independently if they are true
        if (showNewAndSaleOnly) {
            if (product.isNew) badges.push(<ProductBadge key="new" isNew={true} />);
            if (product.isSale) badges.push(<ProductBadge key="sale" onSale={true} />);
            return { topLeft: badges[0], topRight: badges[1] };
        }

        // Special Requirement for New Items: Show ONLY New if it is true
        if (showNewOnly) {
            if (product.isNew) {
                badges.push(<ProductBadge key="new" isNew={true} />);
            }
            return { topLeft: badges[0], topRight: null };
        }

        // Default logic
        if (product.isNew) badges.push(<ProductBadge key="new" isNew={true} />);
        if (product.isSale) badges.push(<ProductBadge key="sale" onSale={true} />);
        if (product.isFeatured && badges.length < 2) badges.push(<ProductBadge key="featured" isFeatured={true} />);
        return { topLeft: badges[0], topRight: badges[1] };
    };



    const handleAddToCart = () => {
        if (!user) {
            setShowLoginDialog(true);
            return;
        }
        addToCart(product.id);
        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 1500);
    };

    const { topLeft, topRight } = getBadges();

    return (
        <>
            <ProductCard
                product={product as any}
                onQuickView={() => handleQuickViewClick(product)}
                onClick={handleCardClick}
                onAddToCart={handleAddToCart}
                topLeftBadge={topLeft}
                topRightBadge={topRight}
                addToCartLabel={justAdded ? 'Added' : 'Add'}
                addToCartIcon={justAdded ? <Check size={14} className="md:w-4 md:h-4" /> : <ShoppingCart size={14} className="md:w-4 md:h-4" />}
            />

            <ProductModal
                product={product as any}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            <LoginDialog
                open={showLoginDialog}
                onOpenChange={setShowLoginDialog}
                onSuccess={() => {
                    addToCart(product.id);
                    setJustAdded(true);
                    setTimeout(() => setJustAdded(false), 1500);
                }}
            />
        </>
    );
};

export default SmartProductCard;

