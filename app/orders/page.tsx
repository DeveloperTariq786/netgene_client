'use client';

import React from 'react';
import { Header } from '@/core/components/layout/Header';
import { BottomNav } from '@/core/components/layout/BottomNav';
import Footer from '@/core/components/layout/Footer';
import { PageBanner } from '@/core/components/shared/PageBanner';
import { OrderCard } from '@/modules/orders/components/OrderCard';
import { OrderCardSkeleton } from '@/modules/orders/components/OrderCardSkeleton';
import { useOrders } from '@/modules/orders/hooks/useOrders';

const OrdersPage: React.FC = () => {
    const { data, isLoading, error } = useOrders();

    return (
        <div className="min-h-screen bg-[#f5f6f7] flex flex-col pb-16 lg:pb-0">
            <Header />

            <main className="flex-1">
                <PageBanner
                    title="My Orders"
                    breadcrumbs={[
                        { label: 'Home', href: '/' },
                        { label: 'Orders' }
                    ]}
                />

                <div className="py-12 lg:py-16">
                    <div className="max-w-[1000px] mx-auto px-4 md:px-6 lg:px-8">
                        {isLoading ? (
                            <div className="grid gap-6">
                                {[1, 2, 3].map((i) => (
                                    <OrderCardSkeleton key={i} />
                                ))}
                            </div>
                        ) : error ? (
                            <div className="text-center py-20 text-red-500">
                                Failed to load orders. Please try again later.
                            </div>
                        ) : !data?.orders || data.orders.length === 0 ? (
                            <div className="text-center py-20 text-gray-500">
                                You have no orders yet.
                            </div>
                        ) : (
                            <div className="grid gap-6">
                                {data.orders.map((order) => (
                                    <OrderCard key={order._id} order={order} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
            <BottomNav />
        </div>
    );
};

export default OrdersPage;
