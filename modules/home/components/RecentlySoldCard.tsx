"use client";

import React from 'react';
import SmartProductCard from '@/modules/products/components/SmartProductCard';
import { Product } from '@/modules/home/types';

interface RecentlySoldCardProps {
    product: Product;
    onQuickView?: (product: Product) => void;
    onClick?: (product: Product) => void;
}

const RecentlySoldCard: React.FC<RecentlySoldCardProps> = ({ product, onQuickView, onClick }) => {
    return (
        <SmartProductCard
            product={product as any}
            onQuickView={onQuickView as any}
            onClick={onClick as any}
            showNewAndSaleOnly={true}
        />
    );
};

export default RecentlySoldCard;
