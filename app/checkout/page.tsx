'use client';

import React, { useState } from 'react';
import { Header } from '@/core/components/layout/Header';
import { BottomNav } from '@/core/components/layout/BottomNav';
import Footer from '@/core/components/layout/Footer';
import { PageBanner } from '@/core/components/shared/PageBanner';
import { OrderTable } from '@/modules/checkout/components/OrderTable';
import { AddressForm } from '@/modules/checkout/components/AddressForm';
import { SAMPLE_CART_ITEMS, SAMPLE_ADDRESSES } from '@/core/constants';
import { Address } from '@/modules/home/types';
import { MapPin, Phone, User } from 'lucide-react';
import { Button } from '@/core/components/ui/button';

import { OrderSuccessModal } from '@/modules/checkout/components/OrderSuccessModal';

const CheckoutPage: React.FC = () => {
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(1);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handlePlaceOrder = () => {
        setShowSuccessModal(true);
    };

    return (
        <div className="min-h-screen bg-[#f5f6f7] flex flex-col pb-16 lg:pb-0">
            <Header />

            {/* Main Content */}
            <main className="flex-1">
                {/* Page Banner */}
                <PageBanner
                    title="Checkout"
                    breadcrumbs={[
                        { label: 'Home', href: '/' },
                        { label: 'Checkout' }
                    ]}
                />

                {/* Checkout Content */}
                <div className="py-12 lg:py-16">
                    <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-14">

                        {/* Order Table */}
                        <OrderTable items={SAMPLE_CART_ITEMS} />

                        {/* Address Section */}
                        <div className="mt-8">
                            {showAddressForm ? (
                                <AddressForm
                                    onSave={() => setShowAddressForm(false)}
                                    onCancel={() => setShowAddressForm(false)}
                                />
                            ) : (
                                <div className="bg-white rounded-lg md:rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300">
                                    <div className="bg-gray-50/80 px-4 py-3 md:px-6 md:py-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0">
                                        <h3 className="text-sm md:text-lg font-bold text-gray-900">Shipping Address</h3>
                                        <button
                                            onClick={() => setShowAddressForm(true)}
                                            className="px-3 py-1.5 md:px-6 md:py-2.5 rounded-md bg-emerald-600 text-white font-semibold text-[11px] md:text-sm hover:bg-emerald-700 transition-colors shadow-sm"
                                        >
                                            Add New Address
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 p-4 md:p-6">
                                        {SAMPLE_ADDRESSES.map((address) => (
                                            <div
                                                key={address.id}
                                                onClick={() => setSelectedAddressId(address.id)}
                                                className={`
                                                    relative p-3 md:p-4 rounded-lg border-2 cursor-pointer transition-all
                                                    ${selectedAddressId === address.id
                                                        ? 'border-emerald-600 bg-emerald-50/50'
                                                        : 'border-gray-200 hover:border-emerald-300 bg-gray-50'
                                                    }
                                                `}
                                            >
                                                <div className="flex justify-between items-start mb-2 md:mb-3">
                                                    <span className={`
                                                        text-[10px] md:text-xs font-bold px-1.5 md:px-2 py-0.5 md:py-1 rounded uppercase tracking-wider
                                                        ${selectedAddressId === address.id ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'}
                                                    `}>
                                                        {address.type}
                                                    </span>
                                                    {selectedAddressId === address.id && (
                                                        <div className="h-4 w-4 rounded-full bg-emerald-600 flex items-center justify-center">
                                                            <div className="h-2 w-2 rounded-full bg-white"></div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-gray-600">
                                                    <div className="flex items-center gap-1.5 md:gap-2">
                                                        <User size={12} className="text-gray-400 md:w-3.5 md:h-3.5" />
                                                        <span className="font-semibold text-gray-900 text-[11px] md:text-sm">{address.name}</span>
                                                    </div>
                                                    <div className="flex items-start gap-1.5 md:gap-2">
                                                        <MapPin size={12} className="text-gray-400 mt-0.5 md:w-3.5 md:h-3.5" />
                                                        <span className="line-clamp-2 text-[11px] md:text-sm">{address.address}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 md:gap-2">
                                                        <Phone size={12} className="text-gray-400 md:w-3.5 md:h-3.5" />
                                                        <span className="text-[11px] md:text-sm">{address.phone}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Proceed to Order Button */}
                        <div className="mt-6 md:mt-8">
                            <Button
                                onClick={handlePlaceOrder}
                                className="w-full h-10 md:h-12 text-sm md:text-base font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all duration-300"
                            >
                                Proceed to Order
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
            <BottomNav />

            <OrderSuccessModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
            />
        </div>
    );
};

export default CheckoutPage;
