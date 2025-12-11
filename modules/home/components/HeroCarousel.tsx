"use client";

import React from 'react';
import { Swiper, SwiperSlide, useSwiper, Autoplay, Pagination, EffectFade, Navigation } from '@/core/utils/swiper';
import { ShoppingBag, Tag, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '../../../core/constants';
import { Button } from '@/core/components/ui';

const HeroCarousel: React.FC = () => {
    const { swiperRef, slidePrev, slideNext } = useSwiper();
    const slidesToRender = [...HERO_SLIDES, ...HERO_SLIDES];

    return (
        <div className="relative w-full h-auto bg-hero-organic overflow-hidden group">
            <button
                onClick={slidePrev}
                className="swiper-button-prev-custom absolute left-4 lg:left-6 top-1/2 z-30 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg hidden lg:flex items-center justify-center hover:bg-emerald-50 hover:scale-110 transition-all duration-300 text-emerald-600"
                aria-label="Previous slide"
            >
                <ChevronLeft size={28} strokeWidth={2.5} />
            </button>
            <button
                onClick={slideNext}
                className="swiper-button-next-custom absolute right-4 lg:right-6 top-1/2 z-30 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg hidden lg:flex items-center justify-center hover:bg-emerald-50 hover:scale-110 transition-all duration-300 text-emerald-600"
                aria-label="Next slide"
            >
                <ChevronRight size={28} strokeWidth={2.5} />
            </button>

            <Swiper
                modules={[Autoplay, Pagination, EffectFade, Navigation]}
                onSwiper={(swiper) => { swiperRef.current = swiper; }}
                spaceBetween={0}
                slidesPerView={1}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                loop={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                className="w-full h-full"
            >
                {slidesToRender.map((slide, index) => {
                    const isEven = index % 2 === 0;
                    const mobileTextAlignClass = 'text-left';
                    const mobileFlexAlignClass = 'items-start';
                    const uniqueKey = `${slide.id}-${index}`;

                    return (
                        <SwiperSlide key={uniqueKey} className="relative w-full h-full">
                            <div className="container mx-auto px-4 lg:px-24 pt-6 pb-20 md:pt-8 md:pb-12 lg:py-20 h-full flex items-start lg:items-center justify-center min-h-[400px] md:min-h-[440px] lg:min-h-[550px]">
                                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4 lg:gap-4 items-center">
                                    <div className={`
                    flex flex-col justify-center z-10
                    order-2 lg:order-none
                    ${mobileFlexAlignClass} lg:items-start lg:text-left
                    ${isEven ? 'lg:col-start-1' : 'lg:col-start-2 lg:row-start-1'}
                  `}>
                                        <h1 className={`
                      text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-2 md:mb-2 lg:mb-6
                      ${mobileTextAlignClass} lg:text-left
                    `}>
                                            {slide.title}
                                        </h1>

                                        <p className={`
                      text-base sm:text-lg text-gray-600 mb-4 md:mb-4 lg:mb-8 max-w-lg
                      ${mobileTextAlignClass} lg:text-left
                    `}>
                                            {slide.description}
                                        </p>

                                        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 md:gap-4 mt-2 lg:mt-0">
                                            <Button
                                                variant="primary"
                                                size="lg"
                                                className="group shadow-lg hover:-translate-y-1 w-full sm:w-auto"
                                            >
                                                <ShoppingBag size={20} />
                                                {slide.ctaPrimary}
                                            </Button>

                                            <Button
                                                variant="outline"
                                                size="lg"
                                                className="group w-full sm:w-auto"
                                            >
                                                {isEven ? <Tag size={20} /> : <ArrowRight size={20} />}
                                                {slide.ctaSecondary}
                                            </Button>
                                        </div>
                                    </div>

                                    <div className={`
                    flex justify-center items-center relative h-full
                    order-1 lg:order-none mb-2 md:mb-3 lg:mb-0
                    ${isEven ? 'lg:col-start-2' : 'lg:col-start-1 lg:row-start-1'}
                  `}>
                                        <img
                                            src={slide.image}
                                            alt={slide.title}
                                            className="w-auto h-auto max-h-[300px] md:max-h-[320px] lg:max-h-[550px] object-contain drop-shadow-xl transform hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default HeroCarousel;
