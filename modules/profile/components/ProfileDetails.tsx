import React from 'react';
import { UserCheck, Package, ChevronRight } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';
import { CustomerUser } from '@/modules/auth/types/auth.types';

interface ProfileDetailsProps {
    user: FirebaseUser;
    backendUser: CustomerUser | null;
}

export const ProfileDetails: React.FC<ProfileDetailsProps> = ({ user, backendUser }) => {
    return (
        <div className="px-4 md:px-10 pb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                {/* Personal Information */}
                <div className="space-y-4">
                    <h3 className="text-base md:text-lg font-bold text-gray-900 flex items-center gap-2">
                        <div className="p-1.5 bg-emerald-100 rounded-md text-emerald-600">
                            <UserCheck size={18} />
                        </div>
                        Personal Information
                    </h3>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden divide-y divide-gray-100">
                        <div className="p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-4 hover:bg-gray-50 transition-colors">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Full Name</span>
                            <span className="text-sm font-semibold text-gray-900">{backendUser?.name || user.displayName}</span>
                        </div>
                        <div className="p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-4 hover:bg-gray-50 transition-colors">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</span>
                            <span className="text-sm font-semibold text-gray-900 break-all">{backendUser?.email || user.email}</span>
                        </div>
                    </div>
                </div>

                {/* Quick Actions (My Orders) */}
                <div className="space-y-4">
                    <h3 className="text-base md:text-lg font-bold text-gray-900 flex items-center gap-2">
                        <div className="p-1.5 bg-emerald-100 rounded-md text-emerald-600">
                            <Package size={18} />
                        </div>
                        My Activity
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                        <button
                            className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group text-left"
                            onClick={() => {
                                window.location.href = '/orders';
                            }}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                    <Package size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 text-sm group-hover:text-emerald-700 transition-colors">My Orders</p>
                                    <p className="text-xs text-gray-500 mt-0.5">View and track your active orders</p>
                                </div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
                                <ChevronRight size={16} className="text-gray-400 group-hover:text-emerald-600 transition-colors" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
