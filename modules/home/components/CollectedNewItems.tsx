'use client';

import React, { forwardRef, useImperativeHandle } from 'react';
import { Swiper, SwiperSlide, useSwiper, Autoplay, Navigation } from '@/core/lib/utils/swiper';
import SmartProductCard from '@/modules/products/components/SmartProductCard';
import { Product } from '@/modules/home/types';
import { SAMPLE_PRODUCTS } from '@/core/constants/index';

export interface CollectedNewItemsHandle {
    slidePrev: () => void;
    slideNext: () => void;
}

interface CollectedNewItemsProps {
    onProductClick?: (product: Product) => void;
    onQuickView?: (product: Product) => void;
    products?: Product[];
}

const CollectedNewItems = forwardRef<CollectedNewItemsHandle, CollectedNewItemsProps>(({ onProductClick, onQuickView, products }, ref) => {
    const { swiperRef, slidePrev, slideNext, stopAutoplay, startAutoplay } = useSwiper();

    // Expose slide methods to parent
    useImperativeHandle(ref, () => ({
        slidePrev,
        slideNext,
    }));

    // Use passed products or empty array
    const newProducts = products || [];



    return (
        <section className="w-full">
            <div className="max-w-[1400px] mx-auto pl-2 md:px-12 lg:px-14">
                {/* Carousel Container */}
                <div
                    className="relative w-full group"
                    onMouseEnter={stopAutoplay}
                    onMouseLeave={startAutoplay}
                >
                    <div className="overflow-visible">
                        <Swiper
                            modules={[Autoplay, Navigation]}
                            onSwiper={(swiper) => { swiperRef.current = swiper; }}
                            slidesPerView={1.8}
                            spaceBetween={16}
                            loop={true}
                            centeredSlides={false}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            breakpoints={{
                                480: {
                                    slidesPerView: 2,
                                    spaceBetween: 16,
                                },
                                640: {
                                    slidesPerView: 2.5,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 20,
                                },
                                1024: {
                                    slidesPerView: 4,
                                    spaceBetween: 24,
                                },
                                1280: {
                                    slidesPerView: 5,
                                    spaceBetween: 24,
                                },
                            }}
                        >
                            {newProducts.map((product) => (
                                <SwiperSlide key={product.id}>
                                    <SmartProductCard
                                        product={product as any}
                                        onQuickView={onQuickView as any}
                                        onClick={onProductClick as any}
                                        showNewOnly={true}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
});

CollectedNewItems.displayName = 'CollectedNewItems';

export default CollectedNewItems;
