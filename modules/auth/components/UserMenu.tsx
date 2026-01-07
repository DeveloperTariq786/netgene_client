"use client";

import { LogOut, Package, User } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "@/modules/auth/store/useAuthStore";
import { logout } from "@/core/lib/firebase";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu";

interface UserAvatarProps {
    photoURL: string | null;
    displayName: string | null;
    size?: "sm" | "md";
}

const UserAvatar = ({ photoURL, displayName, size = "md" }: UserAvatarProps) => {
    const [imageError, setImageError] = useState(false);
    const sizeClasses = size === "sm" ? "h-8 w-8" : "h-10 w-10";
    const textSize = size === "sm" ? "text-sm" : "text-base";

    const showFallback = !photoURL || imageError;

    return (
        <div className={`${sizeClasses} rounded-full overflow-hidden border border-gray-200 flex-shrink-0 bg-emerald-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer`}>
            {showFallback ? (
                <div className={`h-full w-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold ${textSize}`}>
                    {displayName?.charAt(0)?.toUpperCase() || "U"}
                </div>
            ) : (
                <img
                    src={photoURL}
                    alt={displayName || "User"}
                    className="h-full w-full object-cover"
                    onError={() => setImageError(true)}
                    referrerPolicy="no-referrer"
                />
            )}
        </div>
    );
};

export const UserMenu = () => {
    const { user, logout: storeLogout } = useAuthStore();

    const handleLogout = async () => {
        try {
            await logout(); // Firebase logout
            storeLogout(); // Store/Backend logout
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };


    if (!user) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none" asChild>
                <button className="rounded-full focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                    <UserAvatar
                        photoURL={user.photoURL}
                        displayName={user.displayName}
                        size="md"
                    />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={8} className="w-56 p-2 bg-white border border-gray-200 shadow-lg rounded-lg z-[100]">
                <DropdownMenuLabel className="font-normal px-2 py-2">
                    <div className="flex items-center gap-3">
                        <UserAvatar
                            photoURL={user.photoURL}
                            displayName={user.displayName}
                            size="md"
                        />
                        <div className="flex flex-col space-y-1 min-w-0">
                            <p className="text-sm font-medium leading-none text-gray-900 truncate">{user.displayName}</p>
                            <p className="text-xs leading-none text-gray-500 truncate">{user.email}</p>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-200" />
                <DropdownMenuItem className="cursor-pointer gap-2 p-2 hover:bg-gray-100 focus:bg-gray-100 rounded-md text-gray-700" onClick={() => window.location.href = '/profile'}>
                    <User className="h-4 w-4 text-gray-500" />
                    <span>My Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer gap-2 p-2 hover:bg-red-50 focus:bg-red-50 rounded-md text-red-600" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
