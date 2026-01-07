import React from 'react';
import { Mail } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';
interface ProfileHeaderProps {
    user: FirebaseUser;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
    return (
        <div className="relative mb-8">
            {/* Banner */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 h-32 md:h-48"></div>

            {/* Content Container */}
            <div className="px-4 md:px-10 relative -mt-12 md:-mt-16 flex flex-col items-center gap-4">

                {/* Avatar */}
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-[4px] border-white bg-white overflow-hidden shadow-md flex-shrink-0 z-10">
                    {user.photoURL ? (
                        <img
                            src={user.photoURL}
                            alt={user.displayName || 'User'}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-emerald-50 text-emerald-600 text-3xl font-bold">
                            {user.displayName?.charAt(0) || 'U'}
                        </div>
                    )}
                </div>

                {/* User Info */}
                <div className="flex flex-col items-center pb-2 text-center space-y-1">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-['Outfit']">
                        {user.displayName}
                    </h1>

                    <div className="flex items-center gap-2 text-gray-500 text-sm md:text-base">
                        <Mail size={14} className="md:w-4 md:h-4" />
                        <span>{user.email}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
