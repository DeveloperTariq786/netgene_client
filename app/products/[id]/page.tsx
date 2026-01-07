'use client';

import React, { use } from 'react';
import { Header } from '@/core/components/layout/Header';
import { BottomNav } from '@/core/components/layout/BottomNav';
import Footer from '@/core/components/layout/Footer';
import { PageBanner } from '@/core/components/shared/PageBanner';
import ProductDetail from '@/modules/products/components/product/ProductDetail';
import ProductInfoTabs from '@/modules/products/components/product/ProductInfoTabs';
import { useProductDetail } from '@/modules/products/hooks/useProductDetail';
import ProductDetailSkeleton from '@/modules/products/components/skeletons/ProductDetailSkeleton';
import { Skeleton } from '@/core/components/ui/skeleton';
import { AlertCircle, Home } from 'lucide-react';
import Link from 'next/link';
import { RelatedProducts } from '@/modules/products/components';

interface ProductDetailPageProps {
    params: Promise<{ id: string }> | { id: string };
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ params: paramsProp }) => {
    // Handle cases where params might be a Promise (Next.js 15 pattern)
    const params = paramsProp instanceof Promise ? use(paramsProp) : paramsProp;
    const { data: product, isLoading, error, isError } = useProductDetail(params?.id);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#f5f6f7] flex flex-col pb-16 lg:pb-0">
                <Header />
                <main className="flex-1">
                    <div className="bg-emerald-900/10 py-10 lg:py-16">
                        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-14">
                            <Skeleton className="h-10 w-64 mb-4" />
                            <div className="flex gap-2">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-4" />
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-4" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        </div>
                    </div>
                    <ProductDetailSkeleton />
                </main>
                <Footer />
                <BottomNav />
            </div>
        );
    }

    if (isError || !product) {
        const errorMessage = error instanceof Error ? error.message : 'We couldn\'t find the product you\'re looking for.';

        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
                    <AlertCircle className="w-10 h-10 text-red-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Oops!</h2>
                <p className="text-gray-500 max-w-md mb-8">
                    {errorMessage}
                </p>
                <div className="flex gap-4">
                    <Link
                        href="/"
                        className="flex items-center gap-2 bg-emerald-600 text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl"
                    >
                        <Home size={20} />
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f5f6f7] flex flex-col pb-16 lg:pb-0">
            <Header />

            <main className="flex-1">
                <PageBanner
                    title={product.name}
                    breadcrumbs={[
                        { label: 'Home', href: '/' },
                        { label: 'Products', href: '/products' },
                        { label: product.name }
                    ]}
                />

                <ProductDetail product={product} />

                {/* Info Tabs */}
                <ProductInfoTabs product={product} />

                {/* Related Products Section */}
                <RelatedProducts
                    currentProductId={product.id}
                    brandId={product.brandId}
                    categoryId={product.categoryId}
                />
            </main>

            <Footer />
            <BottomNav />
        </div >
    );
};

export default ProductDetailPage;
