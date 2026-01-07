'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide, useSwiper, Autoplay, Navigation } from '@/core/lib/utils/swiper';
import { CategoryItem } from '../types';
import CarouselArrow from '@/core/components/shared/CarouselArrow';

interface CategoryCarouselProps {
    items: CategoryItem[];
}

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({ items }) => {
    const { swiperRef, slidePrev, slideNext, stopAutoplay, startAutoplay } = useSwiper();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            id="categories"
            className="relative w-full group py-8"
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
            <div className="max-w-[1400px] mx-auto overflow-hidden px-4 md:px-4 ">
                <Swiper
                    modules={[Autoplay, Navigation]}
                    onSwiper={(swiper) => { swiperRef.current = swiper; }}
                    slidesPerView={'auto'}
                    spaceBetween={24}
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}

                >
                    {items.map((item, index) => (
                        <SwiperSlide key={`${item.id}-${index}`} className="!w-[190px]">
                            <div
                                className="relative w-[200px] h-[100px] rounded-[10px] overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-[1.02]"
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
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Navigation Arrows */}
            <CarouselArrow direction="left" onClick={slidePrev} />
            <CarouselArrow direction="right" onClick={slideNext} />
        </div>
    );
};

export default CategoryCarousel;
