import React from 'react';
import { Textarea } from '@/core/components/ui/Textarea';
import { cn } from '@/core/lib/utils/utils';

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    containerClassName?: string;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
    label,
    error,
    className,
    containerClassName,
    id,
    ...props
}) => {
    const textareaId = id || props.name;

    return (
        <div className={cn("flex flex-col gap-2", containerClassName)}>
            {label && (
                <label
                    htmlFor={textareaId}
                    className="text-sm font-semibold text-gray-600"
                >
                    {label}
                </label>
            )}
            <Textarea
                id={textareaId}
                className={cn(
                    "bg-gray-50 border-gray-200 focus-visible:ring-primary",
                    error && "border-red-500 focus-visible:ring-red-500",
                    className
                )}
                {...props}
            />
            {error && (
                <span className="text-xs text-red-500">{error}</span>
            )}
        </div>
    );
};
