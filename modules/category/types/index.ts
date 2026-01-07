// API Response Types
export interface SubCategoryData {
    subcategory_id: string;
    subcategory_name: string;
}

export interface CategoryData {
    _id: string;
    category_name: string;
    category_logo: string;
    no_of_subcategories: number;
    subcategories: SubCategoryData[];
}

export interface CategoryApiResponse {
    success: boolean;
    message: string;
    data: CategoryData[];
}

// Normalized UI Types
export interface SubCategory {
    id: string;
    name: string;
}

export interface CategoryItem {
    id: string;
    title: string;
    count: string;
    image: string; // Placeholder or mapped if API adds image later
    subcategories: SubCategory[];
    overlayColor?: 'bg-green-600' | 'bg-red-600' | 'bg-blue-600';
}