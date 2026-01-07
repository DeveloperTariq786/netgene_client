'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide, useSwiper, Autoplay, Navigation } from '@/core/lib/utils/swiper';

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
                    loop={items.length > 5}
                    centeredSlides={false}
                    grabCursor={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 24,
                        },
                        1024: {
                            slidesPerView: slidesPerView.lg || 5,
                            spaceBetween: 30,
                        },
                        1440: {
                            slidesPerView: 6,
                            spaceBetween: 30,
                        }
                    }}
                    className="category-swiper !py-4"
                >
                    {items.map((item, index) => (
                        <SwiperSlide key={`${item.id}-${index}`}>
                            <Link href={`/products?category=${item.id}`} className="block group/item">
                                <div
                                    className="relative w-full aspect-[2/1.1] rounded-xl overflow-hidden cursor-pointer shadow-sm border border-white/10"
                                >
                                    {/* Background Image with Zoom on Hover */}
                                    <div className="absolute inset-0 transition-transform duration-700 group-hover/item:scale-110">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover/item:opacity-90 transition-opacity"></div>

                                    {/* Text Content */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 p-2">
                                        <h3 className="text-sm md:text-base lg:text-lg font-bold tracking-wide mb-0.5 drop-shadow-lg text-center leading-tight">
                                            {item.title}
                                        </h3>
                                        <div className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full">
                                            <p className="text-[10px] md:text-xs font-semibold">
                                                {item.count}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Shine Effect */}
                                    <div className="absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity pointer-events-none">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] animate-shine"></div>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none z-30 px-2 md:px-6">
                <div className="flex justify-between w-full max-w-[1500px] mx-auto overflow-visible pointer-events-none">
                    <CarouselArrow
                        direction="left"
                        onClick={slidePrev}
                        className="pointer-events-auto relative !static translate-y-0"
                    />
                    <CarouselArrow
                        direction="right"
                        onClick={slideNext}
                        className="pointer-events-auto relative !static translate-y-0"
                    />

                </div>
            </div>

        </div>
    );
};

export default CategoryCarousel;
