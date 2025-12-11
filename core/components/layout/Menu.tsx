"use client";

import React from 'react';
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger
} from '@/core/components/ui';

import MegaMenu from './CategoryMegaMenu';
import BrandMegaMenu from './BrandMegaMenu';

export const Menu: React.FC = () => {
    return (
        <NavigationMenu className="static">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger href="#">
                        Home
                    </NavigationMenuTrigger>
                </NavigationMenuItem>
                <NavigationMenuItem className="static group">
                    <NavigationMenuTrigger href="#" hasDropdown>
                        Brand
                    </NavigationMenuTrigger>
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-[90%] max-w-6xl z-50 -mt-4 pt-4 opacity-0 invisible translate-y-2 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                        <BrandMegaMenu />
                    </div>
                </NavigationMenuItem>
                <NavigationMenuItem className="static group">
                    <NavigationMenuTrigger href="#" hasDropdown>
                        Category
                    </NavigationMenuTrigger>
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-[90%] max-w-6xl z-50 -mt-4 pt-4 opacity-0 invisible translate-y-2 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                        <MegaMenu />
                    </div>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};
