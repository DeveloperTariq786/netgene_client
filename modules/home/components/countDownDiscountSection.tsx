'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingBasket } from 'lucide-react';
import { CountdownTimer } from './CountdownTimer';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


import { useCountdown } from '../hooks/useCountdown';
import { Skeleton } from '@/core/components/ui/skeleton';

const CountDownDiscountSkeleton = () => (
    <div className="w-full min-h-[400px] bg-emerald-50 py-12 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center lg:text-left">
                <Skeleton className="h-12 w-full mx-auto lg:mx-0 bg-emerald-100" />
                <Skeleton className="h-20 w-3/4 mx-auto lg:mx-0 bg-emerald-100" />
                <Skeleton className="h-24 w-full bg-emerald-100" />
            </div>
            <div className="hidden lg:flex justify-center">
                <Skeleton className="h-[400px] w-[400px] rounded-full bg-emerald-100" />
            </div>
        </div>
    </div>
);

interface CountDownDiscountSectionProps {
    enabled?: boolean;
}

export const CountDownDiscountSection: React.FC<CountDownDiscountSectionProps> = ({ enabled = true }) => {
    const router = useRouter();
    const { data: countdowns, isLoading } = useCountdown(enabled);

    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        const activeCountdown = countdowns?.[0];
        const endDate = activeCountdown?.endTime;

        if (activeCountdown?.remainingTimeStr === "0" ||
            activeCountdown?.remainingTimeStr === "00 Days : 00 Hours : 00 Minutes : 00 Seconds") {
            setIsExpired(true);
        } else if (endDate) {
            const isPast = new Date(endDate).getTime() <= new Date().getTime();
            setIsExpired(isPast);
        } else {
            setIsExpired(false);
        }
    }, [countdowns, isLoading]);

    if (isLoading) {
        return <CountDownDiscountSkeleton />;
    }

    // Get the first active countdown (usually only one as per business logic)
    const activeCountdown = countdowns?.[0];

    if (!activeCountdown && !isLoading) {
        return null;
    }

    // Use fetched data (no mock fallbacks)
    const title = activeCountdown?.title || "";
    const description = activeCountdown?.description || "";
    const imageUrl = activeCountdown?.image || "";
    const endDate = activeCountdown?.endTime;

    // Extract number from discount string (e.g., "25% OFF")
    const discountMatch = activeCountdown?.discount?.match(/\d+/);
    const discount = discountMatch ? parseInt(discountMatch[0]) : 0;

    return (
        <section suppressHydrationWarning className="w-full min-h-screen bg-[#a1f3c0] flex items-center justify-center py-12 px-4 md:px-8 lg:px-16 overflow-hidden">
            <div className="max-w-7xl w-full flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">

                {/* Text Content Side - First on mobile */}
                <div className="order-1 lg:order-1 text-center">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#2b2f33] uppercase leading-[1.15] tracking-tight">
                        {title.split(' For ').map((part: string, i: number) => (
                            <React.Fragment key={i}>
                                {part}
                                {i === 0 && <><br className="hidden lg:block" /> For </>}
                            </React.Fragment>
                        ))}
                    </h1>

                    <p className="mt-4 text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                        {description}
                    </p>

                    <CountdownTimer targetDate={endDate} onExpire={() => setIsExpired(true)} />

                    <div className="flex justify-center">
                        <button
                            disabled={isExpired}
                            onClick={() => {
                                if (activeCountdown?.associationId) {
                                    const paramName = activeCountdown.association === 'brand' ? 'brand' : 'category';
                                    router.push(`/products?${paramName}=${activeCountdown.associationId}`);
                                } else {
                                    router.push('/products');
                                }
                            }}
                            className={`${isExpired
                                ? 'bg-gray-400 cursor-not-allowed opacity-80'
                                : 'bg-[#119744] hover:bg-[#0e7a37] shadow-sm hover:shadow-md'
                                } text-white font-bold py-3.5 px-8 rounded-md flex items-center gap-3 transition-all duration-300 group`}
                        >
                            {!isExpired && <ShoppingBasket size={20} className="group-hover:scale-110 transition-transform" />}
                            <span>{isExpired ? 'OFFER EXPIRED' : 'SHOP NOW'}</span>
                        </button>
                    </div>
                </div>

                {/* Image Side - Second on mobile (at bottom) */}
                <div className="order-2 lg:order-2 relative flex justify-center items-center w-full">
                    <div className="relative w-full max-w-[500px] aspect-square">

                        {/* Discount Badge */}
                        <div className="absolute -top-4 left-4 md:-left-4 z-10 animate-bounce-slow">
                            <div className="bg-[#ff3838] text-white rounded-full w-24 h-24 md:w-32 md:h-32 flex flex-col items-center justify-center shadow-lg transform -rotate-12 hover:rotate-0 transition-transform duration-300">
                                <span className="text-2xl md:text-4xl font-extrabold leading-none">{discount}%</span>
                                <span className="text-sm md:text-xl font-bold uppercase mt-1">Off</span>
                            </div>
                        </div>

                        <Image
                            src={imageUrl}
                            alt="Promotion Banner"
                            width={500}
                            height={500}
                            className="w-full h-full object-contain drop-shadow-xl"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};


