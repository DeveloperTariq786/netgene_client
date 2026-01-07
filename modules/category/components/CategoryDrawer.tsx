"use client";

import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronDown, AlignLeft, Grid2X2, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCategories } from '../hooks/useCategories';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const { data: categories, isLoading, error } = useCategories();
    const router = useRouter();

    const handleCategoryClick = (id: string, hasSub: boolean) => {
        if (hasSub) {
            toggleCategory(id);
        } else {
            router.push(`/products?category=${id}`);
            onClose();
        }
    };

    // Lock body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
            setExpandedCategory(null);
        };
    }, [isOpen]);

    const toggleCategory = (id: string) => {
        setExpandedCategory(prev => prev === id ? null : id);
    };

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
                className={`fixed top-0 left-0 h-full w-[320px] bg-white z-[101] transform transition-transform duration-300 ease-out shadow-2xl flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
                    <div className="flex items-center gap-3">
                        <AlignLeft className="text-emerald-500" size={24} strokeWidth={2.5} />
                        <h2 className="text-xl font-bold text-gray-800 tracking-tight">Categories</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                    >
                        <X size={20} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Categories List */}
                <div className="flex-1 overflow-y-auto scrollbar-hide py-2">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-10 gap-3">
                            <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                            <p className="text-sm font-medium text-emerald-600/70">Loading Categories...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-10 px-4">
                            <p className="text-sm font-medium text-red-500">Failed to load categories</p>
                        </div>
                    ) : (
                        categories?.map((category) => {
                            const isExpanded = expandedCategory === category.id;
                            const hasSub = category.subcategories && category.subcategories.length > 0;

                            return (
                                <div key={category.id} className="select-none">
                                    {/* Main Category Row */}
                                    <div
                                        className={`
                    flex items-center justify-between px-5 py-3.5 cursor-pointer transition-all relative overflow-hidden group
                    ${isExpanded ? 'bg-emerald-50' : 'hover:bg-gray-50 bg-white'}
                  `}
                                        onClick={() => handleCategoryClick(category.id, hasSub)}
                                    >
                                        <div className="flex items-center gap-4 relative z-10">
                                            <div className="w-8 h-8 rounded-lg overflow-hidden border border-gray-100 bg-white flex-shrink-0">
                                                <img
                                                    src={category.image}
                                                    alt={category.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <span
                                                    className={`font-semibold text-[15px] leading-tight ${isExpanded ? 'text-emerald-500' : 'text-gray-700'}`}
                                                >
                                                    {category.title}
                                                </span>
                                                <span className="text-[11px] text-gray-400 font-medium">
                                                    {category.count}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Chevron Icon */}
                                        <span className={`relative z-10 ${isExpanded ? 'text-emerald-500' : 'text-gray-400'}`}>
                                            {hasSub ? (
                                                isExpanded ? <ChevronDown size={16} strokeWidth={2.5} /> : <ChevronRight size={16} strokeWidth={2.5} />
                                            ) : (
                                                <ChevronRight size={16} strokeWidth={2.5} />
                                            )}
                                        </span>
                                    </div>

                                    {/* Subcategories */}
                                    <div
                                        className={`
                    overflow-hidden transition-all duration-300 ease-in-out bg-white
                    ${isExpanded && hasSub ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}
                   `}
                                    >
                                        {category.subcategories?.map((sub) => (
                                            <div
                                                key={sub.id}
                                                className="pl-[60px] pr-4 py-2.5 flex items-center gap-3 text-gray-500 hover:text-emerald-600 cursor-pointer transition-colors"
                                                onClick={() => {
                                                    router.push(`/products?category=${category.id}&subcategory=${sub.id}`);
                                                    onClose();
                                                }}
                                            >
                                                <span className="w-2 h-[1.5px] bg-gray-300 rounded-full"></span>
                                                <span className="text-[14px] font-medium">{sub.name}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Separator line for visual match, only if not expanded or after expanded section */}
                                    {!isExpanded && (
                                        <div className="mx-5 border-b border-gray-50 last:border-0"></div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 bg-white text-center">
                    <p className="text-xs text-gray-400 font-medium">
                        All Rights Reserved by <span className="text-emerald-500">Mironcoder</span>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Drawer;

