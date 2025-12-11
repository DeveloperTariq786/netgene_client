import * as React from "react";
import { Eye } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import { cn } from "@/core/utils/utils";

export interface ShowMoreButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
}

const ShowMoreButton: React.FC<ShowMoreButtonProps> = ({
    label = "Show More",
    className,
    ...props
}) => {
    return (
        <Button
            variant="outline"
            className={cn(
                "text-[15px] font-medium uppercase px-4 lg:px-8 py-3.5 h-auto",
                "hover:bg-button-primary hover:text-white hover:font-bold hover:border-button-primary transition-all",
                className
            )}
            {...props}
        >
            <Eye size={18} strokeWidth={2.5} />
            {label}
        </Button>
    );
};

ShowMoreButton.displayName = "ShowMoreButton";

export { ShowMoreButton };
