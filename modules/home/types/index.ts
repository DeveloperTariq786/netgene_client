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
    id: number;
    name: string;
    image: string;
    images?: string[];
    originalPrice: number;
    salePrice: number;
    unit: string;
    rating: number;
    reviewCount: number;
    onSale?: boolean;
    isNew?: boolean;
    isFeatured?: boolean;
    description?: string;
    sku?: string;
    brand?: string;
    tags?: string[];
    discountPercentage?: number;
    topOrders?: string;
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
