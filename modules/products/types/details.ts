/**
 * Raw product detail data from API
 */
export interface ProductDetailData {
    _id: string;
    product_name: string;
    product_description?: string;
    product_price: number;
    final_price: number;
    product_brand?: string;
    discount_price?: number;
    first_name?: string | null;
    last_name?: string | null;
    avatar: string;
    tags?: {
        tag_name: string;
        _id: string;
    }[];
    cover_images?: {
        url: string;
        _id: string;
    }[];
    dimension?: string;
    product_quantity?: number;
    avg_rating?: number | null;
    inventory_id?: string;
    featured?: boolean;
    isNew?: boolean;
    sales?: boolean;
    total_reviews?: number;
    product_reviews?: any[];
    manufacturer?: string;
    product_brand_id?: string;
    product_category?: string;
}

/**
 * Formatted product detail for UI
 */
export interface DetailedProduct {
    id: string;
    name: string;
    description: string;
    originalPrice: number;
    salePrice: number;
    discount: number;
    brand: string;
    manufacturer?: string;
    image: string;
    gallery: string[];
    tags: string[];
    unit: string;
    quantity: number;
    rating: number;
    reviewCount: number;
    sku: string;
    isFeatured: boolean;
    isNew: boolean;
    isSale: boolean;
    discountPercentage?: number;
    customerReviews: any[];
    firstName?: string;
    lastName?: string;
    brandId?: string;
    categoryId?: string;
}

export interface ProductDetailResponse {
    success: boolean;
    message: string;
    product: ProductDetailData[];
}

/**
 * Transformation utility
 */
export const transformProductDetail = (data: ProductDetailData): DetailedProduct => {
    // Round the sale price to integer as requested
    const roundedSalePrice = Math.round(data.final_price || data.product_price || 0);

    // Rating logic: when rating is null and review is 1, show 0 reviews
    let count = data.total_reviews || 0;
    if (data.avg_rating === null && count === 1) {
        count = 0;
    }

    return {
        id: data._id,
        name: data.product_name || 'Unnamed Product',
        description: data.product_description || '',
        originalPrice: data.product_price || 0,
        salePrice: roundedSalePrice,
        discount: data.discount_price || 0,
        brand: data.product_brand || 'None',
        image: data.avatar || '',
        gallery: data.cover_images?.map(img => img.url) || [],
        tags: data.tags?.map(tag => tag.tag_name) || [],
        unit: data.dimension || 'Unit',
        quantity: data.product_quantity || 0,
        rating: data.avg_rating || 0,
        reviewCount: count,
        sku: data.inventory_id || '',
        isFeatured: !!data.featured,
        isNew: !!data.isNew,
        isSale: !!data.sales,
        discountPercentage: data.discount_price || 0,
        customerReviews: data.product_reviews || [],
        firstName: data.first_name || '',
        lastName: data.last_name || '',
        manufacturer: data.manufacturer || '',
        brandId: data.product_brand_id,
        categoryId: data.product_category
    };
};
