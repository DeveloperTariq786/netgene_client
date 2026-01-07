import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product } from '@/modules/products/types';
import { Search, Loader2, Star } from 'lucide-react';

interface HeaderSearchResultsProps {
    results: Product[];
    isLoading: boolean;
    isVisible: boolean;
    onClose: () => void;
    searchQuery: string;
}

export const HeaderSearchResults: React.FC<HeaderSearchResultsProps> = ({
    results,
    isLoading,
    isVisible,
    onClose,
    searchQuery
}) => {
    const router = useRouter();

    if (!isVisible) return null;

    const handleProductClick = (productId: string) => {
        onClose();
        router.push(`/products/${productId}`);
    };

    const handleViewAll = (e: React.MouseEvent) => {
        e.preventDefault();
        onClose();
        router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    };

    return (
        <div className="absolute top-[calc(100%+10px)] left-0 right-0 lg:left-12 lg:right-12 bg-white shadow-2xl rounded-2xl border border-gray-100 z-[101] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
            {/* Glossy Header Overlay */}
            <div className="bg-gradient-to-r from-emerald-50/50 to-white border-b border-gray-50 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                        Search Results
                    </span>
                </div>
                {results.length > 0 && (
                    <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-2 py-0.5 rounded-full">
                        {results.length} ITEMS
                    </span>
                )}
            </div>

            <div className="max-h-[420px] overflow-y-auto custom-scrollbar">
                {isLoading ? (
                    <div className="py-20 flex flex-col items-center justify-center space-y-4">
                        <div className="relative">
                            <div className="w-12 h-12 border-4 border-emerald-100 rounded-full" />
                            <Loader2 className="w-12 h-12 text-emerald-600 animate-spin absolute top-0 left-0" />
                        </div>
                        <p className="text-sm text-gray-400 font-medium animate-pulse">Searching the garden...</p>
                    </div>
                ) : results.length > 0 ? (
                    <div className="p-2 space-y-1">
                        {results.slice(0, 10).map((product) => (
                            <div
                                key={product.id}
                                onMouseDown={() => handleProductClick(product.id)}
                                className="group flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-all duration-300 border border-transparent hover:border-gray-100 cursor-pointer"
                            >
                                {/* Image Wrapper */}
                                <div className="relative w-16 h-16 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 shadow-sm transition-transform duration-500 group-hover:scale-95">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {product.discountPercentage !== undefined && product.discountPercentage > 0 && (
                                        <div className="absolute top-1 left-1 bg-rose-500 text-[8px] font-bold text-white px-1.5 py-0.5 rounded-md">
                                            -{product.discountPercentage}%
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-bold text-gray-800 transition-colors group-hover:text-emerald-600 truncate mb-1">
                                        {product.name}
                                    </h4>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1.5 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-100/50">
                                            <Star className="w-3 h-3 text-emerald-600 fill-emerald-600" />
                                            <span className="text-[10px] font-black text-emerald-700">{product.rating || 0}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-emerald-700 font-black text-sm">${product.salePrice}</span>
                                            {product.originalPrice > product.salePrice && (
                                                <span className="text-[10px] text-gray-400 line-through decoration-rose-300">${product.originalPrice}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Arrow */}
                                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:bg-emerald-50">
                                    <Search className="w-3.5 h-3.5 text-emerald-600" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-16 flex flex-col items-center justify-center px-8 text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <Search className="w-8 h-8 text-gray-200" />
                        </div>
                        <h3 className="text-gray-900 font-bold mb-1">No Results for "{searchQuery}"</h3>
                        <p className="text-sm text-gray-400">Try checking your spelling or use more general terms</p>
                    </div>
                )}
            </div>

            {/* Sticky Footer Link */}
            {results.length > 10 && (
                <button
                    onMouseDown={handleViewAll}
                    className="w-full text-center py-3 bg-white hover:bg-emerald-600 hover:text-white text-emerald-600 text-[10px] font-black uppercase tracking-widest transition-all duration-300 border-t border-gray-50"
                >
                    View All Results
                </button>
            )}
        </div>
    );
};
