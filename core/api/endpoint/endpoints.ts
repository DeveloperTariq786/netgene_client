// Root
export const ROOT_ENDPOINT = {
    BASE_URL: '/'
}

// Brand API endpoints
export const BRAND_ENDPOINTS = {
    GET_ALL: '/api/v1/customer/brands',
} as const;

// Category API endpoints
export const CATEGORY_ENDPOINTS = {
    GET_ALL: '/api/v1/customer/categories',
} as const;

// Customer API endpoints
export const CUSTOMER_ENDPOINTS = {
    LOGIN: '/api/v1/customer/login',
    ADD_ADDRESS: '/api/v1/customer/address',
    GET_ADDRESSES: '/api/v1/customer/address',
} as const;

// Product API endpoints
export const PRODUCT_ENDPOINTS = {
    GET_ALL: '/api/v1/customer/products',
    GET_DETAILS: '/api/v1/customer/product',
    ADD_REVIEW: '/api/v1/customer/reviews',
    SEARCH: '/api/v1/customer/search',
} as const;

// Cart API endpoints
export const CART_ENDPOINTS = {
    GET_CART: '/api/v1/customer/cart',
    ADD_TO_CART: '/api/v1/customer/add-cart',
    DELETE_CART_ITEM: '/api/v1/customer/delete-cart-item',
} as const;

// Order API endpoints
export const ORDER_ENDPOINTS = {
    PLACE_ORDER: '/api/v1/customer/order',
    GET_ORDERS: '/api/v1/customer/orders',
    CANCEL_ORDER: '/api/v1/customer/cancel-order',
} as const;

// Dashboard API endpoints
export const DASHBOARD_ENDPOINTS = {
    GET_DATA: '/api/v1/customer/dashboard',
} as const;

// Carousel API endpoints
export const CAROUSEL_ENDPOINTS = {
    GET_ALL: '/api/v1/customer/carousel',
} as const;

// Banner API endpoints
export const BANNER_ENDPOINTS = {
    GET_ALL: '/api/v1/customer/banner',
} as const;

// Countdown API endpoints
export const COUNTDOWN_ENDPOINTS = {
    GET_ALL: '/api/v1/customer/countdown',
} as const;
