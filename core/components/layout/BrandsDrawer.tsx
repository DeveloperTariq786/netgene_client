"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { X, ChevronRight, Store, Search } from 'lucide-react';
import { BRANDS } from '../../constants';

interface BrandsDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const BrandsDrawer: React.FC<BrandsDrawerProps> = ({ isOpen, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Lock body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const filteredBrands = BRANDS.filter(brand =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/60 z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Drawer Panel */}
            <div
                className={`fixed top-0 left-0 h-full w-[340px] max-w-[85vw] bg-gray-50 z-[101] transform transition-transform duration-300 ease-out shadow-2xl flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className="flex flex-col bg-white border-b border-gray-100 pt-5 pb-3 px-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Store className="text-emerald-600" size={24} strokeWidth={2.5} />
                            <h2 className="text-xl font-bold text-gray-800 tracking-tight">Shop by Brand</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1 rounded-full hover:bg-gray-100 text-gray-400 transition-colors"
                        >
                            <X size={20} strokeWidth={2.5} />
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search brands..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-gray-100 text-sm text-gray-700 rounded-lg pl-9 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-gray-400"
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                    </div>
                </div>

                {/* Brands List */}
                <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-3">
                    {filteredBrands.map((brand, index) => (
                        <div
                            key={brand.id}
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
                                    {/* Overlay to ensure text readability if needed, or just style */}
                                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                                </div>

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
                        </div>
                    ))}

                    {filteredBrands.length === 0 && (
                        <div className="text-center py-10">
                            <p className="text-gray-400 text-sm">No brands found matching "{searchTerm}"</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 bg-white text-center">
                    <Link href="/brands" onClick={onClose}>
                        <button className="w-full py-3 bg-emerald-50 text-emerald-600 rounded-xl font-semibold text-sm hover:bg-emerald-100 transition-colors">
                            View All Brands
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default BrandsDrawer;
