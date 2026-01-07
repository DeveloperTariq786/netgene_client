"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
    Search,
    User,
    ShoppingBasket,
    Leaf,
    X,
    Loader2
} from 'lucide-react';
import {
    Button,
    Input,
    Badge
} from '@/core/components/ui';
import { Menu } from './Menu';
import { useIsMobile } from '@/core/hooks/use-mobile';
import CartDrawer from '@/modules/cart/components/CartDrawer';
import { useCartStore } from '@/modules/cart/store/useCartStore';
import { useCart } from '@/modules/cart/hooks/useCart';
import LoginDialog from '@/modules/auth/components/LoginDialog';
import { UserMenu } from '@/modules/auth/components/UserMenu';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { useSearchProducts } from '@/modules/products/hooks/useSearchProducts';
import { useDebounce } from '@/core/hooks/use-debounce';
import { HeaderSearchResults } from './HeaderSearchResults';

const BadgeIcon: React.FC<{ icon: React.ElementType; count: number; onClick?: () => void }> = ({ icon: Icon, count, onClick }) => (
    <div onClick={onClick} className="relative group cursor-pointer">
        <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-gray-100 hover:bg-emerald-600 hover:text-white text-gray-700"
        >
            <Icon className="w-5 h-5" />
        </Button>
        <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 border-2 border-white">
            {count}
        </Badge>
    </div>
);

