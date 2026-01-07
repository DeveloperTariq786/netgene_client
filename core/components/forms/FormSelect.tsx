import React from 'react';
import { cn } from '@/core/lib/utils/utils';

interface FormSelectOption {
    value: string;
    label: string;
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: FormSelectOption[];
    error?: string;
    containerClassName?: string;
    placeholder?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
    label,
    options,
    error,
    className,
    containerClassName,
    id,
    placeholder = "Select an option",
    ...props
}) => {
    const selectId = id || props.name;

    return (
        <div className={cn("flex flex-col gap-2", containerClassName)}>
            {label && (
                <label
                    htmlFor={selectId}
                    className="text-sm font-semibold text-gray-600"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                <select
                    id={selectId}
                    className={cn(
                        "w-full bg-gray-50 border border-gray-200 rounded-md py-3 px-4 focus:ring-2 focus:ring-primary outline-none text-sm transition-all text-gray-600 appearance-none",
                        error && "border-red-500 focus:ring-red-500",
                        className
                    )}
                    {...props}
                >
                    <option value="" disabled selected>{placeholder}</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                </div>
            </div>
            {error && (
                <span className="text-xs text-red-500">{error}</span>
            )}
        </div>
    );
};
