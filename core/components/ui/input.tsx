import * as React from "react"

import { cn } from "@/core/lib/utils/utils"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-12 w-full rounded-md border border-gray-200 bg-gray-100 px-5 py-2 text-base text-gray-600 placeholder:text-gray-500 placeholder:font-medium transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"

export { Input }
