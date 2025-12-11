import * as React from "react";
import { cn } from "@/core/utils/utils";

export interface PromoCardProps extends React.HTMLAttributes<HTMLDivElement> {
    imageUrl: string;
    imageAlt?: string;
    aspectRatio?: "square" | "video" | "wide" | "portrait";
    rounded?: "sm" | "md" | "lg" | "xl";
    children?: React.ReactNode;
}

const aspectRatioClasses = {
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[16/9]",
    portrait: "aspect-[3/4]",
};

const roundedClasses = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
};

const PromoCard = React.forwardRef<HTMLDivElement, PromoCardProps>(
    (
        {
            className,
            imageUrl,
            imageAlt = "Promo",
            aspectRatio = "video",
            rounded = "lg",
            children,
            ...props
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "relative overflow-hidden group cursor-pointer",
                    aspectRatioClasses[aspectRatio],
                    roundedClasses[rounded],
                    className
                )}
                {...props}
            >
                <img
                    src={imageUrl}
                    alt={imageAlt}
                    className="promo-img"
                />
                {children && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        {children}
                    </div>
                )}
            </div>
        );
    }
);

PromoCard.displayName = "PromoCard";

export { PromoCard };
