'use client';

import React from 'react';

interface PromoSectionProps {
    imageUrl: string;
    alt?: string;
}

const PromoSection: React.FC<PromoSectionProps> = ({ imageUrl, alt = 'Promo Banner' }) => {
    return (

        <div className="w-full h-[100px] md:h-[200px] lg:h-[320px] rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img
                src={imageUrl}
                alt={alt}
                className="promo-img w-full h-full"
            />
        </div>

    );
};

export default PromoSection;
