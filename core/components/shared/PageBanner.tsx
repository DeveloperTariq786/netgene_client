import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface PageBannerProps {
    title: string;
    breadcrumbs: BreadcrumbItem[];
    backgroundImage?: string;
}

export const PageBanner: React.FC<PageBannerProps> = ({
    title,
    breadcrumbs,
    backgroundImage = 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/single-banner.jpg'
}) => {
    return (
        <div className="relative w-full h-[150px] md:h-[200px] lg:h-[250px] overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a4a35]/60 via-[#1e5a40]/50 to-[#1a4a35]/60" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
                {/* Title */}
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-wide mb-3">
                    {title}
                </h1>

                {/* Breadcrumb */}
                <nav className="flex items-center gap-1 text-xs md:text-sm">
                    {breadcrumbs.map((item, index) => (
                        <React.Fragment key={index}>
                            {index > 0 && (
                                <span className="text-white/60 mx-1">/</span>
                            )}
                            {item.href ? (
                                <Link
                                    href={item.href}
                                    className="text-white/80 hover:text-white transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="text-emerald-400 font-medium">
                                    {item.label}
                                </span>
                            )}
                        </React.Fragment>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default PageBanner;
