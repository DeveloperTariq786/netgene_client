import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/core/lib/utils/utils"

const NavigationMenu = React.forwardRef<
    HTMLElement,
    React.HTMLAttributes<HTMLElement>
>(({ className, children, ...props }, ref) => (
    <nav
        ref={ref}
        className={cn("relative z-10 flex items-center justify-center", className)}
        {...props}
    >
        {children}
    </nav>
))
NavigationMenu.displayName = "NavigationMenu"

const NavigationMenuList = React.forwardRef<
    HTMLUListElement,
    React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
    <ul
        ref={ref}
        className={cn("flex items-center gap-10", className)}
        {...props}
    />
))
NavigationMenuList.displayName = "NavigationMenuList"

const NavigationMenuItem = React.forwardRef<
    HTMLLIElement,
    React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
    <li
        ref={ref}
        className={cn("", className)}
        {...props}
    />
))
NavigationMenuItem.displayName = "NavigationMenuItem"

const navigationMenuTriggerStyle = () =>
    "flex items-center gap-1 text-gray-700 font-semibold hover:text-greeny-600 transition-colors text-[15px] cursor-pointer"

const NavigationMenuTrigger = React.forwardRef<
    HTMLAnchorElement,
    React.AnchorHTMLAttributes<HTMLAnchorElement> & {
        hasDropdown?: boolean
    }
>(({ className, children, hasDropdown, ...props }, ref) => (
    <a
        ref={ref}
        className={cn(navigationMenuTriggerStyle(), className)}
        {...props}
    >
        {children}
        {hasDropdown && <ChevronDown className="w-4 h-4 stroke-[2.5]" />}
    </a>
))
NavigationMenuTrigger.displayName = "NavigationMenuTrigger"

const NavigationMenuLink = React.forwardRef<
    HTMLAnchorElement,
    React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
    <a
        ref={ref}
        className={cn(navigationMenuTriggerStyle(), className)}
        {...props}
    />
))
NavigationMenuLink.displayName = "NavigationMenuLink"

export {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
}
