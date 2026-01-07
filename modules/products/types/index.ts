export interface Product {
    id: string;
    name: string;
    originalPrice: number;
    salePrice: number;
    discountPrice: number;
    image: string;
    unit: string;
    quantity: number;
    rating: number | null;
    reviewCount: number | null;
    isNew: boolean;
    isSale: boolean;
    isFeatured: boolean;
    totalOrders?: number;
    discountPercentage?: number;
}



export interface ProductData {
    _id: string;
    product_name: string;
    product_price: number;
    final_price: number;
    discount_price: number;
    avatar: string;
    is_new: boolean;
    is_featured: boolean;
    is_sale: boolean;
    dimension: string;
    product_quantity: number;
    avg_rating: number | null;
    reviews: number;
}

export interface ProductApiResponse {
    success: boolean;
    message: string;
    data: ProductData[];
}

export interface PriceRange {
    min: number;
    max: number;
}

export interface FilterItem {
    id: string;
    name: string;
    count: number | string;
    checked: boolean;
}

export interface AppliedFilters {
    priceRange: PriceRange;
    brands: string[];
    categories: string[];
}
