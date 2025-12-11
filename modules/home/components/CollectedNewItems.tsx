'use client';

import React, { forwardRef, useImperativeHandle } from 'react';
import { Swiper, SwiperSlide, useSwiper, Autoplay, Navigation } from '@/core/utils/swiper';
import ProductCard from '@/core/components/shared/ProductCard';
import { ProductBadge } from '@/core/components/shared/ProductBadge';
import { useIsMobile } from '@/core/hooks/use-mobile';
import { SAMPLE_PRODUCTS } from '@/core/constants/index';

export interface CollectedNewItemsHandle {
    slidePrev: () => void;
    slideNext: () => void;
}

const CollectedNewItems = forwardRef<CollectedNewItemsHandle>((_, ref) => {
    const { swiperRef, slidePrev, slideNext, stopAutoplay, startAutoplay } = useSwiper();
    const isMobile = useIsMobile();

    // Expose slide methods to parent
    useImperativeHandle(ref, () => ({
        slidePrev,
        slideNext,
    }));

    // Filter products that are new
    const newProducts = SAMPLE_PRODUCTS.filter(product => product.isNew);

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
                            slidesPerView={isMobile ? 1.8 : 2}
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
                                    <ProductCard
                                        product={product}
                                        topLeftBadge={<ProductBadge isNew={true} />}
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
