export interface SlideData {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    ctaPrimary: string;
    ctaSecondary: string;
}

export interface CategoryItem {
    id: string;
    title: string;
    count: string;
    image: string;
}

export interface MenuItem {
    label: string;
    href: string;
}

export interface MenuSection {
    title: string;
    items: MenuItem[];
}

export interface Product {
    id: string;

    name: string;
    image: string;
    originalPrice: number;
    salePrice: number;
    discountPrice: number;
    unit: string;
    rating: number | null;
    reviewCount: number | null;
    onSale?: boolean;
    isSale: boolean;
    isNew: boolean;
    isFeatured: boolean;
    sku?: string;
    brand?: string;
    tags?: string[];
    discountPercentage?: number;
    description?: string;
    topOrders?: string;
    quantity: number;
    manufacturer?: string;
    totalOrders?: number;
}


export interface CartItem {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

export interface Address {
    id: number;
    type: 'Home' | 'Office' | 'Other';
    name: string;
    phone: string;
    address: string;
}

export interface DashboardProduct {
    _id: string;
    product_name: string;
    product_description: string;
    product_price: number;
    discount_precentage: number;
    final_price: number;
    avatar: string;
    featured: boolean;
    isNew: boolean;
    sales: boolean;
    product_stock: number;
    dimension: string;
    product_brand: string;
    rating: number;
    total_reviews: number;
    totalOrders?: number;
    createdAt: string;
}



export interface DashboardApiResponse {
    success: boolean;
    message: string;
    data: DashboardProduct[];
}

export interface CarouselItem {
    id: string;
    title: string;
    description: string;
    image: string;
    brandId: string;
    association: string;
}

export interface RawCarouselItem {
    _id: string;
    carousel_title: string;
    carousel_description: string;
    carousel_brand: string;
    carousel_url: string;
    carousel_association: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface CarouselApiResponse {
    success: boolean;
    message: string;
    data: RawCarouselItem[];
}
export interface PromotionItem {
    id: string;
    image: string;
    category?: string;
    brandId?: string;
    association?: string;
}

export interface RawPromotionItem {
    _id: string;
    banner_category?: string;
    banner_brand?: string;
    banner_url: string;
    banner_association: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface PromotionApiResponse {
    success: boolean;
    message: string;
    data: RawPromotionItem[];
}
export interface CountdownItem {
    id: string;
    title: string;
    description: string;
    discount: string;
    endTime: string;
    image: string;
    association: string;
    associationId?: string;
    remainingTimeStr?: string;
}

export interface RawCountdownItem {
    _id: string;
    countdown_title: string;
    countdown_description: string;
    countdown_discount: string;
    countdown_end_time: string;
    countdown_url: string;
    countdown_association: string;
    countdown_brand?: string;
    countdown_category?: string;
    createdAt: string;
    updatedAt: string;
    remainingTime?: string;
    __v: number;
}

export interface CountdownApiResponse {
    success: boolean;
    message: string;
    data: RawCountdownItem[];
}
