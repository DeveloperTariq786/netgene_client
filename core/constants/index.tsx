import { ReactNode } from 'react';
import { SlideData, CategoryItem, MenuSection, MenuItem, CartItem } from '../../modules/home/types';
import { Order } from '../../modules/orders/types';
import {
    Carrot,
    Apple,
    Milk,
    Fish,
    Leaf,
    Nut,
    Pizza,
    Grape,
    Beef,
    Coffee
} from 'lucide-react';

export interface SubCategory {
    id: string;
    name: string;
}

export interface DrawerCategory {
    id: string;
    name: string;
    icon: ReactNode;
    subCategories?: SubCategory[];
}

export interface Brand {
    id: string;
    name: string;
    logoUrl: string;
    itemsCount: number;
}

export const HERO_SLIDES: SlideData[] = [
    {
        id: 1,
        title: "Fresh Organic Vegetables",
        subtitle: "100% Organic",
        description: "Get fresh, pesticide-free vegetables delivered directly from the farm to your doorstep within 24 hours. Eat healthy, live healthy.",
        image: "https://mironcoder-greeny-html.netlify.app/assets/ltr/images/home/index/02.png",
        ctaPrimary: "Shop Now",
        ctaSecondary: "View Offers"
    },
    {
        id: 2,
        title: "Huge Discounts on Fruits",
        subtitle: "Weekend Sale",
        description: "Enjoy up to 50% off on seasonal fruits. Taste the sweetness of nature with our premium selection of imported and local fruits.",
        image: "https://mironcoder-greeny-html.netlify.app/assets/ltr/images/home/index/01.png",
        ctaPrimary: "Order Now",
        ctaSecondary: "Learn More"
    },
    {
        id: 3,
        title: "Daily Essentials Delivered",
        subtitle: "Fast Delivery",
        description: "From dairy products to organic spices, we have everything you need for your daily cooking. Experience the convenience today.",
        image: "https://mironcoder-greeny-html.netlify.app/assets/ltr/images/home/index/01.png",
        ctaPrimary: "Start Shopping",
        ctaSecondary: "Get App"
    }
];

export const CATEGORIES: CategoryItem[] = [
    {
        id: '1',
        title: 'Groceries',
        count: '45 Items',
        image: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/suggest/01.jpg',
    },
    {
        id: '2',
        title: 'Dairy Farm',
        count: '83 Items',
        image: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/suggest/02.jpg',
    },
    {
        id: '3',
        title: 'Sea Foods',
        count: '40 Items',
        image: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/suggest/01.jpg',
    },
    {
        id: '4',
        title: 'Vegan Foods',
        count: '57 Items',
        image: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/suggest/02.jpg',
    },
    {
        id: '5',
        title: 'Dry Foods',
        count: '23 Items',
        image: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/suggest/01.jpg',
    },
    {
        id: '6',
        title: 'Fast Foods',
        count: '97 Items',
        image: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/suggest/02.jpg',
    },
    {
        id: '7',
        title: 'Vegetables',
        count: '34 Items',
        image: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/suggest/03.jpg',
    },
    {
        id: '8',
        title: 'Fruits',
        count: '28 Items',
        image: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/suggest/01.jpg',
    },
    {
        id: '9',
        title: 'Fruits',
        count: '28 Items',
        image: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/suggest/02.jpg',
    },
    {
        id: '10',
        title: 'Fruits',
        count: '28 Items',
        image: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/suggest/01.jpg',
    },
    {
        id: '11',
        title: 'Fruits',
        count: '28 Items',
        image: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/suggest/02.jpg',
    },
    {
        id: '12',
        title: 'Fruits',
        count: '28 Items',
        image: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/suggest/03.jpg',
    }
];

