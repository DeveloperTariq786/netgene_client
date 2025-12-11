import React from 'react';
import { ChevronRight } from 'lucide-react';
import { BRANDS } from '@/core/constants';

const BrandMegaMenu = () => {
    return (
        <div className="w-full bg-gradient-to-br from-white via-gray-50 to-white p-8 shadow-2xl rounded-b-2xl border-t-2 border-emerald-100">
            <div className="max-h-[420px] overflow-y-auto pr-3 brand-scrollbar">
                <div className="grid grid-cols-4 gap-3">
                    {BRANDS.map((brand) => (
                        <a
                            key={brand.id}
                            href="#"
                            className="group bg-white rounded-xl p-3 border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md hover:border-emerald-200 transition-all duration-200 cursor-pointer active:scale-[0.99]"
                        >
                            <div className="flex items-center gap-3">
                                {/* Brand Logo */}
                                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-100 flex-shrink-0">
                                    <img
                                        src={brand.logoUrl}
                                        alt={brand.name}
                                        className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                                </div>

                                {/* Brand Info */}
                                <div className="flex flex-col">
                                    <span className="font-semibold text-emerald-700 text-[15px] group-hover:text-emerald-600 transition-colors">
                                        {brand.name}
                                    </span>
                                    <span className="text-xs text-gray-400 font-medium">
                                        {brand.itemsCount} Items
                                    </span>
                                </div>
                            </div>

                            {/* Arrow Icon */}
                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
                                <ChevronRight size={18} strokeWidth={2.5} />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BrandMegaMenu;
