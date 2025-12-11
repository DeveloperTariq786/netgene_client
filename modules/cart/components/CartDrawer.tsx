'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { CartItem } from '../../home/types';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
    onUpdateQuantity: (id: number, delta: number) => void;
    onRemoveItem: (id: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
    isOpen,
    onClose,
    items,
    onUpdateQuantity,
    onRemoveItem,
}) => {
    const router = useRouter();
    const totalPrice = useMemo(() => {
        return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }, [items]);

    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Drawer Panel */}
            <div className="relative w-full max-w-[450px] bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">

                {/* Header */}
                <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 bg-gray-50/80">
                    <h2 className="text-base md:text-xl font-bold text-gray-900">
                        Shopping Cart <span className="text-xs md:text-sm text-gray-500 font-medium">({items.length})</span>
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 md:p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 border border-gray-200"
                    >
                        <X size={20} className="md:w-6 md:h-6" />
                    </button>
                </div>

                {/* Scrollable Items List */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 cart-scrollbar">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-4 group">
                            {/* Product Image with Hover Overlay */}
                            <div className="relative w-20 h-20 md:w-[100px] md:h-[100px] flex-shrink-0 border border-gray-200 rounded-md md:rounded-lg overflow-hidden bg-white flex items-center justify-center">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                />
                                {/* Delete Overlay - visible on hover */}
                                <div
                                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                                    onClick={() => onRemoveItem(item.id)}
                                >
                                    <div className="bg-white p-2 rounded-full text-red-500 shadow-sm transform scale-90 group-hover:scale-100 transition-transform">
                                        <Trash2 size={18} />
                                    </div>
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="flex-1 flex flex-col justify-between py-1">
                                <div>
                                    <h3 className="text-gray-900 font-semibold text-xs md:text-[15px] mb-0.5 md:mb-1 line-clamp-1">{item.name}</h3>
                                    <p className="text-gray-500 text-[11px] md:text-sm">
                                        Unit Price: <span className="font-medium">${item.price.toFixed(2)}</span>
                                    </p>
                                </div>

                                <div className="flex items-center justify-between mt-2">
                                    {/* Quantity Controller */}
                                    <div className="flex items-center bg-gray-50 rounded-full p-[2px] border border-gray-200">
                                        <button
                                            onClick={() => onUpdateQuantity(item.id, -1)}
                                            className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center bg-white rounded-full text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={12} className="md:w-3.5 md:h-3.5" />
                                        </button>
                                        <span className="w-7 md:w-8 text-center text-xs md:text-sm font-semibold text-gray-900">{item.quantity}</span>
                                        <button
                                            onClick={() => onUpdateQuantity(item.id, 1)}
                                            className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center bg-white rounded-full text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 shadow-sm transition-colors"
                                        >
                                            <Plus size={12} className="md:w-3.5 md:h-3.5" />
                                        </button>
                                    </div>

                                    {/* Total Item Price */}
                                    <span className="font-bold text-gray-900 text-sm md:text-base">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {items.length === 0 && (
                        <div className="text-center py-16 md:py-20">
                            <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base">Your cart is empty.</p>
                            <button
                                onClick={onClose}
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
                                onClose();
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
