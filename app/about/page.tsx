'use client';

import React from 'react';
import { Header } from '@/core/components/layout/Header';
import { BottomNav } from '@/core/components/layout/BottomNav';
import Footer from '@/core/components/layout/Footer';
import { PageBanner } from '@/core/components/shared/PageBanner';
import Image from 'next/image';
import { Target, Leaf, ShieldCheck, Heart } from "lucide-react";

const AboutPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#f5f6f7] flex flex-col pb-16 lg:pb-0">
            <Header />

            <main className="flex-1">
                <PageBanner
                    title="ABOUT US"
                    breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
                />

                <div className="max-w-[1200px] mx-auto px-4 py-12 md:py-20 space-y-20">
                    {/* Mission Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="relative">
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
                                <Image
                                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop"
                                    alt="Fresh organic produce"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-emerald-100 rounded-full -z-10" />
                        </div>

                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-semibold">
                                <Target className="w-4 h-4" />
                                Our Mission
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                                Bringing Nature's Best Directly to Your Doorstep
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                At Greeny, we believe that everyone deserves access to fresh, organic, and sustainably-sourced products. Our commitment goes beyond just selling products – we're building a community that cares about health, environment, and supporting local farmers.
                            </p>
                        </div>
                    </div>

                    {/* Values Section */}
                    <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 italic">What We Stand For</h2>
                            <p className="text-gray-500">Our core values guide everything we do, from product selection to customer service.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center space-y-4">
                                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto text-emerald-600">
                                    <Leaf className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-gray-900">Sustainability</h3>
                                <p className="text-gray-600 text-sm">Eco-friendly practices in everything we do, from sourcing to delivery.</p>
                            </div>
                            <div className="text-center space-y-4">
                                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto text-emerald-600">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-gray-900">Quality First</h3>
                                <p className="text-gray-600 text-sm">Carefully selected products that meet high standards of quality.</p>
                            </div>
                            <div className="text-center space-y-4">
                                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto text-emerald-600">
                                    <Heart className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-gray-900">Community</h3>
                                <p className="text-gray-600 text-sm">Supporting local farmers and building lasting relationships.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
            <BottomNav />
        </div>
    );
};

export default AboutPage;
