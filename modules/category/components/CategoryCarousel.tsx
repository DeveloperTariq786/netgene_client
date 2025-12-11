'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide, useSwiper, Autoplay, Navigation } from '@/core/utils/swiper';

import CarouselArrow from '@/core/components/shared/CarouselArrow';
import { useIsMobile } from '@/core/hooks/use-mobile';
import { CategoryItem } from '../types';

interface CategoryCarouselProps {
    items: CategoryItem[];
    slidesPerView?: {
        sm?: number;          // >= 640px
        md?: number;          // >= 768px
        lg?: number;          // >= 1024px
    };
}

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({
    items,
    slidesPerView = { sm: 3, md: 4, lg: 5 }
}) => {
    const { swiperRef, slidePrev, slideNext, stopAutoplay, startAutoplay } = useSwiper();
    const [isHovered, setIsHovered] = useState(false);
    const isMobile = useIsMobile();

    // Use 2 slides on mobile, otherwise use configured values
    const mobileSlidesPerView = 2;

    return (
        <div
            className="relative w-full group py-6"
            onMouseEnter={() => {
                setIsHovered(true);
                stopAutoplay();
            }}
            onMouseLeave={() => {
                setIsHovered(false);
                startAutoplay();
            }}
        >
            {/* Container with clipping */}
            <div className="max-w-[1400px] mx-auto overflow-hidden px-4 md:px-12 lg:px-20">
                <Swiper
                    modules={[Autoplay, Navigation]}
                    onSwiper={(swiper) => { swiperRef.current = swiper; }}
                    slidesPerView={isMobile ? mobileSlidesPerView : slidesPerView.sm}
                    spaceBetween={16}
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: slidesPerView.sm,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: slidesPerView.md,
                            spaceBetween: 24,
                        },
                        1024: {
                            slidesPerView: slidesPerView.lg,
                            spaceBetween: 24,
                        },
                    }}
                >
                    {items.map((item, index) => (
                        <SwiperSlide key={`${item.id}-${index}`}>
                            <Link href="/products">
                                <div
                                    className="relative w-full aspect-[2/1] rounded-[10px] overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-[1.02]"
                                >
                                    {/* Background Image */}
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />


                                    <div
                                        className={`absolute inset-0 opacity-20 bg-gray-500 transition-opacity hover:opacity-30`}
                                    ></div>

                                    {/* Text Content */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
                                        <h3 className="text-lg font-bold tracking-wide mb-1 drop-shadow-md text-center px-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs font-medium opacity-90">
                                            {item.count}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Navigation Arrows */}
            <CarouselArrow
                direction="left"
                onClick={slidePrev}
                className="!left-2 md:!left-4"
            />
            <CarouselArrow
                direction="right"
                onClick={slideNext}
                className="!right-2 md:!right-4"
            />
        </div>
    );
};

export default CategoryCarousel;