export const Header: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [aiSuggestion] = useState('');
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const mobileSearchRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();
    const [showMenu, setShowMenu] = useState(true);
    const lastScrollY = useRef(0);
    const ticking = useRef(false);

    // Auth state
    const { user, initialize } = useAuthStore();
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    // Cart state from store (synced by useCart hook)
    const { totalItems, totalPrice, openCart } = useCartStore();

    // Fetch cart with caching - only when user is logged in
    useCart(!!user);

    // Initialize auth listener
    useEffect(() => {
        const unsubscribe = initialize();
        return () => unsubscribe();
    }, [initialize]);

    // Debounce search query to avoid excessive API calls
    const debouncedSearchQuery = useDebounce(searchQuery, 400);

    // Search results query using debounced value
    const { data: searchResults = [], isLoading: searchLoading } = useSearchProducts(debouncedSearchQuery);

    // Handle clicking outside to close search results
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
            if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target as Node)) {
                // Keep mobile search open if it's the search bar itself
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Show results when query changes and has length
    useEffect(() => {
        if (searchQuery.length >= 2) {
            setShowResults(true);
        } else {
            setShowResults(false);
        }
    }, [searchQuery]);

    // Scroll behavior effect
    useEffect(() => {
        const handleScroll = () => {
            if (!ticking.current) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    const scrollDifference = currentScrollY - lastScrollY.current;

                    // At the top - always show menu
                    if (currentScrollY < 10) {
                        setShowMenu(true);
                    }
                    // Scrolling down - hide menu
                    else if (scrollDifference > 5 && currentScrollY > 50) {
                        setShowMenu(false);
                    }
                    // Scrolling up - show menu
                    else if (scrollDifference < -10) {
                        setShowMenu(true);
                    }

                    lastScrollY.current = currentScrollY;
                    ticking.current = false;
                });
                ticking.current = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        // Optionally navigate to search page
        setShowResults(false);
        window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    };

    const toggleMobileSearch = () => {
        setMobileSearchOpen(!mobileSearchOpen);
    };

    return (
        <header className="w-full bg-white font-sans sticky top-0 z-[100] transition-all duration-300">
            {/* Main Header Row */}
            <div className="border-b border-gray-200 bg-white relative z-50">
                <div className="container mx-auto px-4 lg:px-24 py-3 lg:py-4">
                    <div className="flex items-center justify-between gap-4 lg:gap-6">

                        {/* Logo */}
                        <div className="flex items-center shrink-0">
                            <a href="/" className="flex items-center gap-2 group">
                                <div className="relative">
                                    <Leaf className="w-8 h-8 lg:w-10 lg:h-10 text-emerald-600 fill-emerald-600" />
                                </div>
                                <span className="text-2xl lg:text-3xl font-black tracking-tight text-emerald-600 uppercase">Greeny</span>
                            </a>
                        </div>

                        {/* Desktop & Tablet Search Bar (Hidden on Mobile) */}
                        <div className="hidden md:block flex-1 w-full max-w-2xl mx-auto px-4 lg:px-12 relative" ref={searchRef}>
                            <div className="relative w-full">
                                <form onSubmit={handleSearch} className="relative w-full">
                                    <Input
                                        type="text"
                                        placeholder="Search Anything..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
                                    />
                                    <Button
                                        type="submit"
                                        variant="ghost"
                                        className="absolute right-0 top-0 h-11 w-14 text-gray-500 hover:text-emerald-600"
                                    >
                                        {searchLoading ? (
                                            <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
                                        ) : (
                                            <Search className="w-5 h-5" />
                                        )}
                                    </Button>
                                </form>

                                <HeaderSearchResults
                                    results={searchResults}
                                    isLoading={searchLoading}
                                    isVisible={showResults}
                                    onClose={() => setShowResults(false)}
                                    searchQuery={searchQuery}
                                />
                            </div>
                            {aiSuggestion && (
                                <div className="absolute top-full left-0 right-0 mt-2 mx-4 lg:mx-12 p-3 bg-white shadow-xl rounded-lg border border-emerald-100 z-50 animate-in fade-in slide-in-from-top-2">
                                    <div className="flex items-start gap-2 text-sm text-gray-700">
                                        <Leaf className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                                        <p><span className="font-bold text-emerald-700">Greeny AI:</span> {aiSuggestion}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Icons Right Side */}
                        <div className="flex items-center gap-3 lg:gap-4">

                            {/* Mobile Search Toggle Icon (Hidden on Tablet & Desktop) */}
                            <div className="md:hidden">
                                <Button
                                    onClick={toggleMobileSearch}
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full bg-gray-100 hover:bg-emerald-600 hover:text-white text-gray-700"
                                >
                                    {mobileSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
                                </Button>
                            </div>

                            {/* Desktop Profile Icon (Hidden on Mobile & Tablet as it's in Bottom Nav) */}
                            <div className="hidden lg:block">
                                {user ? (
                                    <UserMenu />
                                ) : (
                                    <Button
                                        onClick={() => setIsLoginOpen(true)}
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-full bg-gray-100 hover:bg-emerald-600 hover:text-white text-gray-700"
                                    >
                                        <User className="w-5 h-5" />
                                    </Button>
                                )}
                            </div>

                            {/* Cart with Total Price - Only show when user is logged in */}
                            {user && (
                                <div className="flex items-center gap-2 lg:gap-4">
                                    <BadgeIcon icon={ShoppingBasket} count={totalItems} onClick={openCart} />
                                    <div
                                        className="hidden lg:flex flex-col items-start cursor-pointer group"
                                        onClick={openCart}
                                    >
                                        <span className="text-[10px] text-gray-500 uppercase tracking-wide font-medium group-hover:text-emerald-600 transition-colors">Total Price</span>
                                        <span className="text-sm font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">${totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>

            {/* Mobile Search Bar Dropdown (Only visible on Mobile) */}
            {mobileSearchOpen && (
                <div className="md:hidden border-b border-gray-200 bg-gray-50 p-4 animate-in slide-in-from-top-2 duration-200 relative z-50">
                    <div className="relative w-full" ref={mobileSearchRef}>
                        <form onSubmit={handleSearch} className="relative w-full">
                            <Input
                                type="text"
                                placeholder="Search products..."
                                className="bg-white border border-gray-200 text-gray-800 placeholder-gray-400"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
                                autoFocus
                            />
                            <Button
                                type="submit"
                                variant="ghost"
                                className="absolute right-0 top-0 h-12 w-12 text-gray-500 hover:text-emerald-600"
                            >
                                {searchLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
                                ) : (
                                    <Search className="w-5 h-5" />
                                )}
                            </Button>
                        </form>

                        <HeaderSearchResults
                            results={searchResults}
                            isLoading={searchLoading}
                            isVisible={showResults && mobileSearchOpen}
                            onClose={() => {
                                setShowResults(false);
                                setMobileSearchOpen(false);
                            }}
                            searchQuery={searchQuery}
                        />
                    </div>
                    {aiSuggestion && (
                        <div className="mt-2 p-3 bg-white shadow-sm rounded border border-emerald-100">
                            <div className="flex items-start gap-2 text-xs text-gray-700">
                                <Leaf className="w-3 h-3 text-emerald-500 mt-0.5 shrink-0" />
                                <p><span className="font-bold text-emerald-700">AI Tip:</span> {aiSuggestion}</p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Bottom Row (Desktop Navigation) */}
            <div className={`hidden lg:block absolute top-full left-0 right-0 bg-white border-b border-gray-200 transition-transform duration-300 ease-in-out z-40 ${showMenu ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="container mx-auto px-4 lg:px-24">
                    <div className="flex items-center justify-center h-16">
                        {/* Navigation Links */}
                        <Menu />
                    </div>
                </div>
            </div>

            {/* Cart Drawer */}
            <CartDrawer />

            <LoginDialog
                open={isLoginOpen}
                onOpenChange={setIsLoginOpen}
            />
        </header>
    );
};
