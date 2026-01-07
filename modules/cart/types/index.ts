/**
 * Cart item from API response matching actual backend structure
 */
export interface CartItemData {
    _id: string;
    product_id: string;
    no_of_products: number;
    name: string;
    logo: string;
    product_price: number;
    total_price: number;
    product_brand: string;
    product_dimension: string;
}

/**
 * Cart item formatted for UI display
 */
export interface CartItem {
    id: string;
    productId: string;
    name: string;
    image: string;
    price: number;
    totalPrice: number;
    quantity: number;
    brand: string;
    dimension: string;
}

/**
 * API response for fetching cart items
 */
export interface GetCartResponse {
    success: boolean;
    message: string;
    data: CartItemData[];
    totalItems: number;
    final_price: number;
}

export interface AddToCartResponse {
    success: boolean;
    message: string;
}

/**
 * Transform cart data from API to UI format
 */
export const transformCartData = (cartItems: CartItemData[]): CartItem[] => {
    if (!cartItems || !Array.isArray(cartItems)) return [];

    return cartItems.map((item) => ({
        id: item._id,
        productId: item.product_id,
        name: item.name,
        image: item.logo,
        price: item.product_price,
        totalPrice: item.total_price,
        quantity: item.no_of_products,
        brand: item.product_brand,
        dimension: item.product_dimension,
    }));
};
