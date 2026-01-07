import React from 'react';
import { Badge } from '@/core/components/ui/badge';
import { cn } from '@/core/lib/utils/utils';

interface ProductBadgeProps {
    onSale?: boolean;
    isNew?: boolean;
    isFeatured?: boolean;
    topOrders?: string;
    topRated?: string;
    topDiscount?: string;
    className?: string;
}

export const ProductBadge: React.FC<ProductBadgeProps> = ({
    onSale,
    isNew,
    isFeatured,
    topOrders,
    topRated,
    topDiscount,
    className
}) => {
    // Top Discount (Red) - Using div with ProductCard styling
    if (topDiscount) {
        return (
            <div className={cn("bg-[#ff3838] text-white px-2 py-1 rounded-[3px] text-sm font-semibold", className)}>
                {topDiscount}
            </div>
        );
    }

    // Top Rated (Yellow) - Using div with ProductCard styling
    if (topRated) {
        return (
            <div className={cn("bg-[#ffab10] text-white px-2 py-1 rounded-[3px] text-sm font-semibold", className)}>
                {topRated}
            </div>
        );
    }

    // Top Orders (Blue) - Using div with ProductCard styling
    if (topOrders) {
        return (
            <div className={cn("bg-[#1494a9] text-white px-2 py-1 rounded-[3px] text-sm font-semibold", className)}>
                {topOrders}
            </div>
        );
    }

    // Sale (Orange - Existing) - Using div with ProductCard styling
    if (onSale) {
        return (
            <div className={cn("bg-[#e86121] text-white px-3 py-1 rounded-[3px] text-sm font-semibold", className)}>
                Sale
            </div>
        );
    }

    // New (Greenish - Existing) - Using div with ProductCard styling
    if (isNew) {
        return (
            <div className={cn("bg-[#11b76b] text-white px-3 py-1 rounded-[3px] text-sm font-semibold", className)}>
                New
            </div>
        );
    }

    // Featured (Purple) - Keep using Badge component with smaller styling
    if (isFeatured) {
        return (
            <Badge className={cn("bg-[#b12fad] hover:bg-[#b12fad]/90 text-white border-none rounded-[3px] px-2 py-1 text-xs font-semibold", className)}>
                Featured
            </Badge>
        );
    }

    return null;
};
