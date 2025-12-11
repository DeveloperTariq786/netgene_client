'use client';

import React from 'react';
import { PromoCard } from '@/core/components/shared/promo-card';
import { HOME_PROMO_CARDS } from '@/core/constants/index';

const HomePromoCards: React.FC = () => {
    return (
        <section className="w-full py-8">
            <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-14">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                    {HOME_PROMO_CARDS.map((promo) => (
                        <PromoCard
                            key={promo.id}
                            imageUrl={promo.imageUrl}
                            imageAlt={`Promo ${promo.id}`}
                            aspectRatio="wide"
                            rounded="lg"
                            className="w-full hover:scale-[1.02] transition-transform duration-300 !aspect-[21/9]"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomePromoCards;
