import Link from 'next/link';
import { BrandAvatar } from '../../../core/components/shared/BrandAvatar';
import { Brand } from '../types';

interface BrandCardProps {
    brand: Brand;
}

export const BrandCard: React.FC<BrandCardProps> = ({ brand }) => {
    return (
        <Link href={`/products?brand=${brand.id}`} className="block">
            <div className="group flex flex-col items-center cursor-pointer min-w-0 lg:min-w-[220px] p-2 lg:p-4">
                <div className="mb-3 lg:mb-6">
                    <BrandAvatar src={brand.logoUrl} alt={brand.name} size="sm" />
                </div>

                <div className="text-center space-y-0.5 lg:space-y-1">
                    <h3 className="text-sm lg:text-lg font-bold text-slate-700 group-hover:text-brand-green transition-colors duration-200">
                        {brand.name}
                    </h3>
                    <p className="text-slate-400 text-xs lg:text-sm font-medium">
                        ({brand.itemsCount} items)
                    </p>
                </div>
            </div>
        </Link>
    );
};
