import React from 'react';
import { Input } from '@/core/components/ui/input';
import { cn } from '@/core/utils/utils';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    containerClassName?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
    label,
    error,
    className,
    containerClassName,
    id,
    ...props
}) => {
    const inputId = id || props.name;

    return (
        <div className={cn("flex flex-col gap-2", containerClassName)}>
            {label && (
                <label
                    htmlFor={inputId}
                    className="text-sm font-semibold text-gray-600"
                >
                    {label}
                </label>
            )}
            <Input
                id={inputId}
                className={cn(error && "border-red-500 focus-visible:ring-red-500", className)}
                {...props}
            />
            {error && (
                <span className="text-xs text-red-500">{error}</span>
            )}
        </div>
    );
};
