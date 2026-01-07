'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Minus, Plus, Trash2, ShoppingBag, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useCartStore } from '../store/useCartStore';
import { useCart, useAddToCart, useDeleteCartItem } from '../hooks/useCart';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';

const CartDrawer: React.FC = () => {
    const router = useRouter();
    const { user } = useAuthStore();
    const {
        items,
        isCartOpen,
        closeCart,
        updateQuantity,
        totalPrice,
        totalItems,
    } = useCartStore();

    const { isLoading, error, refetch } = useCart(isCartOpen && !!user);
    const { addToCart } = useAddToCart();
    const { deleteItem, isDeleting, deletingId } = useDeleteCartItem();

    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isCartOpen]);

    const handleUpdateQuantity = (productId: string, cartItemId: string, delta: number) => {
        updateQuantity(cartItemId, delta);
        addToCart(productId, delta);
    };

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex justify-end">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={closeCart}
            />

            <div className="relative w-full max-w-[450px] bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
                <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 bg-gray-50/80">
                    <h2 className="text-base md:text-xl font-bold text-gray-900">
                        Shopping Cart <span className="text-xs md:text-sm text-gray-500 font-medium">({totalItems} items)</span>
                    </h2>
                    <button
                        onClick={closeCart}
                        className="p-1.5 md:p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 border border-gray-200"
                    >
                        <X size={20} className="md:w-6 md:h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 cart-scrollbar">
                    {isLoading && items.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-16 md:py-20">
                            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin mb-4" />
                            <p className="text-gray-500 text-sm">Loading your cart...</p>
                        </div>
                    )}

                    {error && !isLoading && items.length === 0 && (
                        <div className="text-center py-16 md:py-20">
                            <p className="text-red-500 mb-4 text-sm md:text-base">
                                {error instanceof Error ? error.message : 'Failed to load cart'}
                            </p>
                            <button
                                onClick={() => refetch()}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 md:py-3 px-6 md:px-8 rounded-md text-sm md:text-base transition-colors shadow-md"
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                    {items.map((item) => (
                        <div key={item.id} className="flex gap-4 group">
                            <div className="relative w-20 h-20 md:w-[100px] md:h-[100px] flex-shrink-0 border border-gray-200 rounded-md md:rounded-lg overflow-hidden bg-white flex items-center justify-center">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className={`object-cover transition-opacity ${isDeleting && deletingId === item.id ? 'opacity-30' : 'opacity-100'}`}
                                />

                                {/* Loading Overlay for specific item deletion */}
                                {isDeleting && deletingId === item.id && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
                                        <Loader2 size={24} className="text-emerald-600 animate-spin" />
                                    </div>
                                )}

                                <div
                                    className={`absolute inset-0 bg-black/50 transition-opacity flex items-center justify-center cursor-pointer ${isDeleting ? 'pointer-events-none' : 'opacity-0 group-hover:opacity-100'}`}
                                    onClick={() => deleteItem(item.id)}
                                >
                                    <div className="bg-white p-2 rounded-full text-red-500 shadow-sm transform scale-90 group-hover:scale-100 transition-transform">
                                        <Trash2 size={18} />
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col justify-between py-1">
                                <div>
                                    <h3 className="text-gray-900 font-semibold text-xs md:text-[15px] mb-0.5 md:mb-1 line-clamp-1">{item.name}</h3>
                                    <p className="text-gray-500 text-[10px] md:text-xs">
                                        Price: <span className="font-medium">${item.price.toFixed(2)}</span>
                                        <span className="text-[9px] md:text-[10px] text-emerald-600 font-medium ml-1">/{item.dimension}</span>
                                    </p>
                                </div>

                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center bg-gray-50 rounded-full p-[2px] border border-gray-200">
                                            <button
                                                onClick={() => handleUpdateQuantity(item.productId, item.id, -1)}
                                                className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center bg-white rounded-full text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus size={12} className="md:w-3.5 md:h-3.5" />
                                            </button>
                                            <span className="w-7 md:w-8 text-center text-xs md:text-sm font-semibold text-gray-900">{item.quantity}</span>
                                            <button
                                                onClick={() => handleUpdateQuantity(item.productId, item.id, 1)}
                                                className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center bg-white rounded-full text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 shadow-sm transition-colors"
                                            >
                                                <Plus size={12} className="md:w-3.5 md:h-3.5" />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => deleteItem(item.id)}
                                            className="md:hidden text-gray-400 hover:text-red-500 transition-colors p-1"
                                            disabled={isDeleting}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>

                                    <span className="font-bold text-gray-900 text-sm md:text-base">
                                        ${item.totalPrice.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {!isLoading && !error && items.length === 0 && (
                        <div className="text-center py-16 md:py-20">
                            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base">Your cart is empty.</p>
                            <button
                                onClick={closeCart}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 md:py-3 px-6 md:px-8 rounded-md text-sm md:text-base transition-colors shadow-md"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="p-4 md:p-6 border-t border-gray-200 bg-white">
                        <button
                            onClick={() => {
                                closeCart();
                                router.push('/checkout');
                            }}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 md:py-4 px-4 md:px-6 rounded-md text-sm md:text-base flex items-center justify-between transition-colors shadow-lg hover:shadow-xl"
                        >
                            <span>Proceed to Checkout</span>
                            <div className="flex items-center">
                                <div className="h-8 md:h-5 w-[1px] bg-white/30 mx-2 md:mx-3"></div>
                                <span className="font-bold">${totalPrice.toFixed(2)}</span>
                            </div>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartDrawer;
