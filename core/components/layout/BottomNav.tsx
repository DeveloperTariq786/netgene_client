"use client";

import React, { useState } from 'react';
import { Home, Store, Grid, User } from 'lucide-react';
import { Button } from '@/core/components/ui';
import Drawer from './CategoryDrawer';
import BrandsDrawer from './BrandsDrawer';

export const BottomNav: React.FC = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isBrandsDrawerOpen, setIsBrandsDrawerOpen] = useState(false);

    return (
        <>
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe">
                <Button
                    variant="ghost"
                    asChild
                    className="flex flex-col items-center gap-1 text-emerald-600 hover:text-emerald-600 h-auto py-1"
                >
                    <a href="#">
                        <Home className="w-6 h-6" />
                        <span className="text-[10px] font-medium">Home</span>
                    </a>
                </Button>
                <Button
                    variant="ghost"
                    className="flex flex-col items-center gap-1 text-gray-500 hover:text-emerald-600 h-auto py-1"
                    onClick={() => setIsBrandsDrawerOpen(true)}
                >
                    <Store className="w-6 h-6" />
                    <span className="text-[10px] font-medium">Brand</span>
                </Button>
                <Button
                    variant="ghost"
                    className="flex flex-col items-center gap-1 text-gray-500 hover:text-emerald-600 h-auto py-1"
                    onClick={() => setIsDrawerOpen(true)}
                >
                    <Grid className="w-6 h-6" />
                    <span className="text-[10px] font-medium">Category</span>
                </Button>
                <Button
                    variant="ghost"
                    asChild
                    className="flex flex-col items-center gap-1 text-gray-500 hover:text-emerald-600 h-auto py-1"
                >
                    <a href="#">
                        <User className="w-6 h-6" />
                        <span className="text-[10px] font-medium">Profile</span>
                    </a>
                </Button>
            </div>

            <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
            <BrandsDrawer isOpen={isBrandsDrawerOpen} onClose={() => setIsBrandsDrawerOpen(false)} />
        </>
    );
};
