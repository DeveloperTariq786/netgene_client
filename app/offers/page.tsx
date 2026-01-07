'use client';

import React, { useState } from 'react';
import { Header } from '@/core/components/layout/Header';
import { BottomNav } from '@/core/components/layout/BottomNav';
import Footer from '@/core/components/layout/Footer';
import { PageBanner } from '@/core/components/shared/PageBanner';
import { Button } from '@/core/components/ui/button';
import { Copy, Check, Tag } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Offer {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    code: string;
    image: string;
    bgColor: string;
}


const OfferCard: React.FC<{ offer: Offer }> = ({ offer }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(offer.code);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group border border-gray-100">
            {/* Offer Banner */}
            <div className={`relative h-[180px] w-full ${offer.bgColor} overflow-hidden`}>
                <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover opacity-60 mix-blend-overlay group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white">
                    <span className="text-xs font-semibold uppercase tracking-wider mb-1 opacity-90">{offer.subtitle}</span>
                    <h3 className="text-2xl md:text-3xl font-black mb-2 drop-shadow-md">{offer.title}</h3>
                    <p className="text-[10px] md:text-xs font-medium uppercase tracking-widest bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
                        SHOP NOW
                    </p>
                </div>
            </div>

            {/* Code Bar */}
            <div className="p-3 bg-white flex items-center justify-between border-t border-gray-50 bg-gradient-to-b from-white to-gray-50/50">
                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest px-2">{offer.code}</span>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 hover:text-emerald-700 transition-colors py-1.5 px-3 rounded-md hover:bg-emerald-50 active:scale-95 transform transition-all"
                >
                    {isCopied ? (
                        <>
                            <Check size={14} />
                            <span>COPIED</span>
                        </>
                    ) : (
                        <>
                            <Copy size={13} />
                            <span>COPY CODE</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

const OffersPage: React.FC = () => {
    const router = useRouter();
    return (
        <div className="min-h-screen bg-[#f5f6f7] flex flex-col pb-16 lg:pb-0">
            <Header />

            <main className="flex-1">
                <PageBanner
                    title="DISCOUNT & OFFERS"
                    breadcrumbs={[
                        { label: 'Home', href: '/' },
                        { label: 'Offers' }
                    ]}
                // backgroundImage="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop"
                />

                <div className="py-32 flex flex-col items-center justify-center text-center">
                    <Tag className="w-5 h-5 text-gray-300 mb-4 stroke-[1.5]" />
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.3em]">
                        Currently no active offers
                    </p>
                </div>
            </main>

            <Footer />
            <BottomNav />
        </div>
    );
};

export default OffersPage;
