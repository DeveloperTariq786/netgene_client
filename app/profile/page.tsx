'use client';

import React from 'react';
import { Header } from '@/core/components/layout/Header';
import { BottomNav } from '@/core/components/layout/BottomNav';
import Footer from '@/core/components/layout/Footer';
import { PageBanner } from '@/core/components/shared/PageBanner';
import { ProfileContent } from '@/modules/profile/components/ProfileContent';

const ProfilePage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#f5f6f7] flex flex-col pb-16 lg:pb-0">
            <Header />

            {/* Main Content */}
            <main className="flex-1">
                {/* Page Banner */}
                <PageBanner
                    title="My Profile"
                    breadcrumbs={[
                        { label: 'Home', href: '/' },
                        { label: 'Profile' }
                    ]}
                />

                {/* Profile Content */}
                <div className="py-12 lg:py-16">
                    <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-14">
                        <div className="max-w-4xl mx-auto">
                            <ProfileContent />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
            <BottomNav />
        </div>
    );
};

export default ProfilePage;
