'use client';

import React, { forwardRef, useImperativeHandle } from 'react';
import { BrandCard } from './BrandCard';
import { Brand } from '../types';
import { Swiper, SwiperSlide, Autoplay, Navigation, useSwiper } from '../../../core/utils/swiper';
import { useIsMobile } from '../../../core/hooks/use-mobile';

interface BrandSliderProps {
    brands: Brand[];
}

export interface BrandSliderHandle {
    slidePrev: () => void;
    slideNext: () => void;
}

export const BrandSlider = forwardRef<BrandSliderHandle, BrandSliderProps>(({ brands }, ref) => {
    const { swiperRef, slidePrev, slideNext, stopAutoplay, startAutoplay } = useSwiper();
    const isMobile = useIsMobile();

    // Expose slide methods to parent
    useImperativeHandle(ref, () => ({
        slidePrev,
        slideNext,
    }));

    return (
        <section className="w-full">
            <div className="max-w-[1400px] mx-auto px-0 md:px-12 lg:px-14">
                {/* Carousel Container */}
                <div
                    className="relative w-full group/arrows"
                    onMouseEnter={stopAutoplay}
                    onMouseLeave={startAutoplay}
                >
                    <div className="overflow-visible">
                        <Swiper
                            modules={[Autoplay, Navigation]}
                            onSwiper={(swiper) => { swiperRef.current = swiper; }}
                            slidesPerView={isMobile ? 2 : 2}
                            spaceBetween={8}
                            loop={true}
                            centeredSlides={false}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            breakpoints={{
                                480: {
                                    slidesPerView: 2,
                                    spaceBetween: 10,
                                },
                                640: {
                                    slidesPerView: 2.5,
                                    spaceBetween: 12,
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 16,
                                },
                                1024: {
                                    slidesPerView: 4,
                                    spaceBetween: 20,
                                },
                                1280: {
                                    slidesPerView: 5,
                                    spaceBetween: 24,
                                },
                            }}
                        >
                            {brands.map((brand) => (
                                <SwiperSlide key={brand.id}>
                                    <BrandCard brand={brand} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
});

BrandSlider.displayName = 'BrandSlider';
