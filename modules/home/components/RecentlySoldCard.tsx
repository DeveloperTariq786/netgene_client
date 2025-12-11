"use client";

import React from 'react';
import ProductCard from '@/core/components/shared/ProductCard';
import { ProductBadge } from '@/core/components/shared/ProductBadge';
import { Product } from '@/modules/home/types';

interface RecentlySoldCardProps {
    product: Product;
    onQuickView?: (product: Product) => void;
    onClick?: (product: Product) => void;
}

const RecentlySoldCard: React.FC<RecentlySoldCardProps> = ({ product, onQuickView, onClick }) => {
    return (
        <ProductCard
            product={product}
            onQuickView={onQuickView}
            onClick={onClick}
            topLeftBadge={product.isNew ? <ProductBadge isNew={true} /> : undefined}
            topRightBadge={product.onSale ? <ProductBadge onSale={true} /> : undefined}
        />
    );
};

export default RecentlySoldCard;
