'use client';

import React from 'react';
import { Header } from '@/core/components/layout/Header';
import { BottomNav } from '@/core/components/layout/BottomNav';
import Footer from '@/core/components/layout/Footer';
import { PageBanner } from '@/core/components/shared/PageBanner';
import { Mail, Phone, MapPin } from "lucide-react";

const ContactPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#f5f6f7] flex flex-col pb-16 lg:pb-0">
            <Header />

            <main className="flex-1">
                <PageBanner
                    title="CONTACT US"
                    breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]}
                />

                <div className="max-w-[800px] mx-auto px-4 py-12 md:py-24">
                    <div className="bg-white rounded-3xl p-8 md:p-16 shadow-sm border border-gray-100">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                            <p className="text-gray-600 max-w-md mx-auto">
                                Have questions? We'd love to hear from you. Feel free to reach out through any of the channels below.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center space-y-4">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto text-emerald-600">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Email</h4>
                                    <p className="text-gray-600 text-sm">support@greeny.com</p>
                                </div>
                            </div>

                            <div className="text-center space-y-4">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto text-emerald-600">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Phone</h4>
                                    <p className="text-gray-600 text-sm">+1 (202) 795-3213</p>
                                </div>
                            </div>

                            <div className="text-center space-y-4">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto text-emerald-600">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Office</h4>
                                    <p className="text-gray-600 text-sm leading-tight">1Hd-50, 010 Avenue, NY, USA</p>
                                </div>
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

export default ContactPage;
