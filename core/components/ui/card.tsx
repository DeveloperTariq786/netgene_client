import * as React from "react";
import { cn } from "@/core/utils/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    maxWidth?: string;
    minHeight?: string;
    rounded?: "sm" | "md" | "lg" | "xl" | "2xl";
    shadow?: "sm" | "md" | "lg" | "xl" | "none";
    hover?: boolean;
}

const roundedClasses = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
};

const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    (
        {
            className,
            maxWidth,
            minHeight,
            rounded = "lg",
            shadow = "md",
            hover = false,
            children,
            ...props
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "bg-white transition-all duration-300 border border-gray-200",
                    roundedClasses[rounded],
                    shadowClasses[shadow],
                    hover && "hover:shadow-lg hover:border-primary",
                    maxWidth && `max-w-[${maxWidth}]`,
                    minHeight && `min-h-[${minHeight}]`,
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = "Card";

export { Card };
