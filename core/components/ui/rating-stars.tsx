import * as React from "react";
import { cn } from "@/core/utils/utils";

export interface RatingStarsProps extends React.HTMLAttributes<HTMLDivElement> {
    rating: number;
    reviewCount?: number;
    starSize?: "sm" | "md" | "lg";
    showReviewCount?: boolean;
    showReviewLabel?: boolean;
    filledColor?: string;
    emptyColor?: string;
}

const starSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
};

const RatingStars: React.FC<RatingStarsProps> = ({
    rating,
    reviewCount,
    starSize = "lg",
    showReviewCount = true,
    showReviewLabel = true,
    filledColor = "text-[#ffab10]",
    emptyColor = "text-[#777777]",
    className,
    ...props
}) => {
    const renderStars = () => {
        return Array.from({ length: 5 }, (_, i) => (
            <span
                key={i}
                className={cn(
                    i < rating ? filledColor : emptyColor,
                    starSizeClasses[starSize],
                    "font-bold"
                )}
            >
                ★
            </span>
        ));
    };

    return (
        <div className={cn("flex items-center gap-1", className)} {...props}>
            <div className="flex items-center gap-0.5">{renderStars()}</div>
            {showReviewCount && reviewCount !== undefined && (
                <span className="text-gray-500 text-xs ml-1">
                    ({reviewCount}{showReviewLabel ? ' Reviews' : ''})
                </span>
            )}
        </div>
    );
};

RatingStars.displayName = "RatingStars";

export { RatingStars };
