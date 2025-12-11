'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, LucideIcon } from 'lucide-react';

// Pinterest icon component
const PinterestIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.4.04-3.44l1.44-6.1s-.36-.73-.36-1.81c0-1.7.99-2.97 2.22-2.97 1.05 0 1.56.78 1.56 1.72 0 1.05-.67 2.62-1.02 4.08-.29 1.22.61 2.22 1.82 2.22 2.18 0 3.86-2.3 3.86-5.62 0-2.94-2.11-4.99-5.12-4.99-3.49 0-5.54 2.62-5.54 5.32 0 1.05.41 2.18.91 2.8.1.12.12.23.09.35l-.34 1.4c-.05.22-.18.27-.41.16-1.55-.72-2.52-2.98-2.52-4.8 0-3.9 2.84-7.5 8.18-7.5 4.29 0 7.63 3.06 7.63 7.14 0 4.26-2.69 7.7-6.42 7.7-1.25 0-2.43-.65-2.84-1.42l-.77 2.95c-.28 1.08-1.03 2.43-1.54 3.25A12 12 0 1 0 12 0z" />
    </svg>
);

interface SocialLink {
    icon: LucideIcon | React.FC;
    href: string;
    label: string;
    hoverColor?: string;
}

const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
    { icon: Facebook, href: '#', label: 'Facebook', hoverColor: 'hover:bg-blue-600' },
    { icon: Twitter, href: '#', label: 'Twitter', hoverColor: 'hover:bg-sky-500' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', hoverColor: 'hover:bg-blue-700' },
    { icon: Instagram, href: '#', label: 'Instagram', hoverColor: 'hover:bg-pink-600' },
];

interface SocialShareLinksProps {
    links?: SocialLink[];
    showPinterest?: boolean;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'brand';
    className?: string;
}

export const SocialShareLinks: React.FC<SocialShareLinksProps> = ({
    links = DEFAULT_SOCIAL_LINKS,
    showPinterest = false,
    size = 'md',
    variant = 'default',
    className = '',
}) => {
    const sizeClasses = {
        sm: 'w-9 h-9',
        md: 'w-11 h-11',
        lg: 'w-12 h-12',
    };

    const iconSizes = {
        sm: 16,
        md: 18,
        lg: 20,
    };

    const getHoverClass = (link: SocialLink) => {
        if (variant === 'brand') {
            return 'hover:bg-brand-green hover:border-brand-green';
        }
        return link.hoverColor || 'hover:bg-brand-green';
    };

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {links.map((social, index) => {
                const IconComponent = social.icon;
                return (
                    <Link
                        key={index}
                        href={social.href}
                        aria-label={social.label}
                        className={`${sizeClasses[size]} rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 ${getHoverClass(social)} hover:text-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
                    >
                        <IconComponent className={`w-[${iconSizes[size]}px] h-[${iconSizes[size]}px]`} />
                    </Link>
                );
            })}
            {showPinterest && (
                <Link
                    href="#"
                    aria-label="Pinterest"
                    className={`${sizeClasses[size]} rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 ${variant === 'brand' ? 'hover:bg-brand-green hover:border-brand-green' : 'hover:bg-red-600'} hover:text-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
                >
                    <PinterestIcon />
                </Link>
            )}
        </div>
    );
};

// Export the Pinterest icon for external use if needed
export { PinterestIcon };

export default SocialShareLinks;
