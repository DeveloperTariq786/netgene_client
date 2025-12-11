import React from 'react';

interface CarouselArrowProps {
    direction: 'left' | 'right';
    onClick: () => void;
    className?: string;
}

const CarouselArrow: React.FC<CarouselArrowProps> = ({ direction, onClick, className = '' }) => {
    const isLeft = direction === 'left';

    return (
        <button
            onClick={onClick}
            className={`carousel-arrow absolute ${isLeft ? 'left-2 md:left-4' : 'right-2 md:right-4'
                } top-1/2 -translate-y-1/2 z-20 bg-white text-green-800 rounded-full p-3 shadow-lg opacity-0 lg:group-hover:opacity-100 lg:group-hover/arrows:opacity-100 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 hidden md:block ${className}`}
            aria-label={isLeft ? 'Scroll left' : 'Scroll right'}
        >
            {isLeft ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M19 12H5" />
                    <path d="M12 19l-7-7 7-7" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                </svg>
            )}
        </button>
    );
};

export default CarouselArrow;
