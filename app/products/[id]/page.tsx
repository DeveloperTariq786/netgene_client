'use client';

import React from 'react';
import { Header } from '@/core/components/layout/Header';
import { BottomNav } from '@/core/components/layout/BottomNav';
import Footer from '@/core/components/layout/Footer';
import { PageBanner } from '@/core/components/shared/PageBanner';
import { ProductDetail, ProductInfoTabs } from '@/modules/products/components';
import ProductCard from '@/core/components/shared/ProductCard';
import { ProductBadge } from '@/core/components/shared/ProductBadge';
import { ShowMoreButton } from '@/core/components/shared/ShowMoreButton';
import { SAMPLE_PRODUCTS } from '@/core/constants';

interface ProductDetailPageProps {
    params: {
        id: string;
    };
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ params }) => {
    // Find the product by ID (for now using sample products)
    const product = SAMPLE_PRODUCTS.find(p => p.id === Number(params.id)) || SAMPLE_PRODUCTS[0];

    return (
        <div className="min-h-screen bg-[#f5f6f7] flex flex-col pb-16 lg:pb-0">
            <Header />

            {/* Main Content */}
            <main className="flex-1">
                {/* Page Banner */}
                <PageBanner
                    title={product.name}
                    breadcrumbs={[
                        { label: 'Home', href: '/' },
                        { label: 'Products', href: '/products' },
                        { label: product.name }
                    ]}
                />

                {/* Product Detail Component */}
                <ProductDetail product={product} />

                {/* Product Info Tabs (Description & Reviews) */}
                <ProductInfoTabs product={product} />

                {/* Related Items Section */}
                <div className="py-8 lg:py-8">
                    <div className="max-w-[1400px] mx-auto px-2 md:px-6 lg:px-14">
                        <h2 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-8 text-center">Related This Items</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-6">
                            {SAMPLE_PRODUCTS
                                .filter(p => p.id !== product.id)
                                .slice(0, 5)
                                .map((relatedProduct) => (
                                    <div key={relatedProduct.id}>
                                        <ProductCard
                                            product={relatedProduct}
                                            topLeftBadge={relatedProduct.isNew ? <ProductBadge isNew={true} /> : undefined}
                                            topRightBadge={relatedProduct.isSale ? <ProductBadge onSale={true} /> : undefined}
                                        />
                                    </div>
                                ))}
                        </div>

                        <div className="flex justify-center mt-8 lg:mt-12">
                            <ShowMoreButton label="VIEW ALL RELATED" />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
            <BottomNav />
        </div >
    );
};

export default ProductDetailPage;
