"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Truck,
    RefreshCcw,
    Headphones,
    ShieldCheck,
    AtSign,
    Smartphone,
    MapPin,
    ChevronRight,
} from "lucide-react";
import { SocialShareLinks } from "@/core/components/shared/SocialShareLinks";

// Feature items for the top banner
const FEATURES = [
    {
        icon: Truck,
        title: "Free Home Delivery",
        description: "Lorem ipsum dolor sit amet adipisicing elit nobis.",
    },
    {
        icon: RefreshCcw,
        title: "Instant Return Policy",
        description: "Lorem ipsum dolor sit amet adipisicing elit nobis.",
    },
    {
        icon: Headphones,
        title: "Quick Support System",
        description: "Lorem ipsum dolor sit amet adipisicing elit nobis.",
    },
    {
        icon: ShieldCheck,
        title: "Secure Payment Way",
        description: "Lorem ipsum dolor sit amet adipisicing elit nobis.",
    },
];

// Quick Links
const QUICK_LINKS = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Brands", href: "/brands" },
    { label: "Categories", href: "/#categories" },
    { label: "My Account", href: "/profile" },
    { label: "Track Orders", href: "/orders" },
    { label: "Offers", href: "/offers" },
    { label: "Contact Us", href: "/contact" },
];

// Logo Icon SVG (Greeny leaf + fork design)
const LogoIcon = () => (
    <svg
        width="42"
        height="42"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M24 4C14 4 8 14 8 24C8 34 14 44 24 44C34 44 40 34 40 24C40 14 34 4 24 4Z"
            fill="#10b981"
        />
        <path
            d="M24 8C16 8 12 16 12 24C12 32 16 40 24 40"
            stroke="#059669"
            strokeWidth="2"
            fill="none"
        />
        <path
            d="M18 18L24 14L30 18M24 14V32"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M20 24H28M20 28H28"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
        />
    </svg>
);

