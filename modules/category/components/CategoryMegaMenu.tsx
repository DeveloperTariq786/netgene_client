import Link from 'next/link';
import { useCategories } from '../hooks/useCategories';
import { Loader2 } from 'lucide-react';

const MegaMenu: React.FC = () => {
    const { data: categories, isLoading, error } = useCategories();

    return (
        <div className="w-full bg-gradient-to-br from-white via-gray-50 to-white p-8 shadow-2xl rounded-b-2xl border-t border-gray-200 backdrop-blur-sm min-h-[300px]">
            {isLoading ? (
                <div className="flex flex-col items-center justify-center h-64 gap-3">
                    <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                    <p className="text-sm font-medium text-emerald-600/70">Loading Categories...</p>
                </div>
            ) : error ? (
                <div className="flex flex-col items-center justify-center h-64">
                    <p className="text-sm font-medium text-red-500">Failed to load categories</p>
                </div>
            ) : (
                <div className="max-h-[380px] overflow-y-auto custom-scrollbar pr-2">
                    <div className="grid grid-cols-5 gap-y-10 gap-x-8">
                        {categories?.map((category, index) => (
                            <div
                                key={`${category.title}-${index}`}
                                className="flex flex-col items-start group"
                            >
                                {/* Heading with hover effect */}
                                <div className="mb-5 relative w-full">
                                    <Link href={`/products?category=${category.id}`}>
                                        <div className="flex items-center gap-2 mb-3 group/header">
                                            <div className="w-6 h-6 rounded-md overflow-hidden bg-white border border-gray-100 flex-shrink-0 group-hover:border-emerald-200 transition-colors">
                                                <img
                                                    src={category.image}
                                                    alt={category.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <h3 className="text-gray-800 font-bold text-[16px] leading-tight group-hover:text-emerald-600 transition-colors duration-300">
                                                {category.title}
                                            </h3>
                                        </div>
                                    </Link>
                                    {/* Full width underline with green accent */}
                                    <div className="relative w-full">
                                        <div className="h-[1px] w-full bg-gray-200"></div>
                                        <div className="absolute top-0 left-0 h-[2px] w-[30px] bg-emerald-500"></div>
                                        <div className="absolute top-0 left-0 h-[2px] w-0 bg-emerald-600 group-hover:w-[30px] transition-all duration-500 ease-out"></div>
                                    </div>
                                </div>

                                {/* Links List with enhanced hover states */}
                                <ul className="space-y-3.5 w-full border-l border-r border-gray-200 px-4">
                                    {category.subcategories?.map((sub) => (
                                        <li key={sub.id} className="relative pl-0 hover:pl-2 transition-all duration-200">
                                            <Link
                                                href={`/products?category=${category.id}&subcategory=${sub.id}`}
                                                className="block text-gray-600 hover:text-emerald-600 text-[14px] font-normal transition-all duration-200 relative group/link"
                                            >
                                                <span className="relative">
                                                    {sub.name}
                                                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-emerald-500 group-hover/link:w-full transition-all duration-300"></span>
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                    {(!category.subcategories || category.subcategories.length === 0) && (
                                        <li className="text-xs text-gray-400 italic">No subcategories</li>
                                    )}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="h-4"></div>
                </div>
            )}
        </div>
    );
};

export default MegaMenu;