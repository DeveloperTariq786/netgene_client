'use client';

import React from 'react';
import { PromoCard } from '@/core/components/shared/promo-card';
import { HOME_PROMO_CARDS } from '@/core/constants/index';
import { useRouter } from 'next/navigation';
import { usePromotion } from '../hooks/usePromotion';
import { Skeleton } from '@/core/components/ui/skeleton';
import { PromotionItem } from '../types';

const Banner2ndSectionSkeleton = () => (
    <section className="w-full py-8">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                <Skeleton className="aspect-[21/9] w-full rounded-lg" />
                <Skeleton className="aspect-[21/9] w-full rounded-lg" />
            </div>
        </div>
    </section>
);

interface Banner2ndSectionProps {
    enabled?: boolean;
}

const Banner2ndSection: React.FC<Banner2ndSectionProps> = ({ enabled = true }) => {
    const router = useRouter();
    const { data: banners, isLoading } = usePromotion(enabled);

    if (isLoading && !banners) {
        return <Banner2ndSectionSkeleton />;
    }

    // Get 2nd and 3rd banner for this section, or fallback to static placeholders
    const displayBanners = banners && banners.length >= 2
        ? banners.slice(1, 3).map(b => ({
            id: b.id,
            image: b.image,
            association: b.association,
            associationId: b.category || b.brandId
        }))
        : HOME_PROMO_CARDS.map(c => ({
            id: c.id,
            image: c.imageUrl,
            association: undefined,
            associationId: undefined
        }));

    return (
        <section className="w-full py-8">
            <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-14">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                    {displayBanners.map((banner) => (
                        <PromoCard
                            key={banner.id}
                            imageUrl={banner.image}
                            imageAlt="Promotion"
                            aspectRatio="wide"
                            rounded="lg"
                            className="w-full hover:scale-[1.02] transition-transform duration-300 !aspect-[21/9]"
                            onClick={() => {
                                if (banner.associationId) {
                                    const paramName = banner.association === 'brand' ? 'brand' : 'category';
                                    router.push(`/products?${paramName}=${banner.associationId}`);
                                } else {
                                    router.push('/products');
                                }
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Banner2ndSection;
