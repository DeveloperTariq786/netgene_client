'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '../core/components/layout/Header';
import { BottomNav } from '../core/components/layout/BottomNav';
import HeroCarousel from '../modules/home/components/HeroCarousel';
import CategoryCarousel from '../modules/category/components/CategoryCarousel';
import { BrandSlider, BrandSliderHandle } from '../modules/brands/components/BrandSlider';
import ProductCard from '../modules/home/components/RecentlySoldCard';
import FeaturedProductCard from '../modules/home/components/FeaturedProductCard';
import CollectedNewItems, { CollectedNewItemsHandle } from '../modules/home/components/CollectedNewItems';
import { ProductBadge } from '../core/components/shared/ProductBadge';
import CarouselArrow from '../core/components/shared/CarouselArrow';
import { NicheSection } from '../modules/home/components/NicheSection';
import Footer from '../core/components/layout/Footer';
import { Product } from '../modules/home/types';
import { ShowMoreButton } from '../core/components/shared/ShowMoreButton';
import { useBrands } from '../modules/brands/hooks/useBrands';
import { useDashboard } from '../modules/home/hooks/useDashboard';
import { useDashboardStore } from '../modules/home/store/useDashboardStore';
import { useEffect } from 'react';
import { useCategories } from '../modules/category/hooks/useCategories';

import { BrandSliderSkeleton } from '../modules/brands/components/skeletons/BrandSliderSkeleton';
import { CategorySkeleton } from '../modules/category/components/skeletons/CategorySkeleton';
import ProductModal from '@/modules/products/components/product/ProductModal';
import BannerIstSection from '../modules/home/components/bannerIstSection';
import Banner2ndSection from '../modules/home/components/banner2ndSection';
import { CountDownDiscountSection } from '@/modules/home/components/countDownDiscountSection';

