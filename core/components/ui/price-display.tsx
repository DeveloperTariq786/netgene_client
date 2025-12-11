import * as React from "react";
import { cn } from "@/core/utils/utils";

export interface PriceDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
    originalPrice: number;
    salePrice: number;
    unit: string;
    size?: "sm" | "md" | "lg";
    layout?: "horizontal" | "vertical";
}

const sizeClasses = {
    sm: {
        original: "text-xs",
        sale: "text-sm",
        unit: "text-xs",
    },
    md: {
        original: "text-sm",
        sale: "text-base sm:text-lg",
        unit: "text-xs",
    },
    lg: {
        original: "text-lg",
        sale: "text-2xl",
        unit: "text-sm",
    },
};

const PriceDisplay: React.FC<PriceDisplayProps> = ({
    originalPrice,
    salePrice,
    unit,
    size = "md",
    layout = "horizontal",
    className,
    ...props
}) => {
    const sizes = sizeClasses[size];

    return (
        <div
            className={cn(
                "flex items-center gap-1",
                layout === "vertical" && "flex-col items-start gap-0",
                className
            )}
            {...props}
        >
            <span className={cn("text-red-500 line-through font-bold", sizes.original)}>
                ${originalPrice}
            </span>
            <span className={cn("text-emerald-600 font-bold", sizes.sale)}>
                ${salePrice}
            </span>
            <span className={cn("text-emerald-600", sizes.unit)}>
                /{unit}
            </span>
        </div>
    );
};

PriceDisplay.displayName = "PriceDisplay";

export { PriceDisplay };