const Footer = () => {
    return (
        <footer className="w-full">
            {/* Features Banner */}
            <div className="w-full bg-gradient-to-r from-emerald-50/50 via-white to-emerald-50/50 border-y border-gray-200 shadow-sm">
                <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-14 py-6 md:py-8 lg:py-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                        {FEATURES.map((feature, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 md:gap-4 group cursor-pointer"
                            >
                                {/* Icon Container with hover effect */}
                                <div className="relative flex-shrink-0">
                                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-emerald-600 flex items-center justify-center bg-white shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                                        <feature.icon className="w-5 h-5 md:w-7 md:h-7 text-emerald-600 group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                    {/* Decorative ring */}
                                    <div className="absolute -inset-1 rounded-full border border-emerald-600/20 group-hover:border-emerald-600/40 transition-colors duration-300" />
                                </div>

                                {/* Text Content */}
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-900 text-xs md:text-sm lg:text-base mb-0.5 md:mb-1 group-hover:text-emerald-600 transition-colors duration-300">
                                        {feature.title}
                                    </h4>
                                    <p className="text-gray-500 text-[10px] md:text-xs lg:text-sm leading-relaxed line-clamp-2">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="w-full bg-gradient-to-b from-gray-50 to-emerald-50/30">
                <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-14 py-10 md:py-12 lg:py-16">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-10 xl:gap-12">
                        {/* Brand Section */}
                        <div className="lg:col-span-1">
                            {/* Logo */}
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 md:gap-3 mb-4 md:mb-6 group"
                            >
                                <div className="transform group-hover:scale-105 transition-transform duration-300">
                                    <LogoIcon />
                                </div>
                                <span className="text-xl md:text-2xl lg:text-3xl font-extrabold text-emerald-600 tracking-tight">
                                    GREENY
                                </span>
                            </Link>

                            {/* Description */}
                            <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-6 md:mb-8 max-w-xs">
                                Adipisci asperiores ipsum ipsa repellat consequatur repudiandae
                                quisquam assumenda dolor perspiciatis sit ipsum dolor amet.
                            </p>

                            {/* Social Links */}
                            <SocialShareLinks
                                showPinterest={true}
                                variant="brand"
                                size="md"
                                className="gap-2 md:gap-3"
                            />
                        </div>

                        {/* Quick Links Section */}
                        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-y-0 md:gap-x-8">
                            {/* Quick Links Column 1 */}
                            <div>
                                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-4 md:mb-6 relative inline-block">
                                    Quick Links
                                    <span className="absolute -bottom-2 left-0 w-12 md:w-16 h-0.5 bg-emerald-600 rounded-full" />
                                </h3>
                                <ul className="space-y-2 md:space-y-3">
                                    {[QUICK_LINKS[0], QUICK_LINKS[2], QUICK_LINKS[4], QUICK_LINKS[6]].map((link, index) => (
                                        link && (
                                            <li key={index}>
                                                <Link
                                                    href={link.href}
                                                    className="text-gray-600 text-xs md:text-sm hover:text-emerald-600 hover:pl-2 transition-all duration-300 inline-flex items-center gap-1 group"
                                                >
                                                    <ChevronRight className="w-3 h-3 md:w-4 md:h-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-emerald-600" />
                                                    {link.label}
                                                </Link>
                                            </li>
                                        )
                                    ))}
                                </ul>
                            </div>

                            {/* Quick Links Column 2 */}
                            <div>
                                <h3 className="hidden md:inline-block text-base md:text-lg font-bold text-gray-900 mb-4 md:mb-6 relative">
                                    Quick Links
                                    <span className="absolute -bottom-2 left-0 w-12 md:w-16 h-0.5 bg-emerald-600 rounded-full" />
                                </h3>
                                <ul className="space-y-2 md:space-y-3">
                                    {[QUICK_LINKS[1], QUICK_LINKS[3], QUICK_LINKS[5], QUICK_LINKS[7]].map((link, index) => (
                                        link && (
                                            <li key={index}>
                                                <Link
                                                    href={link.href}
                                                    className="text-gray-600 text-xs md:text-sm hover:text-emerald-600 hover:pl-2 transition-all duration-300 inline-flex items-center gap-1 group"
                                                >
                                                    <ChevronRight className="w-3 h-3 md:w-4 md:h-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-emerald-600" />
                                                    {link.label}
                                                </Link>
                                            </li>
                                        )
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Contact Us Section */}
                        <div>
                            <h3 className="text-base md:text-lg font-bold text-gray-900 mb-4 md:mb-6 relative inline-block">
                                Contact Us
                                <span className="absolute -bottom-2 left-0 w-8 md:w-10 h-0.5 bg-emerald-600 rounded-full" />
                            </h3>

                            <div className="space-y-4 md:space-y-5">
                                {/* Email */}
                                <div className="flex items-start gap-3 md:gap-4 group">
                                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-emerald-600/30 group-hover:border-emerald-600 flex items-center justify-center bg-white shadow-sm group-hover:shadow-md transition-all duration-300">
                                        <AtSign className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        <Link
                                            href="mailto:support@example.com"
                                            className="text-gray-600 text-xs md:text-sm hover:text-emerald-600 transition-colors duration-300"
                                        >
                                            support@example.com
                                        </Link>
                                        <Link
                                            href="mailto:carrer@example.com"
                                            className="text-gray-600 text-xs md:text-sm hover:text-emerald-600 transition-colors duration-300"
                                        >
                                            carrer@example.com
                                        </Link>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-start gap-3 md:gap-4 group">
                                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-emerald-600/30 group-hover:border-emerald-600 flex items-center justify-center bg-white shadow-sm group-hover:shadow-md transition-all duration-300">
                                        <Smartphone className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        <Link
                                            href="tel:+12027953213"
                                            className="text-gray-600 text-xs md:text-sm hover:text-emerald-600 transition-colors duration-300"
                                        >
                                            +120 279 532 13
                                        </Link>
                                        <Link
                                            href="tel:+12027953214"
                                            className="text-gray-600 text-xs md:text-sm hover:text-emerald-600 transition-colors duration-300"
                                        >
                                            +120 279 532 14
                                        </Link>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="flex items-start gap-3 md:gap-4 group">
                                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-emerald-600/30 group-hover:border-emerald-600 flex items-center justify-center bg-white shadow-sm group-hover:shadow-md transition-all duration-300">
                                        <MapPin className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-gray-600 text-xs md:text-sm">
                                            1Hd- 50, 010 Avenue, NY
                                        </span>
                                        <span className="text-gray-600 text-xs md:text-sm">
                                            90001 United States
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                {/* Copyright Bar */}
                <div className="w-full border-t border-gray-200 bg-white/50">
                    <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-14 py-4 md:py-5">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3">
                            <p className="text-gray-500 text-xs md:text-sm text-center md:text-left">
                                © {new Date().getFullYear()}{" "}
                                <span className="font-semibold text-emerald-600">Greeny</span>.
                                All rights reserved.
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