export const DRAWER_CATEGORIES: DrawerCategory[] = [
    {
        id: 'vegetables',
        name: 'Vegetables',
        icon: <Carrot size={20} />,
        subCategories: [
            { id: 'v1', name: 'Carrot' },
            { id: 'v2', name: 'Broccoli' },
            { id: 'v3', name: 'Asparagus' },
            { id: 'v4', name: 'Cauliflower' },
            { id: 'v5', name: 'Eggplant' }
        ]
    },
    {
        id: 'fruits',
        name: 'Fruits',
        icon: <Apple size={20} />,
        subCategories: [
            { id: 'f1', name: 'Apple' },
            { id: 'f2', name: 'Orange' },
            { id: 'f3', name: 'Banana' },
            { id: 'f4', name: 'Strawberry' },
            { id: 'f5', name: 'Watermelon' }
        ]
    },
    {
        id: 'dairy',
        name: 'Dairy Farm',
        icon: <Milk size={20} />,
        subCategories: [
            { id: 'd1', name: 'Butter' },
            { id: 'd2', name: 'Cheese' },
            { id: 'd3', name: 'Milk' },
            { id: 'd4', name: 'Eggs' },
            { id: 'd5', name: 'Cream' }
        ]
    },
    {
        id: 'seafood',
        name: 'Sea Foods',
        icon: <Fish size={20} />,
        subCategories: [
            { id: 's1', name: 'Lobster' },
            { id: 's2', name: 'Octopus' },
            { id: 's3', name: 'Shrimp' },
            { id: 's4', name: 'Halabos' },
            { id: 's5', name: 'Maeuntang' }
        ]
    },
    {
        id: 'vegan',
        name: 'Vegan Foods',
        icon: <Leaf size={20} />,
        subCategories: [
            { id: 've1', name: 'Salmon' },
            { id: 've2', name: 'Avocados' },
            { id: 've3', name: 'Leafy Greens' },
            { id: 've4', name: 'Boiled Potatoes' },
            { id: 've5', name: 'Cottage Cheese' }
        ]
    },
    {
        id: 'dryfoods',
        name: 'Dry Foods',
        icon: <Nut size={20} />,
        subCategories: [
            { id: 'df1', name: 'Noodles' },
            { id: 'df2', name: 'Powdered Milk' },
            { id: 'df3', name: 'Nut & Yeast' },
            { id: 'df4', name: 'Almonds' },
            { id: 'df5', name: 'Pumpkin' }
        ]
    },
    {
        id: 'fastfood',
        name: 'Fast Foods',
        icon: <Pizza size={20} />,
        subCategories: [
            { id: 'ff1', name: 'Burger' },
            { id: 'ff2', name: 'Milkshake' },
            { id: 'ff3', name: 'Sandwich' },
            { id: 'ff4', name: 'Doughnut' },
            { id: 'ff5', name: 'Pizza' }
        ]
    },
    {
        id: 'drinks',
        name: 'Drinks',
        icon: <Coffee size={20} />,
        subCategories: [
            { id: 'dr1', name: 'Cocktail' },
            { id: 'dr2', name: 'Hard Soda' },
            { id: 'dr3', name: 'Champagne' },
            { id: 'dr4', name: 'Wine' },
            { id: 'dr5', name: 'Barley' }
        ]
    },
    {
        id: 'meats',
        name: 'Meats',
        icon: <Beef size={20} />,
        subCategories: [
            { id: 'm1', name: 'Meatball' },
            { id: 'm2', name: 'Sausage' },
            { id: 'm3', name: 'Poultry' },
            { id: 'm4', name: 'Chicken' },
            { id: 'm5', name: 'Beef' }
        ]
    },
    {
        id: 'fishes',
        name: 'Fishes',
        icon: <Fish size={20} />,
        subCategories: [
            { id: 'fi1', name: 'Scads' },
            { id: 'fi2', name: 'Pomfret' },
            { id: 'fi3', name: 'Groupers' },
            { id: 'fi4', name: 'Anchovy' },
            { id: 'fi5', name: 'Mackerel' }
        ]
    }
];

