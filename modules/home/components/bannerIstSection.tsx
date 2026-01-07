'use client';

import { usePromotion } from '../hooks/usePromotion';
import { Skeleton } from '@/core/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { PROMO_BANNERS } from '@/core/constants';
import router from 'next/router';

interface BannerIstSectionProps {
    enabled?: boolean;
}

const BannerIstSection: React.FC<BannerIstSectionProps> = ({ enabled = true }) => {
    const router = useRouter();
    const { data: banners, isLoading } = usePromotion(enabled);

    const banner = banners?.[0];
    const firstBannerImage = banner?.image || PROMO_BANNERS[0].imageUrl;

    if (isLoading && !banners) {
        return (
            <div className="px-4 lg:px-24 py-0 lg:py-20">
                <Skeleton className="w-full h-[100px] md:h-[200px] lg:h-[320px] rounded-lg" />
            </div>
        );
    }

    return (
        <div
            onClick={() => {
                const id = banner?.category || banner?.brandId;
                if (id) {
                    const paramName = banner.association === 'brand' ? 'brand' : 'category';
                    router.push(`/products?${paramName}=${id}`);
                } else {
                    router.push('/products');
                }
            }}
            className="w-full h-[100px] md:h-[200px] lg:h-[320px] rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        >
            <img
                src={firstBannerImage}
                alt="Promotion Banner"
                className="promo-img w-full h-full object-cover"
            />
        </div>
    );
};

export default BannerIstSection;
