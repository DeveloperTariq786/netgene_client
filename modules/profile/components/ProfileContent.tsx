import React, { useState } from 'react';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { User, LogIn, Loader2 } from 'lucide-react';
import { ProfileHeader } from './ProfileHeader';
import { ProfileDetails } from './ProfileDetails';
import LoginDialog from '@/modules/auth/components/LoginDialog';
import { Button } from '@/core/components/ui/button';

export const ProfileContent: React.FC = () => {
    const { user, backendUser, isLoading } = useAuthStore();
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    if (isLoading) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[400px] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
            </div>
        );
    }

    if (!user) {
        return (
            <>
                <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl shadow-sm border border-gray-100 min-h-[300px]">
                    <div className="bg-gray-50 p-4 rounded-full mb-4">
                        <User size={32} className="text-gray-300" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Please Login</h3>
                    <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">
                        Sign in to view your profile details and manage orders.
                    </p>
                    <Button
                        onClick={() => setIsLoginOpen(true)}
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 shadow-md shadow-emerald-600/10"
                    >
                        <LogIn className="w-4 h-4 mr-2" />
                        Sign In Now
                    </Button>
                </div>

                <LoginDialog
                    open={isLoginOpen}
                    onOpenChange={setIsLoginOpen}
                />
            </>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <ProfileHeader user={user} />
            <ProfileDetails user={user} backendUser={backendUser} />
        </div>
    );
};

