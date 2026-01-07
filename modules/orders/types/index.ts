export interface PlaceOrderResponse {
    success: boolean;
    message: string;
    orderId?: string;
}

export interface OrderItem {
    _id: string;
    cart_id: string;
    p_id: string;
    product_name: string;
    product_logo: string;
    product_price: number;
    total_price: number;
    product_brand: string;
    product_dimension: string;
    no_of_products: number;
}

export interface ShippingAddress {
    _id: string;
    customer_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    address: string;
    country: string;
    state: string;
    city: string;
    postal_code: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface StatusHistoryItem {
    previous_status: string;
    new_status: string;
    changed_at: string;
    _id: string;
}

export interface Order {
    _id: string;
    customer_id: string;
    order_status: 'processing' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
    order_items: OrderItem[];
    shipping_address: ShippingAddress;
    order_id: string;
    createdAt: string;
    updatedAt: string;
    total_amount: number;
    __v: number;
    status_history?: StatusHistoryItem[];
    order_history?: StatusHistoryItem[];
}

export interface Pagination {
    totalOrders: number;
    currentPage: number;
    totalPages: number;
    limit: number;
}

export interface GetOrdersResponse {
    success: boolean;
    orders: Order[];
    pagination: Pagination;
}