export const BRANDS: Brand[] = [
    { id: '1', name: 'Natural Food', logoUrl: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/brand/03.jpg', itemsCount: 120 },
    { id: '2', name: 'Green Farm', logoUrl: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/brand/04.jpg', itemsCount: 95 },
    { id: '3', name: 'Organic World', logoUrl: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/brand/05.jpg', itemsCount: 145 },
    { id: '4', name: 'Fresh Eat', logoUrl: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/brand/06.jpg', itemsCount: 78 },
    { id: '5', name: 'Vegan Life', logoUrl: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/brand/01.jpg', itemsCount: 110 },
    { id: '6', name: 'Eco Market', logoUrl: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/brand/05.jpg', itemsCount: 89 },
    { id: '7', name: 'Bio Store', logoUrl: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/brand/06.jpg', itemsCount: 132 },
    { id: '8', name: 'Pure Nature', logoUrl: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/brand/01.jpg', itemsCount: 97 },
    { id: '9', name: 'Healthy Choice', logoUrl: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/brand/01.jpg', itemsCount: 156 },
    { id: '10', name: 'Farm Best', logoUrl: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/brand/13.jpg', itemsCount: 103 },
    { id: '11', name: 'Nature Box', logoUrl: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/brand/06.jpg', itemsCount: 124 },
    { id: '12', name: 'Green Life', logoUrl: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/brand/06.jpg', itemsCount: 91 },
    { id: '13', name: 'Organic Basket', logoUrl: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/brand/06.jpg', itemsCount: 139 },
    { id: '14', name: 'Fresh Corner', logoUrl: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/brand/06.jpg', itemsCount: 84 },
    { id: '15', name: 'Eco Earth', logoUrl: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/brand/06.jpg', itemsCount: 118 },
    { id: '16', name: 'Bio Garden', logoUrl: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/brand/06.jpg', itemsCount: 92 },
    { id: '17', name: 'Pure Food', logoUrl: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/brand/06.jpg', itemsCount: 135 },
    { id: '18', name: 'Healthy Life', logoUrl: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/brand/06.jpg', itemsCount: 87 },
    { id: '19', name: 'Farm Fresh', logoUrl: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/brand/05.jpg', itemsCount: 142 },
    { id: '20', name: 'Nature Way', logoUrl: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/brand/04.jpg', itemsCount: 99 }
];

// Helper to quickly generate link objects for this replica
const createLinks = (labels: string[]): MenuItem[] =>
    labels.map(label => ({ label, href: '#' }));

export const MEGA_MENU_DATA: MenuSection[] = [
    {
        title: 'Vegetables',
        items: createLinks(['Carrot', 'Broccoli', 'Asparagus', 'Cauliflower', 'Eggplant']),
    },
    {
        title: 'Fruits',
        items: createLinks(['Apple', 'Orange', 'Banana', 'Strawberrie', 'Watermelon']),
    },
    {
        title: 'Dairy Farms',
        items: createLinks(['Butter', 'Cheese', 'Milk', 'Eggs', 'Cream']),
    },
    {
        title: 'Seafoods',
        items: createLinks(['Lobster', 'Octopus', 'Shrimp', 'Halabos', 'Maeuntang']),
    },
    {
        title: 'Diet Foods',
        items: createLinks(['Salmon', 'Avocados', 'Leafy Greens', 'Boiled Potatoes', 'Cottage Cheese']),
    },
    {
        title: 'Fast Foods',
        items: createLinks(['Burger', 'Milkshake', 'Sandwich', 'Doughnut', 'Pizza']),
    },
    {
        title: 'Drinks',
        items: createLinks(['Cocktail', 'Hard Soda', 'Shampain', 'Wine', 'Barley']),
    },
    {
        title: 'Meats',
        items: createLinks(['Meatball', 'Sausage', 'Poultry', 'Chicken', 'Cows']),
    },
    {
        title: 'Fishes',
        items: createLinks(['Scads', 'Pomfret', 'Groupers', 'Anchovy', 'Mackerel']),
    },
    {
        title: 'Dry Foods',
        items: createLinks(['Noodles', 'Powdered Milk', 'Nut & Yeast', 'Almonds', 'Pumpkin']),
    },
];

export const BRAND_MENU_DATA: MenuItem[] = createLinks([
    'Natural Food', 'Green Farm', 'Organic World', 'Fresh Eat', 'Vegan Life',
    'Eco Market', 'Bio Store', 'Pure Nature', 'Healthy Choice', 'Farm Best',
    'Nature Box', 'Green Life', 'Organic Basket', 'Fresh Corner', 'Eco Earth',
    'Bio Garden', 'Pure Food', 'Healthy Life', 'Farm Fresh', 'Nature Way'
]);

export const SAMPLE_PRODUCTS = [
    {
        id: 1,
        name: 'Fresh Organic Tomatoes',
        image: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/product/01.jpg',
        images: [
            'https://firebasestorage.googleapis.com/v0/b/draftai-b5cb9.appspot.com/o/image%20chilli.png?alt=media&token=eb869672-fd43-4387-bdb5-0993b37b91e2',
            'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/product/01.jpg',
            'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/product/02.jpg',
            'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/product/03.jpg',
            'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/product/04.jpg',

        ],
        originalPrice: 5.99,
        salePrice: 3.99,
        unit: 'kg',
        rating: 4.5,
        reviewCount: 128,
        onSale: true,
        isNew: true,
        isFeatured: true,
        description: 'Fresh organic tomatoes grown without pesticides. Perfect for salads, sauces, and everyday cooking. These vine-ripened tomatoes are picked at peak freshness to ensure maximum flavor and nutrition.',
        sku: 'VEG-TOM-001',
        brand: 'GreenGrocer',
        tags: ['Organic', 'Fresh', 'Vegetables', 'Healthy'],
        discountPercentage: 33,
        topOrders: '100',
    },
    {
        id: 2,
        name: 'Green Bell Pepper',
        image: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/product/12.jpg',
        images: [
            'https://firebasestorage.googleapis.com/v0/b/draftai-b5cb9.appspot.com/o/image%20chilli.png?alt=media&token=eb869672-fd43-4387-bdb5-0993b37b91e2',
            'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/product/03.jpg',
        ],
        originalPrice: 4.50,
        salePrice: 2.99,
        unit: 'kg',
        rating: 4.3,
        reviewCount: 95,
        onSale: true,
        isNew: true,
        isFeatured: true,
        description: 'Crisp and fresh green bell peppers, perfect for stir-fries, salads, and stuffing. Rich in vitamins A and C.',
        sku: 'VEG-PEP-002',
        brand: 'FarmFresh',
        tags: ['Fresh', 'Vegetables', 'Vitamin C'],
        discountPercentage: 34,
        topOrders: '100',
    },
    {
        id: 3,
        name: 'Fresh Broccoli',
        image: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/product/11.jpg',
        images: [
            'https://firebasestorage.googleapis.com/v0/b/draftai-b5cb9.appspot.com/o/image%20chilli.png?alt=media&token=eb869672-fd43-4387-bdb5-0993b37b91e2',
        ],
        originalPrice: 6.99,
        salePrice: 4.49,
        unit: 'kg',
        rating: 4.7,
        reviewCount: 203,
        isSale: true,
        isNew: false,
        isFeatured: false,
        description: 'Premium quality broccoli, high in fiber and essential nutrients. Steam, roast, or add to your favorite dishes.',
        sku: 'VEG-BRC-003',
        brand: 'GreenGrocer',
        tags: ['Organic', 'Vegetables', 'Superfood'],
        discountPercentage: 36,
        topOrders: '100',
    },
    {
        id: 4,
        name: 'Organic Carrots',
        image: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/product/10.jpg',
        images: [
            'https://firebasestorage.googleapis.com/v0/b/draftai-b5cb9.appspot.com/o/image%20chilli.png?alt=media&token=eb869672-fd43-4387-bdb5-0993b37b91e2',
            'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/product/04.jpg',
        ],
        originalPrice: 3.99,
        salePrice: 2.49,
        unit: 'kg',
        rating: 4,
        reviewCount: 156,
        onSale: false,
        isNew: true,
        description: 'Sweet and crunchy organic carrots. Great for snacking, juicing, or cooking. Packed with beta-carotene.',
        sku: 'VEG-CAR-004',
        brand: 'OrganicFarm',
        tags: ['Organic', 'Root Vegetables', 'Healthy'],
        discountPercentage: 36,
        topOrders: '100',
    },
    {
        id: 5,
        name: 'Fresh Lettuce',
        image: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/product/09.jpg',
        images: [
            'https://firebasestorage.googleapis.com/v0/b/draftai-b5cb9.appspot.com/o/image%20chilli.png?alt=media&token=eb869672-fd43-4387-bdb5-0993b37b91e2',
        ],
        originalPrice: 2.99,
        salePrice: 1.99,
        unit: 'piece',
        rating: 5,
        reviewCount: 87,
        isNew: true,
        isFeatured: true,
        description: 'Crisp and fresh lettuce leaves, perfect for salads and sandwiches. Harvested daily for maximum freshness.',
        sku: 'VEG-LET-005',
        brand: 'GreenGrocer',
        tags: ['Fresh', 'Salad', 'Leafy Greens'],
        discountPercentage: 33,
        topOrders: '100',
    },
    {
        id: 6,
        name: 'Red Onions',
        image: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/product/08.jpg',
        images: [
            'https://firebasestorage.googleapis.com/v0/b/draftai-b5cb9.appspot.com/o/image%20chilli.png?alt=media&token=eb869672-fd43-4387-bdb5-0993b37b91e2',
        ],
        originalPrice: 2.50,
        salePrice: 1.75,
        unit: 'kg',
        rating: 4,
        reviewCount: 142,
        onSale: false,
        isFeatured: true,
        isNew: true,
        description: 'Premium red onions with a mild, sweet flavor. Great for salads, grilling, and cooking.',
        sku: 'VEG-ONI-006',
        brand: 'FarmFresh',
        tags: ['Fresh', 'Vegetables', 'Cooking Essential'],
    },
    {
        id: 7,
        name: 'Fresh Spinach',
        image: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/product/07.jpg',
        images: [
            'https://firebasestorage.googleapis.com/v0/b/draftai-b5cb9.appspot.com/o/image%20chilli.png?alt=media&token=eb869672-fd43-4387-bdb5-0993b37b91e2',
        ],
        originalPrice: 4.99,
        salePrice: 3.49,
        unit: 'bunch',
        rating: 5,
        isNew: true,
        reviewCount: 219,
        description: 'Nutrient-rich fresh spinach leaves. Perfect for smoothies, salads, and cooking. High in iron and vitamins.',
        sku: 'VEG-SPN-007',
        brand: 'GreenGrocer',
        tags: ['Organic', 'Leafy Greens', 'Superfood'],
        discountPercentage: 30,
    },
    {
        id: 8,
        name: 'Cucumber',
        image: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/product/06.jpg',
        images: [
            'https://firebasestorage.googleapis.com/v0/b/draftai-b5cb9.appspot.com/o/image%20chilli.png?alt=media&token=eb869672-fd43-4387-bdb5-0993b37b91e2',
        ],
        originalPrice: 3.49,
        salePrice: 2.29,
        unit: 'kg',
        rating: 4,
        reviewCount: 78,
        isNew: true,
        description: 'Fresh and crunchy cucumbers. Ideal for salads, pickles, and refreshing snacks. Cool and hydrating.',
        sku: 'VEG-CUC-008',
        brand: 'OrganicFarm',
        tags: ['Fresh', 'Vegetables', 'Hydrating'],
        discountPercentage: 34,
    },
    {
        id: 9,
        name: 'Chilli',
        image: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/product/05.jpg',
        images: [
            'https://firebasestorage.googleapis.com/v0/b/draftai-b5cb9.appspot.com/o/image%20chilli.png?alt=media&token=eb869672-fd43-4387-bdb5-0993b37b91e2',
        ],
        originalPrice: 3.49,
        salePrice: 2.29,
        unit: 'kg',
        rating: 4,
        reviewCount: 78,
        isNew: true,
        description: 'Fresh and crunchy cucumbers. Ideal for salads, pickles, and refreshing snacks. Cool and hydrating.',
        sku: 'VEG-CUC-008',
        brand: 'OrganicFarm',
        tags: ['Fresh', 'Vegetables', 'Hydrating'],
        discountPercentage: 34,
    },
    {
        id: 10,
        name: 'Chilli',
        image: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/product/04.jpg',
        images: [
            'https://firebasestorage.googleapis.com/v0/b/draftai-b5cb9.appspot.com/o/image%20chilli.png?alt=media&token=eb869672-fd43-4387-bdb5-0993b37b91e2',
        ],
        originalPrice: 3.49,
        salePrice: 2.29,
        unit: 'kg',
        rating: 4,
        reviewCount: 78,
        isNew: true,
        description: 'Fresh and crunchy cucumbers. Ideal for salads, pickles, and refreshing snacks. Cool and hydrating.',
        sku: 'VEG-CUC-008',
        brand: 'OrganicFarm',
        tags: ['Fresh', 'Vegetables', 'Hydrating'],
        discountPercentage: 34,
    },
    {
        id: 11,
        name: 'Chilli',
        image: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/product/03.jpg',
        images: [
            'https://firebasestorage.googleapis.com/v0/b/draftai-b5cb9.appspot.com/o/image%20chilli.png?alt=media&token=eb869672-fd43-4387-bdb5-0993b37b91e2',
        ],
        originalPrice: 3.49,
        salePrice: 2.29,
        unit: 'kg',
        rating: 4,
        reviewCount: 78,
        isNew: true,
        description: 'Fresh and crunchy cucumbers. Ideal for salads, pickles, and refreshing snacks. Cool and hydrating.',
        sku: 'VEG-CUC-008',
        brand: 'OrganicFarm',
        tags: ['Fresh', 'Vegetables', 'Hydrating'],
        discountPercentage: 34,
    },
    {
        id: 12,
        name: 'Chilli',
        image: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/product/02.jpg',
        images: [
            'https://firebasestorage.googleapis.com/v0/b/draftai-b5cb9.appspot.com/o/image%20chilli.png?alt=media&token=eb869672-fd43-4387-bdb5-0993b37b91e2',
        ],
        originalPrice: 3.49,
        salePrice: 2.29,
        unit: 'kg',
        rating: 4,
        reviewCount: 78,
        isNew: true,
        description: 'Fresh and crunchy cucumbers. Ideal for salads, pickles, and refreshing snacks. Cool and hydrating.',
        sku: 'VEG-CUC-008',
        brand: 'OrganicFarm',
        tags: ['Fresh', 'Vegetables', 'Hydrating'],
        discountPercentage: 34,
    },
];

export interface PromoBanner {
    id: string;
    imageUrl: string;
    alt: string;
}

export const PROMO_BANNERS: PromoBanner[] = [
    {
        id: '1',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/draftai-b5cb9.appspot.com/o/03.jpg?alt=media&token=fcc91df2-93ef-4ba3-bbf0-fa192b7cc2d7',
        alt: 'Organic Fresh Vegetables',
    },

];

// Countdown Section Image
export const COUNTDOWN_IMAGE = 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/countdown.png';

// Home Promo Cards
export interface HomePromoCard {
    id: string;
    imageUrl: string;
    alt?: string;
}

export const HOME_PROMO_CARDS: HomePromoCard[] = [
    {
        id: '1',
        imageUrl: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/promo/home/01.jpg',
    },
    {
        id: '2',
        imageUrl: 'https://mironcoder-greeny-html.netlify.app/assets/ltr/images/promo/home/02.jpg',
    },
];

// Sample Cart Items
export const SAMPLE_CART_ITEMS: CartItem[] = [
    {
        id: 1,
        name: 'Fresh Organic Tomatoes',
        image: 'https://firebasestorage.googleapis.com/v0/b/draftai-b5cb9.appspot.com/o/image%20chilli.png?alt=media&token=eb869672-fd43-4387-bdb5-0993b37b91e2',
        price: 3.99,
        quantity: 2,
    },
    {
        id: 2,
        name: 'Green Bell Pepper',
        image: 'https://firebasestorage.googleapis.com/v0/b/draftai-b5cb9.appspot.com/o/image%20chilli.png?alt=media&token=eb869672-fd43-4387-bdb5-0993b37b91e2',
        price: 2.99,
        quantity: 1,
    },
    {
        id: 3,
        name: 'Fresh Broccoli',
        image: 'https://firebasestorage.googleapis.com/v0/b/draftai-b5cb9.appspot.com/o/image%20chilli.png?alt=media&token=eb869672-fd43-4387-bdb5-0993b37b91e2',
        price: 4.49,
        quantity: 3,
    },
    {
        id: 4,
        name: 'Organic Carrots',
        image: 'https://firebasestorage.googleapis.com/v0/b/draftai-b5cb9.appspot.com/o/image%20chilli.png?alt=media&token=eb869672-fd43-4387-bdb5-0993b37b91e2',
        price: 2.49,
        quantity: 1,
    },
];

export const SHIPPING_ADDRESSES: import('../../modules/home/types').Address[] = [
    {
        id: 1,
        type: 'Home',
        name: 'Jhon Doe',
        phone: '+1 234 567 890',
        address: '1234, Park Street, New York, America',
    },
    {
        id: 2,
        type: 'Office',
        name: 'Jhon Doe',
        phone: '+1 234 567 890',
        address: '1234, Park Street, New York, America',
    },
    {
        id: 3,
        type: 'Other',
        name: 'Jhon Doe',
        phone: '+1 234 567 890',
        address: '1234, Park Street, New York, America',
    },
];

export const SAMPLE_ORDERS: Order[] = [
    {
        id: 'ORD-2023-001',
        date: 'Dec 10, 2023 at 10:30 AM',
        status: 'Processing',
        total: 85.50,
        paymentMethod: 'Credit Card',
        shippingAddress: '123 Main St, New York, NY 10001',
        items: [
            {
                id: 1,
                productId: 101,
                name: 'Fresh Organic Bananas',
                image: 'https://borobazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fp-1.png&w=384&q=75',
                price: 15.50,
                quantity: 2,
                unit: 'kg'
            },
            {
                id: 2,
                productId: 102,
                name: 'Red Apple Premium',
                image: 'https://borobazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fp-2.png&w=384&q=75',
                price: 24.00,
                quantity: 1,
                unit: 'kg'
            }
        ]
    },
    {
        id: 'ORD-2023-002',
        date: 'Nov 28, 2023 at 02:15 PM',
        status: 'Delivered',
        total: 120.00,
        paymentMethod: 'PayPal',
        shippingAddress: '456 Park Ave, London, UK',
        items: [
            {
                id: 3,
                productId: 103,
                name: 'Green Cabbage',
                image: 'https://borobazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fp-3.png&w=384&q=75',
                price: 12.00,
                quantity: 5,
                unit: 'pc'
            }
        ]
    }
];


// Product Filter Constants
export const PRICE_RANGE_LIMITS = {
    MIN: 0,
    MAX: 5000,
    STEP: 50
};

export const INITIAL_PRICE_RANGE = {
    min: PRICE_RANGE_LIMITS.MIN,
    max: PRICE_RANGE_LIMITS.MAX
};

export const INITIAL_RATINGS = [
    { rating: 5, count: 5, checked: false },
    { rating: 4, count: 4, checked: false },
    { rating: 3, count: 3, checked: false },
    { rating: 2, count: 2, checked: false },
    { rating: 1, count: 1, checked: false },
];
