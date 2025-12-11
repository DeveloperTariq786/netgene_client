'use client';

import React from 'react';
import { ShoppingBasket } from 'lucide-react';
import { CountdownTimer } from './CountdownTimer';
import Image from 'next/image';
import { COUNTDOWN_IMAGE } from '../../../core/constants';


export const PromoDiscountSection: React.FC = () => {
    return (
        <section className="w-full min-h-screen bg-[#a1f3c0] flex items-center justify-center py-12 px-4 md:px-8 lg:px-16 overflow-hidden">
            <div className="max-w-7xl w-full flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">

                {/* Text Content Side - First on mobile */}
                <div className="order-1 lg:order-1 text-center">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#2b2f33] uppercase leading-[1.15] tracking-tight">
                        Special Discount Offer For <br className="hidden lg:block" /> Vegetable Items
                    </h1>

                    <p className="mt-4 text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                        Reprehenderit sed quod autem molestiae aut modi minus veritatis iste dolorum suscipit quis voluptatum fugiat mollitia quia minima
                    </p>

                    <CountdownTimer />

                    <div className="flex justify-center">
                        <button
                            className="bg-[#119744] hover:bg-[#0e7a37] text-white font-bold py-3.5 px-8 rounded-md flex items-center gap-3 transition-all duration-300 shadow-sm hover:shadow-md group"
                        >
                            <ShoppingBasket size={20} className="group-hover:scale-110 transition-transform" />
                            <span>SHOP NOW</span>
                        </button>
                    </div>
                </div>

                {/* Image Side - Second on mobile (at bottom) */}
                <div className="order-2 lg:order-2 relative flex justify-center items-center w-full">
                    <div className="relative w-full max-w-[500px] aspect-square">

                        {/* Discount Badge */}
                        <div className="absolute -top-4 left-4 md:-left-4 z-10 animate-bounce-slow">
                            <div className="bg-[#ff3838] text-white rounded-full w-24 h-24 md:w-32 md:h-32 flex flex-col items-center justify-center shadow-lg transform -rotate-12 hover:rotate-0 transition-transform duration-300">
                                <span className="text-2xl md:text-4xl font-extrabold leading-none">20%</span>
                                <span className="text-sm md:text-xl font-bold uppercase mt-1">Off</span>
                            </div>
                        </div>

                        <Image
                            src={COUNTDOWN_IMAGE}
                            alt="Heart shaped vegetables"
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
