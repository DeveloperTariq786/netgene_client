export interface CategoryItem {
    id: string;
    title: string;
    count: string;
    image: string;
    overlayColor?: 'bg-green-600' | 'bg-red-600' | 'bg-blue-600'; // Optional custom overlay color (e.g. 'bg-green-600')
}