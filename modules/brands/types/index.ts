/**
 * Brand data structure from API response
 */
export interface BrandData {
    _id: string;
    brand_name: string;
    brand_logo: string;
    no_of_products: number;
}

/**
 * API response structure for GET /api/v1/customer/brands
 */
export interface BrandApiResponse {
    success: boolean;
    message: string;
    data: BrandData[];
}

/**
 * Normalized brand interface for UI components
 */
export interface Brand {
    id: string;
    name: string;
    logoUrl: string;
    itemsCount: number;
}

