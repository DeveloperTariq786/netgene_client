import React from 'react';

const OutOfStockBadge: React.FC = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="bg-red-500/90 text-white text-[10px] md:text-xs font-black px-4 py-1.5 md:px-6 md:py-2 rounded-sm uppercase tracking-[0.15em] transform -rotate-[30deg] shadow-xl border-2 border-white/40 whitespace-nowrap">
                Sold Out
            </div>
        </div>
    );
};

export default OutOfStockBadge;
