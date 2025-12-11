"use client";

import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronDown, AlignLeft } from 'lucide-react';
import { DRAWER_CATEGORIES as CATEGORIES } from '../../constants';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
    const [expandedCategory, setExpandedCategory] = useState<string | null>('vegetables');

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
                    {CATEGORIES.map((category) => {
                        const isExpanded = expandedCategory === category.id;
                        const hasSub = category.subCategories && category.subCategories.length > 0;

                        return (
                            <div key={category.id} className="select-none">
                                {/* Main Category Row */}
                                <div
                                    className={`
                    flex items-center justify-between px-5 py-3.5 cursor-pointer transition-colors
                    ${isExpanded ? 'bg-emerald-50' : 'hover:bg-gray-50 bg-white'}
                  `}
                                    onClick={() => hasSub && toggleCategory(category.id)}
                                >
                                    <div className="flex items-center gap-4">
                                        <span className={`${isExpanded ? 'text-emerald-500' : 'text-gray-400'}`}>
                                            {category.icon}
                                        </span>
                                        <span
                                            className={`font-medium text-[15px] ${isExpanded ? 'text-emerald-500' : 'text-gray-600'}`}
                                        >
                                            {category.name}
                                        </span>
                                    </div>

                                    {/* Chevron Icon */}
                                    <span className={`${isExpanded ? 'text-emerald-500' : 'text-gray-400'}`}>
                                        {hasSub ? (
                                            isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                                        ) : (
                                            <ChevronRight size={16} />
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
                                    {category.subCategories?.map((sub) => (
                                        <div
                                            key={sub.id}
                                            className="pl-[60px] pr-4 py-2.5 flex items-center gap-3 text-gray-500 hover:text-emerald-600 cursor-pointer transition-colors"
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
                    })}
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
