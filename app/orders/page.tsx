'use client';

import React from 'react';
import { Header } from '@/core/components/layout/Header';
import { BottomNav } from '@/core/components/layout/BottomNav';
import Footer from '@/core/components/layout/Footer';
import { PageBanner } from '@/core/components/shared/PageBanner';
import { OrderCard } from '@/modules/orders/components/OrderCard';
import { Order } from '@/modules/orders/types';

import { SAMPLE_ORDERS } from '@/core/constants';

const OrdersPage: React.FC = () => {
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
                        <div className="grid gap-6">
                            {SAMPLE_ORDERS.map((order) => (
                                <OrderCard key={order.id} order={order} />
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
            <BottomNav />
        </div>
    );
};

export default OrdersPage;
