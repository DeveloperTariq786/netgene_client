'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '../core/components/layout/Header';
import { BottomNav } from '../core/components/layout/BottomNav';
import HeroCarousel from '../modules/home/components/HeroCarousel';
import CategoryCarousel from '../modules/category/components/CategoryCarousel';
import { CATEGORIES, SAMPLE_PRODUCTS, PROMO_BANNERS, BRANDS } from '../core/constants';
import { BrandSlider, BrandSliderHandle } from '../modules/brands/components/BrandSlider';
import ProductCard from '../modules/home/components/RecentlySoldCard';
import PromoSection from '../modules/home/components/PromoSection';
import FeaturedProductCard from '../modules/home/components/FeaturedProductCard';
import { PromoDiscountSection } from '../modules/home/components/PromoDiscountSection';
import CollectedNewItems, { CollectedNewItemsHandle } from '../modules/home/components/CollectedNewItems';
import CarouselArrow from '../core/components/shared/CarouselArrow';
import HomePromoCards from '../modules/home/components/HomePromoCards';
import { NicheSection } from '../modules/home/components/NicheSection';
import Footer from '../core/components/layout/Footer';
import { ProductModal } from '../modules/home/components/ProductModal';
import { Product } from '../modules/home/types';
import { ShowMoreButton } from '../core/components/shared/ShowMoreButton';

const App: React.FC = () => {
  const collectedNewItemsRef = useRef<CollectedNewItemsHandle>(null);
  const brandSliderRef = useRef<BrandSliderHandle>(null);
  const router = useRouter();

  // Product Modal State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleProductClick = (product: Product) => {
    router.push(`/products/${product.id}`);
  };

  return (
    <div className="min-h-screen bg-[#f5f6f7] flex flex-col pb-16 lg:pb-0">
      <Header />
      <HeroCarousel />
      <CategoryCarousel
        items={CATEGORIES}
        slidesPerView={{
          sm: 5,
          md: 4,
          lg: 5
        }}
      />

      {/* Products Section */}
      <div className="px-2 lg:px-24 py-12 lg:py-20">
        {/* Section Heading */}
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
            Recently Sold Items
          </h2>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 lg:gap-6">
          {SAMPLE_PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={handleQuickView}
              onClick={handleProductClick}
            />
          ))}
        </div>

        {/* Show More Button */}
        <div className="flex justify-center mt-8 lg:mt-12">
          <ShowMoreButton />
        </div>

      </div>

      {/* Promo Banner */}
      <div className="px-4 lg:px-24 py-0 lg:py-20">
        <PromoSection
          imageUrl={PROMO_BANNERS[0].imageUrl}
          alt={PROMO_BANNERS[0].alt}
        />
      </div>

      {/* Featured Products Section */}
      <div className="px-2 lg:px-24 pt-12">
        {/* Section Heading */}
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Our Featured Items
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {SAMPLE_PRODUCTS.filter(p => p.isFeatured).map((product) => (
            <FeaturedProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Show More Button */}
        <div className="flex justify-center mt-8 lg:mt-12 mb-12">
          <ShowMoreButton />
        </div>

      </div>

      {/* Promo Discount Section */}
      <div className="pt-12 lg:pt-24 mb-12">
        <PromoDiscountSection />
      </div>

      {/* Collected New Items Section */}
      <div className="pt-12 lg:pt-20">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Collected New Items
          </h2>
        </div>
        <div className="relative group">
          <CollectedNewItems ref={collectedNewItemsRef} />
          {/* Navigation Arrows */}
          <CarouselArrow
            direction="left"
            onClick={() => collectedNewItemsRef.current?.slidePrev()}
            className="!left-2 md:!left-4"
          />
          <CarouselArrow
            direction="right"
            onClick={() => collectedNewItemsRef.current?.slideNext()}
            className="!right-2 md:!right-4"
          />
        </div>

        {/* Show More Button */}
        <div className="flex justify-center mt-8 lg:mt-12">
          <ShowMoreButton />
        </div>
      </div>

      {/* Home Promo Cards Section */}
      <div className="mt-12">
        <HomePromoCards />
      </div>

      {/* Browse By Top Niche Section */}
      <NicheSection />

      {/* Show More Button */}
      <div className="flex justify-center">
        <ShowMoreButton />
      </div>

      {/* Shop By Brands Section */}
      <div className="py-14 lg:py-24">
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Shop By Brands
          </h2>
        </div>
        <div className="relative group/arrows">
          <BrandSlider ref={brandSliderRef} brands={BRANDS} />
          {/* Navigation Arrows - positioned at avatar center */}
          <CarouselArrow
            direction="left"
            onClick={() => brandSliderRef.current?.slidePrev()}
            className="!left-2 md:!left-4 !top-[120px]"
          />
          <CarouselArrow
            direction="right"
            onClick={() => brandSliderRef.current?.slideNext()}
            className="!right-2 md:!right-4 !top-[120px]"
          />
        </div>

        {/* Show More Button */}
        <div className="flex justify-center mt-4 lg:mt-10">
          <Link href="/brands">
            <ShowMoreButton label="View All Brands" />
          </Link>
        </div>
      </div>

      <Footer />

      <BottomNav />

      {/* Product Quick View Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div >
  );
};

export default App;

