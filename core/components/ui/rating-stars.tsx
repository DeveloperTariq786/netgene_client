import * as React from "react";
import { cn } from "@/core/lib/utils/utils";

export interface RatingStarsProps extends React.HTMLAttributes<HTMLDivElement> {
    rating: number | null;
    reviewCount?: number | null;
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
        const safeRating = rating ?? 0;
        return Array.from({ length: 5 }, (_, i) => (
            <span
                key={i}
                className={cn(
                    i < safeRating ? filledColor : emptyColor,
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
            {showReviewCount && reviewCount !== undefined && reviewCount !== null && (
                <span className="text-gray-500 text-xs ml-1">
                    ({reviewCount}{showReviewLabel ? <span className="hidden lg:inline"> Reviews</span> : ''})
                </span>
            )}
        </div>
    );
};

RatingStars.displayName = "RatingStars";

export { RatingStars };
