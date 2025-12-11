import React from 'react';
import { Link } from 'lucide-react';

interface BrandAvatarProps {
    src: string;
    alt: string;
    size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
    sm: 'w-32 h-32 lg:w-48 lg:h-48',
    md: 'w-36 h-36 lg:w-48 lg:h-48',
    lg: 'w-48 h-48',
};

/**
 * BrandAvatar Component
 * 
 * Implements the core visual style:
 * 1. Dashed border circle with rotating animation on hover
 * 2. Inner padding whitespace
 * 3. Image container
 * 4. Hover state: Border turns green (#119744) and rotates, overlay appears with link icon
 */
export const BrandAvatar: React.FC<BrandAvatarProps> = ({ src, alt, size = 'sm' }) => {
    return (
        <div className="relative flex justify-center items-center">
            {/* Rotating dashed border container */}
            <div className={`${sizeClasses[size]} rounded-full p-1 lg:p-2 bg-white shadow-sm relative`}>
                {/* Rotating dashed border - positioned absolutely */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-gray-200 group-hover:border-brand-green transition-colors duration-300 group-hover:animate-spin-slow" />

                {/* Inner Circle container for image */}
                <div className="w-full h-full rounded-full overflow-hidden relative z-10">
                    <img
                        src={src}
                        alt={alt}
                        className="w-full h-full object-cover"
                    />

                    {/* Overlay - appears on hover */}
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        {/* Green Link Button */}
                        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-brand-green rounded-full flex items-center justify-center text-white transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-75 shadow-lg">
                            <Link size={16} className="lg:w-[18px] lg:h-[18px]" strokeWidth={2.5} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
