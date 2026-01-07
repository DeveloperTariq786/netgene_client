'use client';

import React, { useState } from 'react';
import { Header } from '@/core/components/layout/Header';
import { BottomNav } from '@/core/components/layout/BottomNav';
import Footer from '@/core/components/layout/Footer';
import { PageBanner } from '@/core/components/shared/PageBanner';
import { OrderTable } from '@/modules/checkout/components/OrderSummaryTable';
import { AddressForm } from '@/modules/address/components/AddressForm';
import { AddressList } from '@/modules/address/components/AddressList';
import { useCartStore } from '@/modules/cart';
import { Button } from '@/core/components/ui/button';
import { OrderSuccessModal } from '@/modules/checkout/components/OrderSuccessModal';
import { usePlaceOrder } from '@/modules/orders/hooks/useOrders';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { toast } from 'sonner';

const CheckoutPage: React.FC = () => {
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const { items, clearCart } = useCartStore();
    const { user, backendUser } = useAuthStore();
    const { mutate: placeOrder, isPending } = usePlaceOrder();

    const handlePlaceOrder = () => {
        if (!selectedAddressId) {
            toast.error('Please select a shipping address');
            return;
        }

        if (!backendUser) {
            toast.error('You must be logged in to place an order');
            return;
        }

        placeOrder(
            { customerId: backendUser._id, addressId: selectedAddressId },
            {
                onSuccess: (data) => {
                    if (data.success) {
                        setShowSuccessModal(true);
                        clearCart();
                    } else {
                        toast.error(data.message || 'Failed to place order');
                    }
                },
                onError: (error: any) => {
                    toast.error(error?.response?.data?.message || 'Something went wrong');
                }
            }
        );
    };

    const handleAddressSaved = () => {
        setShowAddressForm(false);
    };

    return (
        <div className="min-h-screen bg-[#f5f6f7] flex flex-col pb-16 lg:pb-0">
            <Header />

            <main className="flex-1">
                <PageBanner
                    title="Checkout"
                    breadcrumbs={[
                        { label: 'Home', href: '/' },
                        { label: 'Checkout' }
                    ]}
                />

                <div className="py-12 lg:py-16">
                    <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-14">
                        <OrderTable items={items} />

                        <div className="mt-8">
                            {showAddressForm ? (
                                <AddressForm
                                    onSave={handleAddressSaved}
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

                                    <AddressList
                                        selectedAddressId={selectedAddressId}
                                        onSelect={setSelectedAddressId}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="mt-6 md:mt-8">
                            <Button
                                onClick={handlePlaceOrder}
                                disabled={items.length === 0 || isPending}
                                className="w-full h-10 md:h-12 text-sm md:text-base font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isPending ? 'Placing Order...' : 'Proceed to Order'}
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