const App: React.FC = () => {
  const collectedNewItemsRef = useRef<CollectedNewItemsHandle>(null);
  const brandSliderRef = useRef<BrandSliderHandle>(null);
  const router = useRouter();

  // Fetch categories from API using TanStack Query
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  // Banner 1st Section Scroll-to-fetch
  const [bannerIstInView, setBannerIstInView] = useState(false);
  const bannerIstRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBannerIstInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (bannerIstRef.current) {
      observer.observe(bannerIstRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Banner 2nd Section Scroll-to-fetch
  const [banner2ndInView, setBanner2ndInView] = useState(false);
  const banner2ndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBanner2ndInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (banner2ndRef.current) {
      observer.observe(banner2ndRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Fetch brands from API using TanStack Query
  // Set enabled to !!categories to ensure brands are fetched after categories
  const { data: brands, isLoading: brandsLoading, error: brandsError } = useBrands({
    enabled: !!categories
  });

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

  // Recently Sold Scroll-to-fetch logic
  const [recentlySoldInView, setRecentlySoldInView] = useState(false);
  const recentlySoldRef = useRef<HTMLDivElement>(null);

  const { recentlySoldProducts: storedProducts, setRecentlySoldProducts } = useDashboardStore();
  const [recentlySoldLimit, setRecentlySoldLimit] = useState(10);

  const { data: recentlySoldProducts, isLoading: recentlySoldInitialLoading, isFetching: recentlySoldFetching } = useDashboard({
    limit: recentlySoldLimit,
    enabled: recentlySoldInView
  });


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRecentlySoldInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '100px' } // Load when 100px near
    );

    if (recentlySoldRef.current) {
      observer.observe(recentlySoldRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (recentlySoldProducts) {
      setRecentlySoldProducts(recentlySoldProducts);
    }
  }, [recentlySoldProducts, setRecentlySoldProducts]);

  const handleShowMoreRecentlySold = () => {
    setRecentlySoldLimit(prev => prev + 5);
  };


  // Featured Products Scroll-to-fetch
  const [featuredInView, setFeaturedInView] = useState(false);
  const featuredRef = useRef<HTMLDivElement>(null);

  const { featuredProducts: storedFeatured, setFeaturedProducts } = useDashboardStore();
  const [featuredLimit, setFeaturedLimit] = useState(10);

  const { data: featuredProducts, isLoading: featuredInitialLoading, isFetching: featuredFetching } = useDashboard({
    limit: featuredLimit,
    featured: 1,
    enabled: featuredInView
  });


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFeaturedInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (featuredRef.current) {
      observer.observe(featuredRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (featuredProducts) {
      setFeaturedProducts(featuredProducts);
    }
  }, [featuredProducts, setFeaturedProducts]);

  const handleShowMoreFeatured = () => {
    setFeaturedLimit(prev => prev + 4); // Increment by 4 since they are in 2 columns
  };


  // New Items Scroll-to-fetch
  const [newItemsInView, setNewItemsInView] = useState(false);
  const newItemsRef = useRef<HTMLDivElement>(null);

  const { newProducts: storedNewProducts, setNewProducts } = useDashboardStore();
  const [newProductsLimit, setNewProductsLimit] = useState(10);

  const { data: newProducts, isLoading: newProductsLoading, isFetching: newProductsFetching } = useDashboard({
    limit: newProductsLimit,
    isNew: 1,
    enabled: newItemsInView
  });


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNewItemsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (newItemsRef.current) {
      observer.observe(newItemsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Countdown Section Scroll-to-fetch
  const [countdownInView, setCountdownInView] = useState(false);
  const countdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountdownInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '150px' }
    );

    if (countdownRef.current) {
      observer.observe(countdownRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (newProducts) {
      setNewProducts(newProducts);
    }
  }, [newProducts, setNewProducts]);

  const handleNextNewItems = () => {
    // Increment limit by 4 to fetch next items
    setNewProductsLimit(prev => prev + 4);
    collectedNewItemsRef.current?.slideNext();
  };



  return (

    <div className="min-h-screen bg-[#f5f6f7] flex flex-col pb-16 lg:pb-0">
      <Header />
      <HeroCarousel />

      {/* Category Carousel with Loading State */}
      {categoriesLoading ? (
        <CategorySkeleton />
      ) : categories && (

        <CategoryCarousel
          items={categories}
          slidesPerView={{
            sm: 5,
            md: 4,
            lg: 5
          }}
        />
      )}

      {/* Products Section */}
      <div ref={recentlySoldRef} className="px-2 lg:px-24 py-12 lg:py-20">
        {/* Section Heading */}
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
            Recently Sold Items
          </h2>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 lg:gap-6">
          {recentlySoldInitialLoading && storedProducts.length === 0 ? (
            // Skeleton or loading state only on initial load
            Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg p-4 animate-pulse h-64">
                <div className="bg-gray-200 rounded-md h-40 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))
          ) : storedProducts.length > 0 ? (
            <>
              {storedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={handleQuickView}
                  onClick={handleProductClick}
                />
              ))}
              {/* Show skeletons at the end if fetching more */}
              {recentlySoldFetching && (
                Array.from({ length: 5 }).map((_, index) => (
                  <div key={`more-${index}`} className="bg-white rounded-lg p-4 animate-pulse h-64">
                    <div className="bg-gray-200 rounded-md h-40 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))
              )}
            </>
          ) : (

            // No recently sold products found
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500">No products found.</p>
            </div>
          )}
        </div>



        {/* Show More Button */}
        <div className="flex justify-center mt-8 lg:mt-12">
          <ShowMoreButton
            onClick={handleShowMoreRecentlySold}
            disabled={recentlySoldFetching}
            label={recentlySoldFetching ? "Loading..." : "Show More"}
          />
        </div>


      </div>

      {/* Promo Banner */}
      <div ref={bannerIstRef} className="px-4 lg:px-24 py-0 lg:py-20">
        <BannerIstSection enabled={bannerIstInView} />
      </div>

      {/* Featured Products Section */}
      <div ref={featuredRef} className="px-2 lg:px-24 pt-12">
        {/* Section Heading */}
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Our Featured Items
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {featuredInitialLoading && storedFeatured.length === 0 ? (
            Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg p-6 animate-pulse h-80 flex items-center">
                <div className="bg-gray-200 rounded-md w-1/2 h-full mr-4"></div>
                <div className="flex-1">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))
          ) : storedFeatured.length > 0 ? (
            <>
              {storedFeatured.map((product) => (
                <FeaturedProductCard
                  key={product.id}
                  product={product}
                  topLeftBadge={<ProductBadge isFeatured={true} />}
                  onQuickView={handleQuickView}
                  onClick={handleProductClick}
                />
              ))}
              {/* Show more skeletons if fetching */}
              {featuredFetching && (
                Array.from({ length: 2 }).map((_, index) => (
                  <div key={`more-feat-${index}`} className="bg-white rounded-lg p-6 animate-pulse h-80 flex items-center">
                    <div className="bg-gray-200 rounded-md w-1/2 h-full mr-4"></div>
                    <div className="flex-1">
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                ))
              )}
            </>
          ) : (

            <div className="col-span-full text-center py-10 bg-white rounded-xl">
              <p className="text-gray-500">No featured products available.</p>
            </div>
          )}
        </div>



        {/* Show More Button */}
        <div className="flex justify-center mt-8 lg:mt-12 mb-12">
          <ShowMoreButton
            onClick={handleShowMoreFeatured}
            disabled={featuredFetching}
            label={featuredFetching ? "Loading..." : "Show More"}
          />
        </div>


      </div>

      {/* Promo Discount Section */}
      <div ref={countdownRef} className="pt-12 lg:pt-24 mb-12">
        <CountDownDiscountSection enabled={countdownInView} />
      </div>

      {/* Collected New Items Section */}
      <div ref={newItemsRef} className="pt-12 lg:pt-20">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Collected New Items
          </h2>
        </div>
        <div className="relative group">
          {newProductsLoading ? (
            <div className="flex gap-4 overflow-hidden px-14">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="min-w-[250px] bg-white rounded-lg p-4 animate-pulse h-64">
                  <div className="bg-gray-200 rounded-md h-40 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                </div>
              ))}
            </div>
          ) : (
            storedNewProducts.length > 0 ? (
              <CollectedNewItems
                ref={collectedNewItemsRef}
                products={storedNewProducts}
                onProductClick={handleProductClick}
                onQuickView={handleQuickView}
              />
            ) : (
              <div className="text-center py-16 bg-white mx-4 md:mx-14 rounded-2xl border border-dashed border-gray-200">
                <p className="text-gray-500">Stay tuned! New items are coming soon.</p>
              </div>
            )
          )}


          {/* Navigation Arrows */}
          <CarouselArrow
            direction="left"
            onClick={() => collectedNewItemsRef.current?.slidePrev()}
            className="!left-2 md:!left-4"
          />
          <CarouselArrow
            direction="right"
            onClick={handleNextNewItems}
            className="!right-2 md:!right-4"
          />
        </div>
      </div>


      {/* Home Promo Cards Section */}
      <div ref={banner2ndRef} className="mt-16">
        <Banner2ndSection enabled={banner2ndInView} />
      </div>

      {/* Browse By Top Niche Section */}
      <NicheSection
        onProductClick={handleProductClick}
        onQuickView={handleQuickView}
      />


      {/* Shop By Brands Section */}
      <div className="py-14 lg:py-24">
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Shop By Brands
          </h2>
        </div>

        {/* Loading State */}
        {brandsLoading && (
          <div className="flex justify-center items-center py-10">
            <BrandSliderSkeleton />
          </div>
        )}

        {/* Error State */}
        {brandsError && (
          <div className="text-center py-10">
            <p className="text-red-500">Failed to load brands. Please try again later.</p>
          </div>
        )}

        {/* Brands Content */}
        {!brandsLoading && !brandsError && brands && brands.length > 0 && (
          <>
            <div className="relative group/arrows">
              <BrandSlider ref={brandSliderRef} brands={brands} />
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
          </>
        )}

        {/* Empty State */}
        {!brandsLoading && !brandsError && brands && brands.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No brands available at the moment.</p>
          </div>
        )}
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

